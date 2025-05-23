
import React from 'react';

interface YouTubeEmbedProps {
  playlistId?: string;
  videoId?: string;
  className?: string;
  autoplay?: boolean;
  isLive?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  playlistId,
  videoId,
  className,
  autoplay = false,
  isLive = false
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

  // Add autoplay parameter if needed
  if (autoplay) {
    embedUrl += embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';
  }

  return (
    <div className={`relative w-full h-full ${className || ''}`} style={{aspectRatio: '16/9'}}>
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        style={{width: '100%', height: '100%'}}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={isLive ? "Live Stream" : "YouTube Video"}
      />
    </div>
  );
};
