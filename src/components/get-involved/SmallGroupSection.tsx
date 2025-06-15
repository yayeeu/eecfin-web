
import React, { memo } from 'react';
import { Users, Calendar, MapPin, MessageCircle, Heart, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const smallGroupBenefits = [
  { icon: <MessageCircle size={16} />, text: "Discuss faith in a comfortable setting" },
  { icon: <Calendar size={16} />, text: "Weekly or bi-weekly gatherings" },
  { icon: <MapPin size={16} />, text: "Meet in homes throughout the city" }
];

const SmallGroupSection: React.FC = () => {
  return (
    <section className="h-full">
      <h2 className="section-title mb-6 text-eecfin-navy">Ways to Get Involved</h2>
      
      <div className="space-y-6">
        {/* Join a Ministry Card */}
        <Card className="bg-eecfin-navy/5 border-eecfin-navy/20">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Users className="h-10 w-10 text-eecfin-navy mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-eecfin-navy">Join a Ministry</h3>
                <p className="text-eecfin-navy/80 text-sm mb-4">
                  Serve alongside others in an area that matches your gifts and passions.
                </p>
                <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/90 w-full">
                  <Link to="/contact">Find Your Ministry</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Small Groups Card */}
        <Card className="bg-eecfin-gold/20 border-eecfin-gold/50">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Heart className="h-10 w-10 text-eecfin-navy mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-eecfin-navy">Join a Small Group</h3>
                <p className="text-eecfin-navy/80 text-sm mb-4">
                  Connect with others in a smaller setting where you can build relationships,
                  study the Bible, and grow in your faith journey together.
                </p>
                
                <div className="space-y-2 mb-4">
                  {smallGroupBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-eecfin-navy">
                      <div className="text-eecfin-navy/70 mr-2">{benefit.icon}</div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent w-full">
                  <Link to="/contact">Inquire About Small Groups</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Worship With Us Card */}
        <Card className="bg-eecfin-navy/5 border-eecfin-navy/20">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Church className="h-10 w-10 text-eecfin-navy mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-eecfin-navy">Worship With Us</h3>
                <p className="text-eecfin-navy/80 text-sm mb-4">
                  Join us for weekly services to worship and learn together.
                </p>
                <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/90 w-full">
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

// Use React.memo to prevent unnecessary re-renders
export default memo(SmallGroupSection);
