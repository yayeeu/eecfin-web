
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* YouTube Video Section */}
          <div className="w-full md:w-3/5">
            <Card className="h-full">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle>Watch Now</CardTitle>
                  <LiveIndicator isLive={isLive} />
                </div>
                <CardDescription>
                  {isLive ? "Join us live now!" : "Watch our latest service"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <YouTubeEmbed 
                  videoId={videoId} 
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Our Mission with language slider */}
          <div className="w-full md:w-2/5 flex flex-col">
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <h2 className="section-title mb-0">Our Mission</h2>
              </div>
              <div className="flex-1">
                <MissionSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
