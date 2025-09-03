import { useState, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  isLive?: boolean;
}

const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID || 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  const fallbackToChannel = useCallback(() => {
    // Set videoId to null to trigger the channel embed
    setVideoId(null);
    setIsLive(false);
    setError(null);
  }, []);

  const checkLiveStatus = useCallback(async () => {
    let sermonVideoIds: string[] = [];
    
    try {
      setLoading(true);
      setError(null);
      
      if (!CHANNEL_ID) {
        throw new Error('YouTube channel ID not configured');
      }

      // First, get sermon playlist IDs to exclude them from live streams
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

      // Get channel RSS feed
      const channelRssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
      const corsProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(channelRssUrl)}`;
      
      const response = await fetch(corsProxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const proxyData = await response.json();
      
      if (!proxyData.contents) {
        throw new Error('No RSS content received from proxy');
      }

      // Parse the XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(proxyData.contents, 'text/xml');
      
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Failed to parse YouTube RSS XML');
      }

      const entries = Array.from(xmlDoc.querySelectorAll('entry'));

      if (entries.length === 0) {
        fallbackToChannel();
        return;
      }

      // Process all videos and separate them
      const allVideos = entries
        .map((entry) => {
          const videoId = entry.querySelector('videoId')?.textContent || 
                         entry.querySelector('id')?.textContent?.split(':').pop() || '';
          const title = entry.querySelector('title')?.textContent || '';
          const published = entry.querySelector('published')?.textContent || '';
          
          return {
            id: videoId,
            title: title,
            publishedAt: published,
          };
        })
        .filter((video) => video.id && video.title)
        .sort((a, b) => {
          // Sort by most recent first
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

      // Step 1: Filter out sermon playlist videos
      const nonSermonVideos = allVideos.filter((video) => {
        return !sermonVideoIds.includes(video.id);
      });

      // Step 2: Try to find actual live streams using keywords
      const liveKeywords = [
        'live', 'stream', 'streaming', 'broadcast', 'broadcasting',
        'sunday service', 'worship service', 'church service',
        'online service', 'virtual service', 'የእሁድ አገልግሎት'
      ];

      const liveStreams = nonSermonVideos.filter((video) => {
        const title = video.title.toLowerCase();
        return liveKeywords.some(keyword => title.includes(keyword));
      });

      // Decision logic with fallbacks
      if (liveStreams.length > 0) {
        // Best case: Show the most recent actual live stream
        const mostRecentLiveStream = liveStreams[0];
        setVideoId(mostRecentLiveStream.id);
        setIsLive(false);
        setError(null);
      } else if (nonSermonVideos.length > 0) {
        // Fallback: Show most recent non-sermon video
        const mostRecentNonSermon = nonSermonVideos[0];
        setVideoId(mostRecentNonSermon.id);
        setIsLive(false);
        setError(null);
      } else {
        // Last resort: fallback to channel
        fallbackToChannel();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check live status');
      fallbackToChannel();
    } finally {
      setLoading(false);
    }
  }, [PLAYLIST_ID, CHANNEL_ID, fallbackToChannel]);

  useEffect(() => {
    checkLiveStatus();
    
    // Set up periodic check for live streams (every 5 minutes for home page)
    const interval = setInterval(() => {
      checkLiveStatus();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkLiveStatus]);

  return { videoId, isLive, loading, error, channelId: CHANNEL_ID };
};

export { useHomeLiveStream };
