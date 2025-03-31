
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/googleCalendar';
import EmptyState from '@/components/events/EmptyState';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const UpcomingEventsSection = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['events-preview'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    meta: {
      onError: (err: Error) => {
        toast.error("Failed to load upcoming events");
        console.error("Error loading events:", err);
      }
    }
  });

  // Execute side effect for error toast outside of the query config
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load upcoming events");
      console.error("Error loading events:", error);
    }
  }, [error]);

  const events = data?.events || [];
  const errorMessage = data?.error || (error as Error)?.message;
  const status = data?.status;
  
  // Get only the next 3 upcoming events
  const upcomingEvents = events.slice(0, 3);

  console.log("Upcoming events section - data:", { 
    eventsCount: events.length,
    upcomingCount: upcomingEvents.length,
    status,
    error: errorMessage
  });

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <CalendarIcon className="h-7 w-7 mr-3 text-eecfin-navy" />
            <h2 className="section-title mb-0">Upcoming Events</h2>
          </div>
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
        ) : (isError || status === 'error') ? (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-800 mb-2">Error loading events</p>
            <p className="text-gray-600 text-sm mb-4">{errorMessage || "Please check your Google Calendar configuration"}</p>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="bg-eecfin-navy text-white p-3 text-center relative">
                  <div className="absolute left-0 top-0 h-full w-2 bg-eecfin-gold"></div>
                  <p className="text-sm">{`${event.month} ${event.day}, ${event.year}`}</p>
                  <p className="text-lg font-semibold">
                    {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-eecfin-navy transition-colors">{event.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                  <p className="text-sm text-gray-500">Location: {event.location}</p>
                  
                  {event.image && (
                    <div className="mt-3">
                      <img 
                        src={event.image} 
                        alt={`${event.title}`}
                        className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(event.image, '_blank')}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            message={status === 'empty' 
              ? "We don't have any events scheduled at the moment. Please check back soon for upcoming services and gatherings."
              : "There was an issue retrieving events. Please check back later."}
          />
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
