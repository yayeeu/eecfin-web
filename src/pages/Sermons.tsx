import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { MessageSquare, Video, ListVideo, Calendar, Info, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Button } from "@/components/ui/button";

const Sermons = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('sermons');
  const VIDEOS_PER_PAGE = 6;
  const PLAYLIST_ID = 'PL827hn5fOPy0ds95bHKNDLcXCWgOO_DuO';
  
  // Load data for both tabs but optimize UI feedback
  const { videos: sermons, loading: sermonsLoading, error: sermonsError } = useYouTubeVideos('sermon');
  const { videos: livestreams, loading: livestreamsLoading, error: livestreamsError } = useYouTubeVideos('live');

  // Set the most recent sermon as the default video when sermons are loaded
  useEffect(() => {
    if (sermons.length > 0 && !selectedVideoId) {
      setSelectedVideoId(sermons[0].id);
    }
  }, [sermons, selectedVideoId]);

  // Reset to first page when switching tabs and update active tab
  const handleTabChange = (tabValue: string) => {
    setCurrentPage(1);
    setActiveTab(tabValue);
  };

  const VideoGrid = ({ videos, loading, error, type }: { videos: any[], loading: boolean, error?: string | null, type: 'sermon' | 'live' }) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {/* Enhanced Loading Indicator */}
          <div className="flex items-center justify-center gap-3 p-6 bg-gray-50 rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-eecfin-navy" />
            <div className="text-center">
              <p className="text-lg font-medium text-eecfin-navy">
                Loading {type === 'sermon' ? 'Sermons & Teaching' : 'Live Streams'}...
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Fetching latest videos from YouTube
              </p>
            </div>
          </div>
          
          {/* Skeleton Cards */}
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
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-3">
              <Info className="h-5 w-5" />
              <span className="font-medium">Unable to load {type === 'sermon' ? 'sermons' : 'live streams'}</span>
            </div>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    // Calculate pagination
    const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    const currentVideos = videos.slice(startIndex, endIndex);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <Card 
              key={video.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-custom py-8 space-y-12">
      <div className="flex items-start gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] max-w-full">
          <Card className="overflow-hidden w-full">
            <div className="w-full">
              <YouTubeEmbed playlistId={PLAYLIST_ID} />
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-[40%] space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-eecfin-navy" />
            <h1 className="text-3xl font-bold text-eecfin-navy">EECFIN Sermons & Teaching</h1>
          </div>
          
          <h2 className="text-2xl font-semibold">Access our complete sermons & teaching library</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Stay connected with our church through our broadcasts, sermons, teachings, and special 
            events. Watch our services live or catch up on past messages.
          </p>

          <Alert className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Our service times: <strong>Sunday 16:00</strong> • Live streaming available
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
          </div>
        </div>
      </div>

      <div className="w-full">
        <Tabs defaultValue="sermons" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sermons" className="gap-2">
              <Video className="h-4 w-4" />
              Sermons & Teaching
              {sermonsLoading && <Loader2 className="h-3 w-3 animate-spin ml-1" />}
              {!sermonsLoading && sermons.length > 0 && (
                <span className="bg-eecfin-navy text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                  {sermons.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <ListVideo className="h-4 w-4" />
              Live Streams
              {livestreamsLoading && <Loader2 className="h-3 w-3 animate-spin ml-1" />}
              {!livestreamsLoading && livestreams.length > 0 && (
                <span className="bg-eecfin-navy text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                  {livestreams.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sermons" className="mt-0">
            <VideoGrid videos={sermons} loading={sermonsLoading} error={sermonsError} type="sermon" />
          </TabsContent>
          
          <TabsContent value="live" className="mt-0">
            <VideoGrid videos={livestreams} loading={livestreamsLoading} error={livestreamsError} type="live" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sermons;
