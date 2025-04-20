
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID');

// Maximum number of retries for API calls
const MAX_RETRIES = 2;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to implement retries with exponential backoff
async function fetchWithRetry(url: string, options = {}, retries = MAX_RETRIES) {
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      return response;
    }
    
    // If we've run out of retries, throw the error
    if (retries === 0) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    // Exponential backoff delay (500ms, 1000ms, 2000ms, etc.)
    const delay = Math.pow(2, MAX_RETRIES - retries) * 500;
    console.log(`Retrying in ${delay}ms... (${retries} retries left)`);
    
    // Wait for the delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry the request with one less retry attempt
    return fetchWithRetry(url, options, retries - 1);
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    
    // If it's a network error, retry
    const delay = Math.pow(2, MAX_RETRIES - retries) * 500;
    console.log(`Network error. Retrying in ${delay}ms... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return fetchWithRetry(url, options, retries - 1);
  }
}

// Mock data to return when API calls fail (for development/backup)
const getMockVideoData = () => {
  return [
    {
      id: 'mock-video-1',
      title: 'Sunday Service (Most Recent)',
      publishedAt: new Date().toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+Unavailable'
    },
    {
      id: 'mock-video-2',
      title: 'Weekly Prayer Meeting',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+Unavailable'
    }
  ];
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
      JSON.stringify({ 
        error: 'Invalid request body',
        hasRealData: false,
        videos: getMockVideoData() 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Use channel ID from params if provided, otherwise fall back to environment variable
  const channelId = params.channelId || YOUTUBE_CHANNEL_ID;
  const checkLive = params.checkLive !== undefined ? params.checkLive : true;

  // Check if we have the necessary configuration
  if (!channelId) {
    console.warn('No YouTube channel ID provided or configured');
    return new Response(
      JSON.stringify({ 
        error: 'No YouTube channel ID configured', 
        hasRealData: false,
        videos: getMockVideoData() 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY not configured in environment variables');
    return new Response(
      JSON.stringify({ 
        error: 'YouTube API not configured, please check your environment variables.', 
        hasRealData: false,
        videos: getMockVideoData() 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Fetching YouTube videos for channel: ${channelId}`);

  try {
    let isLive = false;
    let liveVideoId = null;

    // Check for live streams if requested
    if (checkLive) {
      console.log('Checking for live streams...');
      try {
        const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`;
        const liveResponse = await fetchWithRetry(liveUrl);
        
        const liveData = await liveResponse.json();
        
        if (liveData.items && liveData.items.length > 0) {
          console.log('Live broadcast found');
          isLive = true;
          liveVideoId = liveData.items[0].id.videoId;
        }
      } catch (liveError) {
        console.warn("Error checking for live streams:", liveError.message);
        // Continue execution to fetch regular videos
      }
    }

    // Fetch videos from channel
    console.log('Fetching videos from channel...');
    try {
      const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`;
      const response = await fetchWithRetry(videosUrl);
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        console.log('No videos found for this channel');
        return new Response(
          JSON.stringify({ 
            videos: [], 
            hasRealData: true,
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
        thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail'
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
    } catch (videoError) {
      console.error("Error fetching videos:", videoError);
      // Instead of throwing, we'll return a more graceful response with mock data
      return new Response(
        JSON.stringify({ 
          error: "Unable to fetch videos from YouTube at this time. The API might be temporarily unavailable.",
          hasRealData: false,
          isLive: false,
          liveVideoId: null,
          videos: getMockVideoData()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error in fetch-youtube-videos edge function:", error);
    return new Response(
      JSON.stringify({ 
        error: "We are experiencing issues connecting to YouTube. Please try again later.",
        hasRealData: false,
        isLive: false,
        liveVideoId: null,
        videos: getMockVideoData()
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
