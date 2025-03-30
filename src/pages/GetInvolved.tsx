
import React, { memo } from 'react';
import InvolvedHero from '@/components/get-involved/InvolvedHero';
import MinistrySection from '@/components/get-involved/MinistrySection';
import SmallGroupSection from '@/components/get-involved/SmallGroupSection';
import SupportSection from '@/components/get-involved/SupportSection';
import CTASection from '@/components/get-involved/CTASection';

const GetInvolved = () => {
  return (
    <div>
      <InvolvedHero />
      
      {/* Community section at the top */}
      <SupportSection />
      
      <div className="bg-white py-16">
        <div className="container-custom grid md:grid-cols-10 gap-8">
          {/* Left column - Ministries (takes up 70% of the space) */}
          <div className="md:col-span-7">
            <MinistrySection />
          </div>
          
          {/* Right column - Ways to Get Involved (takes up 30% of the space with distinct styling) */}
          <div className="md:col-span-3">
            <SmallGroupSection />
          </div>
        </div>
      </div>
      
      <CTASection />
    </div>
  );
};

export default React.memo(GetInvolved);
