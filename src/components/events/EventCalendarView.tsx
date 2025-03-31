
import React from 'react';
import { Card } from "@/components/ui/card";
import { Event } from "@/lib/googleCalendar";
import EventCard from './EventCard';
import { format } from 'date-fns';
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
  return (
    <div className="space-y-6">
      {/* Calendar View */}
      <div className="bg-white p-4 rounded-lg shadow w-full overflow-hidden">
        <div className="w-full aspect-video relative overflow-hidden">
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=c_3634df7d40b0663553a6f59b958bfc6f9cdfef2bd1781356c59c7ab21686e3e3%40group.calendar.google.com&ctz=Europe%2FHelsinki&showTabs=0&showCalendars=0&showTz=0&showPrint=0&showNav=1&showTitle=0&mode=MONTH&showDate=1&showTabs=0&showCalendars=0&hideDetails=1&sf=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
      
      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          {filteredEvents.length > 0 ? (
            <div className="border-t border-gray-200">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState message="No events scheduled for this date." />
          )}
        </div>
      )}
    </div>
  );
};

export default EventCalendarView;
