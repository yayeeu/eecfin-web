
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-eecfin-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-eecfin-navy/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom relative z-10">
        <h2 className="section-title text-center mb-12">Join Our Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-eecfin-navy/10 rounded-full">
                <Calendar className="h-8 w-8 text-eecfin-navy" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Weekly Services</h3>
            <p className="text-gray-600">
              Join us every Sunday for worship service, prayer meetings, 
              and Bible studies throughout the week.
            </p>
            <Button variant="link" asChild className="mt-4 text-eecfin-navy">
              <Link to="/events">View Schedule</Link>
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-eecfin-navy/10 rounded-full">
                <Users className="h-8 w-8 text-eecfin-navy" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Community Groups</h3>
            <p className="text-gray-600">
              Connect with others through our various community groups for 
              all ages and life stages.
            </p>
            <Button variant="link" asChild className="mt-4 text-eecfin-navy">
              <Link to="/get-involved">Find a Group</Link>
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-eecfin-navy/10 rounded-full">
                <Heart className="h-8 w-8 text-eecfin-navy" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Outreach & Support</h3>
            <p className="text-gray-600">
              Participate in our community outreach programs and support networks 
              for newcomers to Finland.
            </p>
            <Button variant="link" asChild className="mt-4 text-eecfin-navy">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
