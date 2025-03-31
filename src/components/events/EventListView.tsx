
import React, { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Event } from "@/lib/googleCalendar";
import EmptyState from './EmptyState';
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface EventListViewProps {
  events: Event[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalEvents: number;
}

interface GoogleMapRefs {
  [key: string]: {
    mapRef: React.RefObject<HTMLDivElement>;
    map: google.maps.Map | null;
    marker: google.maps.Marker | null;
  };
}

const EventListView: React.FC<EventListViewProps> = ({ 
  events, 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalEvents 
}) => {
  const mapRefs = useRef<GoogleMapRefs>({});
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  
  // Load Google Maps API
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      setMapsLoaded(true);
      geocoder.current = new google.maps.Geocoder();
      return;
    }

    // Create script tag and load API
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    googleMapScript.onload = () => {
      setMapsLoaded(true);
      geocoder.current = new google.maps.Geocoder();
    };
    
    document.head.appendChild(googleMapScript);
    
    return () => {
      const scriptTag = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`);
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);
  
  // Initialize maps once Google Maps is loaded
  useEffect(() => {
    if (!mapsLoaded || !events.length) return;
    
    // Initialize maps for each event
    events.forEach(event => {
      if (!event.location || event.location === 'Location not specified') return;
      
      const eventId = event.id;
      
      // Skip if map is already initialized
      if (mapRefs.current[eventId]?.map) return;
      
      const mapElement = mapRefs.current[eventId]?.mapRef.current;
      if (!mapElement) return;
      
      // Create map
      const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: { lat: 0, lng: 0 }, // Default center, will be updated by geocoding
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
      });
      
      // Create marker
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: 0, lng: 0 }, // Will be updated by geocoding
      });
      
      // Store references
      mapRefs.current[eventId] = {
        ...mapRefs.current[eventId],
        map,
        marker,
      };
      
      // Geocode location
      if (geocoder.current) {
        geocoder.current.geocode({ address: event.location }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const location = results[0].geometry.location;
            map.setCenter(location);
            marker.setPosition(location);
          }
        });
      }
    });
  }, [mapsLoaded, events]);

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleOpenImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };
  
  const openGoogleMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  // Create map references for new events
  events.forEach(event => {
    if (!mapRefs.current[event.id]) {
      mapRefs.current[event.id] = {
        mapRef: React.createRef<HTMLDivElement>(),
        map: null,
        marker: null,
      };
    }
  });

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing {events.length} of {totalEvents} events
      </p>
      
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-eecfin-navy flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> {monthYear}
          </h3>
          
          <div className="space-y-4">
            {monthEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-eecfin-navy text-white p-4 md:w-24 flex flex-row md:flex-col justify-between md:justify-center items-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold">{event.day}</span>
                      <div className="text-xs uppercase">{event.month.substring(0, 3)}</div>
                    </div>
                    <div className="md:mt-1 text-xs">{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  
                  <div className="flex-grow p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-2/3">
                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-1">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1.5" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                            Add to Calendar
                          </Button>
                          {event.location && event.location !== 'Location not specified' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => openGoogleMaps(event.location)}
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              Directions
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 flex flex-col gap-2">
                        {event.image && (
                          <div 
                            className="h-32 cursor-pointer rounded overflow-hidden" 
                            onClick={() => handleOpenImage(event.image!)}
                          >
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="h-full w-full object-cover hover:opacity-90 transition-opacity"
                            />
                          </div>
                        )}
                        
                        {event.location && event.location !== 'Location not specified' && (
                          <div 
                            className="h-32 rounded overflow-hidden border" 
                            ref={mapRefs.current[event.id]?.mapRef}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePreviousPage} 
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => onPageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNextPage} 
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default EventListView;
