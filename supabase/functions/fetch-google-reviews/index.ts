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

    // Step 1: Find Place ID by text search
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Sudsy+Co+Rentals+Ocean+Springs+MS&inputtype=textquery&fields=place_id&key=${apiKey}`;
    
    console.log('Searching for Place ID...');
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    console.log('Search response:', JSON.stringify(searchData));

    let placeId: string;

    if (searchData.status === 'OK' && searchData.candidates?.length > 0) {
      placeId = searchData.candidates[0].place_id;
      console.log('Found Place ID:', placeId);
    } else if (searchData.status === 'REQUEST_DENIED') {
      // Places API not enabled - log helpful message
      console.error('REQUEST_DENIED - The Places API is likely not enabled for this API key.');
      console.error('Error message from Google:', searchData.error_message);
      
      // Try the Places API (New) as an alternative
      console.log('Trying Places API (New)...');
      const newApiUrl = `https://places.googleapis.com/v1/places:searchText`;
      const newResponse = await fetch(newApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.reviews,places.rating,places.userRatingCount',
        },
        body: JSON.stringify({
          textQuery: 'Sudsy Co Rentals Ocean Springs MS',
        }),
      });
      
      const newData = await newResponse.json();
      console.log('New API response status:', newResponse.status);
      console.log('New API response:', JSON.stringify(newData));
      
      if (!newResponse.ok || !newData.places?.length) {
        throw new Error(
          `Google Places API denied the request. Please enable the "Places API" in Google Cloud Console. ` +
          `Error: ${searchData.error_message || newData.error?.message || 'Unknown'}`
        );
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
    } else {
      throw new Error(`Place search failed: ${searchData.status} - ${searchData.error_message || 'No results'}`);
    }

    // Step 2: Fetch place details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    console.log('Fetching place details...');
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    console.log('Details response status:', detailsData.status);

    if (detailsData.status !== 'OK') {
      throw new Error(`Place details failed: ${detailsData.status} - ${detailsData.error_message || 'Unknown error'}`);
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
