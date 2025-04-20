
import React from 'react';
import { Button } from "@/components/ui/button";
import { Video, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../YouTubeEmbed';
import MissionSlider from './MissionSlider';
import { useHomeLiveStream } from '@/hooks/useHomeLiveStream';
import LiveIndicator from './LiveIndicator';

const MediaSection = () => {
  const { videoId, isLive, loading, error } = useHomeLiveStream();

  console.log("MediaSection rendering with:", { videoId, isLive, loading, error });

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column: YouTube video */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center mb-4">
              <Video className="mr-2 h-6 w-6 text-red-600" />
              <h2 className="section-title mb-0 mr-2">YouTube Broadcasts</h2>
              <LiveIndicator isLive={isLive} />
            </div>
            
            {/* YouTube Embed */}
            <div className="h-full bg-white rounded-lg shadow-md overflow-hidden flex-1 relative">
              {loading ? (
                <div className="flex items-center justify-center h-full p-6">
                  <div className="animate-pulse text-eecfin-navy">Loading broadcast...</div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <p className="text-center text-gray-600 mb-4">{error}</p>
                  <Button asChild variant="outline">
                    <a 
                      href="https://www.youtube.com/@eecfin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Our YouTube Channel
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  {isLive && (
                    <div className="absolute top-3 right-3 z-10">
                      <LiveIndicator isLive={isLive} />
                    </div>
                  )}
                  <YouTubeEmbed 
                    videoId={videoId || undefined} 
                    isLive={isLive}
                    className="w-full h-full"
                  />
                </>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button asChild variant="outline" size="sm">
                <Link to="/sermons">View All Sermons</Link>
              </Button>
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
