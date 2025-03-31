
import { format } from 'date-fns';
import { supabase } from "@/lib/supabaseClient";

// Type for the Google Calendar API response
interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attachments?: {
    fileUrl: string;
    title: string;
    mimeType: string;
  }[];
}

// Type for our formatted event
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  day: number;
  month: string;
  year: number;
  colorId?: string;
  image?: string; // Optional image property for event
}

// Cache management for events 
const CACHE_KEY = 'calendar_events_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Add a local caching layer for the events
const getEventsFromCache = (): { events: Event[], timestamp: number } | null => {
  try {
    const cacheData = localStorage.getItem(CACHE_KEY);
    if (!cacheData) return null;
    
    const { events, timestamp } = JSON.parse(cacheData);
    
    // Return the cache if it's still valid
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return { events, timestamp };
    }
    
    return null;
  } catch (error) {
    console.log('Error reading from cache', error);
    return null;
  }
};

const saveEventsToCache = (events: Event[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      events,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.log('Error saving to cache', error);
  }
};

/**
 * Fetches events from Google Calendar API via Supabase Edge Function
 * With a local cache layer for better performance
 */
export async function fetchEvents(): Promise<{ events: Event[], error: string | null, status: string }> {
  try {
    console.log('fetchEvents called - Attempting to fetch calendar events from edge function');
    
    // Try to get events from cache first
    const cachedEvents = getEventsFromCache();
    if (cachedEvents) {
      console.log('Returning events from cache, count:', cachedEvents.events.length);
      return { 
        events: cachedEvents.events, 
        error: null, 
        status: 'success' 
      };
    }
    
    console.log('Cache miss - Fetching events from Supabase Edge Function');
    
    // Clear the cache to ensure a fresh call
    localStorage.removeItem(CACHE_KEY);
    
    // Call the Supabase Edge Function to get calendar events
    const { data, error } = await supabase.functions.invoke('fetch-calendar-events', {
      method: 'GET'
    });
    
    console.log('Edge function response received:', data, error);
    
    if (error) {
      console.error('Error invoking Supabase Edge Function:', error);
      return { 
        events: [], 
        error: `Failed to connect to calendar service: ${error.message}`, 
        status: 'error'
      };
    }
    
    if (data.error) {
      console.error('Error from Google Calendar API:', data.error, data.errorDetails || '');
      return { 
        events: [], 
        error: data.message || data.error, 
        status: 'error'
      };
    }
    
    // No errors, but check if we have any events
    if (!data.items || data.items.length === 0) {
      console.log('No events found in calendar');
      return { 
        events: [], 
        error: null, 
        status: 'empty'
      };
    }
    
    // Format the events returned from the edge function
    const formattedEvents = formatEvents(data.items);
    
    // Save the events to the cache
    saveEventsToCache(formattedEvents);
    
    console.log(`Successfully fetched ${formattedEvents.length} events from Google Calendar`);
    
    return { 
      events: formattedEvents, 
      error: null, 
      status: 'success' 
    };
  } catch (error) {
    console.error('Unexpected error fetching events:', error);
    return { 
      events: [], 
      error: `Unexpected error: ${error.message}`, 
      status: 'error'
    };
  }
}

/**
 * Formats the Google Calendar events into our application format
 */
function formatEvents(googleEvents: GoogleCalendarEvent[]): Event[] {
  if (!googleEvents || googleEvents.length === 0) {
    return [];
  }
  
  return googleEvents.map(event => {
    const startTime = new Date(event.start.dateTime);
    
    // Extract image from attachments if available
    let eventImage: string | undefined = undefined;
    if (event.attachments && event.attachments.length > 0) {
      const imageAttachment = event.attachments.find(
        attachment => attachment.mimeType.startsWith('image/')
      );
      if (imageAttachment) {
        eventImage = imageAttachment.fileUrl;
      }
    }
    
    return {
      id: event.id,
      title: event.summary,
      description: event.description || 'No description available',
      location: event.location || 'Location not specified',
      startTime: startTime,
      endTime: new Date(event.end.dateTime),
      day: startTime.getDate(),
      month: format(startTime, 'MMMM'),
      year: startTime.getFullYear(),
      colorId: event.colorId,
      image: eventImage
    };
  });
}
