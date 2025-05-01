
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Users, Heart, Mail } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import EldersList from '@/components/EldersList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client for this page
const queryClient = new QueryClient();

const OurLeadership = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Hero Section */}
        <section className="relative bg-eecfin-navy overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
              alt="Church background" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-eecfin-navy/50"></div>
          </div>
          <div className="container-custom text-center relative z-10 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Leadership</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90 mb-4">
              Meet the dedicated team of elders who serve our congregation with wisdom, 
              faith, and compassion, guiding our spiritual growth and church ministries.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Separator className="w-24 bg-eecfin-gold h-0.5" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-block p-2 bg-purple-100 text-purple-700 rounded-full mb-4">
                <Users size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-eecfin-navy">Church Leadership</h2>
              <p className="text-gray-600 text-lg">
                Our church is led by a council of elders who together provide spiritual oversight,
                teaching, and pastoral care to our congregation. Each brings unique gifts and
                perspectives to serve our church family.
              </p>
            </div>

            {/* Current Elders - Box above this section has been removed */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center mb-8 text-eecfin-navy">
                Meet Our Current Elders
              </h3>
              <EldersList />
            </div>
            
            {/* Contact Section */}
            <div className="bg-eecfin-navy/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-eecfin-navy">Connect With Our Leadership</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our elders are available to pray with you, answer questions, or provide spiritual counsel.
                Feel free to reach out to them individually or contact our church office.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
                  <Link to="/contact">
                    <Mail size={18} className="mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-eecfin-navy text-eecfin-navy hover:bg-eecfin-navy/10">
                  <Link to="/get-involved">
                    <Heart size={18} className="mr-2" />
                    Get Involved
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default OurLeadership;
