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

    // Strategy 1: Text search via Places API (New) to find fresh Place ID
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
    console.log('Places found:', searchData.places?.length || 0);
    
    if (searchData.places?.length) {
      const place = searchData.places[0];
      console.log('Found:', place.displayName?.text, '| ID:', place.id);
      console.log('Rating:', place.rating, '| Count:', place.userRatingCount);
      console.log('Reviews:', place.reviews?.length || 0);
      console.log('Address:', place.formattedAddress);

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

    // Strategy 2: Legacy text search
    console.log('Strategy 2: Legacy text search...');
    const legacySearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Sudsy+Co+Washer+Dryer+Rentals+Ocean+Springs+MS&key=${apiKey}`;
    const legacySearchResp = await fetch(legacySearchUrl);
    const legacySearchData = await legacySearchResp.json();
    console.log('Legacy search status:', legacySearchData.status);
    console.log('Legacy results:', legacySearchData.results?.length || 0);

    if (legacySearchData.results?.length) {
      const foundId = legacySearchData.results[0].place_id;
      console.log('Found place_id:', foundId, '| Name:', legacySearchData.results[0].name);

      // Fetch details with this ID
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${foundId}&fields=name,reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`;
      const detailsResp = await fetch(detailsUrl);
      const detailsData = await detailsResp.json();
      console.log('Details status:', detailsData.status);
      console.log('Details reviews:', detailsData.result?.reviews?.length || 0);
      console.log('Details rating:', detailsData.result?.rating);
      console.log('Details total:', detailsData.result?.user_ratings_total);

      if (detailsData.status === 'OK') {
        const result = detailsData.result;
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
    }

    // Strategy 3: Direct Place ID lookup as last resort
    console.log('Strategy 3: Direct Place ID...');
    const placeId = 'ChIJ9SNomW8JnIgR4M_xsEd1qXU';
    const directUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`;
    const directResp = await fetch(directUrl);
    const directData = await directResp.json();
    console.log('Direct status:', directData.status);
    console.log('Direct reviews:', directData.result?.reviews?.length || 0);

    if (directData.status === 'OK') {
      const result = directData.result;
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

    throw new Error('All strategies failed to find reviews');
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
