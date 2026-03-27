import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Phone, Home, Users, Shield, Sun, DollarSign } from "lucide-react";

const HomeApplianceRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Appliance Rental Ocean Springs MS",
    "description": "Home appliance rental in Ocean Springs, MS. Washer, dryer, and furniture rentals with free delivery and installation. Starting at $59.99/mo. No credit check.",
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
    "serviceType": "Home Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Home Appliance Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Home appliance rental in Ocean Springs, MS. Washer, dryer, and furniture rentals with free delivery and installation. Starting at $59.99/mo. No credit check."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/home-appliance-rental" />
        <meta property="og:title" content="Home Appliance Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Home appliance rental in Ocean Springs, MS. Washer, dryer, and furniture rentals with free delivery and installation. Starting at $59.99/mo." />
        <meta property="og:url" content="https://www.sudsycorentals.com/home-appliance-rental" />
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
              Home Appliance Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Setting up a home on the Mississippi Gulf Coast shouldn't mean dropping thousands of dollars on appliances before you even know if you'll be staying. Sudsy Co. rents washers, dryers, and furniture — delivered free, installed free, with no credit check and no long-term contract.
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

        {/* What We Rent */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What We Rent
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Washers and Dryers</h3>
                <p className="text-gray-600 mb-4">
                  Our most popular rentals. Standard-capacity sets start at $59.99/mo, and larger-capacity units are $79.99/mo. We deliver and install everything. If the machine breaks, we fix it — you're not responsible for repairs.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/washer-and-dryer-rental">Learn More</Link>
                </Button>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Furniture</h3>
                <p className="text-gray-600 mb-4">
                  We also rent furniture for households that need a complete setup without the full buy-in. Temporary furniture rental, vacation rental setups, and furnished apartment packages available — ask us about current inventory.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/furniture-rental-service">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Home Appliance Rental Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Pick what you need", desc: "Washer/dryer set, furniture, or both" },
                { step: "2", title: "Schedule delivery", desc: "Next-day delivery across the Gulf Coast" },
                { step: "3", title: "We install it", desc: "Hookups, leveling, everything" },
                { step: "4", title: "Pay monthly", desc: "$59.99/mo for a standard set" },
                { step: "5", title: "Cancel anytime", desc: "We pick it up for free" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Uses */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Who Uses Home Appliance Rental in Ocean Springs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Home className="h-6 w-6" />, title: "New Gulf Coast Residents", desc: "Get your household running immediately while you figure out your long-term situation" },
                { icon: <Shield className="h-6 w-6" />, title: "Military Families at Keesler", desc: "Bring the essentials, rent the rest, leave it all behind when orders come" },
                { icon: <Users className="h-6 w-6" />, title: "Renters & Apartment Dwellers", desc: "Fill the laundry gap without the capital investment of buying your own" },
                { icon: <DollarSign className="h-6 w-6" />, title: "Landlords & Property Managers", desc: "Offer furnished units or in-unit laundry without tying up capital" },
                { icon: <Sun className="h-6 w-6" />, title: "Snowbirds & Seasonal Residents", desc: "Fully equipped home without storing or selling everything in the off-season" },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 bg-white rounded-xl p-5 hover:border-blue-400 transition-colors">
                  <div className="text-blue-600 mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Area — Mississippi Gulf Coast
            </h2>
            <p className="text-gray-600 mb-8">We deliver home appliance rentals to:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Most of our deliveries happen next-day. Call us to confirm your window.</p>
          </div>
        </section>

        {/* No Credit Check */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Credit Check. No Contract. No Hassle.
            </h2>
            <p className="text-gray-700">
              We don't run your credit. We don't require a lease. Month-to-month billing means you're never locked in — you rent for as long as you need and cancel when your situation changes.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Your Home Set Up Today</h2>
            <p className="text-blue-100 mb-8">Call us or start your rental online. We'll confirm your delivery window and get your home running as soon as tomorrow.</p>
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

export default HomeApplianceRental;
