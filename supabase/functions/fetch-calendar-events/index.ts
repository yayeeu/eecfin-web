
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY") || "";
const CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID") || "";

serve(async (req) => {
  // Check if API keys are available
  if (!GOOGLE_API_KEY || !CALENDAR_ID) {
    return new Response(
      JSON.stringify({
        error: "Google Calendar API keys not configured",
        items: []
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&maxResults=10&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching calendar events:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message, items: [] }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
