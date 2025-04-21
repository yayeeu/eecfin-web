
import React, { useEffect, useState } from 'react';
import SermonHero from '@/components/sermons/SermonHero';
import LatestSermon from '@/components/sermons/LatestSermon';
import SermonLibrary from '@/components/sermons/SermonLibrary';
import { useSermons } from '@/hooks/useSermons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Youtube } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";

const Sermons = () => {
  const { toast } = useToast();

  const {
    videos,
    sermons,
    currentItems,
    itemsByDate,
    loading,
    error,
    selectedVideo,
    setSelectedVideo,
    currentPage,
    totalPages,
    handlePageChange,
    isLive,
    liveVideoId,
    hasRealData,
    activeTab,
    setActiveTab
  } = useSermons();

  // State to store playlist ID
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistLoading, setPlaylistLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        setPlaylistLoading(true);
        const { data, error } = await supabase.functions.invoke("get-sermon-playlist-id");
        if (error) {
          console.error("Error fetching playlist ID:", error);
          setPlaylistId(null);
          return;
        }
        
        if (data && data.playlistId) {
          setPlaylistId(data.playlistId);
        } else {
          setPlaylistId(null);
        }
      } catch (err) {
        console.error("Unexpected error fetching playlist ID:", err);
        setPlaylistId(null);
      } finally {
        setPlaylistLoading(false);
      }
    };
    
    fetchPlaylistId();
  }, []);

  useEffect(() => {
    if (isLive) {
      toast({
        title: "Live Broadcast",
        description: "EECFIN is currently streaming live. Join us now!",
        variant: "default",
        duration: 5000
      });
    }
  }, [isLive, toast]);

  const openVideoOnYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openSubscribePage = () => {
    window.open('https://www.youtube.com/@eecfin?sub_confirmation=1', '_blank');
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="animate-pulse text-eecfin-navy text-xl">Loading sermons...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SermonHero />

      <div className="container-custom py-12">
        <h1 className="page-title">Sermons</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            {/* Only show the video if we have real data */}
            {selectedVideo && hasRealData && (
              <LatestSermon videoId={selectedVideo} isLive={isLive} />
            )}

            {/* Fallback: show updated playlist embed instead */}
            {(!selectedVideo || !hasRealData) && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <h2 className="section-title mb-0">Sermon Library</h2>
                </div>
                <div className="w-full aspect-video">
                  {playlistLoading ? (
                    <div className="flex items-center justify-center bg-gray-100 w-full h-full rounded-lg min-h-[120px]">
                      <span className="animate-pulse text-eecfin-navy">Loading playlist...</span>
                    </div>
                  ) : playlistId ? (
                    <iframe
                      width="100%"
                      src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Sermons Playlist"
                      className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center bg-gray-100 w-full h-full rounded-lg min-h-[120px] text-eecfin-navy">
                      Playlist unavailable
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center text-gray-600 text-sm">
                  Browse all sermons in our YouTube playlist
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            <Card className="h-full bg-gradient-to-br from-eecfin-navy/95 to-eecfin-navy shadow-lg border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <MessageSquareText className="h-6 w-6 text-eecfin-gold mr-2" />
                  <CardTitle className="text-xl text-white">EECFIN Media</CardTitle>
                </div>
                <CardDescription className="text-gray-200">
                  Access our complete sermon library
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="text-gray-100 mb-6 flex-grow">
                  Stay connected with our church through our broadcasts, sermons, and special events. 
                  Watch our services live or catch up on past messages.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button 
                    className="flex-1 bg-eecfin-gold hover:bg-eecfin-gold/80 text-eecfin-navy"
                    onClick={openSubscribePage}
                  >
                    <Youtube className="mr-2 h-5 w-5" />
                    Visit Our YouTube Channel
                  </Button>
                  {hasRealData && (
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gray-400 text-white hover:bg-white/10"
                      onClick={() => window.scrollTo({ top: document.getElementById('sermon-library')?.offsetTop || 0, behavior: 'smooth' })}
                    >
                      Browse All Sermons
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {hasRealData && (
          <div id="sermon-library">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sermon' | 'broadcast')} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="sermon">Sermons</TabsTrigger>
                <TabsTrigger value="broadcast">Broadcasts</TabsTrigger>
              </TabsList>

              <TabsContent value="sermon">
                <SermonLibrary 
                  videos={sermons}
                  currentVideos={currentItems}
                  videosByDate={itemsByDate}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onVideoClick={videoId => {
                    setSelectedVideo(videoId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </TabsContent>

              <TabsContent value="broadcast">
                <SermonLibrary 
                  videos={videos}
                  currentVideos={currentItems}
                  videosByDate={itemsByDate}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onVideoClick={videoId => {
                    setSelectedVideo(videoId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sermons;
