import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Truck,
  Wrench,
  DollarSign,
  ShieldCheck,
  MapPin,
  Phone,
  ArrowRight,
  Star,
  Clock,
  Users,
  Home,
} from "lucide-react";
import heroImg from "@/assets/washer-dryer-hero.png";

const pillarSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Washer and Dryer Rental",
  provider: {
    "@type": "LocalBusiness",
    name: "Sudsy Co. Rentals",
    telephone: "+1-228-338-3455",
    url: "https://sudsycorentals.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1302 Fort St",
      addressLocality: "Ocean Springs",
      addressRegion: "MS",
      postalCode: "39564",
      addressCountry: "US",
    },
  },
  areaServed: [
    "Gulfport, MS",
    "Biloxi, MS",
    "Ocean Springs, MS",
    "D'Iberville, MS",
    "Long Beach, MS",
    "Gautier, MS",
    "Pascagoula, MS",
    "Pass Christian, MS",
    "Moss Point, MS",
  ],
  description:
    "Affordable washer and dryer rental on the Mississippi Gulf Coast. Free delivery, free installation, no credit check. Starting at $40/month.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "40.00",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does washer and dryer rental cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Washer and dryer rental from Sudsy Co. starts at $40/month for a washer only or $59.99/month for a complete washer and dryer set. This includes free delivery, installation, and maintenance.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a credit check to rent a washer and dryer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sudsy Co. Rentals does not require a credit check for any of our washer and dryer rentals. Simply choose your plan and schedule delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Where do you deliver washer and dryer rentals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver across the Mississippi Gulf Coast including Gulfport, Biloxi, Ocean Springs, D'Iberville, Long Beach, Gautier, Pascagoula, Pass Christian, and Moss Point.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my rented washer or dryer breaks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sudsy Co. provides a 2-day repair guarantee. If your machine malfunctions, we will fix or swap it within 48 business hours at no additional cost to you.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a minimum rental term?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all washer and dryer rentals require a 6-month minimum term. After the initial period, your rental continues month-to-month and you can cancel anytime with no fees.",
      },
    },
  ],
};

const serviceAreas = [
  { name: "Gulfport", slug: "gulfport" },
  { name: "Biloxi", slug: "biloxi" },
  { name: "Ocean Springs", slug: "ocean-springs" },
  { name: "D'Iberville", slug: "diberville" },
  { name: "Long Beach", slug: "long-beach" },
  { name: "Gautier", slug: "gautier" },
  { name: "Pascagoula", slug: "pascagoula" },
  { name: "Pass Christian", slug: "pass-christian" },
  { name: "Moss Point", slug: "moss-point" },
];

const WasherDryerRental = () => {
  return (
    <>
      <Helmet>
        <title>
          Washer and Dryer Rental | Mississippi Gulf Coast | Sudsy Co.
        </title>
        <meta
          name="description"
          content="Washer and dryer rental on the Mississippi Gulf Coast starting at $40/mo. Free delivery, free installation, no credit check. Serving Gulfport, Biloxi, Ocean Springs and more."
        />
        <link
          rel="canonical"
          href="https://sudsycorentals.com/washer-and-dryer-rental"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Washer and Dryer Rental | Mississippi Gulf Coast | Sudsy Co."
        />
        <meta
          property="og:description"
          content="Affordable washer and dryer rental with free delivery. No credit check. Serving the entire MS Gulf Coast."
        />
        <meta property="og:url" content="https://sudsycorentals.com/washer-and-dryer-rental" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(pillarSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <div className="hero-gradient py-4">
          <Breadcrumbs items={[{ label: "Washer and Dryer Rental" }]} />
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Washer and Dryer Rental on the Mississippi Gulf Coast
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Skip the laundromat and stop overpaying for appliances. Rent a
                  washer and dryer from Sudsy Co. starting at{" "}
                  <strong className="text-foreground">$40/month</strong> — with
                  free delivery, free installation, and no credit check.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8"
                    asChild
                  >
                    <Link to="/#pricing">Rent Online Now</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-lg"
                    asChild
                  >
                    <a href="tel:+12283383455">
                      <Phone className="w-5 h-5 mr-2" />
                      (228) 338-3455
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <img
                  src={heroImg}
                  alt="Washer and dryer rental set available for delivery on the Mississippi Gulf Coast"
                  className="w-full max-w-lg rounded-2xl"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-primary py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-primary-foreground text-center">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: ShieldCheck, text: "No Credit Check" },
                { icon: Wrench, text: "Free Repairs" },
                { icon: DollarSign, text: "From $40/mo" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6" />
                  <span className="font-semibold text-sm md:text-base">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Is Washer and Dryer Rental */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              What Is Washer and Dryer Rental?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Washer and dryer rental is a simple, affordable alternative to
                buying laundry appliances. Instead of spending $800–$2,000
                upfront on a new set, you pay a low monthly fee and we handle
                everything — delivery, installation, maintenance, and repairs.
              </p>
              <p>
                At <strong className="text-foreground">Sudsy Co. Rentals</strong>
                , we specialize in washer and dryer rental for the Mississippi
                Gulf Coast. Whether you're in an apartment without appliances, a
                military family at Keesler AFB, or simply looking for a smarter
                way to do laundry at home, our rental plans give you everything
                you need with zero hassle.
              </p>
            </div>
          </div>
        </section>

        {/* Why Rent Section */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Why Rent a Washer and Dryer?
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
              Renting beats buying and the laundromat — here's why Gulf Coast
              residents choose Sudsy Co.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: DollarSign,
                  title: "Save Money Every Month",
                  desc: "At $59.99/month for a full set, you spend less than half what the average family spends at the laundromat ($100–$180/month).",
                },
                {
                  icon: Truck,
                  title: "Free Delivery and Installation",
                  desc: "We deliver your washer and dryer and handle all hookups at no extra cost. No need to hire a plumber or electrician.",
                },
                {
                  icon: Wrench,
                  title: "Free Maintenance and Repairs",
                  desc: "If anything breaks, we fix or swap it within 48 business hours — our 2-day repair guarantee. Zero repair bills, ever.",
                },
                {
                  icon: ShieldCheck,
                  title: "No Credit Check Required",
                  desc: "We believe everyone deserves clean laundry at home. No credit check, no deposit, no hidden fees.",
                },
                {
                  icon: Clock,
                  title: "Flexible Terms",
                  desc: "After the initial 6-month term, your rental is month-to-month. Cancel anytime with no penalties.",
                },
                {
                  icon: Home,
                  title: "Locally Owned and Operated",
                  desc: "We're your neighbors in Ocean Springs, MS — not a faceless corporation. Expect personal, reliable service.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Snapshot */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Washer and Dryer Rental Pricing
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Simple, transparent pricing. No hidden fees. Everything included.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Washer Only",
                  price: "$40",
                  features: [
                    "Top-loading washer",
                    "Free delivery and installation",
                    "Free maintenance",
                  ],
                },
                {
                  name: "Washer and Dryer Set",
                  price: "$59.99",
                  popular: true,
                  features: [
                    "Washer + electric dryer",
                    "Free delivery and installation",
                    "Free maintenance",
                    "Most popular choice",
                  ],
                },
                {
                  name: "Washer and Gas Dryer",
                  price: "$69.99",
                  features: [
                    "Washer + gas dryer",
                    "Free delivery and installation",
                    "Free maintenance",
                    "Premium option",
                  ],
                },
              ].map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-xl p-6 border ${
                    pkg.popular
                      ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                      : "border-border bg-card"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {pkg.price}
                    <span className="text-base font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-muted-foreground text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/#pricing">Rent Now</Link>
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              All plans include a 6-month minimum term. No credit check required.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              How Washer and Dryer Rental Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Plan",
                  desc: "Pick a washer only, washer and dryer set, or gas dryer upgrade.",
                },
                {
                  step: "2",
                  title: "Schedule Delivery",
                  desc: "We deliver as soon as next day across the Gulf Coast.",
                },
                {
                  step: "3",
                  title: "We Install Everything",
                  desc: "Our team handles full setup and hookup at no extra cost.",
                },
                {
                  step: "4",
                  title: "Do Laundry at Home",
                  desc: "Enjoy the convenience. If anything breaks, we fix it free.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Washer and Dryer Rental vs. Buying vs. Laundromat
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-lg">
              See how renting stacks up against the alternatives.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-foreground font-semibold">
                      Feature
                    </th>
                    <th className="py-3 px-4 text-primary font-semibold">
                      Sudsy Co. Rental
                    </th>
                    <th className="py-3 px-4 text-muted-foreground font-semibold">
                      Buying New
                    </th>
                    <th className="py-3 px-4 text-muted-foreground font-semibold">
                      Laundromat
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Monthly cost", "$40–$69.99", "$0 (after purchase)", "$100–$180"],
                    ["Upfront cost", "$0", "$800–$2,000+", "$0"],
                    ["Delivery", "Free", "$50–$150", "N/A"],
                    ["Installation", "Free", "$100–$200", "N/A"],
                    ["Repairs", "Free (48-hr guarantee)", "$150–$500+", "N/A"],
                    ["Credit check", "None", "Financing may require", "N/A"],
                    ["Flexibility", "Cancel after 6 months", "You're stuck with it", "Pay per visit"],
                    ["Convenience", "At home, your schedule", "At home", "Drive, wait, haunder"],
                  ].map(([feature, rental, buying, laundromat]) => (
                    <tr
                      key={feature}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 px-4 font-medium text-foreground">
                        {feature}
                      </td>
                      <td className="py-3 px-4 text-primary font-medium">
                        {rental}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {buying}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {laundromat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who Rents Section */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              Who Rents a Washer and Dryer?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Apartment Renters",
                  desc: "Many Gulf Coast apartments have hookups but no machines. Renting fills the gap without a big purchase.",
                  link: "/blog/apartment-washer-dryer-hookups-guide",
                  linkText: "Check your hookups →",
                },
                {
                  icon: Star,
                  title: "Military Families at Keesler AFB",
                  desc: "PCS orders can come anytime. Month-to-month rentals mean no appliances to sell or move.",
                  link: "/blog/keesler-afb-washer-dryer-rental",
                  linkText: "Keesler rental guide →",
                },
                {
                  icon: Users,
                  title: "Budget-Conscious Families",
                  desc: "At $59.99/month, renting is cheaper than weekly laundromat trips averaging $100–$180/month.",
                  link: "/blog/washer-dryer-rental-vs-laundromat-cost-comparison",
                  linkText: "See the cost comparison →",
                },
                {
                  icon: Clock,
                  title: "Temporary Residents",
                  desc: "Travel nurses, construction workers, and seasonal residents get home laundry without long-term commitment.",
                  link: "/areas-we-serve",
                  linkText: "View service areas →",
                },
              ].map(({ icon: Icon, title, desc, link, linkText }) => (
                <div
                  key={title}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{desc}</p>
                  <Link
                    to={link}
                    className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    {linkText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area Hub */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Washer and Dryer Rental Service Areas
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-lg">
              We deliver across the entire Mississippi Gulf Coast. Click your
              city for local details.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/locations/${area.slug}`}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all group"
                >
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {area.name}, MS
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
            <p className="text-center mt-6">
              <Link
                to="/areas-we-serve"
                className="text-primary font-semibold hover:underline"
              >
                View all areas we serve →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              Washer and Dryer Rental FAQs
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq) => (
                <div
                  key={faq.name}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {faq.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              Washer and Dryer Rental Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Washer and Dryer Rental Near Me: Gulf Coast Guide",
                  desc: "The complete guide to finding washer and dryer rental on the Mississippi Gulf Coast.",
                  link: "/blog/washer-and-dryer-rental-near-me-mississippi-gulf-coast",
                },
                {
                  title: "Rental vs. Laundromat: Cost Comparison",
                  desc: "See how much you save renting versus using the laundromat every week.",
                  link: "/blog/washer-dryer-rental-vs-laundromat-cost-comparison",
                },
                {
                  title: "Do I Have Hookups? A Renter's Guide",
                  desc: "Check if your apartment has the right connections before scheduling delivery.",
                  link: "/blog/apartment-washer-dryer-hookups-guide",
                },
                {
                  title: "Hookup Checklist (Printable)",
                  desc: "Download our free printable checklist to verify your washer and dryer hookups.",
                  link: "/resources/hookup-checklist",
                },
              ].map((resource) => (
                <Link
                  key={resource.link}
                  to={resource.link}
                  className="block bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {resource.desc}
                  </p>
                  <span className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Rent a Washer and Dryer?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of Gulf Coast families who save time and money with
              Sudsy Co. Free delivery, free installation, no credit check.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8"
                asChild
              >
                <Link to="/#pricing">Rent Online Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg"
                asChild
              >
                <a href="tel:+12283383455">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (228) 338-3455
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default WasherDryerRental;
