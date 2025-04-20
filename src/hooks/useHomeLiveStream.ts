
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { YouTubeVideo } from '@/types/sermon.types';

export const useHomeLiveStream = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasRealData, setHasRealData] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchLiveOrLatest = async () => {
      try {
        setLoading(true);
        console.log('⚡ Home Live Stream: Fetching YouTube videos from edge function...');
        
        // Call Supabase edge function to fetch videos
        const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
          body: {}  // Using default channel from environment
        });
        
        console.log('⚡ Home Live Stream: Full edge function response:', { data, error });
        
        if (error) {
          console.error("⚡ Home Live Stream: Error calling edge function:", error);
          setError("Failed to load broadcast. Please try again later.");
          setHasRealData(false);
          return;
        }
        
        if (data.error) {
          console.error("⚡ Home Live Stream: Edge function returned error:", data.error);
          setError(data.error);
          setHasRealData(false);
          return;
        }

        // Set hasRealData flag
        setHasRealData(data.hasRealData || false);
        
        // Store all videos
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
        
        // If there's a live stream, show it
        if (data.isLive && data.liveVideoId) {
          console.log('⚡ Home Live Stream: Live stream found, showing live broadcast:', data.liveVideoId);
          setIsLive(true);
          setVideoId(data.liveVideoId);
        } 
        // Otherwise show the most recent video
        else if (data.videos && data.videos.length > 0) {
          console.log('⚡ Home Live Stream: No live stream, showing latest video:', data.videos[0].id);
          setIsLive(false);
          setVideoId(data.videos[0].id);
        } else {
          console.log('⚡ Home Live Stream: No videos available');
          setError("No videos available");
        }
      } catch (err) {
        console.error("⚡ Home Live Stream: Error in useHomeLiveStream hook:", err);
        setError("Failed to load broadcast. Please try again later.");
        setHasRealData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveOrLatest();
  }, []);

  return { videoId, isLive, loading, error, hasRealData, videos };
};

