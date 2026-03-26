const HomePageSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.sudsycorentals.com/#organization",
    "name": "Sudsy Co. Rentals",
    "url": "https://www.sudsycorentals.com",
    "logo": "https://www.sudsycorentals.com/og-image.png",
    "description": "Affordable washer and dryer rentals on the Mississippi Gulf Coast. Free delivery, free installation, no credit checks.",
    "telephone": "+1-228-338-3455",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1302 Fort St",
      "addressLocality": "Ocean Springs",
      "addressRegion": "MS",
      "postalCode": "39564",
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
    // TODO: Add verified sameAs URLs — Yelp listing, Google Business Profile (maps.app.goo.gl/...), Bing Places
    "sameAs": [
      "https://www.facebook.com/sudsycorentals",
      "https://www.instagram.com/sudsycorentals/"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.sudsycorentals.com/#localbusiness",
    "name": "Sudsy Co. Rentals",
    "description": "Skip the laundromat! Affordable washer and dryer rentals in South Mississippi. Free delivery & repairs. No credit checks.",
    "url": "https://www.sudsycorentals.com",
    "telephone": "+1-228-338-3455",
    "priceRange": "$$",
    "image": "https://www.sudsycorentals.com/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1302 Fort St",
      "addressLocality": "Ocean Springs",
      "addressRegion": "MS",
      "postalCode": "39564",
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
    "@id": "https://www.sudsycorentals.com/#website",
    "url": "https://www.sudsycorentals.com",
    "name": "Sudsy Co. Rentals",
    "description": "Washer & Dryer Rental in Gulfport, Biloxi, Ocean Springs",
    "publisher": {
      "@id": "https://www.sudsycorentals.com/#organization"
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
