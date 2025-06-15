
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
      <div className="w-full">
        {/* Hero Section with Background Image */}
        <WhoWeHero />

        {/* Main Content Section with Large Left Image */}
        <section className="bg-white">
          <div className="flex min-h-screen">
            {/* Large Left Side Image */}
            <div className="w-1/2 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop" 
                alt="Church community gathering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
            </div>
            
            {/* Right Content Area */}
            <div className="w-1/2 py-16">
              <div className="container-custom max-w-4xl">
                <div className="flex flex-col md:flex-row md:space-x-8">
                  {/* Main Content */}
                  <div className="flex-1">
                    <AboutContent />
                    
                    {/* CTA Section - Moved here from the bottom */}
                    <div className="mt-12">
                      <CtaSection />
                    </div>
                  </div>
                  
                  {/* Right Side Navigation */}
                  <div className="w-full md:w-64 mt-8 md:mt-0">
                    <SideNavigation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default WhoWeAre;
