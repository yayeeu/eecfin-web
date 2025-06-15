
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [useChannelEmbed, setUseChannelEmbed] = useState(false);

  // Known fallback video ID for EECFIN
  const FALLBACK_VIDEO_ID = "6KfL9DbrO4I";

  const fetchLiveOrLatest = useCallback(async () => {
    try {
      setLoading(true);
      setFallbackUsed(false);
      setUseChannelEmbed(false);
      
      console.log('Attempting to fetch YouTube videos...');
      
      // Call Supabase edge function to fetch videos
      const { data, error: functionError } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {}
      });

      console.log('YouTube API response:', { data, functionError });

      if (functionError || !data) {
        console.log('Function error or no data, using fallback video');
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(false);
        setLoading(false);
        return;
      }

      // If the data contains an error
      if (data.error) {
        console.log('API error detected:', data.error, 'using fallback video');
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(false);
        setLoading(false);
        return;
      }

      // Priority 1: Show current live stream if available
      if (data.isLive && data.liveVideoId) {
        console.log('Live stream detected:', data.liveVideoId);
        setIsLive(true);
        setVideoId(data.liveVideoId);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      }
      // Priority 2: Show most recent past live broadcast
      else if (data.pastLives && data.pastLives.length > 0) {
        console.log('Using most recent past live:', data.pastLives[0].id);
        setIsLive(false);
        setVideoId(data.pastLives[0].id);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      }
      // Priority 3: Show most recent regular video
      else if (data.videos && data.videos.length > 0) {
        console.log('Using most recent video:', data.videos[0].id);
        setIsLive(false);
        setVideoId(data.videos[0].id);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      } 
      // Priority 4: Show sermon if available
      else if (data.sermons && data.sermons.length > 0) {
        console.log('Using most recent sermon:', data.sermons[0].id);
        setIsLive(false);
        setVideoId(data.sermons[0].id);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      }
      // Fallback: Use known good video
      else {
        console.log('No videos found, using static fallback');
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(false);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      // Always use fallback video if any error occurs
      setVideoId(FALLBACK_VIDEO_ID);
      setIsLive(false);
      setFallbackUsed(true);
      setUseChannelEmbed(false);
    } finally {
      setLoading(false);
    }
  }, [FALLBACK_VIDEO_ID]);

  useEffect(() => {
    fetchLiveOrLatest();
    
    // Set up periodic check for live streams (every 2 minutes)
    const interval = setInterval(() => {
      fetchLiveOrLatest();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchLiveOrLatest]);

  return { videoId, isLive, loading, fallbackUsed, useChannelEmbed };
};
