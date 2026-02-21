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

    const placeId = 'ChIJ9SNomW8JnIgR4M_xsEd1qXU';

    // Try Places API (New) first - it tends to return more data
    console.log('Trying Places API (New)...');
    const newUrl = `https://places.googleapis.com/v1/places/${placeId}`;
    const newResponse = await fetch(newUrl, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,reviews,rating,userRatingCount,formattedAddress,businessStatus',
      },
    });
    const newData = await newResponse.json();
    console.log('New API HTTP status:', newResponse.status);
    console.log('New API name:', newData.displayName?.text);
    console.log('New API rating:', newData.rating);
    console.log('New API userRatingCount:', newData.userRatingCount);
    console.log('New API reviews count:', newData.reviews?.length || 0);
    console.log('New API address:', newData.formattedAddress);
    console.log('New API full:', JSON.stringify(newData).substring(0, 2000));

    if (newResponse.ok && newData.reviews?.length) {
      return new Response(JSON.stringify({
        reviews: newData.reviews.slice(0, 5).map((r: any) => ({
          author_name: r.authorAttribution?.displayName || 'Anonymous',
          rating: r.rating || 5,
          text: r.text?.text || r.originalText?.text || '',
          relative_time_description: r.relativePublishTimeDescription || 'recently',
          profile_photo_url: r.authorAttribution?.photoUri || null,
        })),
        overall_rating: newData.rating || 5.0,
        total_reviews: newData.userRatingCount || 0,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Fallback: legacy API
    console.log('New API had no reviews, trying legacy...');
    const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`;
    const legacyResponse = await fetch(legacyUrl);
    const legacyData = await legacyResponse.json();
    console.log('Legacy status:', legacyData.status);
    console.log('Legacy name:', legacyData.result?.name);
    console.log('Legacy rating:', legacyData.result?.rating);
    console.log('Legacy total:', legacyData.result?.user_ratings_total);
    console.log('Legacy reviews count:', legacyData.result?.reviews?.length || 0);

    if (legacyData.status === 'OK') {
      const result = legacyData.result;
      return new Response(JSON.stringify({
        reviews: (result.reviews || []).slice(0, 5).map((r: any) => ({
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

    throw new Error(`Both APIs failed`);
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
