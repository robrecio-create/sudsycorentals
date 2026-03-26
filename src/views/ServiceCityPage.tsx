import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MapPin, Check, Truck, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import { locations } from "@/data/locationData";

const pricing = [
  { label: "Washer Only", price: "$39.99/mo" },
  { label: "Washer & Dryer Set", price: "$59.99/mo" },
  { label: "Dryer Only", price: "$29.99/mo" },
];

const features = [
  { icon: Truck, title: "Free Next-Day Delivery", desc: "We deliver and install — no extra charge." },
  { icon: Shield, title: "No Credit Check", desc: "Everyone qualifies. Simple, fast approval." },
  { icon: Clock, title: "Month-to-Month", desc: "No long-term contracts. Cancel anytime." },
];

const otherCities = Object.values(locations).map((l) => ({ name: l.name, slug: l.slug }));

const ServiceCityPage = () => {
  const { city } = useParams<{ city: string }>();
  const location = city ? locations[city] : null;

  if (!location) {
    return <Navigate to="/not-found" replace />;
  }

  const title = `Washer and Dryer Rental ${location.name} MS | Sudsy Co. Rentals`;
  const description = `Rent a washer and dryer in ${location.name}, MS starting at $59.99/mo. Free next-day delivery, free installation, no credit check. Locally owned. Call (228) 338-3455.`;
  const canonical = `https://www.sudsycorentals.com/washer-dryer-rental/${location.slug}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta property="og:site_name" content="Sudsy Co. Rentals" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.sudsycorentals.com/og-image.png" />

        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content={`${location.name}, Mississippi`} />
        <meta name="geo.position" content={`${location.coordinates.lat};${location.coordinates.lng}`} />
        <meta name="ICBM" content={`${location.coordinates.lat}, ${location.coordinates.lng}`} />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `Washer and Dryer Rental in ${location.name}, MS`,
            "description": description,
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://www.sudsycorentals.com/#localbusiness",
              "name": "Sudsy Co. Rentals",
              "telephone": "+1-228-338-3455",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1302 Fort St",
                "addressLocality": "Ocean Springs",
                "addressRegion": "MS",
                "postalCode": "39564",
                "addressCountry": "US"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": location.name,
              "containedInPlace": { "@type": "State", "name": "Mississippi" }
            },
            "offers": {
              "@type": "Offer",
              "price": "59.99",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "59.99",
                "priceCurrency": "USD",
                "unitText": "month"
              }
            },
            "url": canonical
          })
        }}
      />

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="hero-gradient pt-0 pb-16 md:pb-24 relative overflow-hidden">
            <Breadcrumbs
              items={[
                { label: "Locations", href: "/areas-we-serve" },
                { label: location.name, href: `/locations/${location.slug}` },
                { label: "Washer & Dryer Rental" },
              ]}
            />
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary-foreground/80" />
                  <span className="text-primary-foreground/80 font-medium">
                    Serving {location.name}, Mississippi
                  </span>
                </div>

                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
                  Washer & Dryer Rental in {location.name}, MS
                </h1>

                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                  Skip the laundromat for good. Sudsy Co. delivers and installs a washer and dryer rental right to your home in {location.name} — starting at $59.99/mo with free next-day delivery and no credit check.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary font-semibold text-lg px-8"
                    asChild
                  >
                    <a href="tel:+12283383455">
                      <Phone className="h-5 w-5 mr-2" />
                      (228) 338-3455
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
                    asChild
                  >
                    <a href="/#pricing">Rent Online</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Washer & Dryer Rental Pricing in {location.name}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Simple, transparent monthly rates. No hidden fees, no credit check, no long-term commitment.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {pricing.map((plan, index) => (
                  <motion.div
                    key={plan.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`h-full text-center border-border/50 hover:border-primary/30 transition-colors ${index === 1 ? "border-primary ring-1 ring-primary" : ""}`}>
                      <CardContent className="p-6">
                        <p className="font-semibold text-foreground mb-2">{plan.label}</p>
                        <p className="text-2xl font-bold text-primary">{plan.price}</p>
                        {index === 1 && (
                          <span className="inline-block mt-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Why {location.name} Residents Choose Sudsy Co.
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((f, index) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">{f.title}</h3>
                    <p className="text-muted-foreground">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid md:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto"
              >
                {location.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{h}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  How to Get a Washer & Dryer Rental in {location.name}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[
                  { step: "1", title: "Choose Your Package", desc: "Pick washer only, dryer only, or the full set. Rent online or call us." },
                  { step: "2", title: "We Deliver & Install", desc: `We schedule delivery to your ${location.name} address — next day in most cases.` },
                  { step: "3", title: "Enjoy Clean Laundry", desc: "We handle all repairs for free. Cancel any time with one phone call." },
                ].map((s, index) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-lg">{s.step}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Nearby Cities */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Also Serving Nearby Mississippi Gulf Coast Cities
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {otherCities
                    .filter((c) => c.slug !== location.slug)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        to={`/washer-dryer-rental/${c.slug}`}
                        className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full text-foreground font-medium hover:bg-primary/10 border border-border hover:border-primary/30 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-primary" />
                        Washer & Dryer Rental {c.name}
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 hero-gradient relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
                  Ready to Rent a Washer & Dryer in {location.name}?
                </h2>
                <p className="text-primary-foreground/90 mb-8">
                  Free delivery, free installation, no credit check. Get started today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary font-semibold text-lg px-8"
                    asChild
                  >
                    <a href="tel:+12283383455">
                      <Phone className="h-5 w-5 mr-2" />
                      (228) 338-3455
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
                    asChild
                  >
                    <a href="/#pricing">Rent Online</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default ServiceCityPage;
