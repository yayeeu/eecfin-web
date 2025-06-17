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

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  const fallbackToChannel = useCallback(() => {
    // Set videoId to null to trigger the channel embed
    setVideoId(null);
    setIsLive(false);
    setError(null);
  }, []);

  const checkLiveStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Only check for live broadcasts
      const liveResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
      );
      
      if (!liveResponse.ok) {
        // If we get a 403, it's likely an API quota issue or auth problem
        if (liveResponse.status === 403) {
          console.warn('YouTube API quota exceeded or authentication failed. Falling back to channel.');
          fallbackToChannel();
          return;
        }
        throw new Error(`YouTube API error: ${liveResponse.status} ${liveResponse.statusText}`);
      }

      const liveData = await liveResponse.json();

      // Check for API quota exceeded or other API errors
      if (liveData.error) {
        if (liveData.error.code === 403) {
          console.warn('YouTube API quota exceeded. Falling back to channel.');
          fallbackToChannel();
          return;
        }
        throw new Error(`YouTube API error: ${liveData.error.message}`);
      }

      if (liveData.items && liveData.items.length > 0) {
        // Live stream found
        const liveVideo = liveData.items[0];
        setVideoId(liveVideo.id.videoId);
        setIsLive(true);
        setError(null);
      } else {
        // No live stream, use channel
        fallbackToChannel();
      }
    } catch (err) {
      console.error('Error checking live status:', err);
      // If it's a 403 error in the catch block, handle it gracefully
      if (err instanceof Error && err.message.includes('403')) {
        console.warn('YouTube API quota exceeded. Falling back to channel.');
        fallbackToChannel();
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to check live status');
      // Fallback to channel on any error
      fallbackToChannel();
    } finally {
      setLoading(false);
    }
  }, [API_KEY, CHANNEL_ID, fallbackToChannel]);

  useEffect(() => {
    checkLiveStatus();
    
    // Set up periodic check for live streams (every 2 minutes)
    const interval = setInterval(() => {
      checkLiveStatus();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkLiveStatus]);

  return { videoId, isLive, loading, error, channelId: CHANNEL_ID };
};

export { useHomeLiveStream };
