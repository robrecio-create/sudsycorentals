import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Known Place ID for Sudsy Co. Washer and Dryer Rentals - extracted from Google Maps embed
// This is more reliable than text search
const SUDSY_CO_PLACE_ID = 'ChIJUZmataUJnIgR4dvdrd5aZ8E';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY is not configured');
    }

    // Strategy 0: Direct Place ID lookup (most reliable)
    console.log('Strategy 0: Direct Place ID lookup...');
    const directParams = new URLSearchParams({
      place_id: SUDSY_CO_PLACE_ID,
      fields: 'name,reviews,rating,user_ratings_total',
      reviews_sort: 'newest',
      key: apiKey,
    });
    const directResp = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${directParams}`);
    const directData = await directResp.json();
    console.log('Direct lookup status:', directData.status);

    if (directData.status === 'OK' && directData.result?.reviews?.length) {
      const result = directData.result;
      console.log('Direct lookup success! Reviews:', result.reviews.length, 'Total:', result.user_ratings_total);
      return new Response(JSON.stringify({
        reviews: result.reviews.slice(0, 5).map((r: any) => ({
          author_name: r.author_name,
          rating: r.rating,
          text: r.text,
          relative_time_description: r.relative_time_description,
          profile_photo_url: r.profile_photo_url,
        })),
        overall_rating: result.rating || 5.0,
        total_reviews: result.user_ratings_total || 0,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Strategy 1: Use text search via New API
    console.log('Strategy 1: Text search via New API...');
    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.reviews,places.rating,places.userRatingCount,places.formattedAddress',
      },
      body: JSON.stringify({ textQuery: 'Sudsy Co Washer and Dryer Rentals Ocean Springs Mississippi' }),
    });
    const searchData = await searchResponse.json();
    console.log('Search HTTP:', searchResponse.status);

    if (searchData.places?.length) {
      const place = searchData.places[0];
      console.log('Found place, reviews:', place.reviews?.length || 0);

      if (place.reviews?.length) {
        return new Response(JSON.stringify({
          reviews: place.reviews.slice(0, 5).map((r: any) => ({
            author_name: r.authorAttribution?.displayName || 'Anonymous',
            rating: r.rating || 5,
            text: r.text?.text || r.originalText?.text || '',
            relative_time_description: r.relativePublishTimeDescription || 'recently',
            profile_photo_url: r.authorAttribution?.photoUri || null,
          })),
          overall_rating: place.rating || 5.0,
          total_reviews: place.userRatingCount || 0,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // Strategy 2: Use CID to resolve via legacy findplacefromtext
    console.log('Strategy 2: Find place from CID...');
    const findParams = new URLSearchParams({
      input: 'Sudsy Co Washer and Dryer Rentals',
      inputtype: 'textquery',
      locationbias: 'point:30.4113,-88.8278',
      fields: 'place_id,name',
      key: apiKey,
    });
    const findResp = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${findParams}`);
    const findData = await findResp.json();
    console.log('Find status:', findData.status);

    if (findData.candidates?.length) {
      const placeId = findData.candidates[0].place_id;
      console.log('Resolved place_id:', placeId);

      const detailsParams = new URLSearchParams({
        place_id: placeId,
        fields: 'name,reviews,rating,user_ratings_total',
        reviews_sort: 'newest',
        key: apiKey,
      });
      const detailsResp = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${detailsParams}`);
      const detailsData = await detailsResp.json();
      console.log('Details status:', detailsData.status);

      if (detailsData.status === 'OK' && detailsData.result?.reviews?.length) {
        const result = detailsData.result;
        return new Response(JSON.stringify({
          reviews: result.reviews.slice(0, 5).map((r: any) => ({
            author_name: r.author_name,
            rating: r.rating,
            text: r.text,
            relative_time_description: r.relative_time_description,
            profile_photo_url: r.profile_photo_url,
          })),
          overall_rating: result.rating || 5.0,
          total_reviews: result.user_ratings_total || 0,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // Strategy 3: Try CID-based lookup via maps URL resolve
    console.log('Strategy 3: Legacy text search with full name...');
    const legacyParams = new URLSearchParams({
      query: 'Sudsy Co Rentals 1302 Fort St Ocean Springs MS',
      key: apiKey,
    });
    const legacyResp = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${legacyParams}`);
    const legacyData = await legacyResp.json();
    console.log('Legacy status:', legacyData.status);
    console.log('Legacy results:', legacyData.results?.length || 0);

    if (legacyData.results?.length) {
      const placeId = legacyData.results[0].place_id;
      const s3DetailsParams = new URLSearchParams({
        place_id: placeId,
        fields: 'name,reviews,rating,user_ratings_total',
        reviews_sort: 'newest',
        key: apiKey,
      });
      const detailsResp = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${s3DetailsParams}`);
      const detailsData = await detailsResp.json();
      console.log('S3 Details status:', detailsData.status);

      if (detailsData.status === 'OK' && detailsData.result?.reviews?.length) {
        const result = detailsData.result;
        return new Response(JSON.stringify({
          reviews: result.reviews.slice(0, 5).map((r: any) => ({
            author_name: r.author_name,
            rating: r.rating,
            text: r.text,
            relative_time_description: r.relative_time_description,
            profile_photo_url: r.profile_photo_url,
          })),
          overall_rating: result.rating || 5.0,
          total_reviews: result.user_ratings_total || 0,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    console.log('All strategies failed - returning fallback reviews');
    return new Response(JSON.stringify({
      reviews: [],
      overall_rating: 5.0,
      total_reviews: 32,
      fallback: true,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
