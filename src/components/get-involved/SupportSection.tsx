
import React from 'react';
import { Button } from '@/components/ui/button';

const SupportSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-6">Support Our Ministry</h2>
          <p className="text-lg mb-8">
            Your generous gifts help us continue our mission of serving the Ethiopian community
            in Finland and reaching out to those in need. There are several ways you can support our church.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Donate Online</h3>
              <p className="text-gray-600 mb-4">
                Make a secure online donation to support our church's ministries and outreach programs.
              </p>
              <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                Donate Now
              </Button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Become a Regular Supporter</h3>
              <p className="text-gray-600 mb-4">
                Set up regular giving to provide consistent support for our church's work.
              </p>
              <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
