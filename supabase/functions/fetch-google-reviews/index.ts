import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // First, find the Place ID by searching for the business name
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Sudsy+Co+Rentals+Ocean+Springs+MS&inputtype=textquery&fields=place_id&key=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    let placeId: string;
    if (searchData.status === 'OK' && searchData.candidates?.length > 0) {
      placeId = searchData.candidates[0].place_id;
    } else {
      throw new Error(`Could not find Place ID: ${searchData.status}`);
    }

    // Fetch place details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK') {
      throw new Error(`Google Places Details API failed: ${detailsData.status} - ${detailsData.error_message || 'Unknown error'}`);
    }

    const result = detailsData.result;
    return new Response(JSON.stringify({
      reviews: (result.reviews || []).map((r: any) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        relative_time_description: r.relative_time_description,
        profile_photo_url: r.profile_photo_url,
        time: r.time,
      })),
      overall_rating: result.rating || 5.0,
      total_reviews: result.user_ratings_total || 0,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to fetch reviews' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
