
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Video {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  type: 'sermon' | 'live' | 'past_live';
}

interface VideoLibraryProps {
  type: 'sermon' | 'live';
}

export const VideoLibrary: React.FC<VideoLibraryProps> = ({ type }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const { toast } = useToast();

  const fetchVideos = async () => {
    try {
      setError(null);
      setLoading(true);
      console.log("Fetching videos from edge function...");
      
      const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {}
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || 'Failed to fetch videos');
      }

      if (!data || data.error) {
        console.error("Data error:", data?.error || "No data returned");
        throw new Error(data?.error || 'Failed to fetch videos');
      }

      console.log("Received video data:", data);

      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      let filteredVideos = [];
      if (type === 'sermon') {
        filteredVideos = data.sermons || [];
      } else {
        filteredVideos = [...(data.pastLives || [])];
        if (data.isLive) {
          filteredVideos.unshift({
            id: data.liveVideoId,
            title: 'Live Now',
            publishedAt: new Date().toISOString(),
            thumbnailUrl: `https://img.youtube.com/vi/${data.liveVideoId}/maxresdefault.jpg`,
            type: 'live'
          });
        }
      }

      // Filter for last 3 months
      filteredVideos = filteredVideos.filter(video => 
        new Date(video.publishedAt) >= threeMonthsAgo
      );

      console.log(`Filtered ${filteredVideos.length} videos for type ${type}`);
      setVideos(filteredVideos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load videos. Please try again later."
      });
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [type]);

  const handleRetry = () => {
    setRetrying(true);
    fetchVideos();
  };

  // Fallback content when API errors occur
  if (error) {
    return (
      <div className="text-center py-8 space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>YouTube API Error</AlertTitle>
          <AlertDescription className="ml-2">
            {error === 'API error: 403 Forbidden' 
              ? 'YouTube API access is currently unavailable due to API quota limits or authentication issues.' 
              : error}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            We're experiencing difficulties connecting to YouTube.
            {type === 'sermon' 
              ? ' In the meantime, you can visit our YouTube channel directly to watch sermons & teachings.' 
              : ' Please check our live streams directly on YouTube.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleRetry} 
              disabled={retrying}
              className="flex items-center gap-2"
            >
              {retrying ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.open('https://www.youtube.com/@eecfin', '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Visit YouTube Channel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-gray-500">Loading {type === 'sermon' ? 'sermons & teachings' : 'live streams'}...</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No {type === 'sermon' ? 'sermons & teachings' : 'live streams'} found from the last 3 months.</p>
        <Button 
          variant="link" 
          onClick={() => window.open('https://www.youtube.com/@eecfin', '_blank')}
          className="mt-4"
        >
          Browse all videos on YouTube
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <a 
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <div className="aspect-video relative">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {video.type === 'live' && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  LIVE
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium line-clamp-2 mb-2">{video.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </a>
        </Card>
      ))}
    </div>
  );
};
