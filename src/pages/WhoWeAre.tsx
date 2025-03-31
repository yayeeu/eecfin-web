
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WhoWeHero from '@/components/who-we-are/WhoWeHero';
import AboutContent from '@/components/who-we-are/AboutContent';
import SideNavigation from '@/components/who-we-are/SideNavigation';
import CtaSection from '@/components/who-we-are/CtaSection';

// Create a client for this page
const queryClient = new QueryClient();

const WhoWeAre = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Hero Section with Background Image */}
        <WhoWeHero />

        {/* Content Section with Tabs View and Side Navigation */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Main Content */}
              <div className="flex-1">
                <AboutContent />
              </div>
              
              {/* Right Side Navigation */}
              <div className="w-full md:w-64 mt-8 md:mt-0">
                <SideNavigation />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </div>
    </QueryClientProvider>
  );
};

export default WhoWeAre;
