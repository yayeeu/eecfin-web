
import React from 'react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import MonthHeader from './MonthHeader';
import EventPagination from './EventPagination';

interface EventListViewProps {
  events: Event[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalEvents: number;
}

const EventListView: React.FC<EventListViewProps> = ({ 
  events, 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalEvents 
}) => {
  if (events.length === 0) {
    return <EmptyState />;
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
    <div className="space-y-4">
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="mb-8">
          <MonthHeader monthYear={monthYear} />
          
          <div className="border-t border-gray-200">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <EventPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default EventListView;
