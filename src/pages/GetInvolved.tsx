
import React from 'react';
import InvolvedHero from '@/components/get-involved/InvolvedHero';
import MinistrySection from '@/components/get-involved/MinistrySection';
import SmallGroupSection from '@/components/get-involved/SmallGroupSection';
import SupportSection from '@/components/get-involved/SupportSection';
import CTASection from '@/components/get-involved/CTASection';

const GetInvolved = () => {
  return (
    <div>
      <InvolvedHero />
      
      {/* Moved Support section to the top and renamed it */}
      <SupportSection />
      
      <div className="bg-white py-16">
        <div className="container-custom grid md:grid-cols-10 gap-8">
          {/* Left column - Ministries (now takes up 70% of the space) */}
          <div className="md:col-span-7">
            <MinistrySection />
          </div>
          
          {/* Right column - Small Groups (now takes up 30% of the space with distinct styling) */}
          <div className="md:col-span-3 bg-purple-50 rounded-lg p-4 shadow-sm">
            <SmallGroupSection />
          </div>
        </div>
      </div>
      
      <CTASection />
    </div>
  );
};

export default React.memo(GetInvolved);
