
import React from 'react';
import { YouTubeVideo } from '@/types/sermon.types';

interface SermonDateViewProps {
  videosByDate: Record<string, YouTubeVideo[]>;
  onVideoClick: (videoId: string) => void;
}

const SermonDateView: React.FC<SermonDateViewProps> = ({ videosByDate, onVideoClick }) => {
  return (
    <div className="space-y-8">
      {Object.entries(videosByDate).map(([monthYear, monthVideos]) => (
        <div key={monthYear} className="space-y-4">
          <h3 className="text-xl font-semibold text-eecfin-navy">{monthYear}</h3>
          <div className="space-y-2">
            {monthVideos.map((video) => (
              <div 
                key={video.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onVideoClick(video.id)}
              >
                <div className="flex items-center">
                  <div className="w-24 h-16 flex-shrink-0 mr-4">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SermonDateView);
