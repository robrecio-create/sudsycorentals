import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import washerDryerImage from "@/assets/washer-dryer-hero.png";

const benefits = [
  "No Credit Checks",
  "Free Delivery & Setup",
  "No Long-Term Contracts",
];

const Hero = () => {
  const handleCtaClick = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-secondary">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-2 rounded-full font-semibold text-sm mb-6 border border-accent/20">
              <span>🌊</span>
              <span>Limited Time — First Month Just $20</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-tight mb-5">
              Ditch the Laundromat.{" "}
              <span className="text-primary">Your First Month is Just $20.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Professional Washer & Dryer sets delivered to your home. No Credit Checks. No Long-Term Contracts.
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all rounded-full"
                onClick={handleCtaClick}
              >
                Claim My $20 Set
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-7 rounded-full"
                asChild
              >
                <a href="/schedule-delivery">
                  📅 Schedule Delivery
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-3 scale-105" />
              <div className="relative bg-card rounded-3xl p-8 shadow-lg">
                <img
                  src={washerDryerImage}
                  alt="White washer and dryer set available for rent in Gulfport, Biloxi, and Ocean Springs Mississippi - Sudsy Co. Rentals"
                  className="w-full max-w-md mx-auto animate-float"
                />
              </div>

              {/* Price badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-primary rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-xl text-primary-foreground text-center"
              >
                <span className="text-sm font-medium opacity-90">from</span>
                <span className="text-2xl font-bold">$20</span>
                <span className="text-xs font-medium opacity-90">first month</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
