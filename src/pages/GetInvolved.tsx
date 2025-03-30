import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Button } from "@/components/ui/button";
import { Music, Heart, Users, BookOpen, Gift, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLink from '@/components/AdminLink';

const GetInvolved = () => {
  const { data: ministries, isLoading, error } = useQuery({
    queryKey: ['ministries', true],
    queryFn: () => getMinistries(true), // Only fetch active ministries
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-eecfin-navy text-white py-16">
        <div className="container-custom text-center relative">
          <div className="absolute top-2 right-2">
            <AdminLink />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl max-w-3xl mx-auto">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  {ministry.photo && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={ministry.photo} 
                        alt={ministry.name}
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3">{ministry.name}</h3>
                  <p className="text-gray-600 mb-4">{ministry.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-2 text-eecfin-navy" />
                      <span>{ministry.contact_name}</span>
                    </div>
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
                  </div>
                  
                  <div className="text-center">
                    <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                      Get Involved
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-center text-gray-500">There are currently no active ministries listed. Please check back later.</p>
            </div>
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Young Adults Group</h3>
              <p className="text-gray-600 mb-4">
                For adults in their 20s and 30s who want to connect with peers and explore faith together.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Meets every Friday at 7:00 PM
              </p>
              <Button variant="outline" className="w-full border-eecfin-navy text-eecfin-navy">
                Learn More
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Family Life Group</h3>
              <p className="text-gray-600 mb-4">
                For families with children who want to grow together in faith and community.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Meets every other Saturday at 4:00 PM
              </p>
              <Button variant="outline" className="w-full border-eecfin-navy text-eecfin-navy">
                Learn More
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Women's Fellowship</h3>
              <p className="text-gray-600 mb-4">
                A supportive community for women to study scripture, pray together, and build friendship.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Meets every other Tuesday at 6:30 PM
              </p>
              <Button variant="outline" className="w-full border-eecfin-navy text-eecfin-navy">
                Learn More
              </Button>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
              View All Groups
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

export default GetInvolved;
