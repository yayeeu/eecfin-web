
import { format } from 'date-fns';

// The Google Calendar API key (this is a placeholder - you'll need to replace with your actual API key)
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
const CALENDAR_ID = 'YOUR_CALENDAR_ID'; // Replace with your actual calendar ID (typically an email address)

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
 * Fetches events from Google Calendar API
 */
export async function fetchEvents(): Promise<Event[]> {
  // For development/testing, return mock data
  // Remove this and uncomment the API fetch code when you have your API key
  return getMockEvents();

  // Uncomment this code when you have your Google Calendar API key
  /*
  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${API_KEY}&timeMin=${timeMin}&maxResults=10&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    return formatEvents(data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  */
}

/**
 * Formats the Google Calendar events into our application format
 */
function formatEvents(googleEvents: GoogleCalendarEvent[]): Event[] {
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

/**
 * Returns mock events for development/testing
 */
function getMockEvents(): Event[] {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const twoWeeks = new Date(today);
  twoWeeks.setDate(today.getDate() + 14);
  
  return [
    {
      id: '1',
      title: 'Sunday Worship Service',
      description: 'Join us for our weekly worship service with praise, prayer, and a message from God\'s Word.',
      location: 'Main Hall, Helsinki',
      startTime: new Date(today.setHours(10, 0, 0, 0)),
      endTime: new Date(today.setHours(12, 0, 0, 0)),
      day: today.getDate(),
      month: format(today, 'MMMM'),
      year: today.getFullYear(),
      image: '/images/worship-service.jpg' // Mock image path
    },
    {
      id: '2',
      title: 'Midweek Bible Study',
      description: 'Deepen your understanding of Scripture in our midweek Bible study group.',
      location: 'Community Room, Helsinki',
      startTime: new Date(nextWeek.setHours(18, 30, 0, 0)),
      endTime: new Date(nextWeek.setHours(20, 0, 0, 0)),
      day: nextWeek.getDate(),
      month: format(nextWeek, 'MMMM'),
      year: nextWeek.getFullYear(),
      // No image for this event to demonstrate the conditional rendering
    },
    {
      id: '3',
      title: 'Youth Fellowship',
      description: 'Special gathering for teenagers and young adults with games, discussions, and fellowship.',
      location: 'Youth Center, Helsinki',
      startTime: new Date(twoWeeks.setHours(15, 0, 0, 0)),
      endTime: new Date(twoWeeks.setHours(17, 0, 0, 0)),
      day: twoWeeks.getDate(),
      month: format(twoWeeks, 'MMMM'),
      year: twoWeeks.getFullYear(),
      image: '/images/youth-fellowship.jpg' // Mock image path
    }
  ];
}
