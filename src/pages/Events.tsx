
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from 'lucide-react';

const Events = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-eecfin-navy text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us for worship services, prayer meetings, and community events.
          </p>
        </div>
      </section>

      {/* Regular Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title mb-8">Regular Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sunday Worship Service</h3>
              <div className="flex items-start mb-3">
                <Calendar className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>Every Sunday</p>
              </div>
              <div className="flex items-start mb-3">
                <Clock className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>10:00 AM - 12:00 PM</p>
              </div>
              <div className="flex items-start mb-5">
                <MapPin className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>Main Hall, Helsinki</p>
              </div>
              <p className="text-gray-600">
                Our main worship service includes praise and worship, prayer, and a sermon.
                Translation services available in Finnish and English.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Midweek Bible Study</h3>
              <div className="flex items-start mb-3">
                <Calendar className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>Every Wednesday</p>
              </div>
              <div className="flex items-start mb-3">
                <Clock className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>6:30 PM - 8:00 PM</p>
              </div>
              <div className="flex items-start mb-5">
                <MapPin className="h-5 w-5 mr-3 text-eecfin-navy flex-shrink-0 mt-1" />
                <p>Community Room, Helsinki</p>
              </div>
              <p className="text-gray-600">
                Join us for an in-depth study of scripture, prayer, and discussion in a smaller group setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {/* Event 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="bg-eecfin-navy text-white md:w-48 flex-shrink-0 flex flex-col justify-center items-center p-6 md:p-8">
                  <span className="text-2xl font-bold">14</span>
                  <span className="uppercase">January</span>
                  <span>2024</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Sunday Worship Service</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>10:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Main Hall, Helsinki</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join us for our weekly worship service with praise, prayer, and a message from God's Word.
                  </p>
                  <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="bg-eecfin-navy text-white md:w-48 flex-shrink-0 flex flex-col justify-center items-center p-6 md:p-8">
                  <span className="text-2xl font-bold">17</span>
                  <span className="uppercase">January</span>
                  <span>2024</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Midweek Bible Study</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>6:30 PM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Community Room, Helsinki</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Deepen your understanding of Scripture in our midweek Bible study group.
                  </p>
                  <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="bg-eecfin-navy text-white md:w-48 flex-shrink-0 flex flex-col justify-center items-center p-6 md:p-8">
                  <span className="text-2xl font-bold">20</span>
                  <span className="uppercase">January</span>
                  <span>2024</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Youth Fellowship</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>3:00 PM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Youth Center, Helsinki</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Special gathering for teenagers and young adults with games, discussions, and fellowship.
                  </p>
                  <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </div>

            {/* Event 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="bg-eecfin-navy text-white md:w-48 flex-shrink-0 flex flex-col justify-center items-center p-6 md:p-8">
                  <span className="text-2xl font-bold">27</span>
                  <span className="uppercase">January</span>
                  <span>2024</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Community Potluck</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>1:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Fellowship Hall, Helsinki</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join us for a community potluck lunch after the Sunday service. Bring a dish to share!
                  </p>
                  <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="section-title mb-8">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our mailing list or follow us on social media to stay updated
            on upcoming events and services.
          </p>
          <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
            Subscribe to Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
