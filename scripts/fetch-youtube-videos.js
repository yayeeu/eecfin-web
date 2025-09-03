#!/usr/bin/env node

/**
 * YouTube Video Fetcher Script
 * Fetches sermon and live stream videos from YouTube RSS feeds
 * Saves results to CSV file for the Sermons page to consume
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser } from 'xmldom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PLAYLIST_ID = 'PL827hn5fOPy0ds95bHKNDLcXCWgOO_DuO';
const CHANNEL_ID = 'UCDiDav6xEZdYfDzpjCAgiHg';
const OUTPUT_DIR = path.join(__dirname, '../public/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'youtube-videos.csv');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetch data from URL with promise support
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          data: data
        });
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Fetch YouTube RSS directly (no CORS needed server-side)
 */
async function fetchYouTubeRss(youtubeRssUrl) {
  console.log(`Making direct request to: ${youtubeRssUrl}`);
  
  try {
    const response = await fetchUrl(youtubeRssUrl);
    
    if (response.statusCode !== 200) {
      throw new Error(`HTTP ${response.statusCode}: Failed to fetch YouTube RSS`);
    }
    
    if (!response.data || !response.data.includes('<?xml')) {
      throw new Error('Invalid XML response from YouTube RSS');
    }
    
    console.log(`✅ Successfully fetched YouTube RSS`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to fetch YouTube RSS:`, error.message);
    throw error;
  }
}

/**
 * Parse YouTube RSS XML and extract video data
 */
function parseYouTubeRss(xmlContent) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
  
  const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
  if (parseError) {
    throw new Error('Failed to parse YouTube RSS XML');
  }
  
  const entries = Array.from(xmlDoc.getElementsByTagName('entry'));
  
  return entries.map((entry) => {
    const videoIdElement = entry.getElementsByTagName('yt:videoId')[0];
    const titleElement = entry.getElementsByTagName('title')[0];
    const publishedElement = entry.getElementsByTagName('published')[0];
    const thumbnailElement = entry.getElementsByTagName('media:thumbnail')[0];
    
    const videoId = videoIdElement ? videoIdElement.textContent : '';
    const title = titleElement ? titleElement.textContent : '';
    const published = publishedElement ? publishedElement.textContent : '';
    const thumbnailUrl = thumbnailElement 
      ? thumbnailElement.getAttribute('url') 
      : `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    
    return {
      id: videoId,
      title: title,
      thumbnailUrl: thumbnailUrl,
      publishedAt: published
    };
  }).filter(video => video.id && video.title);
}

/**
 * Fetch sermons from playlist
 */
async function fetchSermons() {
  console.log('📺 Fetching sermons from playlist...');
  const youtubeRssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
  
  try {
    const xmlContent = await fetchYouTubeRss(youtubeRssUrl);
    const videos = parseYouTubeRss(xmlContent);
    
    return videos.map(video => ({
      ...video,
      type: 'sermon',
      source: 'playlist'
    }));
  } catch (error) {
    console.error('Failed to fetch sermons:', error.message);
    return [];
  }
}

/**
 * Fetch live streams from channel
 */
async function fetchLiveStreams() {
  console.log('🔴 Fetching live streams from channel...');
  const youtubeRssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  
  try {
    const xmlContent = await fetchYouTubeRss(youtubeRssUrl);
    const videos = parseYouTubeRss(xmlContent);
    
    // Get sermon video IDs to exclude them
    const sermonIds = new Set();
    const sermonRssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
    try {
      const sermonXmlContent = await fetchYouTubeRss(sermonRssUrl);
      const sermonVideos = parseYouTubeRss(sermonXmlContent);
      sermonVideos.forEach(video => sermonIds.add(video.id));
    } catch (err) {
      console.warn('Could not fetch sermon playlist for exclusion:', err.message);
    }
    
    // Filter for live streams
    const liveKeywords = [
      'live', 'stream', 'streaming', 'broadcast', 'broadcasting',
      'sunday service', 'worship service', 'church service',
      'online service', 'virtual service', 'Focus on Jesus', 'የእሁድ አገልግሎት'
    ];
    
    return videos
      .filter(video => {
        // Exclude videos in sermon playlist
        if (sermonIds.has(video.id)) {
          return false;
        }
        
        // Only include live stream content
        const title = video.title.toLowerCase();
        return liveKeywords.some(keyword => title.includes(keyword));
      })
      .map(video => ({
        ...video,
        type: 'live',
        source: 'channel'
      }));
  } catch (error) {
    console.error('Failed to fetch live streams:', error.message);
    return [];
  }
}

/**
 * Convert videos array to CSV format
 */
function videosToCSV(videos) {
  const headers = ['id', 'title', 'thumbnailUrl', 'publishedAt', 'type', 'source'];
  const csvRows = [headers.join(',')];
  
  videos.forEach(video => {
    const row = [
      video.id,
      `"${video.title.replace(/"/g, '""')}"`, // Escape quotes in title
      video.thumbnailUrl,
      video.publishedAt,
      video.type,
      video.source
    ];
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting YouTube video fetch...');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Playlist ID: ${PLAYLIST_ID}`);
  console.log(`Channel ID: ${CHANNEL_ID}`);
  console.log('---');
  
  try {
    // Fetch both types of videos
    const [sermons, liveStreams] = await Promise.all([
      fetchSermons(),
      fetchLiveStreams()
    ]);
    
    // Combine and sort by publish date
    const allVideos = [...sermons, ...liveStreams]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // Convert to CSV
    const csvContent = videosToCSV(allVideos);
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');
    
    console.log('---');
    console.log('✅ Success!');
    console.log(`📊 Total videos: ${allVideos.length}`);
    console.log(`📺 Sermons: ${sermons.length}`);
    console.log(`🔴 Live streams: ${liveStreams.length}`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
    console.log(`🕐 Next update: ${new Date(Date.now() + 60 * 60 * 1000).toISOString()}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Create fallback CSV with error info
    const fallbackCSV = [
      'id,title,thumbnailUrl,publishedAt,type,source',
      'izfVnlQCi-U,"Error: Could not fetch videos - ' + error.message + '",https://img.youtube.com/vi/izfVnlQCi-U/mqdefault.jpg,' + new Date().toISOString() + ',sermon,fallback'
    ].join('\n');
    
    fs.writeFileSync(OUTPUT_FILE, fallbackCSV, 'utf8');
    process.exit(1);
  }
}

// Run the script
main();
