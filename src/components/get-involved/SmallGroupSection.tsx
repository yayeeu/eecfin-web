
import React from 'react';
import { Users, Calendar, MapPin, MessageCircle } from 'lucide-react';
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
    <section>
      <h2 className="section-title mb-6">Join a Small Group</h2>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Connect with others in a smaller setting where you can build relationships,
          study the Bible, and grow in your faith journey together.
        </p>
        
        <Card className="bg-gray-50 border-none">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Users className="h-10 w-10 text-eecfin-navy mr-4 flex-shrink-0 opacity-70" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Small Groups Program</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We're organizing small groups for this season. Contact us if you're interested in joining or leading a group.
                </p>
                
                <div className="space-y-2 mb-4">
                  {smallGroupBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="text-eecfin-navy mr-2">{benefit.icon}</div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80 w-full">
                  <Link to="/contact">Inquire About Small Groups</Link>
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
