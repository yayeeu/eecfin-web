
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  const getEventFallbackImage = (eventTitle: string) => {
    const initials = eventTitle
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    return initials;
  };

  // Group events by date for calendar tooltips
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(new Date(event.startTime), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Function to render date cell content
  const renderDay = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayEvents = eventsByDate[dateKey] || [];
    
    return (
      <div className="relative w-full h-full flex flex-col">
        <span className={`mx-auto ${dayEvents.length > 0 ? 'font-bold' : ''}`}>
          {date.getDate()}
        </span>
        {dayEvents.length > 0 && (
          <div className="mt-1 flex justify-center">
            <span className="h-1.5 w-1.5 bg-eecfin-navy rounded-full"></span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {showFullCalendar ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowFullCalendar(false)}
              className="flex items-center text-eecfin-navy font-medium"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Split View
            </button>
            
            <h3 className="text-xl font-semibold">
              {selectedDate ? format(selectedDate, 'MMMM yyyy') : 'Select a Date'}
            </h3>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              classNames={{
                month: "w-full",
                table: "w-full border-collapse",
                head_cell: "text-muted-foreground rounded-md font-normal text-[0.9rem] px-1 py-2",
                cell: "h-20 p-0 relative focus-within:relative focus-within:z-20 border border-gray-100",
                day: "h-20 w-full p-1 font-normal aria-selected:opacity-100",
                day_selected: "bg-blue-50 text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
                caption: "flex justify-center pt-1 relative items-center text-sm px-10",
                caption_label: "text-lg font-medium"
              }}
              components={{
                Day: ({ date }) => renderDay(date)
              }}
            />
          </div>
          
          <div className="mt-6">
            {selectedDate && (
              <div>
                <h3 className="text-xl font-medium mb-4">
                  Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h3>
                
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <h4 className="font-medium text-lg">{event.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
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
                      </div>
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
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_1fr] gap-8">
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>Click on a date to view events</CardDescription>
                </div>
                <button 
                  onClick={() => setShowFullCalendar(true)}
                  className="text-sm text-eecfin-navy hover:underline"
                >
                  Expand Calendar
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-6 w-full"
                components={{
                  Day: ({ date }) => renderDay(date)
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  <>Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}</>
                ) : (
                  <>All Upcoming Events</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        {event.image ? (
                          <Avatar className="h-14 w-14 rounded-md">
                            <AvatarImage src={event.image} alt={event.title} className="object-cover" />
                            <AvatarFallback className="bg-eecfin-navy text-white rounded-md">
                              {getEventFallbackImage(event.title)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-14 w-14 rounded-md bg-eecfin-navy text-white flex items-center justify-center">
                            <span className="text-lg font-semibold">{getEventFallbackImage(event.title)}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
                          
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState 
                  filteredView={true} 
                  message={selectedDate 
                    ? "There are no events scheduled for this date. Please select another date or check back later." 
                    : undefined
                  } 
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EventCalendarView;
