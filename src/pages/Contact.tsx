import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Users } from 'lucide-react';
import AdminLink from '@/components/AdminLink';

const Contact = () => {
  const { data: ministries } = useQuery({
    queryKey: ['ministries', true],
    queryFn: () => getMinistries(true), // Only fetch active ministries
  });

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative bg-eecfin-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
            alt="Church background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-sky-800/50"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-16">
          <div className="absolute top-2 right-2">
            <AdminLink />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            We'd love to hear from you! Reach out with any questions or prayer requests.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-eecfin-navy/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-eecfin-navy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Church Location</h3>
                    <p className="text-gray-600">
                      Address Line 1<br />
                      Helsinki, Finland
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-eecfin-navy/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-eecfin-navy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">info@eecfin.org</p>
                    <p className="text-gray-600">pastor@eecfin.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-eecfin-navy/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-eecfin-navy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">+358 XX XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-eecfin-navy/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-eecfin-navy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Service Times</h3>
                    <p className="text-gray-600">
                      Sunday: 10:00 AM - 12:00 PM<br />
                      Wednesday: 6:30 PM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title mb-8">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eecfin-navy focus:border-eecfin-navy"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eecfin-navy focus:border-eecfin-navy"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eecfin-navy focus:border-eecfin-navy"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eecfin-navy focus:border-eecfin-navy"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button type="submit" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Contacts Section */}
      {ministries && ministries.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-title text-center mb-8">Ministry Contacts</h2>
            <p className="text-center text-gray-600 mb-8">
              Get in touch with our ministry leaders directly for specific inquiries.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start mb-4">
                    <div className="bg-eecfin-navy/10 p-3 rounded-full mr-4">
                      <Users className="h-5 w-5 text-eecfin-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{ministry.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{ministry.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Contact:</span> {ministry.contact_name}</p>
                    <p>
                      <span className="font-medium">Email:</span> 
                      <a href={`mailto:${ministry.contact_email}`} className="text-eecfin-navy ml-1 hover:underline">
                        {ministry.contact_email}
                      </a>
                    </p>
                    {ministry.contact_phone && (
                      <p>
                        <span className="font-medium">Phone:</span> 
                        <a href={`tel:${ministry.contact_phone}`} className="text-eecfin-navy ml-1 hover:underline">
                          {ministry.contact_phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Find Us</h2>
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Map will be displayed here</p>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
