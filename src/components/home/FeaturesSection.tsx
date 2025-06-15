
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, MapPin, Clock, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Weekly Services",
      description: "Join us every Sunday for inspiring worship, fellowship, and spiritual growth in a welcoming environment.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
      imageAlt: "Sunday worship service with congregation",
      cta: "View Schedule",
      link: "/events",
      bgColor: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Groups",
      description: "Connect with others through small groups, Bible studies, and fellowship activities for all ages and life stages.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      imageAlt: "Small group Bible study gathering",
      cta: "Find a Group",
      link: "/get-involved",
      bgColor: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Outreach & Support",
      description: "Make a difference through community outreach, support networks, and service opportunities for newcomers.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
      imageAlt: "Community outreach and service activities",
      cta: "Get Involved",
      link: "/get-involved",
      bgColor: "from-red-500/10 to-red-600/5",
      iconColor: "text-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-eecfin-navy/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-eecfin-gold/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-eecfin-navy/10 rounded-full blur-xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-eecfin-navy mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover meaningful ways to connect, grow, and serve alongside our diverse church family
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-gray-100 h-full flex flex-col">
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.bgColor} to-transparent`}></div>
                  <div className="absolute top-4 left-4">
                    <div className={`p-3 bg-white/90 backdrop-blur-sm rounded-full ${feature.iconColor} shadow-lg`}>
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-eecfin-navy mb-4 group-hover:text-eecfin-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 line-height-loose flex-grow">
                    {feature.description}
                  </p>

                  {/* Service Times for Weekly Services */}
                  {index === 0 && (
                    <div className="bg-eecfin-navy/5 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-eecfin-navy mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">Service Times</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Mic className="h-3 w-3" />
                          <span>Sunday Worship: 10:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>Helsinki, Finland</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    asChild 
                    className="w-full bg-eecfin-navy hover:bg-eecfin-navy/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-eecfin-gold group-hover:text-eecfin-navy mt-auto"
                  >
                    <Link to={feature.link} className="flex items-center justify-center gap-2">
                      {feature.cta}
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
