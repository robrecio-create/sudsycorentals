import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      console.error('Google Places API key not configured');
      throw new Error('Google Places API key not configured');
    }

    const { placeId } = await req.json();
    
    if (!placeId) {
      console.error('Place ID is required');
      throw new Error('Place ID is required');
    }

    console.log(`Fetching reviews for place: ${placeId}`);

    // Fetch place details including reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log(`Google API response status: ${data.status}`);

    if (data.status !== 'OK') {
      console.error(`Google API error: ${data.status}`, data.error_message);
      throw new Error(`Google API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    const result = data.result;
    
    const reviews = (result.reviews || []).map((review: any) => ({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time,
      relative_time_description: review.relative_time_description,
      profile_photo_url: review.profile_photo_url,
    }));

    console.log(`Successfully fetched ${reviews.length} reviews`);

    return new Response(
      JSON.stringify({
        name: result.name,
        rating: result.rating,
        total_ratings: result.user_ratings_total,
        reviews,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
