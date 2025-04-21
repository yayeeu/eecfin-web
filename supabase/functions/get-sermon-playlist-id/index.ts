
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const onRequest = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const playlistId = 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';
  
  return new Response(JSON.stringify({ playlistId }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};
