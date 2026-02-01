import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MapPin, Check, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { locations } from "@/data/locationData";

const LocationPage = () => {
  const { city } = useParams<{ city: string }>();
  const location = city ? locations[city] : null;

  if (!location) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{location.metaTitle}</title>
        <meta name="description" content={location.metaDescription} />
        <link rel="canonical" href={`https://sudsycorentals.com/locations/${location.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero Section */}
          <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
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
                  {location.tagline}
                </h1>

                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                  {location.description}
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
                    <a href="/#pricing">View Pricing</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Highlights Section */}
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
                  Why {location.name} Residents Choose Sudsy Co.
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're the top-rated washer and dryer rental service on the Mississippi Gulf Coast.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {location.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-medium text-foreground">{highlight}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    Free Delivery & Install
                  </h3>
                  <p className="text-muted-foreground">
                    We deliver and install your washer and dryer at no extra cost throughout {location.name}.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    No Credit Check
                  </h3>
                  <p className="text-muted-foreground">
                    Everyone deserves clean laundry. We don't run credit checks—just simple, easy rentals.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    Flexible Monthly Plans
                  </h3>
                  <p className="text-muted-foreground">
                    Rent month-to-month with no long-term commitment. Cancel anytime with ease.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Nearby Areas */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Also Serving Nearby Areas
                </h2>
                <p className="text-muted-foreground mb-8">
                  In addition to {location.name}, we deliver to these Gulf Coast communities:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {location.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-foreground font-medium"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
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
                  Ready to Rent in {location.name}?
                </h2>
                <p className="text-primary-foreground/90 mb-8">
                  Call us today or rent online. Free delivery, free installation, no credit check!
                </p>
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

export default LocationPage;
