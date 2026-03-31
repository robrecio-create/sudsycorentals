import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Home, Users, Briefcase, Clock } from "lucide-react";

const FurnishedApartmentRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Furnished Apartment Rental Ocean Springs MS",
    "description": "Furnished apartment rental support in Ocean Springs, MS. Furniture rental for apartments, short stays, relocations, and temporary housing.",
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
    "serviceType": "Furnished Apartment Rental"
  };

  return (
    <>
      <Helmet>
        <title>Furnished Apartment Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Furnished apartment rental support in Ocean Springs, MS. Furniture rental for apartments, short stays, relocations, and temporary housing. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/furnished-apartment-rental" />
        <meta property="og:title" content="Furnished Apartment Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Furnished apartment rental support in Ocean Springs, MS. Furniture rental for apartments, short stays, and relocations." />
        <meta property="og:url" content="https://www.sudsycorentals.com/furnished-apartment-rental" />
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
              Furnished Apartment Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Need to get an apartment furnished quickly without buying a full set of furniture? Sudsy Co. helps with furnished apartment rental needs in Ocean Springs and across the Mississippi Gulf Coast. If you're setting up a short-term apartment, relocation housing, or temporary living situation, we can help you get the space functional faster.
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
              Furniture Support for Apartment Living
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Clock className="h-6 w-6" />, text: "Temporary apartment stays" },
                { icon: <Briefcase className="h-6 w-6" />, text: "Corporate or work relocations" },
                { icon: <Users className="h-6 w-6" />, text: "Military transitions" },
                { icon: <Home className="h-6 w-6" />, text: "Families between permanent housing" },
                { icon: <Home className="h-6 w-6" />, text: "Property owners furnishing a rental unit" },
                { icon: <CheckCircle className="h-6 w-6" />, text: "Residents who want a furnished setup without big upfront costs" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 text-blue-600">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Furnished Apartment Rental Matters
            </h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                A furnished apartment is more practical, more comfortable, and easier to live in — but buying everything at once can be expensive and time-consuming.
              </p>
              <p className="text-gray-700 font-medium">
                Renting furniture gives you a faster path to a usable living space without the long-term commitment of ownership.
              </p>
            </div>
          </div>
        </section>

        {/* Pair with Appliances */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pair It with Appliance Rental
            </h2>
            <p className="text-gray-700 mb-6">
              If the apartment also needs a washer and dryer, Sudsy Co. can help there too. Our{" "}
              <Link to="/home-appliance-rental" className="text-blue-600 hover:underline">home appliance rental</Link> and{" "}
              <Link to="/washer-and-dryer-rental" className="text-blue-600 hover:underline">washer and dryer rental</Link> services make it easier to get the whole space functional without dealing with multiple vendors.
            </p>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/furniture-rental-service" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium px-4 py-2 rounded-full transition-colors">
                Furniture Rental Service
              </Link>
              <Link to="/temporary-furniture-rental" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium px-4 py-2 rounded-full transition-colors">
                Temporary Furniture Rental
              </Link>
              <Link to="/vacation-furniture-rental" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium px-4 py-2 rounded-full transition-colors">
                Vacation Furniture Rental
              </Link>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Ocean Springs and the Gulf Coast</h2>
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
            <h2 className="text-3xl font-bold mb-4">Ask About Furnished Apartment Rental</h2>
            <p className="text-blue-100 mb-8">Call to discuss what kind of apartment setup you need and what inventory is currently available.</p>
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

export default FurnishedApartmentRental;
