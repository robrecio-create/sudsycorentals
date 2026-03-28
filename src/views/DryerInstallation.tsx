import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Phone, Zap, Wind, Settings, Trash2 } from "lucide-react";

const DryerInstallation = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dryer Installation Ocean Springs MS",
    "description": "Free dryer installation in Ocean Springs, MS with every Sudsy Co. rental. Electric and gas-compatible. We deliver, connect, and vent your dryer.",
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
    "serviceType": "Dryer Installation"
  };

  return (
    <>
      <Helmet>
        <title>Dryer Installation Ocean Springs MS | Free Setup | Sudsy Co.</title>
        <meta
          name="description"
          content="Free dryer installation in Ocean Springs, MS with every Sudsy Co. rental. Electric and gas-compatible. We deliver, connect, and vent your dryer. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/dryer-installation" />
        <meta property="og:title" content="Dryer Installation Ocean Springs MS | Free Setup | Sudsy Co." />
        <meta property="og:description" content="Free dryer installation in Ocean Springs, MS with every Sudsy Co. rental. We deliver, connect, and vent your dryer." />
        <meta property="og:url" content="https://www.sudsycorentals.com/dryer-installation" />
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
              Dryer Installation in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Dryer installation is one of those jobs that looks simple but goes wrong fast if you cut corners — a loose vent connection or improper electrical hookup isn't just inconvenient, it's a fire hazard. At Sudsy Co., dryer installation is included free with every rental.
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

        {/* What Installation Includes */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Dryer Installation Includes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Truck className="h-6 w-6" />, title: "Delivery Inside Your Home", desc: "No curbside drops, no 'you figure out the stairs'" },
                { icon: <Zap className="h-6 w-6" />, title: "Electrical Connection", desc: "Standard 120V or 240V connection depending on your unit and hookup" },
                { icon: <Wind className="h-6 w-6" />, title: "Vent Connection", desc: "We connect the dryer exhaust vent to your existing ductwork" },
                { icon: <Settings className="h-6 w-6" />, title: "Leveling", desc: "Properly leveled to reduce vibration and wear" },
                { icon: <CheckCircle className="h-6 w-6" />, title: "Test Run", desc: "We run it before we leave to confirm everything works" },
                { icon: <Trash2 className="h-6 w-6" />, title: "Old Dryer Removal", desc: "If you have an old dryer taking up space, ask about old dryer pickup" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0 text-blue-600">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Electric Dryers */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Electric Dryers on the Gulf Coast
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Most Gulf Coast homes and apartments are set up for electric dryers — a 240V outlet in the laundry area. That's what Sudsy Co. rentals use. If you're not sure what you have, check for a large four-prong or three-prong outlet near your laundry hookups. If it's there, you're ready to go.
              </p>
            </div>
          </div>
        </section>

        {/* What You Need */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What You Need Before We Arrive
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">Standard dryer installation requires:</p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>A 240V electrical outlet (dryers draw too much power for a standard 120V outlet)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>An exterior vent port or dryer vent ductwork already in place</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                If your space doesn't have an existing vent, that's a construction issue we'd need to flag before installation. Most laundry areas on the Gulf Coast are already set up — but if you're renting in an older building or a converted space, it's worth confirming before we come out.
              </p>
            </div>
          </div>
        </section>

        {/* Included with Rental */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dryer Installation Included With Rental — $59.99/mo
            </h2>
            <p className="text-gray-700 mb-6">
              Professional dryer installation is included in your $59.99/mo rental — no separate setup fee. If anything goes wrong with the dryer after installation, call us. We handle all maintenance and repairs as part of your rental.
            </p>
            <p className="text-gray-700 font-medium">
              Month-to-month billing, no credit check, no long-term contract.
            </p>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-600 mb-8">We install dryers across Jackson County and Harrison County:</p>
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
            <h2 className="text-3xl font-bold mb-4">Schedule Dryer Installation</h2>
            <p className="text-blue-100 mb-8">Call us or get started online. Next-day delivery and installation available across most of the Gulf Coast.</p>
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

export default DryerInstallation;
