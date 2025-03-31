
import React, { useEffect, useState } from 'react';

interface YouTubeEmbedProps {
  channelId?: string;
  videoId?: string;
  className?: string;
  openInNewTab?: boolean;
  isLive?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  channelId, 
  videoId, 
  className,
  openInNewTab = false,
  isLive = false
}) => {
  const [loadedVideoId, setLoadedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // If a direct videoId is provided, use it
        if (videoId) {
          setLoadedVideoId(videoId);
          setLoading(false);
          return;
        }

        // Otherwise, try to get the latest video from the channel
        if (channelId) {
          // In a real implementation, you would use the YouTube API to get the latest video
          // For now, we'll use the channel embed which shows latest content
          setLoading(false);
        } else {
          setError("No video or channel ID provided");
          setLoading(false);
        }
      } catch (err) {
        setError("Could not load the video");
        setLoading(false);
        console.error("YouTube fetch error:", err);
      }
    };

    fetchVideo();
  }, [channelId, videoId]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className || 'h-[315px] w-full'}`}>
        <div className="animate-pulse text-eecfin-navy">Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className || 'h-[315px] w-full'}`}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // If openInNewTab is true, return a thumbnail with a link
  if (openInNewTab && loadedVideoId) {
    return (
      <a 
        href={`https://www.youtube.com/watch?v=${loadedVideoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${className || 'w-full'}`}
      >
        <img 
          src={`https://img.youtube.com/vi/${loadedVideoId}/maxresdefault.jpg`} 
          alt="Video thumbnail" 
          className="w-full h-auto rounded-lg shadow-lg hover:opacity-90 transition-opacity"
        />
        <div className="mt-2 text-center text-sm text-gray-600">Click to watch on YouTube</div>
      </a>
    );
  }

  // If we have a specific video ID, embed that video
  if (loadedVideoId) {
    // Append autoplay parameter for live videos
    const embedParams = isLive ? '?autoplay=1' : '';
    
    return (
      <div className={`relative ${className || 'w-full h-0 pb-[56.25%]'}`}>
        <iframe 
          src={`https://www.youtube.com/embed/${loadedVideoId}${embedParams}`}
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Otherwise, embed the channel's uploads playlist
  return (
    <div className={`relative ${className || 'w-full h-0 pb-[56.25%]'}`}>
      <iframe 
        src={`https://www.youtube.com/embed?listType=user_uploads&list=${channelId}`}
        title="YouTube video player"
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
