
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

// Helper functions for color handling
const getBackgroundColor = (colorId?: string) => {
  if (!colorId) return colorMap.default;
  return colorMap[colorId] || colorMap.default;
};

const getTextColor = (colorId?: string) => {
  const bgColor = getBackgroundColor(colorId);
  
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
    </div>
  );
};

export default EventCalendarView;
