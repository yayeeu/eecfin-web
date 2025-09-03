import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration?: string;
}

export const useYouTubeVideos = (type: 'sermon' | 'live') => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the confirmed sermon playlist ID
  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID || 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!PLAYLIST_ID || !CHANNEL_ID) {
          throw new Error('YouTube playlist or channel ID not configured');
        }

        // Use YouTube's RSS feeds directly with CORS proxy
        const youtubeRssUrl = type === 'sermon' 
          ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
          : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        console.log(`Fetching ${type} videos using DIRECT YouTube RSS approach`);
        console.log(`YouTube RSS URL: ${youtubeRssUrl}`);
        console.log(`Playlist ID being used: ${PLAYLIST_ID}`);

        // Use CORS proxy to fetch YouTube RSS feed directly
        const corsProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(youtubeRssUrl)}`;
        
        console.log(`Fetching ${type} videos via CORS proxy:`, corsProxyUrl);
        
        const response = await fetch(corsProxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const proxyData = await response.json();
        
        if (!proxyData.contents) {
          throw new Error('No RSS content received from proxy');
        }

        console.log(`Successfully fetched YouTube RSS XML for ${type}`);
        
        // Parse the XML directly
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(proxyData.contents, 'text/xml');
        
        // Check for XML parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          throw new Error('Failed to parse YouTube RSS XML');
        }

        // Extract video data from XML
        const entries = Array.from(xmlDoc.querySelectorAll('entry'));
        console.log(`Found ${entries.length} video entries in YouTube RSS`);

        if (entries.length === 0) {
          console.warn(`No video entries found in YouTube RSS for ${type}`);
          throw new Error('No videos found in YouTube RSS feed');
        }

        // Log sample of what we're parsing
        console.log(`Sample YouTube RSS entries:`, entries.slice(0, 3).map(entry => ({
          title: entry.querySelector('title')?.textContent || '',
          published: entry.querySelector('published')?.textContent || '',
          videoId: entry.querySelector('videoId')?.textContent || ''
        })));

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
          .filter((video: any) => video.id && video.title)
          .sort((a: any, b: any) => {
            // Sort by most recent first
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          });

        console.log(`Successfully formatted ${formattedVideos.length} ${type} videos`);
        console.log(`Final ${type} videos with dates:`, formattedVideos.map(v => ({
          title: v.title.substring(0, 50) + '...',
          publishedAt: v.publishedAt,
          parsedDate: new Date(v.publishedAt).toISOString().split('T')[0], // YYYY-MM-DD format
          id: v.id
        })));

        // Check if we have exactly 5 videos (the problem number)
        if (formattedVideos.length === 5) {
          console.warn(`⚠️ Got exactly 5 ${type} videos - this might indicate a limitation!`);
          console.log('Date range:', {
            oldest: formattedVideos[formattedVideos.length - 1]?.publishedAt,
            newest: formattedVideos[0]?.publishedAt
          });
        }

        setVideos(formattedVideos);
      } catch (err) {
        console.error(`Error fetching ${type} videos:`, err);
        
        // Try alternative CORS proxy as fallback
        try {
          console.log(`Trying alternative CORS proxy for ${type}...`);
          
          const fallbackYoutubeRssUrl = type === 'sermon' 
            ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
            : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
          
          // Try different CORS proxy as fallback
          const fallbackCorsUrl = `https://corsproxy.io/?${encodeURIComponent(fallbackYoutubeRssUrl)}`;
          console.log(`Fallback CORS proxy URL: ${fallbackCorsUrl}`);
          
          const alternativeResponse = await fetch(fallbackCorsUrl);
          
          if (alternativeResponse.ok) {
            const xmlText = await alternativeResponse.text();
            
            // Parse the XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            const parseError = xmlDoc.querySelector('parsererror');
            if (!parseError) {
              const fallbackEntries = Array.from(xmlDoc.querySelectorAll('entry'));
              console.log(`Fallback: Found ${fallbackEntries.length} video entries`);
              
              if (fallbackEntries.length > 0) {
                const fallbackVideos = fallbackEntries
                  .map((entry) => {
                    const videoId = entry.querySelector('videoId')?.textContent || 
                                   entry.querySelector('id')?.textContent?.split(':').pop() || '';
                    const title = entry.querySelector('title')?.textContent || '';
                    const published = entry.querySelector('published')?.textContent || '';
                    const thumbnail = entry.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url') || 
                                     `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                    
                    return {
                      id: videoId,
                      title: title,
                      thumbnailUrl: thumbnail,
                      publishedAt: published,
                    };
                  })
                  .filter((video: any) => video.id && video.title)
                  .sort((a: any, b: any) => {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                  });
                
                setVideos(fallbackVideos);
                setError(null); // Clear error since fallback worked
                return;
              }
            }
          }
        } catch (fallbackErr) {
          console.error('Alternative CORS proxy also failed:', fallbackErr);
        }
        
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        
        // Only use sample data if both primary and fallback fail
        const fallbackVideos = [
          {
            id: 'dQw4w9WgXcQ',
            title: `Sample ${type === 'sermon' ? 'Sermon' : 'Live Stream'} - Please check configuration`,
            thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
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
