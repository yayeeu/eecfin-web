
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
      <MinistrySection />
      <SmallGroupSection />
      <SupportSection />
      <CTASection />
    </div>
  );
};

export default React.memo(GetInvolved);
