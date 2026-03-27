import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Phone, DollarSign, ShoppingCart } from "lucide-react";

const UsedApplianceRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Used Appliance Rental Ocean Springs MS",
    "description": "Used appliance rental in Ocean Springs, MS. Rent a washer and dryer starting at $59.99/mo. Free delivery and installation. No credit check. Serving the Mississippi Gulf Coast.",
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
    "serviceType": "Used Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Used Appliance Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Used appliance rental in Ocean Springs, MS. Rent a washer and dryer starting at $59.99/mo. Free delivery and installation. No credit check. Serving the Mississippi Gulf Coast."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/used-appliance-rental" />
        <meta property="og:title" content="Used Appliance Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Used appliance rental in Ocean Springs, MS. Rent a washer and dryer starting at $59.99/mo. Free delivery and installation. No credit check." />
        <meta property="og:url" content="https://www.sudsycorentals.com/used-appliance-rental" />
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
              Used Appliance Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              If you're looking for a budget-friendly way to get a washer and dryer into your home, used appliance rental is worth considering. Starting at $59.99 a month with free delivery and free installation. No credit check required.
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

        {/* What "Used" Means */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What "Used" Means at Sudsy Co.
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Our rental inventory is professionally inspected, cleaned, and serviced before every placement. These aren't machines we pulled off a curb — they're appliances we maintain, repair, and stand behind. If something stops working while it's in your home, we handle it at no cost to you.
              </p>
              <p className="text-gray-700">
                Rental appliances are purpose-built for this kind of use. They get checked between every rental, which means you're often getting a better-maintained machine than something you'd pick up off Facebook Marketplace or Craigslist.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing for Used Appliance Rental</h2>
            <p className="text-gray-600 mb-10">Free delivery. Free installation. Month-to-month. No hidden fees.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Basic", price: "$59.99/mo", desc: "Standard-capacity washer & dryer set" },
                { name: "Premium", price: "$79.99/mo", desc: "Larger-capacity units" },
              ].map((plan, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-blue-600 font-bold text-3xl mb-3">{plan.price}</p>
                  <p className="text-gray-600 text-sm mb-4">{plan.desc}</p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="/#pricing">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rental vs Buying Used */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Used Appliance Rental vs. Buying Used
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Buying a used washer or dryer off a private seller on the Gulf Coast typically runs $200–$500 per machine — and that's before you figure out delivery, installation, and what happens when it breaks six months later. You're also on your own for repairs.
              </p>
              <p className="text-gray-700 mb-6">
                With Sudsy Co., you pay $59.99/mo and we cover maintenance. No delivery costs, no installation fees, no repair bills. For most households, that's a better deal than rolling the dice on a used private sale — especially on the Coast where getting a repair tech out can take time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Buying Used</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• $200–$500 per machine</li>
                    <li>• Arrange your own delivery</li>
                    <li>• Install it yourself</li>
                    <li>• You pay for repairs</li>
                    <li>• Unknown condition</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Renting from Sudsy Co.</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• $59.99/mo</li>
                    <li>• Free delivery</li>
                    <li>• Free installation</li>
                    <li>• Maintenance included</li>
                    <li>• Professionally serviced</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* We Also Sell */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                We Also Sell Used Washers and Dryers
              </h2>
              <p className="text-gray-600 mb-6">
                If you'd rather own than rent, ask us about our used washer and dryer inventory. We periodically offer used appliances for sale for households that want a permanent solution at a reasonable price.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <a href="tel:2283383455">Call to Ask About Inventory</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Area
            </h2>
            <p className="text-gray-600 mb-8">We deliver used appliance rentals across Jackson County and Harrison County:</p>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Rent?</h2>
            <p className="text-blue-100 mb-8">Call us or get started online. Next-day delivery available across most of the Gulf Coast.</p>
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

export default UsedApplianceRental;
