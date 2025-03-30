
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY") || "";
const CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID") || "";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Add CORS headers to all responses
  const responseHeaders = { ...corsHeaders, "Content-Type": "application/json" };

  // Check if API keys are available
  if (!GOOGLE_API_KEY || !CALENDAR_ID) {
    console.error("Missing Google Calendar API configuration");
    return new Response(
      JSON.stringify({
        error: "Google Calendar API keys not configured",
        items: []
      }),
      { headers: responseHeaders }
    );
  }

  try {
    // Get current date and format for API request
    const timeMin = new Date().toISOString();
    console.log(`Fetching events starting from ${timeMin}`);
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&maxResults=10&singleEvents=true&orderBy=startTime`;

    console.log(`Calling Google Calendar API: ${url.replace(GOOGLE_API_KEY, "[REDACTED]")}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Calendar API error (${response.status}): ${errorText}`);
      throw new Error(`Failed to fetch events: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log(`Events fetched successfully. Total events: ${data.items ? data.items.length : 0}`);
    
    // Ensure we return an empty items array if there are no events
    if (!data.items) {
      data.items = [];
    }
    
    return new Response(
      JSON.stringify(data),
      { headers: responseHeaders }
    );
  } catch (error) {
    console.error("Error fetching calendar events:", error.message);
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        items: [],
        message: "Failed to fetch events from Google Calendar. Please check your API key and calendar ID."
      }),
      { headers: responseHeaders, status: 500 }
    );
  }
});
