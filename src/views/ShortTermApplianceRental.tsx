import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Phone, Briefcase, Shield, Home, Clock, Sun } from "lucide-react";

const ShortTermApplianceRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Short-Term Appliance Rental Ocean Springs MS",
    "description": "Short-term appliance rental in Ocean Springs, MS. Rent a washer and dryer for weeks or months with free delivery and no credit check. Cancel anytime.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sudsy Co.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ocean Springs",
        "addressRegion": "MS",
        "postalCode": "39564",
        "addressCountry": "US"
      },
      "telephone": "+12283383455",
      "url": "https://www.sudsycorentals.com"
    },
    "areaServed": ["Ocean Springs", "Gulfport", "Biloxi", "D'Iberville", "Moss Point", "Pascagoula", "Gautier", "Long Beach", "Pass Christian"],
    "offers": {
      "@type": "Offer",
      "price": "59.99",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "59.99",
        "priceCurrency": "USD",
        "unitCode": "MON"
      }
    },
    "serviceType": "Short-Term Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Short-Term Appliance Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Short-term appliance rental in Ocean Springs, MS. Rent a washer and dryer for weeks or months with free delivery and no credit check. Cancel anytime. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/short-term-appliance-rental" />
        <meta property="og:title" content="Short-Term Appliance Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Short-term appliance rental in Ocean Springs, MS. Rent a washer and dryer for weeks or months with free delivery and no credit check." />
        <meta property="og:url" content="https://www.sudsycorentals.com/short-term-appliance-rental" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <TopBar />
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Short-Term Appliance Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Sometimes you need a washer and dryer for a few months — not a few years. Whether you're in town for a short-term work contract, waiting on a PCS move, renovating your laundry room, or just not ready to commit to buying, Sudsy Co. rents appliances short-term with no long-term strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">View Plans & Pricing</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455"><Phone className="mr-2 h-5 w-5 inline" /> (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>

        {/* What Makes It Short-Term */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What Makes It "Short-Term"?
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Sudsy Co. rents month-to-month, which means there's no minimum rental period beyond your first month. Stay a month, stay six months — it's up to you. When you're ready to return the machine, call us and we'll come pick it up. No cancellation fees, no questions.
              </p>
              <p className="text-gray-700">
                That flexibility is what makes our service work for the kinds of situations Gulf Coast residents actually deal with.
              </p>
            </div>
          </div>
        </section>

        {/* When It Makes Sense */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              When Short-Term Appliance Rental Makes Sense
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Briefcase className="h-8 w-8 text-blue-600" />,
                  title: "Temporary Work Assignments",
                  desc: "If you're on a 3-6 month contract job on the Gulf Coast, buying appliances you'll have to sell or move just doesn't pencil out. Rent short-term and leave clean.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-blue-600" />,
                  title: "Military PCS Transitions",
                  desc: "Keesler AFB families know the drill — you're here for a year or two, then you're somewhere else entirely. Renting short-term means you just call us when orders come.",
                },
                {
                  icon: <Wrench className="h-8 w-8 text-blue-600" />,
                  title: "Laundry Room Renovations",
                  desc: "If your laundry hookups are getting redone, you need a temporary setup while construction is underway. We can put a unit in a secondary space.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-blue-600" />,
                  title: "Appliance Emergencies",
                  desc: "Your washer died and you're waiting on a replacement to ship. A short-term rental bridges that 2-3 week gap where the laundromat gets expensive fast.",
                },
                {
                  icon: <Sun className="h-8 w-8 text-blue-600" />,
                  title: "Seasonal Residents",
                  desc: "If you spend fall and winter on the Gulf Coast, a short-term rental covers your stay without any of the headaches of storage or resale.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-6">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing for Short-Term Appliance Rental</h2>
            <p className="text-gray-600 mb-10">Delivery, installation, and pickup are all free. You're billed month-to-month with no setup fees or cancellation charges.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Basic", price: "$59.99/mo", desc: "Standard washer & dryer set" },
                { name: "Premium", price: "$79.99/mo", desc: "Larger-capacity units" },
              ].map((plan, i) => (
                <div key={i} className="border border-gray-200 bg-white rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-blue-600 font-bold text-3xl mb-3">{plan.price}</p>
                  <p className="text-gray-600 text-sm mb-4">{plan.desc}</p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="/#pricing">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Free Delivery and Installation — Next Day
            </h2>
            <p className="text-gray-600 mb-8">We deliver short-term appliance rentals across Jackson County and Harrison County:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Ocean Springs", "Biloxi (including near Keesler AFB)", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Call us today and we can usually get a machine out to you by tomorrow.</p>
          </div>
        </section>

        {/* No Credit Check */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Credit Check, No Commitment
            </h2>
            <p className="text-gray-700">
              We don't run credit. We don't require a long lease. You rent from us because it's the practical choice — and we keep it that way with straight month-to-month billing.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Rent Short-Term?</h2>
            <p className="text-blue-100 mb-8">Call us or start online. We'll confirm your delivery window and get a machine to you as soon as tomorrow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">Get Started</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455">Call (228) 338-3455</a>
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              <strong>Sudsy Co. Washer and Dryer Rentals</strong><br />
              Locally owned. Ocean Springs, MS.<br />
              Mississippi Gulf Coast.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default ShortTermApplianceRental;
