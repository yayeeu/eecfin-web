
import React from 'react';
import ImageSlider from '../components/ImageSlider';
import MediaSection from '../components/home/MediaSection';
import FeaturesSection from '../components/home/FeaturesSection';
import WelcomeEventBanner from '../components/home/WelcomeEventBanner';

const Home = () => {
  return (
    <div className="w-full">
      {/* Image Slider Banner with Overlaid Event Box - Full Width */}
      <div className="relative w-full">
        <ImageSlider />
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-full max-w-xs z-10">
          <WelcomeEventBanner overlayStyle={true} />
        </div>
      </div>
      
      {/* YouTube Section with Mission Statement */}
      <MediaSection />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
