
import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative bg-eecfin-navy overflow-hidden w-full">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
          alt="Church background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-sky-800/50"></div>
      </div>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
        <p className="text-xl max-w-3xl mx-auto text-white/90">
          We'd love to hear from you! Reach out with any questions or prayer requests.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
