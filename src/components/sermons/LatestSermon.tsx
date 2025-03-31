
import React from 'react';
import YouTubeEmbed from '@/components/YouTubeEmbed';

interface LatestSermonProps {
  videoId: string | null;
}

const LatestSermon: React.FC<LatestSermonProps> = ({ videoId }) => {
  return (
    <section className="w-full">
      <h2 className="section-title mb-4">Latest Sermon</h2>
      {videoId && (
        <div className="w-full aspect-video max-w-lg mx-auto">
          <YouTubeEmbed videoId={videoId} className="w-full h-full" />
        </div>
      )}
    </section>
  );
};

export default React.memo(LatestSermon);
