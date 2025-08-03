import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WhoWeHero from '@/components/who-we-are/WhoWeHero';
import AboutContent from '@/components/who-we-are/AboutContent';
import SideNavigation from '@/components/who-we-are/SideNavigation';
import CtaSection from '@/components/who-we-are/CtaSection';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Create a client for this page
const queryClient = new QueryClient();

const WhoWeAre = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        {/* Hero Section with Background Image */}
        <WhoWeHero />

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Who We Are</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Main Content Section - Mobile Responsive */}
        <section className="bg-white py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
              {/* Main Content */}
              <div className="flex-1">
                <AboutContent />
                
                {/* CTA Section */}
                <div className="mt-8 sm:mt-12">
                  <CtaSection />
                </div>
              </div>
              
              {/* Side Navigation */}
              <div className="w-full lg:w-64 order-first lg:order-last">
                <SideNavigation />
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default WhoWeAre;
