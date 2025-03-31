
import React from 'react';
import { Button } from "@/components/ui/button";
import { Video, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../YouTubeEmbed';
import MissionSlider from './MissionSlider';

const MediaSection = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column: YouTube video */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center mb-4">
              <Video className="mr-2 h-6 w-6 text-red-600" />
              <h2 className="section-title mb-0">Live & Recent Broadcasts</h2>
            </div>
            
            {/* YouTube Embed */}
            <div className="h-full bg-white rounded-lg shadow-md overflow-hidden flex-1">
              <YouTubeEmbed 
                channelId="eecfin" 
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Right column: Our Mission with language slider */}
          <div className="w-full md:w-1/2 flex flex-col">
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
