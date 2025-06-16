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

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (type === 'sermon') {
          // Fetch sermons from playlist
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=10&key=${API_KEY}`
          );
          const data = await response.json();

          if (data.error) {
            throw new Error(data.error.message);
          }

          const formattedVideos = data.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
          }));

          setVideos(formattedVideos);
        } else {
          // Fetch livestreams from channel
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=completed&videoType=any&order=date&maxResults=10&key=${API_KEY}`
          );
          const data = await response.json();

          if (data.error) {
            throw new Error(data.error.message);
          }

          const formattedVideos = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
          }));

          setVideos(formattedVideos);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, API_KEY, CHANNEL_ID, PLAYLIST_ID]);

  return { videos, loading, error };
}; 