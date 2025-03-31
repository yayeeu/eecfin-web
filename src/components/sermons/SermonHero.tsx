
import React from 'react';

const SermonHero: React.FC = () => {
  return (
    <section className="relative bg-eecfin-navy overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
          alt="Church background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-red-900/40"></div>
      </div>
      <div className="container-custom text-center relative z-10 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Sermons</h1>
        <p className="text-xl max-w-3xl mx-auto text-white/90">
          Watch and listen to our past services and messages.
        </p>
      </div>
    </section>
  );
};

export default React.memo(SermonHero);
