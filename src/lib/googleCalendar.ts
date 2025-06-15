
import { supabase } from '@/lib/supabaseClient';

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  day: string;
  month: string;
  year: string;
  image?: string;
  colorId?: string;
}

export interface CalendarResponse {
  events: Event[];
  status: 'success' | 'error' | 'empty';
  error?: string;
}

// Cache for events to reduce API calls
let cachedEvents: CalendarResponse | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchEvents = async (): Promise<CalendarResponse> => {
  console.log("fetchEvents called - Attempting to fetch calendar events from edge function");

  // Check cache first
  const now = Date.now();
  if (cachedEvents && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log("Cache hit - Using cached events");
    return cachedEvents;
  }

  console.log("Cache miss - Fetching events from Supabase Edge Function");

  try {
    const { data, error } = await supabase.functions.invoke('fetch-calendar-events', {
      body: {}
    });

    if (error) {
      console.error('Error calling edge function:', error);
      const errorResponse: CalendarResponse = {
        events: [],
        status: 'error',
        error: `Failed to fetch events: ${error.message}`
      };
      return errorResponse;
    }

    if (!data) {
      console.error('No data returned from edge function');
      const errorResponse: CalendarResponse = {
        events: [],
        status: 'error',
        error: 'No data returned from calendar service'
      };
      return errorResponse;
    }

    // Handle different response formats
    if (data.error) {
      console.error('API Error:', data.error);
      const errorResponse: CalendarResponse = {
        events: [],
        status: 'error',
        error: data.error
      };
      return errorResponse;
    }

    // Process the events
    const events: Event[] = data.items?.map((item: any) => {
      const startDateTime = new Date(item.start?.dateTime || item.start?.date);
      const endDateTime = new Date(item.end?.dateTime || item.end?.date);
      
      return {
        id: item.id,
        title: item.summary || 'Untitled Event',
        description: item.description || '',
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        location: item.location || 'Location not specified',
        day: startDateTime.getDate().toString(),
        month: startDateTime.toLocaleString('en', { month: 'short' }),
        year: startDateTime.getFullYear().toString(),
        image: item.attachments?.[0]?.fileUrl || undefined,
        colorId: item.colorId || undefined
      };
    }) || [];

    const response: CalendarResponse = {
      events,
      status: events.length > 0 ? 'success' : 'empty'
    };

    // Cache the successful response
    cachedEvents = response;
    cacheTimestamp = now;

    console.log(`Successfully processed ${events.length} events`);
    return response;

  } catch (error) {
    console.error('Unexpected error fetching events:', error);
    const errorResponse: CalendarResponse = {
      events: [],
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return errorResponse;
  }
};

// Function to clear cache (useful for debugging)
export const clearEventsCache = () => {
  cachedEvents = null;
  cacheTimestamp = 0;
};
