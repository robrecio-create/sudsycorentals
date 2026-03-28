import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ShoppingCart, Wrench, FileText, MapPin } from "lucide-react";

const UsedWasherDryerSales = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Used Washer and Dryer Sales Ocean Springs MS",
    "description": "Used washer and dryer sales in Ocean Springs, MS. Locally inspected and serviced machines. Ask about current inventory.",
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
    "serviceType": "Used Appliance Sales"
  };

  return (
    <>
      <Helmet>
        <title>Used Washer and Dryer Sales Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Used washer and dryer sales in Ocean Springs, MS. Locally inspected and serviced machines. Ask about current inventory. Call (228) 338-3455."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/used-washer-dryer-sales" />
        <meta property="og:title" content="Used Washer and Dryer Sales Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Used washer and dryer sales in Ocean Springs, MS. Locally inspected and serviced machines. Ask about current inventory." />
        <meta property="og:url" content="https://www.sudsycorentals.com/used-washer-dryer-sales" />
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
              Used Washer and Dryer Sales in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Not everyone wants to rent. If you're looking for a used washer and dryer you can own outright, Sudsy Co. periodically has inspected, serviced machines available for sale in Ocean Springs and the surrounding Mississippi Gulf Coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <a href="tel:2283383455"><Phone className="mr-2 h-5 w-5 inline" /> Check Inventory</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Buy From Us */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Buy Used From Sudsy Co.?
            </h2>
            <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
              There's a lot of used appliance inventory floating around on Facebook Marketplace and Craigslist on the Gulf Coast. The difference with Sudsy Co.:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <CheckCircle className="h-6 w-6" />, title: "Professionally Inspected", desc: "Every machine is inspected before it ever goes into a rental or sale" },
                { icon: <Wrench className="h-6 w-6" />, title: "Serviced and Tested", desc: "Not a machine we pulled off someone's curb" },
                { icon: <FileText className="h-6 w-6" />, title: "We Know Its History", desc: "Machines from our rental program have documented maintenance records" },
                { icon: <MapPin className="h-6 w-6" />, title: "Local and Accountable", desc: "We're not a private seller who disappears after the transaction" },
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
            <p className="text-gray-700 text-center mt-8">
              Buying used from a local appliance rental company is a different category than buying from an unknown private party.
            </p>
          </div>
        </section>

        {/* What's Available */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What's Typically Available
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Our used inventory comes from machines rotated out of our rental fleet. These are:
              </p>
              <ul className="space-y-3 text-gray-700 mb-6 text-left max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Top-load and front-load washers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Electric dryers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Matched washer/dryer sets when available</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Inventory changes frequently. Call (228) 338-3455 to find out what's currently available and pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Option */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want Installation With Your Purchase?
            </h2>
            <p className="text-gray-700 mb-6">
              If you buy a used washer or dryer from Sudsy Co., ask about installation service. We offer{" "}
              <Link to="/washer-installation" className="text-blue-600 hover:underline">washer installation</Link> and{" "}
              <Link to="/dryer-installation" className="text-blue-600 hover:underline">dryer installation</Link> across our full service area.
            </p>
            <p className="text-gray-700">
              We can also remove your old appliances at the same time — see{" "}
              <Link to="/old-washer-pickup" className="text-blue-600 hover:underline">old washer pickup</Link> and{" "}
              <Link to="/old-dryer-pickup" className="text-blue-600 hover:underline">old dryer pickup</Link>.
            </p>
          </div>
        </section>

        {/* Consider Renting */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Not Ready to Buy? Consider Renting First
            </h2>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 mb-6">
                If you're not sure whether you're staying on the Gulf Coast long-term, renting might make more financial sense than buying. Our{" "}
                <Link to="/used-appliance-rental" className="text-blue-600 hover:underline">used appliance rental</Link> program starts at $59.99/mo with free delivery and installation — no credit check, no contract.
              </p>
              <p className="text-gray-700 font-medium">
                You can always buy later once you know your situation is settled.
              </p>
              <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/used-appliance-rental">Learn About Renting</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-600 mb-8">Used washer and dryer sales and delivery available across:</p>
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
            <h2 className="text-3xl font-bold mb-4">Check Current Inventory</h2>
            <p className="text-blue-100 mb-8">Call us to ask about what's available. Inventory moves fast — if you're interested, don't wait.</p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
              <a href="tel:2283383455">Call (228) 338-3455</a>
            </Button>
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

export default UsedWasherDryerSales;
