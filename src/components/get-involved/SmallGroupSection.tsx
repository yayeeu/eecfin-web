
import React from 'react';
import { Users, Calendar, MapPin, MessageCircle, Heart, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const SmallGroupSection: React.FC = () => {
  const smallGroupBenefits = [
    { icon: <MessageCircle size={16} />, text: "Discuss faith in a comfortable setting" },
    { icon: <Calendar size={16} />, text: "Weekly or bi-weekly gatherings" },
    { icon: <MapPin size={16} />, text: "Meet in homes throughout the city" }
  ];

  return (
    <section className="h-full">
      <h2 className="section-title mb-6 text-purple-800">Ways to Get Involved</h2>
      
      <div className="space-y-6">
        {/* Join a Ministry Card */}
        <Card className="bg-purple-100 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Users className="h-10 w-10 text-purple-700 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-800">Join a Ministry</h3>
                <p className="text-purple-900 text-sm mb-4">
                  Serve alongside others in an area that matches your gifts and passions.
                </p>
                <Button asChild className="bg-purple-700 hover:bg-purple-800 w-full">
                  <Link to="/contact">Find Your Ministry</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Small Groups Card */}
        <Card className="bg-purple-100 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Heart className="h-10 w-10 text-purple-700 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-800">Join a Small Group</h3>
                <p className="text-purple-900 text-sm mb-4">
                  Connect with others in a smaller setting where you can build relationships,
                  study the Bible, and grow in your faith journey together.
                </p>
                
                <div className="space-y-2 mb-4">
                  {smallGroupBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-purple-800">
                      <div className="text-purple-600 mr-2">{benefit.icon}</div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="bg-purple-700 hover:bg-purple-800 w-full">
                  <Link to="/contact">Inquire About Small Groups</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Worship With Us Card */}
        <Card className="bg-purple-100 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Church className="h-10 w-10 text-purple-700 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-800">Worship With Us</h3>
                <p className="text-purple-900 text-sm mb-4">
                  Join us for weekly services to worship and learn together.
                </p>
                <Button asChild className="bg-purple-700 hover:bg-purple-800 w-full">
                  <Link to="/contact">Service Times</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SmallGroupSection;
