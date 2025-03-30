
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Button } from "@/components/ui/button";
import { Users, Gift, Mail, Phone, User, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLink from '@/components/AdminLink';

const GetInvolved = () => {
  // Optimize data fetching
  const { data: ministries, isLoading, error } = useQuery({
    queryKey: ['ministries', true],
    queryFn: () => getMinistries(true), // Only fetch active ministries
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Memoize ministry cards to prevent unnecessary re-renders
  const ministryCards = useMemo(() => {
    if (!ministries || ministries.length === 0) return null;
    
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
            {ministry.photo && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={ministry.photo} 
                  alt={ministry.name}
                  className="w-full h-48 object-cover"
                  loading="lazy" 
                />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-3">{ministry.name}</h3>
            <p className="text-gray-600 mb-4">{ministry.description}</p>
            
            <div className="space-y-2 mb-6">
              {ministry.members?.name ? (
                <>
                  <div className="flex items-start text-gray-700">
                    <User className="h-4 w-4 mr-2 mt-1 text-eecfin-navy" />
                    <div>
                      <p className="font-medium">Contact Elder:</p> 
                      <p>{ministry.members.name}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center text-gray-700">
                  <User className="h-4 w-4 mr-2 text-eecfin-navy" />
                  <span>{ministry.contact_name}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-eecfin-navy" />
                <a href={`mailto:${ministry.contact_email}`} className="hover:text-eecfin-navy">
                  {ministry.contact_email}
                </a>
              </div>
              
              {ministry.contact_phone && (
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-eecfin-navy" />
                  <a href={`tel:${ministry.contact_phone}`} className="hover:text-eecfin-navy">
                    {ministry.contact_phone}
                  </a>
                </div>
              )}
              
              {ministry.members?.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-eecfin-navy" />
                  <a href={`tel:${ministry.members.phone}`} className="hover:text-eecfin-navy">
                    {ministry.members.phone}
                  </a>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                Get Involved
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [ministries]);

  // Memoize the empty state
  const emptyState = useMemo(() => (
    <div className="bg-gray-50 p-10 rounded-lg text-center max-w-3xl mx-auto">
      <Handshake className="h-14 w-14 text-eecfin-navy mx-auto mb-4 opacity-70" />
      <h3 className="text-xl font-semibold mb-2">Ministries Coming Soon</h3>
      <p className="text-gray-600 mb-6">
        We're currently organizing our ministry programs. Check back soon to find ways you can serve and 
        connect with our church community.
      </p>
      <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
        <Link to="/contact">Contact Us For More Information</Link>
      </Button>
    </div>
  ), []);

  return (
    <div>
      {/* Hero Section with Background Image */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Involved</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Discover ways to connect, serve, and grow as part of our church community.
          </p>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Ministries</h2>
          
          {isLoading ? (
            <div className="text-center p-8">Loading ministries...</div>
          ) : error ? (
            <div className="text-center p-8 text-red-500">Error loading ministries. Please try again later.</div>
          ) : ministries && ministries.length > 0 ? (
            ministryCards
          ) : (
            emptyState
          )}
        </div>
      </section>

      {/* Small Groups Section */}
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

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">Support Our Ministry</h2>
            <p className="text-lg mb-8">
              Your generous gifts help us continue our mission of serving the Ethiopian community
              in Finland and reaching out to those in need. There are several ways you can support our church.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Donate Online</h3>
                <p className="text-gray-600 mb-4">
                  Make a secure online donation to support our church's ministries and outreach programs.
                </p>
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Donate Now
                </Button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Become a Regular Supporter</h3>
                <p className="text-gray-600 mb-4">
                  Set up regular giving to provide consistent support for our church's work.
                </p>
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eecfin-navy text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Involved?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We'd love to help you find the right place to serve and connect in our church community.
          </p>
          <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(GetInvolved);
