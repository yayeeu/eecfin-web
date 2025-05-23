
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionSlider from './MissionSlider';
import { useHomeLiveStream } from '@/hooks/useHomeLiveStream';
import { YouTubeEmbed } from '../YouTubeEmbed';
import LiveIndicator from './LiveIndicator';

const MediaSection = () => {
  const { videoId, isLive, loading, useChannelEmbed } = useHomeLiveStream();

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Video Section */}
          <div className="w-full h-full">
            <Card className="h-full flex flex-col">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Watch Now
                    <LiveIndicator isLive={isLive} size="sm" className="ml-2" />
                  </CardTitle>
                </div>
                <CardDescription>
                  {isLive ? "Join us live now!" : "Watch our latest service"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="w-full h-full flex-grow relative">
                  <YouTubeEmbed 
                    videoId={videoId} 
                    className="w-full h-full"
                    autoplay={isLive}
                    isLive={isLive}
                  />
                  {isLive && (
                    <div className="absolute top-2 left-2 z-10">
                      <LiveIndicator isLive={isLive} size="lg" />
                    </div>
                  )}
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
