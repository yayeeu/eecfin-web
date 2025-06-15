
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/googleCalendar';

interface WelcomeEventBannerProps {
  overlayStyle?: boolean;
}

const WelcomeEventBanner = ({ overlayStyle = false }: WelcomeEventBannerProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['next-event'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  const nextEvent = data?.events?.[0] || null;
  
  if (isLoading) {
    return (
      <div className={overlayStyle ? "bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4" : "py-12 bg-gradient-to-r from-eecfin-navy via-eecfin-navy to-eecfin-navy/90 relative overflow-hidden w-full"}>
        {!overlayStyle && (
          <div className="absolute inset-0 bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center opacity-20"></div>
        )}
        <div className={overlayStyle ? "" : "container-custom relative z-10"}>
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-white/20 rounded w-1/2 mb-6"></div>
            <div className="h-10 bg-white/20 rounded w-36"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!nextEvent) {
    return (
      <div className={overlayStyle ? "bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4" : "py-12 bg-gradient-to-r from-eecfin-navy via-eecfin-navy to-eecfin-navy/90 relative overflow-hidden w-full"}>
        {!overlayStyle && (
          <>
            <div className="absolute inset-0 bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-eecfin-navy/80 to-eecfin-navy/60"></div>
          </>
        )}
        <div className={overlayStyle ? "" : "container-custom relative z-10"}>
          <div className={`text-center ${overlayStyle ? 'text-eecfin-navy' : 'text-white'}`}>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Join Our Next Service</h2>
            <p className="text-sm mb-4">Experience vibrant worship and warm fellowship in our community.</p>
            <Button asChild size="sm" className={overlayStyle ? "bg-eecfin-navy hover:bg-eecfin-navy/80 text-white" : "bg-eecfin-gold hover:bg-eecfin-gold/90 text-eecfin-navy font-semibold"}>
              <Link to="/events">View Calendar</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const eventDate = new Date(nextEvent.startTime);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long',
    day: 'numeric'
  });
  
  const startTime = new Date(nextEvent.startTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  if (overlayStyle) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-white/20">
        <div className="flex items-center text-eecfin-navy mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="font-semibold text-sm">Next Event</span>
        </div>
        <h3 className="text-lg font-bold text-eecfin-navy mb-3 line-clamp-1">{nextEvent.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 text-xs">
            <Clock className="h-3 w-3 mr-2 flex-shrink-0 text-eecfin-navy" />
            <span className="truncate">{formattedDate} at {startTime}</span>
          </div>
          <div className="flex items-center text-gray-700 text-xs">
            <MapPin className="h-3 w-3 mr-2 flex-shrink-0 text-eecfin-navy" />
            <span className="truncate">{nextEvent.location}</span>
          </div>
        </div>
        <Button asChild size="sm" className="w-full bg-eecfin-navy hover:bg-eecfin-navy/80 group shadow-lg">
          <Link to="/events" className="flex items-center justify-center text-xs">
            Join Us 
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <section className="bg-gradient-to-r from-eecfin-navy via-eecfin-navy to-eecfin-navy/90 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-eecfin-navy/80 to-eecfin-navy/60"></div>
      
      <div className="container-custom py-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl md:w-5/6 mx-auto border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-grow">
              <div className="flex items-center text-eecfin-gold mb-3">
                <Calendar className="h-6 w-6 mr-3" />
                <span className="font-semibold text-lg">Next Event</span>
              </div>
              <h3 className="text-3xl font-bold text-eecfin-navy mb-4">{nextEvent.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-eecfin-navy" />
                  <span className="font-medium">{formattedDate} at {startTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-eecfin-navy" />
                  <span className="truncate font-medium">{nextEvent.location}</span>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2 mb-6 text-lg leading-relaxed">{nextEvent.description}</p>
            </div>
            
            <div className="lg:ml-8">
              <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/90 text-white group w-full lg:w-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-xl">
                <Link to="/events" className="flex items-center justify-center gap-3">
                  Join Us 
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
