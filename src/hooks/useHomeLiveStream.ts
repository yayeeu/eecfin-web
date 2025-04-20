
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

// For homepage: show live, fallback to past live broadcasts, fallback to generic if needed.
export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  
  // Mock video ID to use as ultimate fallback
  const FALLBACK_VIDEO_ID = "6KfL9DbrO4I"; // A stable video ID to use if all else fails

  const fetchLiveOrLatest = useCallback(async () => {
    try {
      setLoading(true);
      // Call Supabase edge function to fetch videos
      const { data, error: functionError } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {}  // Using default channel from environment
      });

      if (functionError) {
        console.error("Error calling edge function:", functionError);
        setError("Failed to load broadcast. Please try again later.");
        // Ultimate fallback - use hardcoded video ID
        setVideoId(FALLBACK_VIDEO_ID);
        setIsLive(false);
        setLoading(false);
        return;
      }

      console.log("Edge function response:", data);

      // If the data contains an error but we got a 200 response
      if (data.error) {
        console.warn("Edge function returned error:", data.error);
        setError(data.error);

        // If we have mock videos, we can still show them
        if (data.pastLives && data.pastLives.length > 0) {
          console.log('Using fallback: past live videos (mock mode)');
          setIsLive(false);
          setVideoId(data.pastLives[0].id);
          setError(null);
        } else if (data.videos && data.videos.length > 0) {
          console.log('No past live, using any available videos as fallback');
          setIsLive(false);
          setVideoId(data.videos[0].id);
          setError(null);
        } else {
          // Ultimate fallback - use hardcoded video ID
          console.log('Using hardcoded fallback video ID');
          setVideoId(FALLBACK_VIDEO_ID);
          setIsLive(false);
        }
        setLoading(false);
        return;
      }

      // Show current live if any
      if (data.isLive && data.liveVideoId) {
        console.log('Live stream found, showing live broadcast');
        setIsLive(true);
        setVideoId(data.liveVideoId);
        setError(null);
      }
      // Show most recent past live, if any (this now is correct fallback!)
      else if (data.pastLives && data.pastLives.length > 0) {
        console.log('No live, showing most recent past live broadcast:', data.pastLives[0].id);
        setIsLive(false);
        setVideoId(data.pastLives[0].id);
        setError(null);
      }
      // Fallback to any regular video if absolutely needed
      else if (data.videos && data.videos.length > 0) {
        console.log('No past live, showing latest uploaded video:', data.videos[0].id);
        setIsLive(false);
        setVideoId(data.videos[0].id);
        setError(null);
      } else {
        console.log('No videos available, using hardcoded fallback');
        setIsLive(false);
        setVideoId(FALLBACK_VIDEO_ID);
      }
    } catch (err) {
      console.error("Error in useHomeLiveStream hook:", err);
      setError("Failed to load broadcast. Please try again later.");
      // Ultimate fallback - use hardcoded video ID
      setVideoId(FALLBACK_VIDEO_ID);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveOrLatest();

    // Add a retry mechanism for errors
    const retryTimer = setTimeout(() => {
      if (error && retryCount < MAX_RETRIES) {
        console.log(`Retrying video fetch (attempt ${retryCount + 1} of ${MAX_RETRIES})`);
        setRetryCount(prev => prev + 1);
        fetchLiveOrLatest();
      }
    }, 5000); // Retry after 5 seconds
    
    return () => clearTimeout(retryTimer);
  }, [error, retryCount, fetchLiveOrLatest]);

  return { videoId, isLive, loading, error };
};
