
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';

interface EventListViewProps {
  events: Event[];
  onRefresh?: () => void;
}

const EventListView: React.FC<EventListViewProps> = ({ events, onRefresh }) => {
  if (events.length === 0) {
    return <EmptyState onRefresh={onRefresh} />;
  }

  // Group events by month and year
  const groupedEvents = events.reduce((acc, event) => {
    const monthYear = `${event.month} ${event.year}`;
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Events
        </Button>
      </div>
      
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-eecfin-navy flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> {monthYear}
          </h3>
          
          <div className="space-y-6">
            {monthEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="bg-eecfin-navy text-white md:w-48 flex-shrink-0 flex flex-col justify-center items-center p-6 md:p-8">
                    <span className="text-2xl font-bold">{event.day}</span>
                    <span className="uppercase">{event.month}</span>
                    <span>{event.year}</span>
                  </div>
                  <div className={`md:flex flex-grow ${!event.image ? 'w-full' : ''}`}>
                    {event.image ? (
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className={`p-6 ${event.image ? 'md:w-2/3' : 'w-full'}`}>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListView;
