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

        // Use RSS feed URL based on type
        const youtubeUrl = type === 'sermon' 
          ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
          : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        // Use a CORS proxy
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(corsProxy + encodeURIComponent(youtubeUrl));
        const xmlText = await response.text();
        
        // Parse XML text
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        // Get all video entries
        const entries = xmlDoc.getElementsByTagName("entry");
        
        const formattedVideos = Array.from(entries).map(entry => {
          const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent || '';
          const title = entry.getElementsByTagName("title")[0]?.textContent || '';
          const publishedAt = entry.getElementsByTagName("published")[0]?.textContent || '';
          
          // Extract thumbnail URL from media:group
          const mediaGroup = entry.getElementsByTagName("media:group")[0];
          const thumbnailUrl = mediaGroup?.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") || '';

          return {
            id: videoId,
            title: title,
            thumbnailUrl: thumbnailUrl,
            publishedAt: publishedAt,
          };
        });

        setVideos(formattedVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, PLAYLIST_ID, CHANNEL_ID]);

  return { videos, loading, error };
};
