import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Home, Users, Truck, Clock } from "lucide-react";

const TemporaryFurnitureRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Temporary Furniture Rental Ocean Springs MS",
    "description": "Temporary furniture rental in Ocean Springs, MS for apartments, relocations, and short stays. Locally owned on the Mississippi Gulf Coast.",
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
    "areaServed": ["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"],
    "serviceType": "Temporary Furniture Rental"
  };

  return (
    <>
      <Helmet>
        <title>Temporary Furniture Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Temporary furniture rental in Ocean Springs, MS for apartments, relocations, and short stays. Locally owned on the Mississippi Gulf Coast. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/temporary-furniture-rental" />
        <meta property="og:title" content="Temporary Furniture Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Temporary furniture rental in Ocean Springs, MS for apartments, relocations, and short stays." />
        <meta property="og:url" content="https://www.sudsycorentals.com/temporary-furniture-rental" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow" />
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
              Temporary Furniture Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Need furniture for a few weeks or a few months without buying a full setup? Sudsy Co. offers temporary furniture rental in Ocean Springs and across the Mississippi Gulf Coast for people who need a practical, short-term solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <a href="tel:2283383455"><Phone className="mr-2 h-5 w-5 inline" /> (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Who Temporary Furniture Rental Is For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Truck className="h-6 w-6" />, text: "People relocating to the Gulf Coast" },
                { icon: <Home className="h-6 w-6" />, text: "Families between homes" },
                { icon: <Clock className="h-6 w-6" />, text: "Short-term apartment residents" },
                { icon: <Users className="h-6 w-6" />, text: "Military households in transition" },
                { icon: <Home className="h-6 w-6" />, text: "Property owners staging or furnishing quickly" },
                { icon: <CheckCircle className="h-6 w-6" />, text: "Anyone needing a furnished setup now" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 text-blue-600">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Rent */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Rent Furniture Instead of Buy?
            </h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Buying furniture for a short-term situation usually creates a second problem: what to do with it later. Temporary rental keeps things simple.
              </p>
              <ul className="space-y-3 text-gray-700 text-left max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Get a usable setup fast</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Avoid the upfront cost of buying</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>No worrying about selling, storing, or hauling later</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Gulf Coast Fit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A Good Fit for Gulf Coast Moves and Transitions
            </h2>
            <p className="text-gray-700 mb-6">
              On the Coast, people move for work, military assignments, family changes, and housing transitions all the time. Temporary furniture rental gives those households breathing room. You can get settled now and make longer-term decisions later.
            </p>
          </div>
        </section>

        {/* Pair with Appliances */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pair Furniture Rental with Appliance Rental
            </h2>
            <p className="text-gray-700 mb-6">
              If you're setting up a home from scratch, Sudsy Co. can also help with{" "}
              <Link to="/home-appliance-rental" className="text-blue-600 hover:underline">home appliance rental</Link>, including washers and dryers. That gives you one local company to help get the space functional fast.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to="/furniture-rental-service" className="text-blue-600 hover:underline">Furniture Rental Service</Link>
              <span className="text-gray-400">•</span>
              <Link to="/vacation-furniture-rental" className="text-blue-600 hover:underline">Vacation Furniture Rental</Link>
              <span className="text-gray-400">•</span>
              <Link to="/furnished-apartment-rental" className="text-blue-600 hover:underline">Furnished Apartment Rental</Link>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ask About Temporary Furniture Rental</h2>
            <p className="text-blue-100 mb-8">Call to talk through what you need and what inventory is currently available.</p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
              <a href="tel:2283383455">Call (228) 338-3455</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default TemporaryFurnitureRental;
