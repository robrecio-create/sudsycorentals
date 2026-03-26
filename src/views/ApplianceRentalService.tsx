import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, DollarSign, Phone } from "lucide-react";

const ApplianceRentalService = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Appliance Rental Service",
    "description": "Professional washer and dryer appliance rental service in Ocean Springs, MS. Starting at $59.99/mo with free delivery and installation.",
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
    "areaServed": ["Ocean Springs", "Gulfport", "Biloxi", "D'Iberville", "Moss Point", "Pascagoula", "Gautier", "Bay St. Louis", "Waveland"],
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
    "serviceType": "Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Appliance Rental Service Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Professional appliance rental service in Ocean Springs, MS. Rent washers and dryers starting at $59.99/mo. Free delivery, free installation, no credit check required."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/appliance-rental-service" />
        <meta property="og:title" content="Appliance Rental Service Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Professional appliance rental service in Ocean Springs, MS. Rent washers and dryers starting at $59.99/mo. Free delivery, free installation, no credit check." />
        <meta property="og:url" content="https://www.sudsycorentals.com/appliance-rental-service" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Appliance Rental Service Ocean Springs MS | Sudsy Co." />
        <meta name="twitter:description" content="Professional appliance rental service in Ocean Springs, MS. Rent washers and dryers starting at $59.99/mo. Free delivery, no credit check." />
        <meta name="twitter:image" content="https://www.sudsycorentals.com/og-image.png" />
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
              Appliance Rental Service
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ocean Springs & Mississippi Gulf Coast
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Sudsy Co. provides professional appliance rental service — washers and dryers delivered, installed, and maintained at your home. Starting at $59.99/mo with no credit check.
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

        {/* What We Offer */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Appliance Rental Service Includes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Truck className="h-8 w-8 text-blue-600" />,
                  title: "Free Delivery & Installation",
                  desc: "We deliver and install your washer or dryer — no hidden fees, no hassle.",
                },
                {
                  icon: <Wrench className="h-8 w-8 text-blue-600" />,
                  title: "Free Repairs & Maintenance",
                  desc: "If anything breaks, we fix it at no extra cost. Your appliance is always covered.",
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-blue-600" />,
                  title: "No Credit Check Required",
                  desc: "Flexible approval — anyone can qualify regardless of credit history.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                  title: "Month-to-Month Flexibility",
                  desc: "No long-term contracts. Keep the appliance as long as you need it.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appliances Available */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appliances Available to Rent</h2>
            <p className="text-gray-600 mb-10">Choose the plan that fits your household.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Washer Only", price: "$59.99/mo", desc: "Full-size washing machine, delivered and installed." },
                { name: "Dryer Only", price: "$59.99/mo", desc: "Full-size dryer, delivered and installed." },
                { name: "Washer + Dryer Set", price: "$99.99/mo", desc: "Complete laundry set — best value for most households." },
              ].map((plan, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-blue-600 font-bold text-2xl mb-3">{plan.price}</p>
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
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-600 mb-8">We provide appliance rental service throughout the Mississippi Gulf Coast:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Ocean Springs", "Gulfport", "Biloxi", "D'Iberville", "Gautier", "Pascagoula", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}, MS
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Rent an Appliance?</h2>
            <p className="text-blue-100 mb-8">Get started today — same-week delivery available in most areas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">See Pricing</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455">Call (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default ApplianceRentalService;
