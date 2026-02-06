import { Star, Quote } from "lucide-react";
import ReviewSchema from "@/components/seo/ReviewSchema";

// Add your reviews here - easy to update anytime!
const reviews = [
  {
    author_name: "Yakeyla Daisean",
    rating: 5,
    text: "Sudsy Co Is A Great company. Their Response Time Is Fast. Owner Was Nice And Professional. Delivery Was Prompt. I Look Forward To Continued Business With This Company.",
    relative_time_description: "recently",
  },
  {
    author_name: "Janet Coombs",
    rating: 5,
    text: "Appliances were delivered on time and Rob even confirmed everything works as it should before leaving. Will definitely refer friends and family.",
    relative_time_description: "recently",
  },
  {
    author_name: "Bobby Beasley",
    rating: 5,
    text: "Great company, very nice, on time. Renting a washer and drier set and it has really help us out.",
    relative_time_description: "recently",
  },
];

// Overall rating info
const overallRating = 5.0;
const totalReviews = 9;

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

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-lg">
            {review.author_name.charAt(0)}
          </span>
        </div>
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
        <p className="text-muted-foreground pl-6">{review.text}</p>
      </div>
    </div>
  );
};

export const Reviews = () => {
  return (
    <>
      <ReviewSchema 
        reviews={reviews} 
        overallRating={overallRating} 
        totalReviews={totalReviews} 
      />
      <section id="reviews" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-foreground">
                {overallRating.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground">
              based on {totalReviews} reviews on Google
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJCeHbve1aGmfBEAE"
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
    </>
  );
};
