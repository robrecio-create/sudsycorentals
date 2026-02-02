const HomePageSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sudsycorentals.com/#organization",
    "name": "Sudsy Co. Rentals",
    "url": "https://sudsycorentals.com",
    "logo": "https://sudsycorentals.com/og-image.png",
    "description": "Affordable washer and dryer rentals on the Mississippi Gulf Coast. Free delivery, free installation, no credit checks.",
    "telephone": "+1-228-338-3455",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ocean Springs",
      "addressRegion": "MS",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Gulfport", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "Biloxi", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "Ocean Springs", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "D'Iberville", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "Long Beach", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "Gautier", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
      { "@type": "City", "name": "Pascagoula", "containedInPlace": { "@type": "State", "name": "Mississippi" } }
    ],
    "sameAs": [
      "https://www.facebook.com/sudsycorentals"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sudsycorentals.com/#localbusiness",
    "name": "Sudsy Co. Rentals",
    "description": "Skip the laundromat! Affordable washer and dryer rentals in South Mississippi. Free delivery & repairs. No credit checks.",
    "url": "https://sudsycorentals.com",
    "telephone": "+1-228-338-3455",
    "priceRange": "$$",
    "image": "https://sudsycorentals.com/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ocean Springs",
      "addressRegion": "MS",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.4113,
      "longitude": -88.8278
    },
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sudsycorentals.com/#website",
    "url": "https://sudsycorentals.com",
    "name": "Sudsy Co. Rentals",
    "description": "Washer & Dryer Rental in Gulfport, Biloxi, Ocean Springs",
    "publisher": {
      "@id": "https://sudsycorentals.com/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default HomePageSchema;
