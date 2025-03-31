
import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const openGoogleMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  // Format the date to display as in the screenshot (e.g., "APR, WED")
  const formatDateLabel = () => {
    const date = new Date(event.startTime);
    const month = date.toLocaleString('en', { month: 'short' }).toUpperCase();
    const day = date.toLocaleString('en', { weekday: 'short' }).toUpperCase();
    return `${month}, ${day}`;
  };

  return (
    <div className="border-b border-gray-200 py-4 flex flex-col sm:flex-row">
      <div className="flex items-start mb-3 sm:mb-0">
        <div className="text-center mr-6 w-16">
          <div className="text-lg font-bold text-eecfin-navy">{event.day}</div>
          <div className="text-xs text-eecfin-navy/70">{formatDateLabel()}</div>
        </div>
        
        <div className="flex items-center text-eecfin-navy">
          <div className="h-2 w-2 bg-eecfin-navy rounded-full mr-2"></div>
          <span className="text-sm">
            {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} – 
            {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>
      </div>
      
      <div className="flex-grow ml-0 sm:ml-6">
        <h3 className="font-medium mb-1 text-eecfin-navy">{event.title}</h3>
        
        {event.location && event.location !== 'Location not specified' && (
          <div className="flex items-start text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-eecfin-navy/70" />
            <span className="text-sm">{event.location}</span>
          </div>
        )}
        
        {event.location && event.location !== 'Location not specified' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 text-xs border-eecfin-navy text-eecfin-navy hover:bg-eecfin-navy hover:text-white"
            onClick={() => openGoogleMaps(event.location)}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            Directions
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
