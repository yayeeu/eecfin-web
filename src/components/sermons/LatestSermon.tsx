
import React from 'react';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from 'lucide-react';

interface LatestSermonProps {
  videoId: string | null;
  isLive?: boolean;
}

const LatestSermon: React.FC<LatestSermonProps> = ({ videoId, isLive = false }) => {
  if (!videoId) {
    return null;
  }
  
  return (
    <section className="w-full">
      <div className="flex items-center mb-4">
        <h2 className="section-title mb-0 mr-3">
          {isLive ? 'Live Now' : 'Latest Sermon'}
        </h2>
        {isLive && (
          <Badge variant="destructive" className="flex items-center">
            <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
            LIVE
          </Badge>
        )}
      </div>
      
      <div className="w-full aspect-video max-w-lg mx-auto">
        <YouTubeEmbed videoId={videoId} className="w-full h-full" isLive={isLive} />
      </div>
    </section>
  );
};

export default React.memo(LatestSermon);
