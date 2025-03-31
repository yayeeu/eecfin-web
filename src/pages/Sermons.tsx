
import React from 'react';
import SermonHero from '@/components/sermons/SermonHero';
import LatestSermon from '@/components/sermons/LatestSermon';
import SubscribeSection from '@/components/sermons/SubscribeSection';
import SermonLibrary from '@/components/sermons/SermonLibrary';
import { useSermons } from '@/hooks/useSermons';

const Sermons = () => {
  const channelId = 'eecfin'; // EECFIN YouTube channel ID
  
  const { 
    currentVideos, 
    videosByDate, 
    loading, 
    error, 
    selectedVideo, 
    setSelectedVideo,
    currentPage, 
    totalPages, 
    handlePageChange 
  } = useSermons(channelId);

  const openVideoOnYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openSubscribePage = () => {
    window.open('https://www.youtube.com/@eecfin?sub_confirmation=1', '_blank');
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="animate-pulse text-eecfin-navy text-xl">Loading sermons...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SermonHero />

      <div className="container-custom py-12">
        <h1 className="page-title">Sermons</h1>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Featured Video - Using a smaller size */}
          <div className="md:w-1/2">
            <LatestSermon videoId={selectedVideo} />
          </div>

          {/* Subscribe Section */}
          <div className="md:w-1/2">
            <SubscribeSection onSubscribe={openSubscribePage} />
          </div>
        </div>

        {/* Video Library */}
        <SermonLibrary 
          videos={[]} // Not used in component but keeping for type consistency
          currentVideos={currentVideos}
          videosByDate={videosByDate}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onVideoClick={openVideoOnYouTube}
        />
      </div>
    </div>
  );
};

export default Sermons;
