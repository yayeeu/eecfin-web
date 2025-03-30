
import { format } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
}

/**
 * Fetches events from Google Calendar API via Supabase Edge Function
 */
export async function fetchEvents(): Promise<Event[]> {
  try {
    // Check if we're in development or if Supabase is not configured
    const isDevelopment = import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL;
    
    if (isDevelopment) {
      console.info('Using mock data for events in development environment');
      return [];  // Return empty array instead of mock data
    }
    
    console.log('Fetching events from Supabase Edge Function');
    
    // Call the Supabase Edge Function to get calendar events
    const { data, error } = await supabase.functions.invoke('fetch-calendar-events', {
      method: 'GET'
    });
    
    if (error) {
      console.error('Error invoking Supabase Edge Function:', error);
      return []; 
    }
    
    if (data.error) {
      console.error('Error from Google Calendar API:', data.error);
      return [];
    }
    
    console.log('Events data received:', data);
    
    // Format the events returned from the edge function
    return formatEvents(data.items || []);
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; 
  }
}

/**
 * Formats the Google Calendar events into our application format
 */
function formatEvents(googleEvents: GoogleCalendarEvent[]): Event[] {
  if (!googleEvents || googleEvents.length === 0) {
    console.log('No events to format');
    return [];
  }
  
  console.log(`Formatting ${googleEvents.length} events`);
  
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
      image: eventImage // Only include image if available
    };
  });
}

// Remove the getMockEvents function completely as we don't want to use it anymore
