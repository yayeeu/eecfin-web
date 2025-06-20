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

  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!PLAYLIST_ID || !CHANNEL_ID) {
          throw new Error('YouTube playlist or channel ID not configured');
        }

        // Use a different approach - fetch RSS via JSONP or use a public RSS reader
        const rssUrl = type === 'sermon' 
          ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
          : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        // Use RSS2JSON service which handles CORS
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(rss2jsonUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok') {
          throw new Error(data.message || 'Failed to fetch RSS feed');
        }

        const formattedVideos = data.items.map((item: any) => ({
          id: item.link.split('v=')[1] || item.guid,
          title: item.title,
          thumbnailUrl: item.thumbnail || `https://img.youtube.com/vi/${item.link.split('v=')[1]}/mqdefault.jpg`,
          publishedAt: item.pubDate,
        })).filter((video: any) => video.id && video.title);

        setVideos(formattedVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        
        // Fallback to sample data for development
        const fallbackVideos = [
          {
            id: 'dQw4w9WgXcQ',
            title: 'Sample Sermon - Faith and Community',
            thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            publishedAt: new Date().toISOString(),
          },
          {
            id: '9bZkp7q19f0',
            title: 'Sample Live Stream - Sunday Service',
            thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
          }
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
