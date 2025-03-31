
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube } from 'lucide-react';
import { YouTubeVideo } from '@/types/sermon.types';

interface SermonGridViewProps {
  videos: YouTubeVideo[];
  onVideoClick: (videoId: string) => void;
}

const SermonGridView: React.FC<SermonGridViewProps> = ({ videos, onVideoClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {videos.map((video) => (
        <Card 
          key={video.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onVideoClick(video.id)}
        >
          <div className="relative aspect-video">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title} 
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
              <Youtube size={40} className="text-white" />
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-2 h-12">{video.title}</h3>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(video.publishedAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default React.memo(SermonGridView);
