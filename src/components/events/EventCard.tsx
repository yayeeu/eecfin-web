
import React from 'react';
import { MapPin, ExternalLink, Users, Clock } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

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
  "default": "#1A3352" // eecfin-navy
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const openGoogleMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const formatDateLabel = () => {
    const date = new Date(event.startTime);
    const month = date.toLocaleString('en', { month: 'short' }).toUpperCase();
    const day = date.toLocaleString('en', { weekday: 'short' }).toUpperCase();
    return `${month}, ${day}`;
  };

  const getBackgroundColor = () => {
    if (!event.colorId) return colorMap.default;
    return colorMap[event.colorId] || colorMap.default;
  };

  const getTextColor = () => {
    const bgColor = getBackgroundColor();
    
    if (bgColor === colorMap.default) return 'text-white';
    
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'text-gray-900' : 'text-white';
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white group">
      <div className="flex flex-col sm:flex-row">
        {/* Date Section */}
        <div 
          className="text-center p-4 min-w-[120px] flex flex-col justify-center relative"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          <div className="absolute top-2 right-2">
            <Users className="h-4 w-4 opacity-60" />
          </div>
          <div className={`text-2xl font-bold ${getTextColor()}`}>{event.day}</div>
          <div className={`text-sm ${getTextColor()} opacity-90 font-medium`}>{formatDateLabel()}</div>
          <div className={`text-xs ${getTextColor()} opacity-75 mt-1 flex items-center justify-center gap-1`}>
            <Clock className="h-3 w-3" />
            {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-grow p-6">
          <h3 className="font-bold text-xl mb-3 text-eecfin-navy group-hover:text-eecfin-gold transition-colors leading-tight">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
          
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Clock className="h-4 w-4 mr-2 text-eecfin-navy" />
                <span className="text-gray-700">
                  {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – 
                  {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {event.location && event.location !== 'Location not specified' && (
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-eecfin-navy" />
                  <span className="text-gray-700 font-medium">{event.location}</span>
                </div>
              )}
            </div>
            
            {event.location && event.location !== 'Location not specified' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4 border-eecfin-navy text-eecfin-navy hover:bg-eecfin-navy hover:text-white transition-all duration-300 shadow-sm"
                onClick={() => openGoogleMaps(event.location)}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Directions
              </Button>
            )}
          </div>

          {/* Community engagement indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-eecfin-navy to-eecfin-gold rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-eecfin-gold to-eecfin-accent rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-eecfin-accent to-eecfin-navy rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">+</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Community Event</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
