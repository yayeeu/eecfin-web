
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Heart, Church } from 'lucide-react';

const SupportSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-6">Be Part of Our Community</h2>
          <p className="text-lg mb-8">
            There are many ways to get involved in our church community. Whether you're interested in 
            joining a ministry, participating in small groups, or supporting our mission, we welcome you 
            to be an active part of our church family.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Users className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Join a Ministry</h3>
              <p className="text-gray-600 mb-4">
                Serve alongside others in an area that matches your gifts and passions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Heart className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Small Groups</h3>
              <p className="text-gray-600 mb-4">
                Connect with others in a smaller setting to grow in faith together.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Church className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Worship with Us</h3>
              <p className="text-gray-600 mb-4">
                Join us for weekly services to worship and learn together.
              </p>
              <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                <Link to="/contact">Service Times</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
