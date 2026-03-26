interface ReviewSchemaProps {
  reviews: Array<{
    author_name: string;
    rating: number;
    text: string;
  }>;
  overallRating: number;
  totalReviews: number;
}

const ReviewSchema = ({ reviews, overallRating, totalReviews }: ReviewSchemaProps) => {
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.sudsycorentals.com/#reviews",
    "name": "Sudsy Co. Rentals",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": overallRating.toString(),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": totalReviews.toString(),
      "reviewCount": totalReviews.toString()
    },
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author_name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
    />
  );
};

export default ReviewSchema;
