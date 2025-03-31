
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarLucide } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  message?: string;
  filteredView?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  filteredView = false
}) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <CalendarLucide className="h-12 w-12 text-eecfin-navy mx-auto mb-4 opacity-60" />
    <h3 className="text-xl font-medium mb-2">
      {filteredView ? "No events on selected date" : "No upcoming events"}
    </h3>
    <p className="text-gray-600 mb-6">
      {message || "We don't have any events scheduled at the moment. Please check back soon for upcoming services and gatherings."}
    </p>
    <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
      <Link to="/contact">Contact Us</Link>
    </Button>
  </div>
);

export default EmptyState;
