
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
  const checkLive = params.checkLive !== undefined ? params.checkLive : true;

  if (!channelId) {
    return new Response(
      JSON.stringify({ error: 'No YouTube channel ID configured', hasRealData: false }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY not configured in environment variables');
    return new Response(
      JSON.stringify({ 
        error: 'YouTube API not configured', 
        hasRealData: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Fetching YouTube videos for channel: ${channelId}`);

  try {
    let isLive = false;
    let liveVideoId = null;

    // Check for live streams if requested
    if (checkLive) {
      console.log('Checking for live streams...');
      const liveResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`
      );
      
      if (!liveResponse.ok) {
        throw new Error(`YouTube API error (live check): ${liveResponse.status} ${liveResponse.statusText}`);
      }
      
      const liveData = await liveResponse.json();
      
      if (liveData.items && liveData.items.length > 0) {
        console.log('Live broadcast found');
        isLive = true;
        liveVideoId = liveData.items[0].id.videoId;
      }
    }

    // Fetch videos from channel
    console.log('Fetching videos from channel...');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error (video fetch): ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.log('No videos found for this channel');
      return new Response(
        JSON.stringify({ 
          videos: [], 
          hasRealData: false,
          isLive,
          liveVideoId
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
    
    console.log(`Fetched ${videos.length} videos from YouTube`);
    
    return new Response(
      JSON.stringify({ 
        videos, 
        hasRealData: true,
        isLive,
        liveVideoId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to load videos. Please try again later.",
        hasRealData: false
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
