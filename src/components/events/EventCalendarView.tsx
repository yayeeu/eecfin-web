
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';
import { format } from "date-fns";

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
  const getEventFallbackImage = (eventTitle: string) => {
    const initials = eventTitle
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    return initials;
  };

  return (
    <div className="space-y-6">
      {/* Calendar View */}
      <div className="bg-white p-4 rounded-lg shadow w-full overflow-hidden">
        <div className="w-full aspect-video relative overflow-hidden">
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=c_3634df7d40b0663553a6f59b958bfc6f9cdfef2bd1781356c59c7ab21686e3e3%40group.calendar.google.com&ctz=Europe%2FHelsinki&showTabs=0&showCalendars=0&showTz=0&showPrint=0&showNav=1&showTitle=0" 
            style={{ border: 0 }} 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Event Details Section */}
      {selectedDate && (
        <div>
          <h3 className="text-xl font-medium mb-4">
            Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{event.description}</p>
                    
                    {event.image && (
                      <div className="mt-3">
                        <img 
                          src={event.image} 
                          alt={`${event.title} banner`} 
                          className="w-full rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(event.image, '_blank')}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              filteredView={true} 
              message="There are no events scheduled for this date. Please select another date or check back later." 
            />
          )}
        </div>
      )}
      
      {!selectedDate && (
        <EmptyState
          filteredView={false}
          message="Please select a date on the calendar to view events."
        />
      )}
    </div>
  );
};

export default EventCalendarView;
