import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2 } from "lucide-react";
import washerDryerImage from "@/assets/washer-dryer-hero.png";

const benefits = [
  "No Credit Check",
  "Free Delivery",
  "Locally Owned",
];

const Hero = () => {
  const handleRentOnlineClick = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full font-semibold text-sm mb-6 shadow-md">
              <span>🎉</span>
              <span>Never Go to the Laundromat Again!</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-4">
              Reliable Washer & Dryer Rentals in South Mississippi
            </h1>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-accent mb-6">
              The Best Laundromat Alternative in Gulfport & Biloxi
            </h2>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0">
              Affordable Washer and Dryer Rentals in Gulfport, Biloxi, Diberville, Ocean Springs, Gautier and Pascagoula.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={handleRentOnlineClick}
              >
                Rent Online
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6"
                asChild
              >
                <a href="tel:+12283383455">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <img
                src={washerDryerImage}
                alt="Washer and Dryer Set"
                className="w-full max-w-lg animate-float drop-shadow-2xl"
              />
              
              {/* Price badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 md:top-0 md:right-0 bg-accent rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-xl text-white text-center p-2"
              >
                <span className="text-xl font-bold">$59.99/mo</span>
                <span className="text-xs font-bold leading-tight">Washer & Dryer Set</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.8C96 41.7 192 33.3 288 29.2C384 25 480 25 576 33.3C672 41.7 768 58.3 864 58.3C960 58.3 1056 41.7 1152 37.5C1248 33.3 1344 41.7 1392 45.8L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
