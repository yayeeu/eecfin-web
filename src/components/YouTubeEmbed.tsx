
import React from 'react';

interface YouTubeEmbedProps {
  playlistId?: string;
  videoId?: string;
  className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  playlistId,
  videoId,
  className
}) => {
  // Determine the correct embed URL
  let embedUrl = '';
  
  if (playlistId) {
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  } else if (videoId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else {
    // Fallback to channel
    embedUrl = 'https://www.youtube.com/embed?listType=user_uploads&list=eecfin';
  }

  return (
    <div className={`relative pt-[56.25%] ${className || ''}`}>
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube Video"
      />
    </div>
  );
};
