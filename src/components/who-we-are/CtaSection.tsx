
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 bg-eecfin-navy text-white text-center">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We invite you to become part of our church family and grow with us in faith and fellowship.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
            <Link to="/get-involved">Get Involved</Link>
          </Button>
          <Button asChild variant="outline" className="border-eecfin-gold text-eecfin-gold hover:bg-eecfin-gold/10">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
