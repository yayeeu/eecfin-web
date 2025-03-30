
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-eecfin-navy text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
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

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
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
