import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { locations } from "@/data/locationData";

const AreasWeServe = () => {
  const locationList = Object.values(locations);

  const areasServedSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Washer & Dryer Rental Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sudsy Co. Rentals",
      "telephone": "+1-228-338-3455"
    },
    "areaServed": locationList.map(loc => ({
      "@type": "City",
      "name": loc.name,
      "containedInPlace": {
        "@type": "State",
        "name": "Mississippi"
      }
    })),
    "description": "Affordable washer and dryer rentals with free delivery throughout the Mississippi Gulf Coast."
  };

  return (
    <>
      <Helmet>
        <title>Washer and Dryer Rental Near Me | Mississippi Gulf Coast | Sudsy Co.</title>
        <meta 
          name="description" 
          content="Find washer and dryer rental near you on the Mississippi Gulf Coast. Sudsy Co. delivers free to Gulfport, Biloxi, Ocean Springs, D'Iberville & more. No credit check." 
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/areas-we-serve" />
        
        <meta property="og:title" content="Washer and Dryer Rental Near Me | Mississippi Gulf Coast" />
        <meta property="og:description" content="Washer and dryer rental delivered free to Gulfport, Biloxi, Ocean Springs, and all Mississippi Gulf Coast cities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sudsycorentals.com/areas-we-serve" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Washer and Dryer Rental Near Me | Mississippi Gulf Coast | Sudsy Co." />
        <meta name="twitter:description" content="Find washer and dryer rental near you on the Mississippi Gulf Coast. Free delivery to Gulfport, Biloxi, Ocean Springs & more. No credit check." />
        <meta name="twitter:image" content="https://www.sudsycorentals.com/og-image.png" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasServedSchema) }}
      />

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Areas We Serve on the Mississippi Gulf Coast
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Sudsy Co. Rentals delivers affordable washer and dryer rentals throughout South Mississippi. 
                    Free next-day delivery, free installation, and no credit check required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/#pricing">
                      <Button size="lg" className="w-full sm:w-auto">
                        View Pricing
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <a href="tel:+12283383455">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        <Phone className="mr-2 h-5 w-5" />
                        (228) 338-3455
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Service Areas Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Service Locations
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Click on any city to learn more about our washer and dryer rental services in your area.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {locationList.map((location, index) => (
                  <motion.div
                    key={location.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/locations/${location.slug}`}
                      className="block group"
                    >
                      <div className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {location.name}, MS
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {location.description.slice(0, 120)}...
                            </p>
                            <span className="inline-flex items-center text-primary text-sm font-medium mt-3 group-hover:underline">
                              Learn More
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Washer & Dryer Rental by City */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Washer & Dryer Rental by City
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Sudsy Co. delivers washer and dryer rentals across the Mississippi Gulf Coast. Explore our city-specific rental pages below to find service in your area.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Ocean Springs", slug: "ocean-springs" },
                    { name: "Biloxi", slug: "biloxi" },
                    { name: "Gulfport", slug: "gulfport" },
                    { name: "D'Iberville", slug: "diberville" },
                    { name: "Pascagoula", slug: "pascagoula" },
                    { name: "Gautier", slug: "gautier" },
                    { name: "Long Beach", slug: "long-beach" },
                    { name: "Pass Christian", slug: "pass-christian" },
                    { name: "Moss Point", slug: "moss-point" },
                  ].map((city) => (
                    <Link
                      key={city.slug}
                      to={`/washer-dryer-rental/${city.slug}`}
                      className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        Washer & Dryer Rental {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Why Gulf Coast Residents Choose Sudsy Co.
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Free next-day delivery & installation",
                    "No credit check required",
                    "Month-to-month flexibility",
                    "Free maintenance & repairs",
                    "Locally owned in Ocean Springs",
                    "Quality machines you can rely on",
                    "Easy pickup when you move",
                    "Serving military families at Keesler AFB"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-lg text-muted-foreground mb-6">
                    Ready to skip the laundromat? Get started today for just <span className="font-bold text-primary">$59.99/month</span>
                  </p>
                  <a href="/#pricing">
                    <Button size="lg">
                      Rent Online Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default AreasWeServe;
