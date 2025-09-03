import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionSlider from './MissionSlider';
import { useHomeLiveStream } from '@/hooks/useHomeLiveStream';
import { YouTubeEmbed } from '../YouTubeEmbed';

const MediaSection = () => {
  const { videoId, isLive, loading, channelId } = useHomeLiveStream();

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-eecfin-gold/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-eecfin-navy/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-eecfin-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* YouTube Video Section */}
          <div className="w-full">
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-eecfin-navy to-eecfin-navy/80 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {isLive ? (
                      <>
                        <div className="relative">
                          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                        </div>
                        <span className="font-bold">LIVE NOW</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 bg-eecfin-gold rounded-full"></div>
                        <span>Recent Live Stream</span>
                      </>
                    )}
                  </CardTitle>
                  {isLive && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                      LIVE
                    </div>
                  )}
                </div>
                <CardDescription className="text-white/90 text-base">
                  {isLive ? "Join our live service now!" : "Watch our most recent live stream"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <div className="relative w-full h-full">
                  {loading ? (
                    <div className="aspect-video flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eecfin-navy"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <YouTubeEmbed 
                        videoId={videoId} 
                        channelId={channelId}
                        className="w-full aspect-video"
                        autoplay={isLive}
                        isLive={isLive}
                      />
                      {isLive && (
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            LIVE
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement Section */}
          <div className="w-full">
            <Card className="h-full border-0 shadow-2xl bg-white/80 backdrop-blur-sm flex flex-col">
              <CardHeader className="bg-gradient-to-r from-eecfin-gold to-eecfin-accent text-eecfin-navy">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-4 h-4 bg-eecfin-navy rounded-full"></div>
                  Welcome
                </CardTitle>
                <CardDescription className="text-eecfin-navy/80 text-base">
                    Welcome to the Ethiopian Evangelical Church in Finland website!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <MissionSlider />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
