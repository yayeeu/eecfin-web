import { useState, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  isLive?: boolean;
}

export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  const fetchLiveOrLatest = useCallback(async () => {
    try {
      setLoading(true);
      
      // First, check for live broadcasts
      const liveResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
      );
      const liveData = await liveResponse.json();

      if (liveData.items && liveData.items.length > 0) {
        // Live stream found
        const liveVideo = liveData.items[0];
        setVideoId(liveVideo.id.videoId);
        setIsLive(true);
        setLoading(false);
        return;
      }

      // If no live stream, fetch latest videos from channel
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=1&key=${API_KEY}`
      );
      const channelData = await channelResponse.json();

      if (channelData.items && channelData.items.length > 0) {
        // Latest video found
        const latestVideo = channelData.items[0];
        setVideoId(latestVideo.id.videoId);
        setIsLive(false);
      } else {
        // If no videos found, try to get the most recent stream
        const streamsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=completed&videoType=any&order=date&maxResults=1&key=${API_KEY}`
        );
        const streamsData = await streamsResponse.json();

        if (streamsData.items && streamsData.items.length > 0) {
          const latestStream = streamsData.items[0];
          setVideoId(latestStream.id.videoId);
          setIsLive(false);
        } else {
          // If still no content found, set to null
          setVideoId(null);
          setIsLive(false);
        }
      }
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setVideoId(null);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, CHANNEL_ID]);

  useEffect(() => {
    fetchLiveOrLatest();
    
    // Set up periodic check for live streams (every 2 minutes)
    const interval = setInterval(() => {
      fetchLiveOrLatest();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchLiveOrLatest]);

  return { videoId, isLive, loading };
};
