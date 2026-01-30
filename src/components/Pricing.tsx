import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const packages = [
  {
    name: "Washer Only",
    price: "40",
    description: "Perfect if you only need a washing machine.",
    features: [
      "Top-loading washer",
      "Standard washing capacity",
      "Free delivery and installation",
      "Maintenance included",
    ],
    popular: false,
  },
  {
    name: "Washer & Dryer Set",
    price: "59.99",
    description: "Most popular option for a complete laundry solution.",
    features: [
      "Top-loading washer",
      "Standard capacity dryer",
      "Free delivery and installation",
      "Maintenance included",
      "Priority service",
    ],
    popular: true,
  },
  {
    name: "Dryer Only",
    price: "40",
    description: "Perfect if you only need a dryer.",
    features: [
      "Electric dryer",
      "Standard drying capacity",
      "Free delivery and installation",
      "Maintenance included",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            PRICING
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Simple, Affordable <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the rental option that works best for you. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl p-8 ${
                pkg.popular
                  ? "border-2 border-primary shadow-glow scale-105 z-10"
                  : "border border-border shadow-soft"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-semibold text-muted-foreground">$</span>
                  <span className="font-display font-bold text-5xl text-foreground">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-semibold ${
                  pkg.popular
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
