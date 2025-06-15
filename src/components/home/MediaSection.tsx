
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionSlider from './MissionSlider';
import { useHomeLiveStream } from '@/hooks/useHomeLiveStream';
import { YouTubeEmbed } from '../YouTubeEmbed';
import LiveIndicator from './LiveIndicator';

const MediaSection = () => {
  const { videoId, isLive, loading, fallbackUsed, useChannelEmbed } = useHomeLiveStream();

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Video Section */}
          <div className="w-full h-full">
            <Card className="h-full flex flex-col overflow-hidden">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {isLive ? (
                      <>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        LIVE NOW
                      </>
                    ) : (
                      "Watch Now"
                    )}
                  </CardTitle>
                  {isLive && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>
                <CardDescription>
                  {isLive ? "Join us live now!" : "Watch our latest service"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-6">
                <div className="w-full h-full flex-grow relative">
                  {/* Modern rounded video container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                    {loading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                      </div>
                    ) : (
                      <>
                        <YouTubeEmbed 
                          videoId={videoId} 
                          className="w-full h-full rounded-2xl"
                          autoplay={isLive}
                          isLive={isLive}
                        />
                        {isLive && (
                          <div className="absolute top-4 left-4 z-20">
                            <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                              </span>
                              LIVE
                            </div>
                          </div>
                        )}
                        {/* Gradient overlay for modern look */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Mission with language slider */}
          <div className="w-full h-full">
            <Card className="h-full">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle>Our Mission</CardTitle>
                </div>
                <CardDescription>
                  Learn about our church's core mission
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-full">
                  <MissionSlider />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
