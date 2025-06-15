
import React from 'react';
import { Users, Heart, Church, Hands } from 'lucide-react';

const CommunityHighlights = () => {
  const highlights = [
    {
      icon: <Church className="h-8 w-8" />,
      title: "Weekly Worship",
      description: "Join our vibrant Sunday services filled with uplifting music, inspiring messages, and fellowship.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
      imageAlt: "Community gathered for worship service"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Groups",
      description: "Connect with others through our small groups, Bible studies, and fellowship activities.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      imageAlt: "People gathered around table in community group"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Outreach & Service",
      description: "Making a difference in our community through acts of service and love.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      imageAlt: "Community service and outreach activities"
    },
    {
      icon: <Hands className="h-8 w-8" />,
      title: "Cultural Heritage",
      description: "Celebrating our Ethiopian heritage while embracing our Finnish home.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
      imageAlt: "Cultural celebration and heritage activities"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-eecfin-navy/5 via-white to-eecfin-gold/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-eecfin-gold/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-eecfin-navy/10 rounded-full blur-xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-eecfin-navy mb-6">
            Our Community Life
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience the warmth and fellowship of our diverse church community, 
            where Ethiopian traditions meet Finnish hospitality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={highlight.image} 
                    alt={highlight.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-eecfin-navy/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 p-2 bg-white/90 rounded-full text-eecfin-navy">
                    {highlight.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-3 group-hover:text-eecfin-gold transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
