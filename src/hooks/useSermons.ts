
import { useState, useEffect, useMemo } from 'react';
import { YouTubeVideo } from '@/types/sermon.types';

export const useSermons = (channelId: string) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Simulated data - in a real implementation, this would come from the YouTube API
        const mockVideos: YouTubeVideo[] = Array.from({ length: 20 }, (_, i) => ({
          id: `video-${i + 1}`,
          title: `Sunday Sermon ${i + 1}: The Power of Faith and Hope in Christ`,
          publishedAt: new Date(2023, 11 - (i % 12), 10 - (i % 7)).toISOString(),
          thumbnailUrl: `https://img.youtube.com/vi/video-${i + 1}/mqdefault.jpg`
        }));

        setVideos(mockVideos);
        
        // Set the most recent video as the selected video
        if (mockVideos.length > 0) {
          setSelectedVideo(mockVideos[0].id);
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos");
        setLoading(false);
        console.error("Error fetching YouTube videos:", err);
      }
    };

    fetchVideos();
  }, [channelId]);

  // Calculate pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Group videos by month and year for date-based navigation
  const videosByDate = useMemo(() => {
    return videos.reduce((acc, video) => {
      const date = new Date(video.publishedAt);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      
      acc[monthYear].push(video);
      return acc;
    }, {} as Record<string, YouTubeVideo[]>);
  }, [videos]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    videos,
    currentVideos,
    videosByDate,
    loading,
    error,
    selectedVideo,
    setSelectedVideo,
    currentPage,
    totalPages,
    handlePageChange
  };
};
