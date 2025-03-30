import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, List, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchEvents } from "@/lib/googleCalendar";

type ViewType = "list" | "calendar";
type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  day: number;
  month: string;
  year: number;
  image?: string;
};

const Events = () => {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    async function loadEvents() {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  const filteredEvents = selectedDate 
    ? events.filter(event => {
        const eventDate = new Date(event.startTime);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : events;

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
    <div>
      <section className="bg-eecfin-navy text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us for worship services, prayer meetings, and community events.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="section-title mb-4 md:mb-0">Upcoming Events</h2>
            <ToggleGroup type="single" defaultValue="list" value={viewType} onValueChange={(value) => value && setViewType(value as ViewType)}>
              <ToggleGroupItem value="list" aria-label="Toggle list view">
                <List className="h-4 w-4 mr-2" />
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="calendar" aria-label="Toggle calendar view">
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <p className="text-lg">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div>
              {viewType === "list" && (
                <div className="space-y-6">
                  {events.length > 0 ? (
                    events.map((event) => (
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
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-lg text-gray-600">No upcoming events found.</p>
                    </div>
                  )}
                </div>
              )}

              {viewType === "calendar" && (
                <div className="grid md:grid-cols-[300px_1fr] gap-8">
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Date</CardTitle>
                        <CardDescription>Click on a date to view events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="border rounded-md"
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
                          <p className="text-center py-8 text-gray-500">No events found for this date.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to our mailing list or follow us on social media to stay updated
            on upcoming events and services.
          </p>
          <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
            Subscribe to Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
