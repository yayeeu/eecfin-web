
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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
  const { toast } = useToast();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
          body: {}
        });

        if (error || !data || data.error) {
          throw new Error(error?.message || data?.error || 'Failed to fetch videos');
        }

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        let filteredVideos = [];
        if (type === 'sermon') {
          filteredVideos = data.sermons;
        } else {
          filteredVideos = [...data.pastLives];
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

        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load videos. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No {type === 'sermon' ? 'sermons' : 'live streams'} found from the last 3 months.</p>
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
