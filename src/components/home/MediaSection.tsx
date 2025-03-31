
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
          {/* Left column: YouTube video and Media box */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center mb-4">
              <Video className="mr-2 h-6 w-6 text-red-600" />
              <h2 className="section-title mb-0">Live & Recent Broadcasts</h2>
            </div>
            
            {/* YouTube Embed */}
            <div className="flex-grow">
              <YouTubeEmbed 
                channelId="eecfin" 
                className="aspect-video w-full rounded-lg shadow-md overflow-hidden"
              />
            </div>
            
            {/* EECFIN Media Box (moved below video) */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-semibold mb-4 text-eecfin-navy">EECFIN Media</h3>
              <p className="text-gray-700 mb-4">
                Stay connected with our church through our broadcasts, sermons, and special events. 
                Watch our services live or catch up on past messages.
              </p>
              <Button asChild className="w-full bg-eecfin-navy hover:bg-eecfin-navy/80">
                <a href="https://www.youtube.com/@eecfin" target="_blank" rel="noopener noreferrer">
                  Visit Our YouTube Channel
                </a>
              </Button>
            </div>
          </div>
          
          {/* Right column: Our Mission with language slider */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <h2 className="section-title mb-0">Our Mission</h2>
              </div>
              <div className="flex-grow">
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
