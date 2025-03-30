
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { List, CalendarDays } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchEvents } from "@/lib/googleCalendar";
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import EventListView from '@/components/events/EventListView';
import EventCalendarView from '@/components/events/EventCalendarView';
import EmptyState from '@/components/events/EmptyState';

type ViewType = "list" | "calendar";

const Events = () => {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredEvents = selectedDate 
    ? events.filter(event => {
        const eventDate = new Date(event.startTime);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : events;

  return (
    <div>
      <section className="bg-eecfin-navy text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us for worship services, prayer meetings, and community events.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
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

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <p className="text-lg">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              <p>Error loading events. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && (
            <div>
              {viewType === "list" && <EventListView events={events} />}
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
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
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
