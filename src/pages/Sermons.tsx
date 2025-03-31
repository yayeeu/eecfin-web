
import React, { useEffect } from 'react';
import SermonHero from '@/components/sermons/SermonHero';
import LatestSermon from '@/components/sermons/LatestSermon';
import SermonLibrary from '@/components/sermons/SermonLibrary';
import { useSermons } from '@/hooks/useSermons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Youtube, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Sermons = () => {
  const { toast } = useToast();
  
  const { 
    currentVideos, 
    videosByDate, 
    loading, 
    error, 
    selectedVideo, 
    setSelectedVideo,
    currentPage, 
    totalPages, 
    handlePageChange,
    isLive,
    liveVideoId,
    hasRealData
  } = useSermons(); // No longer passing channel ID here

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
          {/* Featured Video - Using a smaller size */}
          <div className="md:w-1/2">
            {selectedVideo && (
              <LatestSermon videoId={selectedVideo} isLive={isLive} />
            )}
            {!selectedVideo && !hasRealData && (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg p-6">
                <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                <p className="text-center text-gray-600">
                  {error || "YouTube videos are not available at the moment. Please try again later."}
                </p>
              </div>
            )}
          </div>

          {/* EECFIN Media Section - Moved from home page */}
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

        {/* Video Library - Only show if we have real data */}
        {hasRealData && (
          <div id="sermon-library">
            <SermonLibrary 
              videos={[]} // Not used in component but keeping for type consistency
              currentVideos={currentVideos}
              videosByDate={videosByDate}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onVideoClick={openVideoOnYouTube}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sermons;
