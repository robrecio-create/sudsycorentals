import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Home, Sun, Calendar, Users } from "lucide-react";

const VacationFurnitureRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vacation Furniture Rental Mississippi Gulf Coast",
    "description": "Vacation furniture rental for Ocean Springs, Biloxi, Gulfport, and the Mississippi Gulf Coast. Furnish short-term stays and vacation properties fast.",
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
    "serviceType": "Vacation Furniture Rental"
  };

  return (
    <>
      <Helmet>
        <title>Vacation Furniture Rental Mississippi Gulf Coast | Sudsy Co.</title>
        <meta
          name="description"
          content="Vacation furniture rental for Ocean Springs, Biloxi, Gulfport, and the Mississippi Gulf Coast. Furnish short-term stays and vacation properties fast. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/vacation-furniture-rental" />
        <meta property="og:title" content="Vacation Furniture Rental Mississippi Gulf Coast | Sudsy Co." />
        <meta property="og:description" content="Vacation furniture rental for the Mississippi Gulf Coast. Furnish short-term stays and vacation properties fast." />
        <meta property="og:url" content="https://www.sudsycorentals.com/vacation-furniture-rental" />
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
              Vacation Furniture Rental on the Mississippi Gulf Coast
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              If you need to furnish a vacation property, short-term rental, or temporary coastal stay, Sudsy Co. offers vacation furniture rental across the Mississippi Gulf Coast. We help property owners and short-term residents get spaces furnished without the time, cost, and hassle of buying everything up front.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <a href="tel:2283383455"><Phone className="mr-2 h-5 w-5 inline" /> (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Built for Short-Term */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Built for Short-Term and Seasonal Needs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Home className="h-6 w-6" />, text: "Vacation properties needing quick furniture setup" },
                { icon: <Sun className="h-6 w-6" />, text: "Seasonal stays on the Coast" },
                { icon: <Calendar className="h-6 w-6" />, text: "Short-term furnished rentals" },
                { icon: <Home className="h-6 w-6" />, text: "Owners refreshing a property without full furniture purchases" },
                { icon: <Users className="h-6 w-6" />, text: "Temporary housing for guests, workers, or family" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 text-blue-600">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Makes Sense */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why It Makes Sense for Gulf Coast Properties
            </h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Vacation and seasonal housing on the Mississippi Gulf Coast needs flexibility. Buying furniture for every temporary use case can get expensive fast.
              </p>
              <p className="text-gray-700 font-medium">
                Renting lets you furnish the property you need today while keeping your costs and commitments lower.
              </p>
            </div>
          </div>
        </section>

        {/* Faster */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Faster Than Piecing Everything Together Yourself
            </h2>
            <p className="text-gray-700">
              Trying to source furniture piece by piece from big-box stores, Facebook Marketplace, or local pickups takes time and energy. Vacation furniture rental gives you a faster path to a furnished, usable space.
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
              <Link to="/furnished-apartment-rental" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium px-4 py-2 rounded-full transition-colors">
                Furnished Apartment Rental
              </Link>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Coverage Across the Coast</h2>
            <p className="text-gray-600 mb-6">Sudsy Co. serves:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-6 text-sm">
              That makes us a practical local option for Gulf Coast owners and residents who need furniture support without making this a full project.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ask About Vacation Furniture Rental</h2>
            <p className="text-blue-100 mb-8">Call to ask about current availability and what type of setup you need.</p>
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

export default VacationFurnitureRental;
