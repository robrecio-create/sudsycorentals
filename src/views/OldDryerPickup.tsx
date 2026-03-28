import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Phone, Recycle, Calendar, Package } from "lucide-react";

const OldDryerPickup = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Old Dryer Pickup Ocean Springs MS",
    "description": "Free old dryer pickup in Ocean Springs, MS when you start a Sudsy Co. rental. We remove your old dryer so you don't have to deal with it.",
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
    "serviceType": "Old Dryer Pickup"
  };

  return (
    <>
      <Helmet>
        <title>Old Dryer Pickup Ocean Springs MS | Free Removal | Sudsy Co.</title>
        <meta
          name="description"
          content="Free old dryer pickup in Ocean Springs, MS when you start a Sudsy Co. rental. We remove your old dryer so you don't have to deal with it. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/old-dryer-pickup" />
        <meta property="og:title" content="Old Dryer Pickup Ocean Springs MS | Free Removal | Sudsy Co." />
        <meta property="og:description" content="Free old dryer pickup in Ocean Springs, MS when you start a Sudsy Co. rental. We remove your old dryer." />
        <meta property="og:url" content="https://www.sudsycorentals.com/old-dryer-pickup" />
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
              Old Dryer Pickup in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              A dead dryer taking up half your laundry room is the kind of problem that's easy to ignore until it isn't. Sudsy Co. picks up old dryers across the Mississippi Gulf Coast — when we deliver your rental, we take the old machine out the same visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">Start a Rental</Link>
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
              How Old Dryer Pickup Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", icon: <Calendar className="h-6 w-6" />, title: "Book Your Rental", desc: "Call or start online" },
                { step: "2", icon: <Package className="h-6 w-6" />, title: "Mention the Old Dryer", desc: "Let us know when you schedule" },
                { step: "3", icon: <Truck className="h-6 w-6" />, title: "We Deliver & Remove", desc: "One trip handles it all" },
                { step: "4", icon: <CheckCircle className="h-6 w-6" />, title: "You're Done", desc: "New machine installed, old one gone" },
              ].map((item, i) => (
                <div key={i} className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <div className="text-blue-600 mb-3 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-8">
              Need both an old washer and dryer removed? We'll take both. See{" "}
              <Link to="/old-washer-pickup" className="text-blue-600 hover:underline">old washer pickup</Link>.
            </p>
          </div>
        </section>

        {/* What Happens */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What Happens to Your Old Dryer
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <Recycle className="h-8 w-8 text-green-600 shrink-0" />
                <div>
                  <p className="text-gray-700 mb-4">
                    If your old dryer has usable life left, it may be refurbished and added to our rental or{" "}
                    <Link to="/used-washer-dryer-sales" className="text-blue-600 hover:underline">used appliance sales</Link> inventory.
                  </p>
                  <p className="text-gray-700">
                    If it's truly finished, we dispose of it properly. Dryers contain components that require responsible disposal — we handle that so you don't have to navigate municipal waste rules on the Coast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Without Rental */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Old Dryer Pickup Without a New Rental
            </h2>
            <p className="text-gray-700 mb-6">
              Just need an old dryer removed without starting a rental? Contact us at (228) 338-3455 — depending on the machine's condition and our schedule, we may be able to help.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href="tel:2283383455">Call (228) 338-3455 to Discuss</a>
            </Button>
          </div>
        </section>

        {/* Real Cost */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              The Real Cost of Leaving a Dead Dryer in Place
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-4">
                Junk removal services on the Gulf Coast typically charge <strong>$75–$150</strong> to haul away a single appliance. Municipal bulk pickup schedules aren't always convenient.
              </p>
              <p className="text-gray-700 mb-4">
                And a dead dryer sitting in your laundry space takes up room you could actually use.
              </p>
              <p className="text-gray-700 font-medium">
                When you start a Sudsy Co. rental, old dryer pickup is part of the deal — no separate fee, no second appointment.
              </p>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-600 mb-8">Old dryer pickup available across Jackson County and Harrison County:</p>
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
            <h2 className="text-3xl font-bold mb-4">Get Your Old Dryer Removed</h2>
            <p className="text-blue-100 mb-8">Call us or start your rental online. Just mention the old dryer when you book.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">Start a Rental</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455">Call (228) 338-3455</a>
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              <strong>Sudsy Co. Washer and Dryer Rentals</strong><br />
              Locally owned. Ocean Springs, MS.<br />
              Serving the Mississippi Gulf Coast.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default OldDryerPickup;
