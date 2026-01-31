import { useQuery } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Your Google Business Place ID - you'll need to update this
const PLACE_ID = "ChIJ9SNomW8JnIgR4M_xsEd1qXU";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface ReviewsData {
  name: string;
  rating: number;
  total_ratings: number;
  reviews: Review[];
}

const fetchReviews = async (): Promise<ReviewsData> => {
  const { data, error } = await supabase.functions.invoke('get-google-reviews', {
    body: { placeId: PLACE_ID },
  });

  if (error) throw error;
  return data;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {review.profile_photo_url ? (
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {review.author_name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{review.author_name}</h4>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {review.relative_time_description}
          </p>
        </div>
      </div>
      <div className="mt-4 relative">
        <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
        <p className="text-muted-foreground pl-6 line-clamp-4">{review.text}</p>
      </div>
    </div>
  );
};

export const Reviews = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['google-reviews'],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 1,
  });

  // Don't show the section if there's an error
  if (error) {
    console.log('Reviews error:', error);
    return null;
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          {data && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-foreground">
                  {data.rating?.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                based on {data.total_ratings} reviews on Google
              </span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 shadow-sm border border-border animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-3 bg-muted rounded w-16" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                  <div className="h-3 bg-muted rounded w-3/5" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.reviews && data.reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.reviews.slice(0, 6).map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        ) : null}

        <div className="text-center mt-8">
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Leave us a review on Google
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
