import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { MessageSquare, Video, ListVideo, Calendar, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';

const Sermons = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
  const { videos: sermons, loading: sermonsLoading } = useYouTubeVideos('sermon');
  const { videos: livestreams, loading: livestreamsLoading } = useYouTubeVideos('live');

  // Set the most recent sermon as the default video when sermons are loaded
  useEffect(() => {
    if (sermons.length > 0 && !selectedVideoId) {
      setSelectedVideoId(sermons[0].id);
    }
  }, [sermons, selectedVideoId]);

  const VideoGrid = ({ videos, loading }: { videos: any[], loading: boolean }) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card 
            key={video.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedVideoId(video.id)}
          >
            <div className="aspect-video relative">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container-custom py-8 space-y-12">
      <div className="flex items-start gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] max-w-full">
          <Card className="overflow-hidden w-full">
            <div className="w-full">
              {selectedVideoId ? (
                <YouTubeEmbed videoId={selectedVideoId} />
              ) : (
                <YouTubeEmbed playlistId={PLAYLIST_ID} />
              )}
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-[40%] space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-eecfin-navy" />
            <h1 className="text-3xl font-bold text-eecfin-navy">EECFIN Media</h1>
          </div>
          
          <h2 className="text-2xl font-semibold">Access our complete sermon library</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Stay connected with our church through our broadcasts, sermons, and special 
            events. Watch our services live or catch up on past messages.
          </p>

          <Alert className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Our service times: <strong>Sunday 10:00 AM</strong> • Live streaming available
            </AlertDescription>
          </Alert>

          <a 
            href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eecfin-navy text-white rounded-lg hover:bg-eecfin-navy/90 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
            </svg>
            Visit Our YouTube Channel
          </a>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>New sermons uploaded every Tuesday</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Tabs defaultValue="sermons">
          <TabsList className="mb-4">
            <TabsTrigger value="sermons" className="gap-2">
              <Video className="h-4 w-4" />
              Sermons
            </TabsTrigger>
            <TabsTrigger value="livestreams" className="gap-2">
              <ListVideo className="h-4 w-4" />
              Live Streams
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sermons" className="mt-0">
            <VideoGrid videos={sermons} loading={sermonsLoading} />
          </TabsContent>
          
          <TabsContent value="livestreams" className="mt-0">
            <VideoGrid videos={livestreams} loading={livestreamsLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sermons;
