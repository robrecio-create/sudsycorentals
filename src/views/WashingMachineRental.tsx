import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, DollarSign, Phone, Users, Home, Shield } from "lucide-react";

const WashingMachineRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Washing Machine Rental Ocean Springs MS",
    "description": "Rent a washing machine in Ocean Springs, MS starting at $59.99/mo. Free next-day delivery, free installation, no credit check. Serving the Mississippi Gulf Coast.",
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
    "serviceType": "Washing Machine Rental"
  };

  return (
    <>
      <Helmet>
        <title>Washing Machine Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Rent a washing machine in Ocean Springs, MS starting at $59.99/mo. Free next-day delivery, free installation, no credit check. Serving the Mississippi Gulf Coast. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/washing-machine-rental" />
        <meta property="og:title" content="Washing Machine Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Rent a washing machine in Ocean Springs, MS starting at $59.99/mo. Free next-day delivery, free installation, no credit check." />
        <meta property="og:url" content="https://www.sudsycorentals.com/washing-machine-rental" />
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
              Washing Machine Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Half the apartments on the Gulf Coast don't come with a washer hookup — and the ones that do often leave you hunting down your own machine. That's where Sudsy Co. comes in. Starting at $59.99 a month, you get a working washer delivered and installed for free. No credit check. No long-term commitment.
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

        {/* How It Works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Washing Machine Rental Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Machine",
                  desc: "Standard-capacity washers at $59.99/mo or larger-capacity units at $79.99/mo.",
                },
                {
                  step: "2",
                  title: "Schedule Delivery",
                  desc: "We deliver next-day across Ocean Springs and the surrounding Gulf Coast.",
                },
                {
                  step: "3",
                  title: "We Install It",
                  desc: "Our team hooks everything up — you don't touch a thing.",
                },
                {
                  step: "4",
                  title: "Wash Your Clothes",
                  desc: "That's it. Month-to-month, no contracts, cancel anytime.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Rents */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Who Rents a Washing Machine in Ocean Springs?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Washing machine rental makes sense for a lot of different situations on the Gulf Coast.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Home className="h-6 w-6" />, title: "Apartment Renters", desc: "Units that don't include in-unit laundry" },
                { icon: <Shield className="h-6 w-6" />, title: "Keesler AFB Families", desc: "Short-term assignments without buying appliances" },
                { icon: <Wrench className="h-6 w-6" />, title: "Homeowners", desc: "Need something fast while deciding on a replacement" },
                { icon: <Users className="h-6 w-6" />, title: "Snowbirds", desc: "Part-year residents who want convenience without owning" },
                { icon: <DollarSign className="h-6 w-6" />, title: "Landlords", desc: "Offer in-unit laundry without upfront equipment cost" },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
                  <div className="text-blue-600 mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rental vs Buying */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Washing Machine Rental vs. Buying
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Buying a new washing machine runs $600–$1,200 for a decent unit, plus delivery fees, installation fees, and whatever it costs to haul away your old one. Then there's the repair costs if something breaks.
              </p>
              <p className="text-gray-700 mb-6">
                With Sudsy Co., you pay $59.99/mo and we handle everything — delivery, installation, and if the machine ever has a problem, we take care of it. You're not on the hook for repairs.
              </p>
              <p className="text-gray-700">
                If you're renting your place, moving in the next year or two, or just don't want the hassle of owning another appliance, rental is the smarter option for a lot of Gulf Coast households.
              </p>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Free Delivery and Installation Across the Mississippi Gulf Coast
            </h2>
            <p className="text-gray-600 mb-8">We deliver to all of Jackson County and Harrison County:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Next-day delivery is available across most of our service area. Call us and we'll confirm your delivery window.</p>
          </div>
        </section>

        {/* No Credit Check */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Credit Check. No Long-Term Contract.
            </h2>
            <p className="text-gray-700 mb-4">
              We don't run your credit. We don't lock you into a 12-month agreement. You rent month-to-month, and if your situation changes — you move, you buy a machine, whatever — you give us a call and we'll come pick it up.
            </p>
            <p className="text-gray-700">
              That's the kind of flexibility that makes sense for the Gulf Coast, where life doesn't always go according to plan.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Rent a Washing Machine?</h2>
            <p className="text-blue-100 mb-8">Call us or get started online. We'll get a machine delivered and installed as soon as tomorrow.</p>
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
              Serving the Mississippi Gulf Coast since 2025.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default WashingMachineRental;
