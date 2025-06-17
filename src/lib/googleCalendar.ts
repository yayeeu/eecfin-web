import { format } from 'date-fns';

// Type for the Google Calendar API response
interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
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
  colorId?: string;
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
  image?: string; // Optional image property for event
  colorId?: string; // Optional color ID from Google Calendar
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
 * Fetches events from Google Calendar API directly
 * With a local cache layer for better performance
 */
export async function fetchEvents(): Promise<{ events: Event[], error: string | null, status: string }> {
  try {
    console.log('fetchEvents called - Attempting to fetch calendar events directly');
    
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
    
    console.log('Cache miss - Fetching events from Google Calendar API');
    
    // Clear the cache to ensure a fresh call
    localStorage.removeItem(CACHE_KEY);

    const API_KEY = import.meta.env.VITE_CALENDAR_API_KEY;
    const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID;

    if (!API_KEY || !CALENDAR_ID) {
      throw new Error('Missing Google Calendar API configuration');
    }

    // Get current date for API request
    const now = new Date();
    const timeMin = now.toISOString();
    
    // Calculate timeMax - 3 months from now
    const threeMonthsLater = new Date(now);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const timeMax = threeMonthsLater.toISOString();
    
    console.log(`Fetching events from ${timeMin} to ${timeMax} for calendar ID: ${CALENDAR_ID}`);
    
    // Build URL with proper encoding and parameters
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&maxResults=100&singleEvents=true&orderBy=startTime&colorRgbFormat=true`;

    console.log(`Calling Google Calendar API: ${url.replace(API_KEY, "[REDACTED]")}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Calendar API error (${response.status}): ${errorText}`);
      
      return { 
        events: [], 
        error: `Failed to fetch events: ${response.statusText} (${response.status})`, 
        status: 'error'
      };
    }

    const data = await response.json();
    console.log(`Events fetched successfully. Total events: ${data.items ? data.items.length : 0}`);
    
    if (!data.items || data.items.length === 0) {
      console.log("No events found in the calendar for the next 3 months");
      return { 
        events: [], 
        error: null, 
        status: 'empty'
      };
    }
    
    // Format the events
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
      image: eventImage,
      colorId: event.colorId
    };
  });
}
