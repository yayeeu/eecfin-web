
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

// For homepage: show live, fallback to past live broadcasts, fallback to static fallback video.
export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [useChannelEmbed, setUseChannelEmbed] = useState(false);

  // This fallback video never changes and does not use quota
  const FALLBACK_VIDEO_ID = "6KfL9DbrO4I"; // Static fallback if needed

  const fetchLiveOrLatest = useCallback(async () => {
    try {
      setLoading(true);
      setFallbackUsed(false);
      setUseChannelEmbed(false);
      // Call Supabase edge function to fetch videos
      const { data, error: functionError } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {}  // Using default channel from environment
      });

      if (functionError || !data) {
        // Use channel embed (user uploads) instead of specific fallback video
        setVideoId(null);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(true);
        setLoading(false);
        return;
      }

      // If the data contains an error but we got a 200 response
      if (data.error) {
        // Use channel embed fallback with no error set for UI
        setVideoId(null);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(true);
        setLoading(false);
        return;
      }

      // Show current live if any
      if (data.isLive && data.liveVideoId) {
        setIsLive(true);
        setVideoId(data.liveVideoId);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      }
      // Show most recent past live, if any
      else if (data.pastLives && data.pastLives.length > 0) {
        setIsLive(false);
        setVideoId(data.pastLives[0].id);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      }
      // Fallback to any regular video if absolutely needed
      else if (data.videos && data.videos.length > 0) {
        setIsLive(false);
        setVideoId(data.videos[0].id);
        setFallbackUsed(false);
        setUseChannelEmbed(false);
      } else {
        // Use channel embed fallback
        setVideoId(null);
        setIsLive(false);
        setFallbackUsed(true);
        setUseChannelEmbed(true);
      }
    } catch (err) {
      // Always use channel embed fallback if any error
      setVideoId(null);
      setIsLive(false);
      setFallbackUsed(true);
      setUseChannelEmbed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveOrLatest();
    // No retry logic needed since fallback always works
  }, [fetchLiveOrLatest]);

  // Never expose error for homepage—UI should always work
  return { videoId, isLive, loading, fallbackUsed, useChannelEmbed };
};
