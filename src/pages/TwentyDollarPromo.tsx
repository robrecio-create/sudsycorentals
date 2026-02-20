import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Loader2, ArrowRight, Phone, Gift, Truck, Wrench, Heart, ShieldCheck, Clock, X, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import logoImage from "@/assets/logo.png";

const SERVICE_CITIES = ["Biloxi", "Gulfport", "Ocean Springs", "D'Iberville", "Gautier", "Pascagoula", "Long Beach"];

const LeadCaptureForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city) {
      toast({ variant: "destructive", title: "Please fill in all fields." });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: name.trim().slice(0, 100),
        phone: phone.trim().slice(0, 20),
        email: "promo-lead@placeholder.com",
        inquiry_type: "general",
        message: `$20 Promo lead – City: ${city}`,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "We'll be in touch!", description: "Thanks for checking availability." });
    } catch {
      toast({ variant: "destructive", title: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-3xl p-8 border border-border shadow-soft text-center">
        <Check className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">We'll confirm availability and reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-soft space-y-5">
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
        <Input id="lead-name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
      </div>
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
        <Input id="lead-phone" type="tel" placeholder="(228) 555-1234" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} required />
      </div>
      <div>
        <label htmlFor="lead-city" className="block text-sm font-medium text-foreground mb-1.5">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger id="lead-city">
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_CITIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" size="lg" className="w-full font-semibold rounded-xl" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Availability"}
      </Button>
    </form>
  );
};

const TwentyDollarPromo = () => {
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = async (priceKey: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoadingPackage(priceKey);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceKey },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
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

  return (
    <>
      <Helmet>
        <title>$20 Off First Month | Washer & Dryer Rental | Sudsy Co.</title>
        <meta
          name="description"
          content="Get $20 off your first month of washer and dryer rental from Sudsy Co. Free delivery, free repairs, no credit checks. Limited time offer in Gulfport & Biloxi MS."
        />
        <link rel="canonical" href="https://sudsycorentals.com/20-dollar-promo" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold mb-6"
            >
              <Gift className="h-4 w-4" />
              LIMITED TIME OFFER
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
            >
              Get <span className="text-primary">$20 Off</span> Your First Month
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Skip the laundromat and start doing laundry at home. Affordable washer &amp; dryer rentals with free delivery, installation, and repairs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="text-lg px-8 rounded-xl" onClick={() => document.getElementById("promo-pricing")?.scrollIntoView({ behavior: "smooth" })}>
                Claim Your Discount <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="tel:+12282007105">
                <Button variant="outline" size="lg" className="text-lg px-8 rounded-xl">
                  <Phone className="mr-2 h-5 w-5" /> Call (228) 200-7105
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Benefits strip */}
        <section className="bg-primary text-primary-foreground py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Truck, text: "Free Delivery & Installation" },
                { icon: Wrench, text: "Free Repairs & Maintenance" },
                { icon: Check, text: "No Credit Checks Required" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center justify-center gap-3">
                  <Icon className="h-6 w-6 shrink-0" />
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Column Features */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Local Family Owned",
                  description: "Serving Biloxi, Gulfport, Ocean Springs, and the Mississippi Gulf Coast.",
                },
                {
                  icon: ShieldCheck,
                  title: "No Credit Checks",
                  description: "We believe in our neighbors, not just credit scores.",
                },
                {
                  icon: Clock,
                  title: "2-Day Repair Guarantee",
                  description: "If it breaks, we fix or swap it in 48 business hours.",
                },
              ].map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                Sudsy Co. <span className="text-primary">vs.</span> The Laundromat
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border border-border overflow-hidden shadow-soft">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left py-3 px-3 md:py-4 md:px-6 font-semibold text-foreground">Feature</th>
                      <th className="text-center py-3 px-3 md:py-4 md:px-6 font-semibold text-primary">Sudsy Co.</th>
                      <th className="text-center py-3 px-3 md:py-4 md:px-6 font-semibold text-muted-foreground">Laundromat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Monthly Cost", sudsy: "From $40/mo", laundromat: "$89+/mo" },
                      { feature: "Laundry At Home", sudsy: true, laundromat: false },
                      { feature: "Free Delivery & Setup", sudsy: true, laundromat: false },
                      { feature: "Free Repairs", sudsy: true, laundromat: false },
                      { feature: "No Driving / Gas Costs", sudsy: true, laundromat: false },
                      { feature: "No Waiting Around", sudsy: true, laundromat: false },
                      { feature: "No Credit Check", sudsy: true, laundromat: "N/A" },
                    ].map(({ feature, sudsy, laundromat }, index) => (
                      <tr key={feature} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="py-3 px-3 md:py-3.5 md:px-6 text-foreground font-medium">{feature}</td>
                        <td className="py-3 px-3 md:py-3.5 md:px-6 text-center">
                          {typeof sudsy === "boolean" ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <span className="font-semibold text-primary">{sudsy}</span>
                          )}
                        </td>
                        <td className="py-3 px-3 md:py-3.5 md:px-6 text-center">
                          {typeof laundromat === "boolean" ? (
                            laundromat ? (
                              <Check className="h-5 w-5 text-primary mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                            )
                          ) : (
                            <span className="text-muted-foreground">{laundromat}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing with promo */}
        <section id="promo-pricing" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Choose Your Rental &amp; <span className="text-primary">Save $20</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Use promo code or mention this page when you sign up. The $20 discount applies to your first month.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Washer Only",
                  price: "40",
                  promoPrice: "20",
                  priceKey: "washer",
                  features: ["Top-loading washer", "Free delivery & installation", "Maintenance included"],
                  popular: false,
                },
                {
                  name: "Washer & Dryer Set",
                  price: "59.99",
                  promoPrice: "39.99",
                  priceKey: "washer-dryer",
                  features: ["Top-loading washer", "Standard capacity dryer", "Free delivery & installation", "Maintenance included", "Priority service"],
                  popular: true,
                },
                {
                  name: "Dryer Only",
                  price: "40",
                  promoPrice: "20",
                  priceKey: "washer",
                  features: ["Electric dryer", "Free delivery & installation", "Maintenance included"],
                  popular: false,
                },
              ].map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-card rounded-3xl p-6 md:p-8 ${
                    pkg.popular
                      ? "border-2 border-primary shadow-glow md:scale-105 z-10"
                      : "border border-border shadow-soft"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      Best Value
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-lg text-muted-foreground line-through">${pkg.price}/mo</span>
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-semibold text-primary">$</span>
                      <span className="font-display font-bold text-5xl text-primary">{pkg.promoPrice}</span>
                      <span className="text-muted-foreground">/1st mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">then ${pkg.price}/mo after</p>
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
                    className="w-full font-semibold rounded-xl"
                    variant={pkg.popular ? "default" : "secondary"}
                    size="lg"
                    onClick={() => handleCheckout(pkg.priceKey)}
                    disabled={!!loadingPackage || subscription.subscribed}
                  >
                    {loadingPackage === pkg.priceKey ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : subscription.subscribed ? (
                      "Already Subscribed"
                    ) : (
                      "Claim $20 Off"
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Or call us at{" "}
              <a href="tel:+12282007105" className="text-primary font-semibold hover:underline">
                (228) 200-7105
              </a>{" "}
              to get started. Mention this promo page!
            </p>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="py-16 bg-[hsl(200,60%,95%)]">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                  Check Availability in Your Area
                </h2>
                <p className="text-muted-foreground">Enter your info and we'll confirm service in your neighborhood.</p>
              </motion.div>

              <LeadCaptureForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-8">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="own" className="bg-card border border-border rounded-3xl px-6 data-[state=open]:shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    Do I own the machines?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    No — the machines are rented to you on a month-to-month basis after a 6 month minimum contract. We handle all maintenance and repairs so you never have to worry about ownership costs. If you ever want to stop, after the 6 month minimum contract simply let us know and we'll pick the units up for free.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="breaks" className="bg-card border border-border rounded-3xl px-6 data-[state=open]:shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    What if it breaks?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    We've got you covered! Repairs are 100% free and included in your rental. We guarantee a fix or a full swap within 48 business hours so you're never without clean laundry for long.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="contract" className="bg-card border border-border rounded-3xl px-6 data-[state=open]:shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    Is there a long-term contract?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    Nope! All rentals are month-to-month with no long-term commitment. You can cancel anytime — no cancellation fees, no hassle. We'll even pick up the machines at no charge.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button
          size="lg"
          className="w-full font-bold text-base rounded-xl"
          onClick={() => document.getElementById("promo-pricing")?.scrollIntoView({ behavior: "smooth" })}
        >
          🎉 Claim My $20 Off <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Add bottom padding on mobile so sticky bar doesn't cover content */}
      <div className="h-16 lg:hidden" />

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default TwentyDollarPromo;
