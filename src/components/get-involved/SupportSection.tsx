
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SupportSection: React.FC = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-3">Be Part of Our Community</h2>
          <p className="text-base mb-4">
            There are many ways to get involved in our church community. Whether you're interested in 
            joining a ministry, participating in small groups, or supporting our mission, we welcome you 
            to be an active part of our church family.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
