
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveOrLatest = async () => {
      try {
        setLoading(true);
        
        // Call Supabase edge function to fetch videos
        const { data, error: functionError } = await supabase.functions.invoke('fetch-youtube-videos', {
          body: {}  // Using default channel from environment
        });
        
        if (functionError) {
          console.error("Error calling edge function:", functionError);
          setError("Failed to load broadcast. Please try again later.");
          setLoading(false);
          return;
        }
        
        console.log("Edge function response:", data);
        
        // If the data contains an error but we got a 200 response
        if (data.error) {
          console.warn("Edge function returned error:", data.error);
          setError(data.error);
          setLoading(false);
          return;
        }
        
        // If there's a live stream, show it
        if (data.isLive && data.liveVideoId) {
          console.log('Live stream found, showing live broadcast');
          setIsLive(true);
          setVideoId(data.liveVideoId);
        } 
        // Otherwise show the most recent video
        else if (data.videos && data.videos.length > 0) {
          console.log('No live stream, showing latest video:', data.videos[0].id);
          setIsLive(false);
          setVideoId(data.videos[0].id);
        } else {
          console.log('No videos available');
          setError("No videos available");
        }
      } catch (err) {
        console.error("Error in useHomeLiveStream hook:", err);
        setError("Failed to load broadcast. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveOrLatest();
    
    // Add a retry mechanism if there's an error
    const retryTimer = setTimeout(() => {
      if (error) {
        console.log("Retrying video fetch due to previous error");
        fetchLiveOrLatest();
      }
    }, 5000); // Retry after 5 seconds if there was an error
    
    return () => clearTimeout(retryTimer);
  }, [error]);

  return { videoId, isLive, loading, error };
};
