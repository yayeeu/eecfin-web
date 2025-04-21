
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

// For homepage: show live, fallback to past live broadcasts, fallback to static fallback video.
export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  // This fallback video never changes and does not use quota
  const FALLBACK_VIDEO_ID = "6KfL9DbrO4I"; // You can set to whatever static "safe" video

  const fetchLiveOrLatest = useCallback(async () => {
    try {
      setLoading(true);
      setFallbackUsed(false);
      // Call Supabase edge function to fetch videos
      const { data, error: functionError } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {}  // Using default channel from environment
      });

      if (functionError || !data) {
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
        setLoading(false);
        return;
      }

      // If the data contains an error but we got a 200 response
      if (data.error) {
        // Use fallback immediately with no error set for UI
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
        setLoading(false);
        return;
      }

      // Show current live if any
      if (data.isLive && data.liveVideoId) {
        setIsLive(true);
        setVideoId(data.liveVideoId);
        setFallbackUsed(false);
      }
      // Show most recent past live, if any
      else if (data.pastLives && data.pastLives.length > 0) {
        setIsLive(false);
        setVideoId(data.pastLives[0].id);
        setFallbackUsed(false);
      }
      // Fallback to any regular video if absolutely needed
      else if (data.videos && data.videos.length > 0) {
        setIsLive(false);
        setVideoId(data.videos[0].id);
        setFallbackUsed(false);
      } else {
        // Static fallback
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setFallbackUsed(true);
      }
    } catch (err) {
      // Always use static iframe fallback if any error
      setVideoId(FALLBACK_VIDEO_ID);
      setIsLive(false);
      setFallbackUsed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveOrLatest();
    // No retry logic needed since fallback always works
  }, [fetchLiveOrLatest]);

  // Never expose error for homepage—UI should always work
  return { videoId, isLive, loading, fallbackUsed };
};
