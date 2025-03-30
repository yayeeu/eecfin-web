
import React from 'react';
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-8">Find Us</h2>
        <div className="bg-gray-100 h-96 rounded-lg overflow-hidden shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.1515532267075!2d25.0965548!3d60.236891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920f34ca9d0975%3A0xe0d7c1b2c5711be!2sKeinulaudankuja%204%20B%2C%2000940%20Helsinki%2C%20Finland!5e0!3m2!1sen!2sus!4v1715788767156!5m2!1sen!2sus" 
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
            onClick={() => window.open('https://maps.google.com/?q=Keinulaudankuja+4+B,+00940+Helsinki,+Finland', '_blank')}
          >
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
