export interface LocationData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  nearbyAreas: string[];
  metaTitle: string;
  metaDescription: string;
}

export const locations: Record<string, LocationData> = {
  biloxi: {
    slug: "biloxi",
    name: "Biloxi",
    tagline: "Washer & Dryer Rentals in Biloxi, MS",
    description:
      "Sudsy Co. Rentals proudly serves Biloxi residents with affordable washer and dryer rentals. Whether you're living near Keesler Air Force Base, in a beachfront apartment, or anywhere in the Biloxi area, we deliver and install your appliances for free.",
    highlights: [
      "Convenient for Keesler AFB personnel and families",
      "Perfect for beachfront apartment living",
      "Fast delivery throughout Biloxi neighborhoods",
      "No credit check required",
    ],
    nearbyAreas: ["D'Iberville", "Ocean Springs", "Gulfport", "Gautier"],
    metaTitle: "Washer & Dryer Rental Biloxi MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Rent a washer and dryer in Biloxi, MS with free next-day delivery. Perfect for apartments near Keesler AFB. No credit check. Locally owned. Call (228) 338-3455.",
  },
  gulfport: {
    slug: "gulfport",
    name: "Gulfport",
    tagline: "Washer & Dryer Rentals in Gulfport, MS",
    description:
      "Sudsy Co. Rentals is Gulfport's trusted source for washer and dryer rentals. From downtown Gulfport to the surrounding neighborhoods, we bring reliable appliances right to your door with free delivery and installation.",
    highlights: [
      "Serving all Gulfport neighborhoods",
      "Great for apartment complexes and rentals",
      "Same-week delivery available",
      "Flexible month-to-month rentals",
    ],
    nearbyAreas: ["Long Beach", "Biloxi", "Pass Christian", "D'Iberville"],
    metaTitle: "Washer & Dryer Rental Gulfport MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Affordable washer and dryer rentals in Gulfport, MS. Free delivery and installation. No credit check required. The best laundromat alternative. Call (228) 338-3455.",
  },
  "ocean-springs": {
    slug: "ocean-springs",
    name: "Ocean Springs",
    tagline: "Washer & Dryer Rentals in Ocean Springs, MS",
    description:
      "Locally owned and operated right here in Ocean Springs, Sudsy Co. Rentals is your neighborhood solution for washer and dryer rentals. We know the community and deliver with care throughout Ocean Springs and beyond.",
    highlights: [
      "Locally owned & operated in Ocean Springs",
      "Supporting our local community",
      "Quick response times as your neighbors",
      "Personalized service you can trust",
    ],
    nearbyAreas: ["Biloxi", "Gautier", "D'Iberville", "Pascagoula"],
    metaTitle: "Washer & Dryer Rental Ocean Springs MS | Local | Sudsy Co.",
    metaDescription:
      "Ocean Springs' own washer and dryer rental service. Locally owned, free delivery, no credit check. Skip the laundromat. Call Sudsy Co. at (228) 338-3455.",
  },
};
