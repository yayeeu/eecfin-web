
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Join Our Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
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

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
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

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
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
