
import { useState, useEffect, useMemo } from 'react';
import { YouTubeVideo } from '@/types/sermon.types';
import { supabase } from '@/lib/supabaseClient';

export const useSermons = (channelId?: string) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [hasRealData, setHasRealData] = useState(false);
  const videosPerPage = 8;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        const requestBody = channelId ? { channelId } : {};
        console.log('Fetching videos from edge function', requestBody);
        
        // Call Supabase edge function to fetch videos
        const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
          body: requestBody
        });
        
        if (error) {
          console.error("Error calling edge function:", error);
          setError("Failed to load videos. Please try again later.");
          setHasRealData(false);
          setLoading(false);
          return;
        }
        
        console.log('Edge function response:', data);
        
        if (data.error) {
          console.error("Edge function returned error:", data.error);
          setError(data.error);
          setHasRealData(false);
          setLoading(false);
          return;
        }
        
        // Set live status
        setIsLive(data.isLive || false);
        setLiveVideoId(data.liveVideoId || null);
        
        // Set hasRealData flag
        setHasRealData(data.hasRealData || false);
        
        // Set videos
        if (data.videos && data.videos.length > 0) {
          console.log(`Received ${data.videos.length} videos from edge function`);
          setVideos(data.videos);
          
          // Set the most recent video as the selected video if not live
          if (!data.isLive) {
            setSelectedVideo(data.videos[0].id);
          } else if (data.liveVideoId) {
            setSelectedVideo(data.liveVideoId);
          }
        } else {
          console.log('No videos returned from edge function');
          setVideos([]);
        }
      } catch (err) {
        console.error("Error in useSermons hook:", err);
        setError("Failed to load videos. Please try again later.");
        setHasRealData(false);
      } finally {
        setLoading(false);
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
    handlePageChange,
    isLive,
    liveVideoId,
    hasRealData
  };
};
