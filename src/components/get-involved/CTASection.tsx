
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-eecfin-navy text-white text-center">
      <div className="container-custom">
        <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
          <Link to="/contact">Contact Us Today</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
