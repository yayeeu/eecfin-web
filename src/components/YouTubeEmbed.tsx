import React from 'react';

interface YouTubeEmbedProps {
  channelId?: string;
  videoId?: string;
  className?: string;
  autoplay?: boolean;
  isLive?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  channelId,
  videoId,
  className,
  playlistId,
  autoplay = false,
  isLive = false
}) => {
  // Determine the correct embed URL
  let embedUrl = '';
  
 if (channelId) {
    embedUrl = `https://www.youtube-nocookie.com/embed?listType=user_uploads&amp;list=eecfin`;
  } else if (playlistId) {
    embedUrl = `https://www.youtube-nocookie.com/embed?listType=playlist&amp;list=${playlistId}`;
  } else {
    // Fallback to channel - using the channel handle for EECFIN
    embedUrl = 'https://www.youtube-nocookie.com/embed?listType=user_uploads&amp;list=eecfin';
  }

  // Add parameters for better experience
  const urlParams = new URLSearchParams();
  if (autoplay) urlParams.append('autoplay', '1');
  urlParams.append('rel', '0'); // Don't show related videos from other channels
  urlParams.append('modestbranding', '1'); // Reduce YouTube branding
  urlParams.append('iv_load_policy', '3'); // Don't show video annotations
  if (isLive) {
    urlParams.append('enablejsapi', '1');
    urlParams.append('origin', window.location.origin);
  }

  const finalUrl = `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}${urlParams.toString()}`;

  return (
    <div className={`relative w-full h-full ${className || ''}`} style={{aspectRatio: '16/9'}}>
      <iframe
        src={finalUrl}
        className="absolute top-0 left-0 w-full h-full border-0"
        style={{width: '100%', height: '100%'}}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title={isLive ? "Live Stream" : "YouTube Video"}
      />
    </div>
  );
};
