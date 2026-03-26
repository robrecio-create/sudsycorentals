import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, DollarSign, Phone } from "lucide-react";

const FurnitureRentalService = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Furniture Rental Service",
    "description": "Washer and dryer furniture rental service in Ocean Springs, MS. Large home appliances delivered and installed. Starting at $59.99/mo.",
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
      "priceCurrency": "USD"
    },
    "serviceType": "Furniture Rental"
  };

  return (
    <>
      <Helmet>
        <title>Furniture Rental Service Ocean Springs MS | Sudsy Co. Washer & Dryer</title>
        <meta
          name="description"
          content="Furniture rental service in Ocean Springs, MS — including washer and dryer rentals. Large home appliances delivered and installed starting at $59.99/mo. No credit check."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/furniture-rental-service" />
        <meta property="og:title" content="Furniture Rental Service Ocean Springs MS | Sudsy Co. Washer & Dryer" />
        <meta property="og:description" content="Furniture rental service in Ocean Springs, MS — including washer and dryer rentals. Large home appliances delivered and installed. Starting at $59.99/mo." />
        <meta property="og:url" content="https://www.sudsycorentals.com/furniture-rental-service" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Furniture Rental Service Ocean Springs MS | Sudsy Co. Washer & Dryer" />
        <meta name="twitter:description" content="Furniture rental service in Ocean Springs, MS — including washer and dryer rentals. Starting at $59.99/mo. Free delivery, no credit check." />
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
              Furniture Rental Service
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Large Home Appliance Rentals — Mississippi Gulf Coast
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Sudsy Co. offers large home appliance rental — washers and dryers delivered and installed at your home. No credit check, no long-term contracts. Starting at $59.99/mo.
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

        {/* Why Rent */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Why Rent Instead of Buy?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Buying a washer or dryer can cost $600–$1,200 upfront. Renting from Sudsy Co. gets you a full-size machine delivered to your door for a low monthly rate — with repairs included.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <DollarSign className="h-8 w-8 text-blue-600" />,
                  title: "No Large Upfront Cost",
                  desc: "Start with just your first month's payment. No down payment, no financing needed.",
                },
                {
                  icon: <Truck className="h-8 w-8 text-blue-600" />,
                  title: "Free Delivery & Setup",
                  desc: "We bring the appliance to you and handle the full installation at no extra charge.",
                },
                {
                  icon: <Wrench className="h-8 w-8 text-blue-600" />,
                  title: "Repairs Always Covered",
                  desc: "If your washer or dryer breaks down, we repair or replace it — included in your rental.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                  title: "No Credit Check",
                  desc: "We don't run credit checks. Easy approval for everyone on the Mississippi Gulf Coast.",
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

        {/* Plans */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rental Plans</h2>
            <p className="text-gray-600 mb-10">Flexible month-to-month rentals with no long-term commitment.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Washer Only", price: "$59.99/mo", desc: "Full-size washer, delivered and installed free." },
                { name: "Dryer Only", price: "$59.99/mo", desc: "Full-size dryer, delivered and installed free." },
                { name: "Washer + Dryer", price: "$99.99/mo", desc: "Complete set — the most popular option for families." },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Areas We Serve</h2>
            <p className="text-gray-600 mb-8">We deliver throughout the Mississippi Gulf Coast:</p>
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
            <h2 className="text-3xl font-bold mb-4">Get Your Appliance Delivered This Week</h2>
            <p className="text-blue-100 mb-8">Same-week delivery available in most areas. Call or check pricing online.</p>
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

export default FurnitureRentalService;
