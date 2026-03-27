import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Map to Stripe price keys
const packages = [
  {
    name: "Washer Only",
    price: "40",
    priceKey: "washer",
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
    priceKey: "washer-dryer",
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
    priceKey: "dryer",
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
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = async (priceKey: string, packageName: string) => {
    if (!user) {
      // Use window.location for Astro page navigation (not React Router)
      window.location.href = "/auth";
      return;
    }

    setLoadingPackage(priceKey);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceKey },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "Unable to start checkout. Please try again.",
      });
    } finally {
      setLoadingPackage(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoadingPackage("manage");

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
      toast({
        variant: "destructive",
        title: "Unable to open portal",
        description: "Please try again later.",
      });
    } finally {
      setLoadingPackage(null);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <a id="pricing-anchor" className="scroll-mt-24" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            PRICING
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Simple, Affordable <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Choose the rental option that works best for you. No hidden fees, no surprises.
          </p>
          
          {/* Laundromat comparison */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 border border-primary/20 rounded-2xl px-6 py-4"
          >
            <div className="text-center sm:text-left">
              <div className="text-sm text-muted-foreground mb-1">Our Monthly Rental</div>
              <div className="text-2xl font-bold text-primary">$59.99</div>
            </div>
            <div className="hidden sm:block text-2xl text-muted-foreground">vs</div>
            <div className="sm:hidden text-sm text-muted-foreground">vs</div>
            <div className="text-center sm:text-left">
              <div className="text-sm text-muted-foreground mb-1">Avg. Laundromat Cost</div>
              <div className="text-2xl font-bold text-muted-foreground line-through decoration-destructive/50">$89+/mo</div>
            </div>
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              Save 30%+
            </div>
          </motion.div>
        </motion.div>

        {subscription.subscribed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
              <Check className="h-4 w-4" />
              <span className="font-medium">Active Subscription</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your rental is active until{" "}
              {subscription.subscriptionEnd
                ? new Date(subscription.subscriptionEnd).toLocaleDateString()
                : "renewal"}
            </p>
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              disabled={loadingPackage === "manage"}
            >
              {loadingPackage === "manage" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Manage Subscription
            </Button>
          </motion.div>
        )}

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
                onClick={() => handleCheckout(pkg.priceKey, pkg.name)}
                disabled={loadingPackage === pkg.priceKey || subscription.subscribed}
              >
                {loadingPackage === pkg.priceKey ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : subscription.subscribed ? (
                  "Already Subscribed"
                ) : (
                  "Rent Online"
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
