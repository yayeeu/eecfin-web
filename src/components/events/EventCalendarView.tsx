
import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "@/lib/googleCalendar";
import EventCard from './EventCard';
import EmptyState from './EmptyState';

interface EventCalendarViewProps {
  events: Event[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  filteredEvents: Event[];
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({ 
  events, 
  selectedDate, 
  setSelectedDate,
  filteredEvents
}) => {
  // Create an array of dates that have events
  const eventDates = useMemo(() => {
    const dates = new Set<string>();
    events.forEach(event => {
      const date = new Date(event.startTime);
      dates.add(date.toDateString());
    });
    return Array.from(dates).map(dateStr => new Date(dateStr));
  }, [events]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <div className="lg:col-span-1">
        <Card className="p-4 shadow-md">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full"
            // Highlight dates with events
            modifiers={{
              eventDay: eventDates,
            }}
            modifiersClassNames={{
              eventDay: "bg-eecfin-navy/20 text-eecfin-navy font-medium",
            }}
          />
        </Card>
      </div>
      
      {/* Events for selected date */}
      <div className="lg:col-span-2">
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-eecfin-navy">
            {selectedDate ? (
              <>Events for {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</>
            ) : (
              <>Select a date to view events</>
            )}
          </h3>
          
          {filteredEvents.length > 0 ? (
            <div className="space-y-2">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState 
              message={selectedDate ? "There are no events scheduled for this date." : "Select a date to view events."} 
              filteredView={!!selectedDate} 
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default EventCalendarView;
