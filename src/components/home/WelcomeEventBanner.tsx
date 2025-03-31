
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/googleCalendar';

const WelcomeEventBanner = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['next-event'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  // Get only the next upcoming event
  const nextEvent = data?.events?.[0] || null;
  
  if (isLoading) {
    return (
      <section className="py-8 bg-eecfin-navy bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center bg-blend-overlay">
        <div className="container-custom">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-white/20 rounded w-1/2 mb-6"></div>
            <div className="h-10 bg-white/20 rounded w-36"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no event is available
  if (!nextEvent) {
    return (
      <section className="py-8 bg-eecfin-navy bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center bg-blend-overlay">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome to Ethiopian Evangelical Church in Finland</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">Join our vibrant community for worship, fellowship, and spiritual growth.</p>
            <Button asChild className="bg-eecfin-gold hover:bg-eecfin-gold/90 text-eecfin-navy font-semibold">
              <Link to="/events">View Our Calendar</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Format date for display
  const eventDate = new Date(nextEvent.startTime);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long',
    day: 'numeric'
  });
  
  // Format time for display
  const startTime = new Date(nextEvent.startTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  return (
    <section className="bg-eecfin-navy relative bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center bg-blend-overlay">
      <div className="container-custom py-6">
        <div className="bg-white/95 p-6 rounded-lg shadow-lg md:w-5/6 mx-auto relative transform translate-y-0 md:-translate-y-12">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-grow md:pr-6">
              <div className="flex items-center text-eecfin-gold mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium">Next Event</span>
              </div>
              <h3 className="text-2xl font-bold text-eecfin-navy mb-2">{nextEvent.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{formattedDate} at {startTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{nextEvent.location}</span>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2 mb-4">{nextEvent.description}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80 group w-full md:w-auto">
                <Link to="/events" className="flex items-center justify-center">
                  Join Us 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeEventBanner;
