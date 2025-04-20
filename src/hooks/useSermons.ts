
import { useState, useEffect, useMemo, useCallback } from 'react';
import { YouTubeVideo } from '@/types/sermon.types';
import { supabase } from '@/lib/supabaseClient';

export type VideoType = 'sermon' | 'broadcast';

export const useSermons = (channelId?: string) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [sermons, setSermons] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [hasRealData, setHasRealData] = useState(false);
  const [activeTab, setActiveTab] = useState<VideoType>('sermon');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const videosPerPage = 8;

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      
      const requestBody = channelId ? { channelId } : {};
      console.log('Fetching videos from edge function', requestBody);
      
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
      
      console.log("Edge function response:", data);
      
      if (data.error) {
        console.warn("Edge function returned error:", data.error);
        setError(data.error);
        
        if (data.videos && data.videos.length > 0) {
          console.log('Using mock videos as fallback');
          setVideos(data.videos);
          setHasRealData(false);
          setSelectedVideo(data.videos[0].id);
          setError(null);
        } else {
          setHasRealData(false);
        }
        
        setLoading(false);
        return;
      }
      
      setIsLive(data.isLive || false);
      setLiveVideoId(data.liveVideoId || null);
      setHasRealData(data.hasRealData || false);
      
      if (data.videos) {
        console.log(`Received ${data.videos.length} broadcasts from edge function`);
        setVideos(data.videos);
      }
      
      if (data.sermons) {
        console.log(`Received ${data.sermons.length} sermons from edge function`);
        setSermons(data.sermons);

        // Set sermons as selected video by default if available
        if (data.sermons.length > 0 && !data.isLive) {
          setSelectedVideo(data.sermons[0].id);
        }
      }
      
      setError(null);
      
      if (data.isLive) {
        setSelectedVideo(data.liveVideoId);
        setActiveTab('broadcast'); // Switch to broadcast tab if there's a live stream
      }
      
    } catch (err) {
      console.error("Error in useSermons hook:", err);
      setError("Failed to load videos. Please try again later.");
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  // Reset page when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    fetchVideos();
    
    const retryTimer = setTimeout(() => {
      if (error && retryCount < MAX_RETRIES) {
        console.log(`Retrying sermon videos fetch (attempt ${retryCount + 1} of ${MAX_RETRIES})`);
        setRetryCount(prev => prev + 1);
        fetchVideos();
      }
    }, 5000);
    
    return () => clearTimeout(retryTimer);
  }, [error, retryCount, fetchVideos]);

  // Get current videos based on active tab and pagination
  const currentItems = useMemo(() => {
    const items = activeTab === 'sermon' ? sermons : videos;
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    return items.slice(indexOfFirstVideo, indexOfLastVideo);
  }, [activeTab, videos, sermons, currentPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    const items = activeTab === 'sermon' ? sermons : videos;
    return Math.ceil(items.length / videosPerPage);
  }, [activeTab, videos, sermons]);

  // Group videos by month and year
  const itemsByDate = useMemo(() => {
    const items = activeTab === 'sermon' ? sermons : videos;
    return items.reduce((acc, video) => {
      const date = new Date(video.publishedAt);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      
      acc[monthYear].push(video);
      return acc;
    }, {} as Record<string, YouTubeVideo[]>);
  }, [activeTab, videos, sermons]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    videos,
    sermons,
    currentItems,
    itemsByDate,
    loading,
    error,
    selectedVideo,
    setSelectedVideo,
    currentPage,
    totalPages,
    handlePageChange,
    isLive,
    liveVideoId,
    hasRealData,
    activeTab,
    setActiveTab
  };
};
