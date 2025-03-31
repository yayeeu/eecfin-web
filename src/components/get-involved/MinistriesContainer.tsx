
import React, { memo } from 'react';
import MinistrySection from './MinistrySection';
import SmallGroupSection from './SmallGroupSection';

const MinistriesContainer: React.FC = () => {
  return (
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
  );
};

export default memo(MinistriesContainer);
