
import React, { useEffect, useState } from 'react';

interface YouTubeEmbedProps {
  channelId: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ channelId, className }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        // In a real implementation, you would use the YouTube API to get the latest video
        // For now, we'll hard-code the embed to the channel itself, which will show
        // the live stream when active or the featured video otherwise
        setLoading(false);
      } catch (err) {
        setError("Could not load the latest video");
        setLoading(false);
        console.error("YouTube fetch error:", err);
      }
    };

    fetchLatestVideo();
  }, [channelId]);

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
