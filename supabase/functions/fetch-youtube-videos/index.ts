
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { fetchWithRetry } from './fetchWithRetry.ts';
import { getMockVideoData } from './mockData.ts';
import { fetchLiveAndUploads } from './fetchLiveAndUploads.ts';
import { fetchPlaylistItems } from './fetchPlaylistItems.ts';

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID');
const SERMONS_PLAYLIST_ID = 'PLI8Nt_ZL1WmJ5w7YGYAUtSyB7Vz1pIHnV';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Edge function called: fetch-youtube-videos");
  
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
    console.log(`Fetching videos for channel: ${channelId}`);
    console.log(`Using sermons playlist ID: ${SERMONS_PLAYLIST_ID}`);
    
    // Fetch: live, past live, regular uploads, and sermon playlist items
    let channelContent, sermonPlaylistItems;
    try {
      [channelContent, sermonPlaylistItems] = await Promise.all([
        fetchLiveAndUploads(channelId, GOOGLE_API_KEY),
        fetchPlaylistItems(SERMONS_PLAYLIST_ID, GOOGLE_API_KEY)
      ]);
      console.log(`Successfully fetched ${sermonPlaylistItems.length} sermon playlist items`);
      console.log(`Successfully fetched ${channelContent.videos.length} regular videos`);
      console.log(`Successfully fetched ${channelContent.pastLiveVideos.length} past live videos`);
    } catch (error) {
      console.error("Error fetching videos or playlist items:", error);
      throw error;
    }

    const { liveStream, pastLiveVideos, videos } = channelContent;
    const isLive = !!liveStream;
    const liveVideoId = liveStream?.id?.videoId;

    // Format regular videos (broadcasts)
    const formattedVideos = videos.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
      type: 'broadcast'
    }));

    // Format past live videos
    const formattedPastLives = pastLiveVideos.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
      type: 'past_live'
    }));

    // Format sermon playlist items
    const formattedSermons = sermonPlaylistItems.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
      type: 'sermon'
    }));

    console.log(`Returning ${formattedVideos.length} broadcasts, ${formattedPastLives.length} past lives, and ${formattedSermons.length} sermons`);
    if (isLive) {
      console.log(`Live stream detected: ${liveVideoId}`);
    }

    return new Response(
      JSON.stringify({ 
        videos: formattedVideos,
        pastLives: formattedPastLives,
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
        errorDetails: error.message,
        hasRealData: false,
        videos: getMockVideoData(),
        sermons: [],
        isLive: false,
        liveVideoId: null,
        pastLives: []
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
