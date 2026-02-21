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

    // Step 1: Find Place ID using textsearch (more flexible than findplacefromtext)
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Sudsy+Co+Washer+Dryer+Rentals+Ocean+Springs+MS&key=${apiKey}`;
    console.log('Searching for place...');
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    console.log('Search status:', searchData.status);
    console.log('Results count:', searchData.results?.length || 0);

    if (searchData.status !== 'OK' || !searchData.results?.length) {
      // Fallback: try Places API (New)
      console.log('Legacy search failed, trying Places API (New)...');
      const newResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.reviews,places.rating,places.userRatingCount',
        },
        body: JSON.stringify({ textQuery: 'Sudsy Co Washer Dryer Rentals Ocean Springs MS' }),
      });
      const newData = await newResponse.json();
      console.log('New API status:', newResponse.status);
      console.log('New API response:', JSON.stringify(newData).substring(0, 500));

      if (!newResponse.ok || !newData.places?.length) {
        throw new Error(`Could not find business. Legacy: ${searchData.status} - ${searchData.error_message || 'No results'}. New: ${newData.error?.message || 'No results'}`);
      }

      const place = newData.places[0];
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
    }

    const placeId = searchData.results[0].place_id;
    console.log('Found Place ID:', placeId);

    // Step 2: Fetch detailed reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK') {
      throw new Error(`Place details failed: ${detailsData.status}`);
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
