
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
        items: [],
        status: "error",
        message: "Please configure GOOGLE_API_KEY and GOOGLE_CALENDAR_ID in Supabase Edge Function secrets."
      }),
      { headers: responseHeaders, status: 500 }
    );
  }

  try {
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
    )}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&maxResults=100&singleEvents=true&orderBy=startTime`;

    console.log(`Calling Google Calendar API: ${url.replace(GOOGLE_API_KEY, "[REDACTED]")}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Calendar API error (${response.status}): ${errorText}`);
      
      return new Response(
        JSON.stringify({
          error: `Failed to fetch events: ${response.statusText} (${response.status})`,
          items: [],
          status: "error",
          errorDetails: errorText,
          message: "Error from Google Calendar API. Please check your API key and calendar ID."
        }),
        { headers: responseHeaders, status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Events fetched successfully. Total events: ${data.items ? data.items.length : 0}`);
    
    if (!data.items || data.items.length === 0) {
      console.log("No events found in the calendar for the next 3 months");
      return new Response(
        JSON.stringify({
          items: [],
          status: "empty",
          message: "No upcoming events found for the next 3 months"
        }),
        { headers: responseHeaders }
      );
    }
    
    // Return success response with events data
    return new Response(
      JSON.stringify({
        ...data,
        status: "success",
        message: `Successfully fetched ${data.items.length} events`
      }),
      { headers: responseHeaders }
    );
  } catch (error) {
    console.error("Error fetching calendar events:", error.message, error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        items: [],
        status: "error",
        message: "Failed to fetch events from Google Calendar. Please check your API key and calendar ID."
      }),
      { headers: responseHeaders, status: 500 }
    );
  }
});
