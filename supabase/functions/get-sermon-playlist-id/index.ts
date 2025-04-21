
/**
 * GET SERMON PLAYLIST ID Edge Function
 * Returns the YouTube Playlist ID for sermons from secrets.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const onRequest = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Use Deno.env to get secret
  let playlistId = null;
  try {
    playlistId = Deno.env.get("SERMONS_PLAYLIST_ID");
  } catch (e) {
    console.error('Could not read SERMONS_PLAYLIST_ID secret:', e);
    return new Response(JSON.stringify({ error: 'Missing playlist ID' }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!playlistId) {
    return new Response(JSON.stringify({ error: "SERMONS_PLAYLIST_ID not set" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ playlistId }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};
