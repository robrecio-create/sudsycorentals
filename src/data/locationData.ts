export interface LocationData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  nearbyAreas: string[];
  metaTitle: string;
  metaDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
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
    coordinates: { lat: 30.3960, lng: -88.8853 },
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
    coordinates: { lat: 30.3674, lng: -89.0928 },
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
    coordinates: { lat: 30.4113, lng: -88.8278 },
  },
  diberville: {
    slug: "diberville",
    name: "D'Iberville",
    tagline: "Washer & Dryer Rentals in D'Iberville, MS",
    description:
      "Sudsy Co. Rentals delivers affordable washer and dryer rentals throughout D'Iberville. From the Promenade area to neighborhoods across the city, we provide hassle-free appliance rentals with free delivery and installation.",
    highlights: [
      "Convenient delivery to all D'Iberville areas",
      "Perfect for apartment and condo living",
      "No long-term contracts required",
      "Free maintenance and repairs included",
    ],
    nearbyAreas: ["Biloxi", "Gulfport", "Ocean Springs", "Long Beach"],
    metaTitle: "Washer & Dryer Rental D'Iberville MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Rent a washer and dryer in D'Iberville, MS. Free delivery, free installation, no credit check. Month-to-month rentals. Call Sudsy Co. at (228) 338-3455.",
    coordinates: { lat: 30.4263, lng: -88.8906 },
  },
  gautier: {
    slug: "gautier",
    name: "Gautier",
    tagline: "Washer & Dryer Rentals in Gautier, MS",
    description:
      "Sudsy Co. Rentals brings convenient washer and dryer rentals to Gautier residents. Whether you're near the Shepard State Park area or anywhere in Gautier, we deliver quality appliances right to your home.",
    highlights: [
      "Serving the entire Gautier community",
      "Ideal for rental homes and apartments",
      "Quick and reliable delivery service",
      "Affordable monthly rates",
    ],
    nearbyAreas: ["Ocean Springs", "Pascagoula", "Biloxi", "Moss Point"],
    metaTitle: "Washer & Dryer Rental Gautier MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Affordable washer and dryer rentals in Gautier, MS. Free next-day delivery and installation. No credit check required. Call Sudsy Co. at (228) 338-3455.",
    coordinates: { lat: 30.3857, lng: -88.6117 },
  },
  "long-beach": {
    slug: "long-beach",
    name: "Long Beach",
    tagline: "Washer & Dryer Rentals in Long Beach, MS",
    description:
      "Sudsy Co. Rentals serves Long Beach with reliable washer and dryer rentals. From the harbor area to residential neighborhoods, we provide free delivery and installation to make laundry day easy.",
    highlights: [
      "Fast delivery throughout Long Beach",
      "Great for coastal living apartments",
      "Flexible rental terms available",
      "Quality appliances you can count on",
    ],
    nearbyAreas: ["Gulfport", "Pass Christian", "Biloxi", "D'Iberville"],
    metaTitle: "Washer & Dryer Rental Long Beach MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Rent a washer and dryer in Long Beach, MS. Free delivery and installation. No credit check, no hassle. Month-to-month rentals. Call (228) 338-3455.",
    coordinates: { lat: 30.3505, lng: -89.1528 },
  },
  pascagoula: {
    slug: "pascagoula",
    name: "Pascagoula",
    tagline: "Washer & Dryer Rentals in Pascagoula, MS",
    description:
      "Sudsy Co. Rentals extends our washer and dryer rental service to Pascagoula. Whether you're working at the shipyard or living anywhere in the Pascagoula area, we deliver affordable appliances with no credit check required.",
    highlights: [
      "Convenient for shipyard workers and families",
      "Serving all Pascagoula neighborhoods",
      "Easy month-to-month rental plans",
      "Free pickup when you're done",
    ],
    nearbyAreas: ["Gautier", "Moss Point", "Ocean Springs", "Biloxi"],
    metaTitle: "Washer & Dryer Rental Pascagoula MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Washer and dryer rentals in Pascagoula, MS. Free delivery, free installation, no credit check. Perfect for apartments and rentals. Call (228) 338-3455.",
    coordinates: { lat: 30.3658, lng: -88.5561 },
  },
  "pass-christian": {
    slug: "pass-christian",
    name: "Pass Christian",
    tagline: "Washer & Dryer Rentals in Pass Christian, MS",
    description:
      "Sudsy Co. Rentals delivers affordable washer and dryer rentals to Pass Christian residents. From the historic downtown to beachfront properties, we bring quality appliances to your home with free delivery and installation.",
    highlights: [
      "Serving all Pass Christian neighborhoods",
      "Perfect for beach cottages and vacation rentals",
      "Quick delivery along the scenic coast",
      "No long-term contracts required",
    ],
    nearbyAreas: ["Long Beach", "Gulfport", "Bay St. Louis", "Biloxi"],
    metaTitle: "Washer & Dryer Rental Pass Christian MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Rent a washer and dryer in Pass Christian, MS. Free delivery, free installation, no credit check. Month-to-month rentals for the Gulf Coast. Call (228) 338-3455.",
    coordinates: { lat: 30.3157, lng: -89.2475 },
  },
  "moss-point": {
    slug: "moss-point",
    name: "Moss Point",
    tagline: "Washer & Dryer Rentals in Moss Point, MS",
    description:
      "Sudsy Co. Rentals extends our washer and dryer rental service to Moss Point. Whether you're near the Escatawpa River or anywhere in the Moss Point community, we deliver reliable appliances with no credit check required.",
    highlights: [
      "Serving all Moss Point neighborhoods",
      "Convenient for Jackson County residents",
      "Fast and reliable delivery service",
      "Affordable month-to-month rates",
    ],
    nearbyAreas: ["Pascagoula", "Gautier", "Ocean Springs", "Biloxi"],
    metaTitle: "Washer & Dryer Rental Moss Point MS | Free Delivery | Sudsy Co.",
    metaDescription:
      "Affordable washer and dryer rentals in Moss Point, MS. Free delivery and installation. No credit check required. Call Sudsy Co. at (228) 338-3455.",
    coordinates: { lat: 30.4113, lng: -88.5345 },
  },
};
