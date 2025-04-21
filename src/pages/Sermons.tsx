
import React from 'react';
import { Card } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

const Sermons = () => {
  const playlistId = 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Our Sermons</h1>
      
      <Card className="overflow-hidden">
        <YouTubeEmbed playlistId={playlistId} />
      </Card>

      <div className="mt-6 text-center">
        <a 
          href={`https://www.youtube.com/playlist?list=${playlistId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View all sermons on YouTube
        </a>
      </div>
    </div>
  );
};

export default Sermons;
