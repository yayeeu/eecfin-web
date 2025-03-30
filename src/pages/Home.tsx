
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-eecfin-navy text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Ethiopian Evangelical Church in Finland</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">A place of worship, community, and spiritual growth for Ethiopians and friends in Finland</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
              <Link to="/who-we-are">Learn More</Link>
            </Button>
            <Button asChild variant="outline" className="border-eecfin-gold text-eecfin-gold hover:bg-eecfin-gold/10">
              <Link to="/contact">Visit Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">Our Mission</h2>
            <p className="text-lg mb-8">
              We are a vibrant Ethiopian Christian community dedicated to spreading the Gospel, 
              nurturing spiritual growth, and providing a place of belonging for Ethiopians 
              and friends in Finland. Our church serves as a bridge between Ethiopian 
              Christian heritage and life in Finland.
            </p>
            <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
              <Link to="/who-we-are">About Our Church</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Join Our Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Calendar className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Weekly Services</h3>
              <p className="text-gray-600">
                Join us every Sunday for worship service, prayer meetings, 
                and Bible studies throughout the week.
              </p>
              <Button variant="link" asChild className="mt-4 text-eecfin-navy">
                <Link to="/events">View Schedule</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Users className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Groups</h3>
              <p className="text-gray-600">
                Connect with others through our various community groups for 
                all ages and life stages.
              </p>
              <Button variant="link" asChild className="mt-4 text-eecfin-navy">
                <Link to="/get-involved">Find a Group</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-eecfin-navy/10 rounded-full">
                  <Heart className="h-8 w-8 text-eecfin-navy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Outreach & Support</h3>
              <p className="text-gray-600">
                Participate in our community outreach programs and support networks 
                for newcomers to Finland.
              </p>
              <Button variant="link" asChild className="mt-4 text-eecfin-navy">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Upcoming Events</h2>
            <Button asChild variant="outline" className="border-eecfin-navy text-eecfin-navy">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-eecfin-navy text-white p-3 text-center">
                <p className="text-sm">Sunday, January 14, 2024</p>
                <p className="text-lg font-semibold">10:00 AM - 12:00 PM</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Sunday Worship Service</h3>
                <p className="text-gray-600 mb-3">Join us for our weekly worship service with praise, prayer, and a message from God's Word.</p>
                <p className="text-sm text-gray-500">Location: Helsinki, Finland</p>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-eecfin-navy text-white p-3 text-center">
                <p className="text-sm">Wednesday, January 17, 2024</p>
                <p className="text-lg font-semibold">6:30 PM - 8:00 PM</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Midweek Bible Study</h3>
                <p className="text-gray-600 mb-3">Deepen your understanding of Scripture in our midweek Bible study group.</p>
                <p className="text-sm text-gray-500">Location: Helsinki, Finland</p>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-eecfin-navy text-white p-3 text-center">
                <p className="text-sm">Saturday, January 20, 2024</p>
                <p className="text-lg font-semibold">3:00 PM - 5:00 PM</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Youth Fellowship</h3>
                <p className="text-gray-600 mb-3">Special gathering for teenagers and young adults with games, discussions, and fellowship.</p>
                <p className="text-sm text-gray-500">Location: Helsinki, Finland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eecfin-navy text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Come Worship With Us</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We welcome you to join our community and grow together in faith.
          </p>
          <Button asChild className="bg-eecfin-gold text-eecfin-navy hover:bg-eecfin-accent">
            <Link to="/contact">Plan Your Visit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
