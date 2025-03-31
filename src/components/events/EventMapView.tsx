
import React, { useState, useEffect, useRef } from 'react';
import { Event } from "@/lib/googleCalendar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import EmptyState from './EmptyState';

interface EventMapViewProps {
  events: Event[];
}

interface Marker {
  lat: number;
  lng: number;
  event: Event;
}

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York
const DEFAULT_ZOOM = 10;

const EventMapView: React.FC<EventMapViewProps> = ({ events }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [geocodeError, setGeocodeError] = useState(false);
  
  // Load Google Maps API
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Create script tag and load API
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    window.initMap = () => {
      initializeMap();
    };
    
    document.head.appendChild(googleMapScript);
    
    return () => {
      // Clean up
      window.initMap = undefined;
      const scriptTag = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`);
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);
  
  // Initialize map once Google Maps is loaded
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      const map = new google.maps.Map(mapRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true,
      });
      
      googleMapRef.current = map;
      setMapLoaded(true);
    } catch (error) {
      console.error("Error initializing map:", error);
      setGeocodeError(true);
    }
  };
  
  // Geocode event locations and add markers when events or map changes
  useEffect(() => {
    if (!mapLoaded || !googleMapRef.current || events.length === 0) return;
    
    const geocodeLocations = async () => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      const newMarkers: Marker[] = [];
      const geocoder = new google.maps.Geocoder();
      const bounds = new google.maps.LatLngBounds();
      let hasValidMarkers = false;
      
      // Process each event's location
      await Promise.all(events.map(async (event) => {
        if (!event.location || event.location === 'Location not specified') return;
        
        try {
          const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: event.location }, (results, status) => {
              if (status === 'OK' && results && results.length > 0) {
                resolve(results);
              } else {
                reject(new Error(`Geocode failed for ${event.location}: ${status}`));
              }
            });
          });
          
          const location = {
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng()
          };
          
          // Create marker
          const marker = new google.maps.Marker({
            position: location,
            map: googleMapRef.current,
            title: event.title,
            animation: google.maps.Animation.DROP,
          });
          
          // Add click listener to marker
          marker.addListener('click', () => {
            setSelectedEvent(event);
          });
          
          markersRef.current.push(marker);
          newMarkers.push({ ...location, event });
          bounds.extend(new google.maps.LatLng(location.lat, location.lng));
          hasValidMarkers = true;
        } catch (error) {
          console.error("Error geocoding location:", error);
        }
      }));
      
      setMarkers(newMarkers);
      
      // Adjust map to fit all markers
      if (hasValidMarkers && googleMapRef.current) {
        googleMapRef.current.fitBounds(bounds);
        
        // Ensure we don't zoom in too far for a single marker
        const listener = google.maps.event.addListener(googleMapRef.current, 'idle', () => {
          if (googleMapRef.current?.getZoom() && googleMapRef.current.getZoom() > 16) {
            googleMapRef.current.setZoom(16);
          }
          google.maps.event.removeListener(listener);
        });
      }
    };
    
    geocodeLocations().catch(error => {
      console.error("Error in geocoding process:", error);
      setGeocodeError(true);
    });
  }, [events, mapLoaded]);
  
  if (events.length === 0) {
    return <EmptyState />;
  }
  
  if (geocodeError) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg text-center">
        <h3 className="text-xl font-medium mb-2">Map Loading Error</h3>
        <p className="text-gray-700 mb-4">
          Unable to load the map. Please ensure Google Maps API key is properly configured.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
      <div className="relative rounded-lg overflow-hidden border h-[600px]">
        {!mapLoaded ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <div ref={mapRef} className="h-full w-full" />
        )}
      </div>
      
      <div>
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              {selectedEvent 
                ? "Showing selected event information" 
                : "Click on a marker to view event details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(selectedEvent.startTime).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(selectedEvent.startTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} - {new Date(selectedEvent.endTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-1" />
                  <span>{selectedEvent.location}</span>
                </div>
                
                <p className="text-gray-700 text-sm">{selectedEvent.description}</p>
                
                {selectedEvent.image && (
                  <div className="mt-2">
                    <img 
                      src={selectedEvent.image} 
                      alt={`${selectedEvent.title} banner`} 
                      className="w-full rounded-md"
                    />
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    Add to Calendar
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEvent.location)}`, 
                      '_blank'
                    )}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Select an event marker from the map to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventMapView;
