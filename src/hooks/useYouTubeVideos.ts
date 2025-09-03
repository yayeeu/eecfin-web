import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration?: string;
}

// Simple cache to avoid refetching same data
const videoCache = new Map<string, { videos: YouTubeVideo[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useYouTubeVideos = (type: 'sermon' | 'live') => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the confirmed sermon playlist ID - force the correct one
  const PLAYLIST_ID = 'PL827hn5fOPy0ds95bHKNDLcXCWgOO_DuO';
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '3DPL827hn5fOPy0ds95bHKNDLcXCWgOO_DuO';

  useEffect(() => {
    const fetchVideos = async () => {
      // Check cache first
      const cacheKey = `${type}-${PLAYLIST_ID}-${CHANNEL_ID}`;
      const cached = videoCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`📦 Using cached ${type} videos`);
        setVideos(cached.videos);
        setLoading(false);
        setError(null);
        return;
      }
      
      let sermonVideoIds: string[] = [];
      
      try {
        setLoading(true);
        setError(null);

        if (!PLAYLIST_ID) {
          throw new Error('YouTube playlist ID not configured');
        }
        
        if (type === 'live' && !CHANNEL_ID) {
          throw new Error('YouTube channel ID not configured for live streams');
        }

        // For live streams: first get sermon playlist IDs to exclude them
        if (type === 'live') {
          try {
            const sermonRssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
            const sermonCorsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(sermonRssUrl)}`;
            
            const sermonResponse = await fetch(sermonCorsUrl);
            if (sermonResponse.ok) {
              const sermonProxyData = await sermonResponse.json();
              if (sermonProxyData.contents) {
                const sermonParser = new DOMParser();
                const sermonXmlDoc = sermonParser.parseFromString(sermonProxyData.contents, 'text/xml');
                const sermonEntries = Array.from(sermonXmlDoc.querySelectorAll('entry'));
                
                sermonVideoIds = sermonEntries.map(entry => 
                  entry.querySelector('videoId')?.textContent || 
                  entry.querySelector('id')?.textContent?.split(':').pop() || ''
                ).filter(id => id);
              }
            }
          } catch (sermonErr) {
            // Silently continue if sermon playlist fetch fails
          }
        }

        // Use YouTube's RSS feeds directly with CORS proxy
        const youtubeRssUrl = type === 'sermon' 
          ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
          : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        // Try multiple CORS proxy services
        const corsProxyUrls = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(youtubeRssUrl)}`,
          `https://jsonp.afeld.me/?url=${encodeURIComponent(youtubeRssUrl)}`,
          `https://cors-anywhere.herokuapp.com/${youtubeRssUrl}`,
          `https://thingproxy.freeboard.io/fetch/${youtubeRssUrl}`
        ];
        
        console.log(`Fetching ${type} videos from:`, youtubeRssUrl);
        
        let proxyData = null;
        let lastError = null;
        
        for (const corsProxyUrl of corsProxyUrls) {
          try {
            console.log(`Trying CORS proxy: ${corsProxyUrl}`);
            const response = await fetch(corsProxyUrl);
            
            if (!response.ok) {
              lastError = new Error(`HTTP error! status: ${response.status} for ${corsProxyUrl}`);
              console.warn(`CORS proxy failed:`, lastError.message);
              continue;
            }
            
            if (corsProxyUrl.includes('allorigins')) {
              const data = await response.json();
              if (data.contents) {
                console.log(`✅ Success with allorigins proxy`);
                proxyData = { contents: data.contents };
                break;
              }
            } else {
              const xmlText = await response.text();
              if (xmlText && xmlText.includes('<?xml')) {
                console.log(`✅ Success with proxy: ${corsProxyUrl}`);
                proxyData = { contents: xmlText };
                break;
              }
            }
          } catch (err) {
            lastError = err;
            console.warn(`CORS proxy error:`, err);
            continue;
          }
        }
        
        if (!proxyData?.contents) {
          throw lastError || new Error('All CORS proxy services failed');
        }
        
        // Parse the XML directly
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(proxyData.contents, 'text/xml');
        
        // Check for XML parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          console.error('XML parsing error:', parseError.textContent);
          console.error('Raw XML content:', proxyData.contents.substring(0, 500));
          throw new Error('Failed to parse YouTube RSS XML');
        }
        
        console.log('✅ XML parsed successfully');

        // Extract video data from XML
        const entries = Array.from(xmlDoc.querySelectorAll('entry'));

        if (entries.length === 0) {
          throw new Error('No videos found in YouTube RSS feed');
        }

        const formattedVideos = entries
          .map((entry) => {
            // Extract video data from YouTube RSS XML
            const videoId = entry.querySelector('videoId')?.textContent || 
                           entry.querySelector('id')?.textContent?.split(':').pop() || '';
            const title = entry.querySelector('title')?.textContent || '';
            const published = entry.querySelector('published')?.textContent || '';
            
            // Get thumbnail from media:thumbnail or generate from video ID
            const thumbnail = entry.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url') || 
                             `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
            
            return {
              id: videoId,
              title: title,
              thumbnailUrl: thumbnail,
              publishedAt: published,
            };
          })
          .filter((video: any) => {
            if (!video.id || !video.title) return false;
            
            // Filter logic for live streams
            if (type === 'live') {
              // Exclude videos that are in the sermon playlist
              if (sermonVideoIds.includes(video.id)) {
                return false;
              }
              
              // Only include videos that appear to be live streams
              const title = video.title.toLowerCase();
              const liveKeywords = [
                'live', 'stream', 'streaming', 'broadcast', 'broadcasting',
                'sunday service', 'worship service', 'church service',
                'online service', 'virtual service', 'Focus on Jesus','የእሁድ አገልግሎት'
              ];
              
              return liveKeywords.some(keyword => title.includes(keyword));
            }
            
            // For sermons, accept all (already filtered by playlist)
            return true;
          })
          .sort((a: any, b: any) => {
            // Sort by most recent first
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          });

        setVideos(formattedVideos);
        
        // Cache the results
        videoCache.set(cacheKey, {
          videos: formattedVideos,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error('Failed to fetch videos with all CORS proxies:', err);
        
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        
        // Only use sample data if both primary and fallback fail
        const fallbackVideos = [
          {
            id: 'izfVnlQCi-U',
            title: `Sample ${type === 'sermon' ? 'Sermon & Teaching' : 'Live Stream'} - Please check configuration`,
            thumbnailUrl: 'https://img.youtube.com/vi/izfVnlQCi-U/mqdefault.jpg',
            publishedAt: new Date().toISOString(),
          },
        ];
        
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, PLAYLIST_ID, CHANNEL_ID]);

  return { videos, loading, error };
};
