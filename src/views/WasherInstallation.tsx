import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Phone, Droplets, Settings, Trash2 } from "lucide-react";

const WasherInstallation = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Washer Installation Ocean Springs MS",
    "description": "Free washer installation in Ocean Springs, MS with every Sudsy Co. rental. We deliver, hook up, and level your machine. No extra fees.",
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
    "serviceType": "Washer Installation"
  };

  return (
    <>
      <Helmet>
        <title>Washer Installation Ocean Springs MS | Free Setup | Sudsy Co.</title>
        <meta
          name="description"
          content="Free washer installation in Ocean Springs, MS with every Sudsy Co. rental. We deliver, hook up, and level your machine. No extra fees. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/washer-installation" />
        <meta property="og:title" content="Washer Installation Ocean Springs MS | Free Setup | Sudsy Co." />
        <meta property="og:description" content="Free washer installation in Ocean Springs, MS with every Sudsy Co. rental. We deliver, hook up, and level your machine." />
        <meta property="og:url" content="https://www.sudsycorentals.com/washer-installation" />
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
              Washer Installation in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Getting a new washer into your home should be simple. At Sudsy Co., washer installation is included free with every rental — no extra delivery fee, no installation charge. We show up, hook your machine up, level it, and make sure it runs before we leave.
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
              What Washer Installation Includes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Truck className="h-6 w-6" />, title: "Delivery to Your Door", desc: "We bring the machine inside — no curbside drops" },
                { icon: <Droplets className="h-6 w-6" />, title: "Water Line Connection", desc: "We connect the hot and cold supply hoses" },
                { icon: <Settings className="h-6 w-6" />, title: "Drain Line Hookup", desc: "Properly routed to your standpipe or utility sink" },
                { icon: <Wrench className="h-6 w-6" />, title: "Leveling", desc: "Machine is leveled to prevent vibration and noise" },
                { icon: <CheckCircle className="h-6 w-6" />, title: "Test Run", desc: "We run a cycle before we leave to make sure everything works" },
                { icon: <Trash2 className="h-6 w-6" />, title: "Haul-Away Available", desc: "If you have an old washer, ask us about old washer pickup" },
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

        {/* What You Need */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What You Need Before We Arrive
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">Standard washer hookups require:</p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Hot and cold water supply valves (standard ¾" connections)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>A drain standpipe or utility sink nearby</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>A 120V standard electrical outlet</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                If your laundry space doesn't have existing hookups, we can talk through your options. Many Ocean Springs apartments and older Gulf Coast homes have non-standard setups — we've seen most of them.
              </p>
            </div>
          </div>
        </section>

        {/* Included with Rental */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Washer Installation Included With Rental — $59.99/mo
            </h2>
            <p className="text-gray-700 mb-6">
              With Sudsy Co., you're not paying a separate installation fee on top of your rental. The $59.99/mo rental price includes delivery, installation, and ongoing maintenance. If the machine develops a problem after installation — won't drain, won't spin, leaks — you call us and we handle it.
            </p>
            <p className="text-gray-700 font-medium">
              There's no contract and no credit check. Month-to-month, cancel anytime.
            </p>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-600 mb-8">We install washers across the Mississippi Gulf Coast:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Next-day delivery and installation available across most of our service area.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Schedule Your Washer Installation</h2>
            <p className="text-blue-100 mb-8">Call us or start your rental online. We'll confirm your delivery window — most installations happen next-day.</p>
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

export default WasherInstallation;
