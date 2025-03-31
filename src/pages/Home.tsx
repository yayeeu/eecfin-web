
import React from 'react';
import ImageSlider from '../components/ImageSlider';
import MediaSection from '../components/home/MediaSection';
import FeaturesSection from '../components/home/FeaturesSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import WelcomeEventBanner from '../components/home/WelcomeEventBanner';

const Home = () => {
  return (
    <div>
      {/* Image Slider Banner - Reduced height */}
      <div className="h-[30vh]">
        <ImageSlider />
      </div>
      
      {/* Welcome Banner with Next Event */}
      <WelcomeEventBanner />

      {/* YouTube Section with Mission Statement */}
      <MediaSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Upcoming Events Preview */}
      <UpcomingEventsSection />
    </div>
  );
};

export default Home;
