import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID');
const SERMONS_PLAYLIST_ID = 'PLbVHz4urQBZlOM69HDFOaH0oR-Ql_7SpQ'; // ስብከቶች playlist ID

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to implement retries with exponential backoff
async function fetchWithRetry(url: string, options = {}, retries = 2) {
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
    const delay = Math.pow(2, 2 - retries) * 500;
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
    const delay = Math.pow(2, 2 - retries) * 500;
    console.log(`Network error. Retrying in ${delay}ms... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return fetchWithRetry(url, options, retries - 1);
  }
}

// Mock data to return when API calls fail
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

async function fetchLiveAndUploads(channelId: string) {
  // Check for live streams
  const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`;
  const liveResponse = await fetchWithRetry(liveUrl);
  const liveData = await liveResponse.json();

  // Fetch regular videos
  const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`;
  const response = await fetchWithRetry(videosUrl);
  const data = await response.json();

  return {
    liveStream: liveData.items?.[0],
    videos: data.items || []
  };
}

async function fetchPlaylistItems(playlistId: string) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${GOOGLE_API_KEY}`;
  const response = await fetchWithRetry(url);
  const data = await response.json();
  
  return data.items || [];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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

  const channelId = params.channelId || YOUTUBE_CHANNEL_ID;

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
        error: 'YouTube API not configured',
        hasRealData: false,
        videos: getMockVideoData() 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Fetch both live streams, regular videos and sermon playlist items
    const [channelContent, sermonPlaylistItems] = await Promise.all([
      fetchLiveAndUploads(channelId),
      fetchPlaylistItems(SERMONS_PLAYLIST_ID)
    ]);

    const { liveStream, videos } = channelContent;
    const isLive = !!liveStream;
    const liveVideoId = liveStream?.id?.videoId;

    // Format regular videos
    const formattedVideos = videos.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
      type: 'broadcast'
    }));

    // Format sermon playlist items
    const formattedSermons = sermonPlaylistItems.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
      type: 'sermon'
    }));

    return new Response(
      JSON.stringify({ 
        videos: formattedVideos,
        sermons: formattedSermons,
        hasRealData: true,
        isLive,
        liveVideoId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in fetch-youtube-videos edge function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Unable to fetch videos from YouTube",
        hasRealData: false,
        videos: getMockVideoData(),
        sermons: [],
        isLive: false,
        liveVideoId: null
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
