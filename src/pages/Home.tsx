import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/googleCalendar';
import EmptyState from '@/components/events/EmptyState';
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events-preview'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get only the next 3 upcoming events
  const upcomingEvents = events.slice(0, 3);

  return (
    <div>
      {/* Image Slider Banner */}
      <ImageSlider />

      {/* YouTube Section with Mission Statement */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column: YouTube video and Media box */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex items-center mb-4">
                <Video className="mr-2 h-6 w-6 text-red-600" />
                <h2 className="section-title mb-0">Live & Recent Broadcasts</h2>
              </div>
              
              {/* YouTube Embed */}
              <div className="mb-6">
                <YouTubeEmbed 
                  channelId="eecfin" 
                  className="aspect-video w-full rounded-lg shadow-md overflow-hidden"
                />
              </div>
              
              {/* EECFIN Media Box (moved below video) */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-auto">
                <h3 className="text-xl font-semibold mb-4 text-eecfin-navy">EECFIN Media</h3>
                <p className="text-gray-700 mb-4">
                  Stay connected with our church through our broadcasts, sermons, and special events. 
                  Watch our services live or catch up on past messages.
                </p>
                <Button asChild className="w-full bg-eecfin-navy hover:bg-eecfin-navy/80">
                  <a href="https://www.youtube.com/@eecfin" target="_blank" rel="noopener noreferrer">
                    Visit Our YouTube Channel
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Right column: Our Mission */}
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md flex flex-col justify-center">
              <h2 className="section-title mb-6 text-center">Our Mission</h2>
              <p className="text-lg mb-8">
                We are a vibrant Ethiopian Christian community dedicated to spreading the Gospel, 
                nurturing spiritual growth, and providing a place of belonging for Ethiopians 
                and friends in Finland. Our church serves as a bridge between Ethiopian 
                Christian heritage and life in Finland.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                  <Link to="/who-we-are">About Our Church</Link>
                </Button>
              </div>
            </div>
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
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <Skeleton className="h-20 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6 rounded-lg text-center">
              <p className="text-red-800 mb-2">Error loading events</p>
              <p className="text-gray-600 text-sm">Please check your Google Calendar configuration</p>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-eecfin-navy text-white p-3 text-center">
                    <p className="text-sm">{`${event.month} ${event.day}, ${event.year}`}</p>
                    <p className="text-lg font-semibold">
                      {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <p className="text-sm text-gray-500">Location: {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              message="We don't have any events scheduled at the moment. Please check back soon for upcoming services and gatherings." 
            />
          )}
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
