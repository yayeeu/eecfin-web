
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const WhoWeAre = () => {
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
          <div className="absolute inset-0 bg-eecfin-navy/50"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Who We Are</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Learn about our church, our beliefs, and our journey serving the Ethiopian community in Finland.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">Our Story</h2>
            <p className="mb-4">
              The Ethiopian Evangelical Church in Finland (EECFIN) was established to serve the spiritual
              needs of Ethiopian Christians living in Finland. What began as a small gathering of believers
              has grown into a vibrant church community.
            </p>
            <p className="mb-4">
              Our church was founded on the principles of providing a spiritual home that preserves Ethiopian
              Christian traditions while helping members integrate into Finnish society. Over the years,
              we have grown in numbers and impact, serving both the Ethiopian community and reaching out to others.
            </p>
            <p>
              Today, EECFIN continues to be a place of worship, fellowship, and community service,
              welcoming all who seek to grow in their faith journey.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="mb-4">
                The mission of the Ethiopian Evangelical Church in Finland is to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Proclaim the Gospel of Jesus Christ and nurture spiritual growth among our members</li>
                <li>Preserve and share the rich traditions of Ethiopian Christianity</li>
                <li>Provide a supportive community for Ethiopians and friends in Finland</li>
                <li>Help newcomers integrate into Finnish society while maintaining their cultural identity</li>
                <li>Extend compassionate service to those in need both locally and globally</li>
              </ul>
              <p>
                Through worship, teaching, fellowship, and service, we seek to fulfill this mission
                and be a positive presence in our community.
              </p>
            </div>
            <div>
              <h2 className="section-title">Our Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-2">Faith</h3>
                  <p>We are committed to the teachings of Jesus Christ and the Bible as our foundation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-2">Community</h3>
                  <p>We value the strength that comes from genuine fellowship and mutual support.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-2">Cultural Heritage</h3>
                  <p>We honor our Ethiopian Christian traditions while embracing our new home in Finland.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-2">Service</h3>
                  <p>We are dedicated to serving others and making a positive impact in our community.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-2">Inclusion</h3>
                  <p>We welcome all people regardless of background, embracing diversity as a strength.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pastor */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍⚖️</span>
              </div>
              <h3 className="text-xl font-semibold">Pastor Abebe Kebede</h3>
              <p className="text-eecfin-navy font-medium">Lead Pastor</p>
              <p className="mt-2 text-gray-600">
                Serving our congregation since 2015 with wisdom and compassion.
              </p>
            </div>
            
            {/* Elder 1 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Markos Tadesse</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                Oversees community outreach and congregational care ministries.
              </p>
            </div>
            
            {/* Elder 2 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Sara Hailu</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                Leads our worship ministry and coordinates youth programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eecfin-navy text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We invite you to become part of our church family and grow with us in faith and fellowship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" className="border-eecfin-gold text-eecfin-gold hover:bg-eecfin-gold/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
