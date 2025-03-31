
import React from 'react';
import InvolvedHero from '@/components/get-involved/InvolvedHero';
import MinistriesContainer from '@/components/get-involved/MinistriesContainer';
import SupportSection from '@/components/get-involved/SupportSection';
import CTASection from '@/components/get-involved/CTASection';

const GetInvolved = () => {
  return (
    <div>
      <InvolvedHero />
      <SupportSection />
      <MinistriesContainer />
      <CTASection />
    </div>
  );
};

export default React.memo(GetInvolved);
