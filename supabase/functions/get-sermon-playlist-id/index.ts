
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const onRequest = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the playlist ID from the environment or use the default one
  // Use SERMONS_PLAYLIST_ID environment variable if available
  const playlistId = 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';
  
  return new Response(JSON.stringify({ playlistId }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};
