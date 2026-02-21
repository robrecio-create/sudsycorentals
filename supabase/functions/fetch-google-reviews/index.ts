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

    // Use Places API (New) - better search and more reliable
    console.log('Searching via Places API (New)...');
    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.reviews,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: 'Sudsy Co. Washer and Dryer Rentals',
      }),
    });

    const searchData = await searchResponse.json();
    console.log('Search status:', searchResponse.status);
    console.log('Search response:', JSON.stringify(searchData));

    if (!searchResponse.ok) {
      throw new Error(`Places API error: ${searchData.error?.message || searchResponse.statusText}`);
    }

    if (!searchData.places?.length) {
      throw new Error('No places found matching the search query');
    }

    const place = searchData.places[0];
    console.log('Found place:', place.displayName?.text, '- Rating:', place.rating);

    return new Response(JSON.stringify({
      reviews: (place.reviews || []).map((r: any) => ({
        author_name: r.authorAttribution?.displayName || 'Anonymous',
        rating: r.rating || 5,
        text: r.text?.text || r.originalText?.text || '',
        relative_time_description: r.relativePublishTimeDescription || 'recently',
        profile_photo_url: r.authorAttribution?.photoUri || null,
        time: r.publishTime || null,
      })),
      overall_rating: place.rating || 5.0,
      total_reviews: place.userRatingCount || 0,
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
