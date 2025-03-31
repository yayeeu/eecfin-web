
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Users, ChevronDown, Layout, Grid3X3 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import EldersList from '@/components/EldersList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Create a client for this page
const queryClient = new QueryClient();

const WhoWeAre = () => {
  const [activeView, setActiveView] = useState<'sections' | 'tabs' | 'cards'>('sections');

  // Content sections for the different views
  const sections = [
    {
      title: "Our Story",
      icon: <BookOpen size={20} />,
      color: "blue",
      content: (
        <div className="space-y-4">
          <p>
            The Ethiopian Evangelical Church in Finland (EECFIN) was established to serve the spiritual
            needs of Ethiopian Christians living in Finland. What began as a small gathering of believers
            has grown into a vibrant church community.
          </p>
          <p>
            Our church was founded on the principles of providing a spiritual home that preserves Ethiopian
            Christian traditions while helping members integrate into Finnish society. Over the years,
            we have grown in numbers and impact, serving both the Ethiopian community and reaching out to others.
          </p>
          <p>
            Today, EECFIN continues to be a place of worship, fellowship, and community service,
            welcoming all who seek to grow in their faith journey.
          </p>
        </div>
      )
    },
    {
      title: "Mission",
      icon: <Heart size={20} />,
      color: "green",
      content: (
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
              United in prayer, fellowship, and service
            </span>
          </div>
          <p>
            Our mission is to be a Spirit-filled community, united in prayer, fellowship, and service, 
            focused on evangelizing the lost, making disciples, and spreading hope. Our commitment is 
            to stand firm in our faith, knowing that our Lord and Savior Jesus Christ will return, 
            and we will live with Him forever in His eternal kingdom.
          </p>
          <Button asChild variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 mt-4">
            <Link to="/constitution">Read Our Constitution</Link>
          </Button>
        </div>
      )
    },
    {
      title: "Values",
      icon: <Users size={20} />,
      color: "amber",
      content: (
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-700 rounded-full">
              Faith, Community, Service
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-amber-700">Faith in the Word of God</h4>
              <p>We uphold the Bible as the inspired and infallible authority in all areas of faith and life, guiding us in our walk with God.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700">Community and Discipleship</h4>
              <p>We value unity, fellowship, and mutual growth, fostering an environment where believers can grow in faith, love, and service.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700">Mission and Service</h4>
              <p>We are committed to sharing the Gospel, serving others, and living out our faith through the power of the Holy Spirit, with a hopeful anticipation of Christ's return.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Beliefs",
      icon: <BookOpen size={20} />,
      color: "indigo",
      content: (
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-700 rounded-full">
              We believe in one God, three persons
            </span>
          </div>
          <p>
            We believe that the 66 books of the Old and New Testaments are the inspired and infallible 
            Word of God, the supreme authority in faith and life. We believe in one God, eternally 
            existing in three persons: Father, Son, and Holy Spirit. We believe in the deity of Jesus 
            Christ, who was born of the Virgin Mary, lived a sinless life, and died for our sins as a 
            substitutionary sacrifice. We believe in His bodily resurrection, ascension into Heaven, 
            and His ongoing role as our High Priest and Advocate.
          </p>
          <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white mt-4">
            <Link to="/our-faith">Learn More</Link>
          </Button>
        </div>
      )
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
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
          <div className="container-custom text-center relative z-10 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Who We Are</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Learn about our church, our beliefs, and our journey serving the Ethiopian community in Finland.
            </p>
          </div>
        </section>

        {/* Our Vision Section at the top */}
        <section className="py-12 bg-gradient-to-r from-eecfin-navy/10 to-eecfin-navy/5">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eecfin-navy/10 flex items-center justify-center text-eecfin-navy">
                <Heart size={28} />
              </div>
              <h2 className="text-2xl font-bold text-eecfin-navy mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                EECFIN strives to be a vibrant, multicultural church where Ethiopian Christians and people from all backgrounds 
                can worship together, grow in faith, and serve our community in Finland with the love of Christ.
              </p>
              <div className="flex items-center justify-center">
                <Separator className="w-24 bg-eecfin-accent h-0.5" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section with View Toggle */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-eecfin-navy text-center mb-8">
                About EECFIN
              </h2>
              
              {/* View Toggle Buttons */}
              <div className="flex justify-center mb-8 gap-2">
                <button
                  onClick={() => setActiveView('sections')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeView === 'sections' 
                      ? 'bg-eecfin-navy text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layout size={16} />
                    Section View
                  </span>
                </button>
                <button
                  onClick={() => setActiveView('tabs')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeView === 'tabs' 
                      ? 'bg-eecfin-navy text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronDown size={16} />
                    Tabs View
                  </span>
                </button>
                <button
                  onClick={() => setActiveView('cards')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeView === 'cards' 
                      ? 'bg-eecfin-navy text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Grid3X3 size={16} />
                    Cards View
                  </span>
                </button>
              </div>

              {/* Sections View */}
              {activeView === 'sections' && (
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <Card key={index} className={`overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-l-8 border-l-${section.color}-500 bg-gradient-to-br from-${section.color}-50 to-white`}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600`}>
                            {section.icon}
                          </div>
                          <h3 className={`text-2xl font-bold text-${section.color}-700`}>{section.title}</h3>
                        </div>
                        {section.content}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Tabs View */}
              {activeView === 'tabs' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Tabs defaultValue="0">
                    <TabsList className="w-full flex justify-center mb-6">
                      {sections.map((section, index) => (
                        <TabsTrigger key={index} value={index.toString()} className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600`}>
                            {section.icon}
                          </span>
                          {section.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {sections.map((section, index) => (
                      <TabsContent key={index} value={index.toString()} className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className={`w-10 h-10 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600`}>
                              {section.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className={`text-xl font-medium text-${section.color}-700 mb-2`}>{section.title}</h3>
                            {section.content}
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              )}

              {/* Cards View */}
              {activeView === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((section, index) => (
                    <Card key={index} className={`overflow-hidden shadow-md hover:shadow-lg transition-all border-t-4 border-t-${section.color}-500`}>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`w-8 h-8 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600 mr-2`}>
                            {section.icon}
                          </div>
                          <h3 className={`font-medium text-${section.color}-700`}>{section.title}</h3>
                        </div>
                        <div className="text-sm text-gray-700">
                          {section.content}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Leadership Team - Updated to use EldersList component */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-title text-center mb-12">Our Leadership</h2>
            <EldersList />
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
    </QueryClientProvider>
  );
};

export default WhoWeAre;
