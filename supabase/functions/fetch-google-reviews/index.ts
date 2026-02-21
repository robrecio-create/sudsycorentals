import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY is not configured');
    }

    // Try CID lookup - the CID from the Google Maps URL
    const cid = '13935908568849964001';
    console.log('Trying CID lookup...');
    const cidUrl = `https://maps.googleapis.com/maps/api/place/details/json?cid=${cid}&fields=place_id,name,reviews,rating,user_ratings_total&key=${apiKey}`;
    const cidResponse = await fetch(cidUrl);
    const cidData = await cidResponse.json();
    console.log('CID lookup status:', cidData.status);
    console.log('CID lookup result:', JSON.stringify(cidData).substring(0, 500));

    return new Response(JSON.stringify(cidData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
