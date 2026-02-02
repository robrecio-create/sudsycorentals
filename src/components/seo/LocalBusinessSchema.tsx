import { LocationData } from "@/data/locationData";

interface LocalBusinessSchemaProps {
  location: LocationData;
}

const LocalBusinessSchema = ({ location }: LocalBusinessSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://sudsycorentals.com/locations/${location.slug}`,
    "name": `Sudsy Co. Rentals - ${location.name}`,
    "description": location.description,
    "url": `https://sudsycorentals.com/locations/${location.slug}`,
    "telephone": "+1-228-338-3455",
    "priceRange": "$$",
    "image": "https://sudsycorentals.com/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "MS",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "areaServed": [
      {
        "@type": "City",
        "name": location.name,
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      ...location.nearbyAreas.map(area => ({
        "@type": "City",
        "name": area,
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      }))
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/sudsycorentals"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Washer & Dryer Rentals",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Washer & Dryer Set Rental",
            "description": "Monthly washer and dryer rental with free delivery and installation"
          },
          "price": "59.99",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "59.99",
            "priceCurrency": "USD",
            "unitText": "month"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default LocalBusinessSchema;
