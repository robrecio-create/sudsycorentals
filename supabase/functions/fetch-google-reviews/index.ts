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
    
    // Try legacy API first
    console.log('Trying legacy Place Details...');
    const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total&key=${apiKey}`;
    const legacyResponse = await fetch(legacyUrl);
    const legacyData = await legacyResponse.json();
    console.log('Legacy status:', legacyData.status);

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

    // Fallback: Places API (New)
    console.log('Legacy failed, trying Places API (New)...');
    const newUrl = `https://places.googleapis.com/v1/places/${placeId}`;
    const newResponse = await fetch(newUrl, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,reviews,rating,userRatingCount',
      },
    });
    const newData = await newResponse.json();
    console.log('New API status:', newResponse.status);
    console.log('New API response:', JSON.stringify(newData).substring(0, 500));

    if (newResponse.ok && newData.reviews) {
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

    throw new Error(`Both APIs failed. Legacy: ${legacyData.status}. New: ${JSON.stringify(newData).substring(0, 200)}`);
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
