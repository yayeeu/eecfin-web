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
  const [shouldRetry, setShouldRetry] = useState(true);
  const MAX_RETRIES = 1;
  const videosPerPage = 8;

  const filterLastNMonths = (items: YouTubeVideo[], months = 3) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return items.filter(v => {
      const pubDate = new Date(v.publishedAt);
      return pubDate >= cutoff;
    });
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const requestBody = channelId ? { channelId } : {};
      console.log('Fetching videos from edge function', requestBody);
      const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: requestBody
      });

      if (error || data?.error) {
        console.error("Error calling edge function:", error || data?.error);
        setError("Failed to load videos. Please try again later.");
        setHasRealData(false);
        setLoading(false);
        return;
      }

      setIsLive(data.isLive || false);
      setLiveVideoId(data.liveVideoId || null);
      setHasRealData(data.hasRealData || false);

      if (data.videos) {
        const filteredVideos = filterLastNMonths(data.videos);
        setVideos(filteredVideos);
      }

      if (data.sermons) {
        const filteredSermons = filterLastNMonths(data.sermons);
        setSermons(filteredSermons);

        if (filteredSermons.length > 0 && !data.isLive) {
          setSelectedVideo(filteredSermons[0].id);
        }
      }

      setError(null);

      if (data.isLive) {
        setSelectedVideo(data.liveVideoId);
        setActiveTab('broadcast');
      }
    } catch (err) {
      console.error("Error in useSermons hook:", err);
      setError("Failed to load videos. Please try again later.");
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const currentItems = useMemo(() => {
    const items = activeTab === 'sermon' ? sermons : videos;
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    return items.slice(indexOfFirstVideo, indexOfLastVideo);
  }, [activeTab, videos, sermons, currentPage]);

  const totalPages = useMemo(() => {
    const items = activeTab === 'sermon' ? sermons : videos;
    return Math.ceil(items.length / videosPerPage);
  }, [activeTab, videos, sermons]);

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
