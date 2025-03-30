
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SmallGroupSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center mb-8">Join a Small Group</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Connect with others in a smaller setting where you can build relationships,
          study the Bible, and grow in your faith journey together.
        </p>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
          <Users className="h-12 w-12 text-eecfin-navy mx-auto mb-4 opacity-70" />
          <h3 className="text-xl font-semibold mb-3">Our Small Groups Program</h3>
          <p className="text-gray-600 mb-6">
            We're in the process of organizing our small groups for this season. 
            Please contact us if you're interested in joining or leading a small group.
          </p>
          <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
            <Link to="/contact">Inquire About Small Groups</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SmallGroupSection;
