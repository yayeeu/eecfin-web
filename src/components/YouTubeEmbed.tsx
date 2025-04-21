import React, { useEffect, useState } from 'react';

interface YouTubeEmbedProps {
  channelId?: string;
  videoId?: string;
  className?: string;
  openInNewTab?: boolean;
  isLive?: boolean;
  fallbackEmbed?: boolean; // True if data is from fallback for quota-avoidance
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  channelId, 
  videoId, 
  className,
  openInNewTab = false,
  isLive = false,
  fallbackEmbed = false
}) => {
  const [loadedVideoId, setLoadedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If fallback is forced, short-circuit normal loading
    if (fallbackEmbed && videoId) {
      setLoadedVideoId(videoId);
      setLoading(false);
      setError(null);
      return;
    }
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
          setLoading(false);
        } else {
          setError("No video or channel ID provided");
          setLoading(false);
        }
      } catch (err) {
        setError("Could not load the video");
        setLoading(false);
      }
    };
    fetchVideo();
  }, [channelId, videoId, fallbackEmbed]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className || 'h-[315px] w-full'}`}>
        <div className="animate-pulse text-eecfin-navy">Loading video...</div>
      </div>
    );
  }

  // NO ERROR MESSAGE for users - always show at least fallback!

  // Fallback: always-safe iframe embed, doesn't use quotas
  if (fallbackEmbed && loadedVideoId) {
    return (
      <div className={`relative ${className || 'w-full h-0 pb-[56.25%]'}`}>
        <iframe
          src={`https://www.youtube.com/embed/${loadedVideoId}?autoplay=0`}
          title="Broadcast Video"
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Open in new tab thumbnail mode (not used in home page, but kept for other use)
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

  // Standard embed (uses loadedVideoId)
  if (loadedVideoId) {
    const embedParams = isLive ? '?autoplay=1&mute=1&enablejsapi=1' : '?enablejsapi=1';
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

  // If nothing is available, render a placeholder
  return (
    <div className={`flex items-center justify-center bg-gray-100 ${className || 'h-[315px] w-full'}`}>
      <div className="text-eecfin-navy">Broadcast unavailable</div>
    </div>
  );
};

export default YouTubeEmbed;
