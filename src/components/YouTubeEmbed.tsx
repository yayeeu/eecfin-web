import React, { useEffect, useState } from 'react';

interface YouTubeEmbedProps {
  channelId?: string;
  videoId?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ channelId, videoId, className }) => {
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

  // If we have a specific video ID, embed that video
  if (loadedVideoId) {
    return (
      <div className={`relative ${className || 'w-full h-0 pb-[56.25%]'}`}>
        <iframe 
          src={`https://www.youtube.com/embed/${loadedVideoId}`}
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
