
import React from 'react';
import { Button } from "@/components/ui/button";
import { Music, Heart, Users, BookOpen, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInvolved = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-eecfin-navy text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover ways to connect, serve, and grow as part of our church community.
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Ways to Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-eecfin-navy/10 p-3 rounded-full">
                  <Music className="h-6 w-6 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Worship Team</h3>
              <p className="text-gray-600 mb-4 text-center">
                Join our worship team as a musician, singer, or technical support.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Vocalists and choir members</li>
                <li>Instrumentalists</li>
                <li>Sound and projection operators</li>
                <li>Weekly rehearsals and Sunday services</li>
              </ul>
              <div className="text-center">
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Join the Team
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-eecfin-navy/10 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Outreach & Missions</h3>
              <p className="text-gray-600 mb-4 text-center">
                Participate in our community outreach and mission initiatives.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Local community service projects</li>
                <li>Support for new immigrants</li>
                <li>Food and clothing drives</li>
                <li>Mission trips to Ethiopia</li>
              </ul>
              <div className="text-center">
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Volunteer
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-eecfin-navy/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Children & Youth</h3>
              <p className="text-gray-600 mb-4 text-center">
                Work with children and youth to help build a strong foundation of faith.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Sunday school teachers</li>
                <li>Youth group leaders</li>
                <li>Vacation Bible School volunteers</li>
                <li>Mentoring programs</li>
              </ul>
              <div className="text-center">
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Get Involved
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-eecfin-navy/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Bible Study & Education</h3>
              <p className="text-gray-600 mb-4 text-center">
                Lead or participate in Bible studies and educational programs.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Small group leaders</li>
                <li>Bible study teachers</li>
                <li>Translation services</li>
                <li>Educational resource development</li>
              </ul>
              <div className="text-center">
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-eecfin-navy/10 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Hospitality</h3>
              <p className="text-gray-600 mb-4 text-center">
                Help create a welcoming environment for all who visit our church.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li>Greeting team</li>
                <li>Coffee and refreshment service</li>
                <li>New member welcome committee</li>
                <li>Event planning and coordination</li>
              </ul>
              <div className="text-center">
                <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  Join Our Team
                </Button>
              </div>
            </div>
          </div>
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
