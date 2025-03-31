
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin, RefreshCw } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';
import { Button } from "@/components/ui/button";

interface EventCalendarViewProps {
  events: Event[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  filteredEvents: Event[];
  onRefresh?: () => void;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({ 
  events, 
  selectedDate, 
  setSelectedDate,
  filteredEvents,
  onRefresh
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
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
      <div>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Click on a date to view events</CardDescription>
              </div>
              {onRefresh && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRefresh}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-6 w-full"
              classNames={{
                month: "w-full",
                table: "w-full border-collapse",
                head_cell: "text-muted-foreground rounded-md w-14 font-normal text-[0.9rem] px-1",
                cell: "h-14 w-14 text-center p-0 relative focus-within:relative focus-within:z-20",
                day: "h-14 w-14 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                nav: "space-x-1 flex items-center justify-between w-full",
                caption: "flex justify-center pt-1 relative items-center text-sm px-10",
                caption_label: "text-lg font-medium"
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <>Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</>
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
                        <p className="text-sm text-gray-700">{event.description}</p>
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
    </div>
  );
};

export default EventCalendarView;
