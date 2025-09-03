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
      let sermonVideoIds: string[] = [];
      
      try {
        setLoading(true);
        setError(null);

        if (!PLAYLIST_ID || !CHANNEL_ID) {
          throw new Error('YouTube playlist or channel ID not configured');
        }

        // For live streams: first get sermon playlist IDs to exclude them
        if (type === 'live') {
          console.log('Fetching sermon playlist to exclude those videos from live streams...');
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
                
                console.log(`Found ${sermonVideoIds.length} sermon videos to exclude from live streams`);
              }
            }
          } catch (sermonErr) {
            console.warn('Could not fetch sermon playlist for exclusion:', sermonErr);
          }
        }

        // Use YouTube's RSS feeds directly with CORS proxy
        const youtubeRssUrl = type === 'sermon' 
          ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
          : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        // Use CORS proxy to fetch YouTube RSS feed directly
        const corsProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(youtubeRssUrl)}`;
        
        const response = await fetch(corsProxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const proxyData = await response.json();
        
        if (!proxyData.contents) {
          throw new Error('No RSS content received from proxy');
        }
        
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
                'online service', 'virtual service', 'የእሁድ አገልግሎት'
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
      } catch (err) {
        // Try alternative CORS proxy as fallback
        try {
          const fallbackYoutubeRssUrl = type === 'sermon' 
            ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
            : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
          
          // Try different CORS proxy as fallback
          const fallbackCorsUrl = `https://corsproxy.io/?${encodeURIComponent(fallbackYoutubeRssUrl)}`;
          
          const alternativeResponse = await fetch(fallbackCorsUrl);
          
          if (alternativeResponse.ok) {
            const xmlText = await alternativeResponse.text();
            
            // Parse the XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            const parseError = xmlDoc.querySelector('parsererror');
            if (!parseError) {
              const fallbackEntries = Array.from(xmlDoc.querySelectorAll('entry'));
              
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
                  .filter((video: any) => {
                    if (!video.id || !video.title) return false;
                    
                    // Apply same filtering logic for live streams in fallback
                    if (type === 'live') {
                      // Exclude sermon playlist videos
                      if (sermonVideoIds.includes(video.id)) {
                        return false;
                      }
                      
                      // Only include live stream content
                      const title = video.title.toLowerCase();
                      const liveKeywords = [
                        'live', 'stream', 'streaming', 'broadcast', 'broadcasting',
                        'sunday service', 'worship service', 'church service',
                        'online service', 'virtual service', 'የእሁድ አገልግሎት'
                      ];
                      
                      return liveKeywords.some(keyword => title.includes(keyword));
                    }
                    
                    return true;
                  })
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
          // Fallback also failed, will use sample data
        }
        
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        
        // Only use sample data if both primary and fallback fail
        const fallbackVideos = [
          {
            id: 'dQw4w9WgXcQ',
            title: `Sample ${type === 'sermon' ? 'Sermon & Teaching' : 'Live Stream'} - Please check configuration`,
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
