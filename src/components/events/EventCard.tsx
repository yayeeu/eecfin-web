
import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

// Google Calendar color mapping (default palette)
// These colors are based on Google Calendar's standard colors
const colorMap: Record<string, string> = {
  "1": "#7986cb", // Lavender
  "2": "#33b679", // Sage
  "3": "#8e24aa", // Grape
  "4": "#e67c73", // Flamingo
  "5": "#f6c026", // Banana
  "6": "#f5511d", // Tangerine
  "7": "#039be5", // Peacock
  "8": "#616161", // Graphite
  "9": "#3f51b5", // Blueberry
  "10": "#0b8043", // Basil
  "11": "#d60000", // Tomato
  // Default theme color
  "default": "#FEFCCA" // Theme color if no color is specified
};

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

  // Get the background color based on the event's colorId
  const getBackgroundColor = () => {
    if (!event.colorId) return colorMap.default;
    return colorMap[event.colorId] || colorMap.default;
  };

  // Determine if we need to use dark or light text based on background color brightness
  const getTextColor = () => {
    const bgColor = getBackgroundColor();
    
    // Skip the calculation for default color, always use navy
    if (bgColor === colorMap.default) return 'text-eecfin-navy';
    
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Use dark text for bright backgrounds, light text for dark backgrounds
    return brightness > 125 ? 'text-eecfin-navy' : 'text-white';
  };

  return (
    <div className="border-b border-gray-200 py-4 flex flex-col sm:flex-row">
      <div className="flex items-start mb-3 sm:mb-0">
        <div 
          className="text-center mr-6 w-16 p-2 rounded"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          <div className={`text-lg font-bold ${getTextColor()}`}>{event.day}</div>
          <div className={`text-xs ${getTextColor()} opacity-90`}>{formatDateLabel()}</div>
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
