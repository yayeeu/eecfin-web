import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
        <div className="container-custom text-center relative z-10 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Who We Are</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Learn about our church, our beliefs, and our journey serving the Ethiopian community in Finland.
          </p>
        </div>
      </section>

      {/* Our Story Section - Moved to top */}
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

      {/* Mission, Values, Beliefs - Colorful Boxes */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission Box */}
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-l-8 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700">Mission</h3>
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                    United in prayer, fellowship, and service
                  </span>
                </div>
                <p className="mb-6 text-gray-700">
                  Our mission is to be a Spirit-filled community, united in prayer, fellowship, and service, 
                  focused on evangelizing the lost, making disciples, and spreading hope. Our commitment is 
                  to stand firm in our faith, knowing that our Lord and Savior Jesus Christ will return, 
                  and we will live with Him forever in His eternal kingdom.
                </p>
                <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  <Link to="/constitution">Read Our Constitution</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Values Box */}
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-l-8 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Heart size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">Values</h3>
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                    Faith, Community, Service
                  </span>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-green-700">Faith in the Word of God</h4>
                    <p>We uphold the Bible as the inspired and infallible authority in all areas of faith and life, guiding us in our walk with God.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">Community and Discipleship</h4>
                    <p>We value unity, fellowship, and mutual growth, fostering an environment where believers can grow in faith, love, and service.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">Mission and Service</h4>
                    <p>We are committed to sharing the Gospel, serving others, and living out our faith through the power of the Holy Spirit, with a hopeful anticipation of Christ's return.</p>
                  </div>
                  <p className="italic">These values guide us as a church, shaping our actions, relationships, and the way we engage with the world around us.</p>
                </div>
              </CardContent>
            </Card>

            {/* Beliefs Box */}
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-l-8 border-l-amber-500 bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Users size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-700">Beliefs</h3>
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-700 rounded-full">
                    We believe in one God, three persons
                  </span>
                </div>
                <p className="mb-6 text-gray-700">
                  We believe that the 66 books of the Old and New Testaments are the inspired and infallible 
                  Word of God, the supreme authority in faith and life. We believe in one God, eternally 
                  existing in three persons: Father, Son, and Holy Spirit. We believe in the deity of Jesus 
                  Christ, who was born of the Virgin Mary, lived a sinless life, and died for our sins as a 
                  substitutionary sacrifice. We believe in His bodily resurrection, ascension into Heaven, 
                  and His ongoing role as our High Priest and Advocate.
                </p>
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link to="/our-faith">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team - Updated with real names and contact info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Leader 1 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍⚖️</span>
              </div>
              <h3 className="text-xl font-semibold">Yeteshawork Berhanu</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                <a href="tel:+358415225889" className="hover:text-eecfin-gold transition-colors">
                  +358 41 522 58 89
                </a>
              </p>
            </div>
            
            {/* Leader 2 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Bruke Wolde</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                <a href="tel:+358451682997" className="hover:text-eecfin-gold transition-colors">
                  +358 45 168 2997
                </a>
              </p>
            </div>
            
            {/* Leader 3 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Hizekiel Daniel</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                <a href="tel:+358449869685" className="hover:text-eecfin-gold transition-colors">
                  +358 44 986 9685
                </a>
              </p>
            </div>

            {/* Leader 4 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Mekbib Tekle</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                <a href="tel:+358440822798" className="hover:text-eecfin-gold transition-colors">
                  +358 44 08 22 798
                </a>
              </p>
            </div>

            {/* Leader 5 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold">Tamirat Teshome</h3>
              <p className="text-eecfin-navy font-medium">Elder</p>
              <p className="mt-2 text-gray-600">
                <a href="tel:+358443514051" className="hover:text-eecfin-gold transition-colors">
                  +358 44 351 4051
                </a>
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
