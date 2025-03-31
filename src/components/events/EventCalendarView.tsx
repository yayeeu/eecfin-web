
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';
import { format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeView, setActiveView] = useState<'calendar' | 'details'>('calendar');
  
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

  const navigateMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

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
          <div className="mt-1 flex flex-col items-center">
            <span className="h-1.5 w-1.5 bg-eecfin-navy rounded-full mb-1"></span>
            <div className="text-xs text-center line-clamp-2 max-w-[80px] mx-auto">
              {dayEvents.map((event, idx) => (
                <div key={idx} className="truncate hover:text-eecfin-navy cursor-pointer">
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="calendar"
            className="flex-1"
            onClick={() => setActiveView('calendar')}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="flex-1"
            onClick={() => setActiveView('details')}
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            Event Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1">Previous</span>
              </Button>
              
              <h3 className="text-xl font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <span className="mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              classNames={{
                month: "w-full",
                table: "w-full border-collapse",
                head_cell: "text-muted-foreground rounded-md font-normal text-[0.9rem] px-1 py-2",
                cell: "h-24 p-0 relative focus-within:relative focus-within:z-20 border border-gray-100",
                day: "h-24 w-full p-1 font-normal aria-selected:opacity-100",
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
        </TabsContent>

        <TabsContent value="details" className="mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCalendarView;
