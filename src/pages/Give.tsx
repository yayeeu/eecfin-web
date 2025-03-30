
import React from 'react';
import { Heart, Home, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import AdminLink from '@/components/AdminLink';

const Give = () => {
  return (
    <div>
      {/* Hero Section with Background */}
      <section className="relative bg-eecfin-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
            alt="Church background" 
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-eecfin-accent/40"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-12">
          <div className="absolute top-2 right-2">
            <AdminLink />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Give</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Support our mission and ministry
          </p>
        </div>
      </section>

      {/* Scripture Quote Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-eecfin-navy leading-relaxed mb-4">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </blockquote>
          <p className="text-lg font-medium text-eecfin-accent">2 Corinthians 9:7</p>
        </div>
      </section>

      {/* Ways to Give Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">Ways to Give</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* In Person */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Home className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">In Person</h3>
              <p className="text-gray-600 mb-4">
                Visit us during our worship services to give in person.
              </p>
              <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                <Link to="/contact">Church Location</Link>
              </Button>
            </div>

            {/* General Fund */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Heart className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">General Fund</h3>
              <p className="text-gray-600 mb-4">
                Bank account (Nordea):<br />
                IBAN FI60122030 00177960
              </p>
              <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80" onClick={() => {
                navigator.clipboard.writeText("FI60122030 00177960");
                alert("IBAN copied to clipboard");
              }}>
                Copy IBAN
              </Button>
            </div>

            {/* Building Fund */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <CreditCard className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Building Fund</h3>
              <p className="text-gray-600 mb-4">
                Building Fund Account:<br />
                IBAN FI4815553000115783
              </p>
              <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80" onClick={() => {
                navigator.clipboard.writeText("FI4815553000115783");
                alert("IBAN copied to clipboard");
              }}>
                Copy IBAN
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-6">Thank You for Your Support</h2>
          <p className="text-lg mb-8">
            Your generous gifts help us continue our mission of serving the Ethiopian community
            in Finland and reaching out to those in need.
          </p>
          <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
            <Link to="/contact">Contact Us For More Information</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Give;
