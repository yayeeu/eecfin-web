
import React from 'react';
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-8">Find Us</h2>
        <div className="bg-gray-100 h-96 rounded-lg overflow-hidden shadow-md">
          <iframe 
            src="https://maps.google.com/maps?q=Sinikalliontie+10,+02630+Espoo,+Finland&hl=en&z=15&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Church Location Map"
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="mt-6 text-center">
          <Button 
            className="bg-eecfin-navy hover:bg-eecfin-navy/80"
            onClick={() => window.open('https://maps.google.com/?q=Sinikalliontie+10,+02630+Espoo,+Finland', '_blank')}
          >
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
