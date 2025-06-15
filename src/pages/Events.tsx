
import React, { useState, useMemo } from 'react';
import { List, CalendarDays, AlertCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchEvents } from "@/lib/googleCalendar";
import { useQuery } from '@tanstack/react-query';
import EventListView from '@/components/events/EventListView';
import EventCalendarView from '@/components/events/EventCalendarView';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type ViewType = "list" | "calendar";

const Events = () => {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 7; // Changed from 10 to 7

  // Optimized data fetching with proper caching strategy
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });

  // Handle errors with useEffect
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load events");
      console.error("Error loading events:", error);
    }
  }, [error]);

  const events = data?.events || [];
  const errorMessage = data?.error || (error as Error)?.message;
  const status = data?.status;
  
  console.log("Events page - data:", { 
    eventsCount: events.length,
    status,
    error: errorMessage
  });
  
  // Memoize filtered events to prevent unnecessary calculations on re-renders
  const filteredEvents = useMemo(() => {
    if (!selectedDate) return events;
    
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  }, [events, selectedDate]);

  // Calculate pagination for list view
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return events.slice(startIndex, startIndex + eventsPerPage);
  }, [events, currentPage, eventsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div>
      <section className="relative bg-eecfin-navy overflow-hidden h-64">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
            alt="Church background" 
            className="w-full h-full object-cover opacity-30"
            loading="eager" // Prioritize loading for above-the-fold image
          />
          <div className="absolute inset-0 bg-eecfin-navy/60"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Events & Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Join us for worship services, prayer meetings, and community events.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_35%] gap-8">
            {/* Main Content */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="section-title mb-4 md:mb-0">Upcoming Events</h2>
                <ToggleGroup type="single" defaultValue="list" value={viewType} onValueChange={(value) => value && setViewType(value as ViewType)}>
                  <ToggleGroupItem value="list" aria-label="Toggle list view">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </ToggleGroupItem>
                  <ToggleGroupItem value="calendar" aria-label="Toggle calendar view">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Calendar
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Loading Skeletons */}
              {isLoading && (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="md:flex">
                        <Skeleton className="h-48 md:w-48" />
                        <div className="p-6 w-full">
                          <Skeleton className="h-8 w-3/4 mb-4" />
                          <Skeleton className="h-4 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-2/3 mb-4" />
                          <Skeleton className="h-20 w-full mb-4" />
                          <Skeleton className="h-10 w-40" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {(isError || status === 'error') && (
                <div className="bg-red-50 p-8 rounded-lg text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Error Loading Events</h3>
                  <p className="text-gray-700 mb-6">
                    {errorMessage || "There was a problem fetching events from Google Calendar. Please check your configuration and try again."}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Make sure your Google Calendar API key and Calendar ID are properly set in Supabase secrets.
                  </p>
                </div>
              )}

              {/* Content */}
              {!isLoading && !isError && status !== 'error' && (
                <div>
                  {viewType === "list" && (
                    <EventListView 
                      events={paginatedEvents} 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      totalEvents={events.length}
                    />
                  )}
                  {viewType === "calendar" && (
                    <EventCalendarView 
                      events={events}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      filteredEvents={filteredEvents}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right Side Image */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <img 
                  src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
                  alt="Church community gathering" 
                  className="w-full h-[600px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Removed "Stay Updated" section */}
    </div>
  );
};

export default React.memo(Events);
