
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Parse request body
  let params;
  try {
    params = await req.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Use channel ID from params if provided, otherwise fall back to environment variable
  const channelId = params.channelId || YOUTUBE_CHANNEL_ID;

  if (!channelId) {
    return new Response(
      JSON.stringify({ error: 'No YouTube channel ID configured' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY not configured in environment variables');
    return new Response(
      JSON.stringify({ error: 'YouTube API not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // First check for live streams
    console.log('Checking for live streams...');
    const liveResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`
    );
    
    if (!liveResponse.ok) {
      console.error(`YouTube API error (live check): ${liveResponse.status}`);
      throw new Error(`YouTube API error (live check): ${liveResponse.status}`);
    }
    
    const liveData = await liveResponse.json();
    console.log('Live stream response:', liveData);
    
    let isLive = false;
    let liveVideoId = null;
    
    if (liveData.items && liveData.items.length > 0) {
      console.log('Found live stream');
      isLive = true;
      liveVideoId = liveData.items[0].id.videoId;
    }

    // Fetch latest videos regardless of live status
    console.log('Fetching latest videos...');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      console.error(`YouTube API error (video fetch): ${response.status}`);
      throw new Error(`YouTube API error (video fetch): ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.items?.length || 0} videos`);
    
    if (!data.items || data.items.length === 0) {
      return new Response(
        JSON.stringify({ 
          videos: [], 
          isLive: false,
          liveVideoId: null,
          hasRealData: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url
    }));
    
    return new Response(
      JSON.stringify({ 
        videos, 
        isLive,
        liveVideoId,
        hasRealData: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to load videos" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
