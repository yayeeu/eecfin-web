import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Users, Layout, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import EldersList from '@/components/EldersList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Create a client for this page
const queryClient = new QueryClient();

const WhoWeAre = () => {
  // Content sections for the different tabs
  const sections = [
    {
      id: "our-story",
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
      id: "mission",
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
      id: "values",
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
      id: "beliefs",
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
    },
    {
      id: "leadership",
      title: "Leadership",
      icon: <Layout size={20} />,
      color: "purple",
      content: (
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
              Our Leadership Team
            </span>
          </div>
          <p className="mb-6">
            Our church is led by a dedicated team of elders who serve the congregation 
            with wisdom, faith and compassion. These leaders work together to guide our 
            spiritual growth and manage the various ministries of our church.
          </p>
          <EldersList />
        </div>
      )
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Hero Section with Background Image - Updated to match Our Faith page */}
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
            <p className="text-xl max-w-3xl mx-auto text-white/90 mb-4">
              EECFIN strives to be a vibrant, multicultural church where Ethiopian Christians and people from all backgrounds 
              can worship together, grow in faith, and serve our community in Finland with the love of Christ.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Separator className="w-24 bg-eecfin-gold h-0.5" />
            </div>
          </div>
        </section>

        {/* Content Section with Tabs View and Side Navigation */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Main Content - Removed About EECFIN header and moved content up */}
              <div className="flex-1">
                {/* Tabs View - Removed the heading that was here */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Tabs defaultValue="our-story">
                    <TabsList className="w-full flex justify-center mb-6">
                      {sections.map((section) => (
                        <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600`}>
                            {section.icon}
                          </span>
                          {section.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {sections.map((section) => (
                      <TabsContent key={section.id} value={section.id} className="p-4 bg-gray-50 rounded-md">
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
              </div>
              
              {/* Right Side Navigation - Changed heading from "Additional Resources" to "About EECFIN" */}
              <div className="w-full md:w-64 mt-8 md:mt-0">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-eecfin-navy mb-4 border-b pb-2">
                    About EECFIN
                  </h3>
                  <nav className="flex flex-col space-y-3">
                    <Link 
                      to="/our-faith" 
                      className="flex items-center text-gray-700 hover:text-eecfin-navy transition-colors py-2"
                    >
                      <BookOpen size={18} className="mr-2 text-eecfin-gold" />
                      Our Statement of Faith
                    </Link>
                    <Link 
                      to="/constitution" 
                      className="flex items-center text-gray-700 hover:text-eecfin-navy transition-colors py-2"
                    >
                      <FileText size={18} className="mr-2 text-eecfin-gold" />
                      Our Constitution
                    </Link>
                  </nav>
                </div>
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
    </QueryClientProvider>
  );
};

export default WhoWeAre;
