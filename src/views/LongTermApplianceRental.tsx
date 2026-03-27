import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Phone, DollarSign, Home, Users, Calculator } from "lucide-react";

const LongTermApplianceRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Long-Term Appliance Rental Ocean Springs MS",
    "description": "Long-term appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month for as long as you need. Starting at $59.99/mo. Free delivery. No credit check.",
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
    "serviceType": "Long-Term Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Long-Term Appliance Rental Ocean Springs MS | Sudsy Co.</title>
        <meta
          name="description"
          content="Long-term appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month for as long as you need. Starting at $59.99/mo. Free delivery. No credit check."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/long-term-appliance-rental" />
        <meta property="og:title" content="Long-Term Appliance Rental Ocean Springs MS | Sudsy Co." />
        <meta property="og:description" content="Long-term appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month for as long as you need. Starting at $59.99/mo." />
        <meta property="og:url" content="https://www.sudsycorentals.com/long-term-appliance-rental" />
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
              Long-Term Appliance Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              For some households on the Gulf Coast, buying a washer and dryer just doesn't make sense — not because they can't afford it, but because renting is genuinely the better option. Keep the machine as long as you want. We handle maintenance. You do laundry.
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

        {/* Why Rental Beats Buying */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Long-Term Rental Often Beats Buying
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Here's the honest math. A decent washer and dryer set runs $800–$1,500 new. Add delivery, haul-away, and installation and you're closer to $1,000–$1,800 out of pocket on day one. Then there's repairs — expect $200–$500 every few years on average.
              </p>
              <p className="text-gray-700 mb-6">
                At $59.99/mo from Sudsy Co., you break even with a mid-range purchase somewhere around 18–25 months — and that's before counting any repair bills. For renters who move every year or two, the math almost never favors buying.
              </p>
              <h3 className="font-bold text-gray-900 text-lg mb-4">Long-term rental also means:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>No repair costs</strong> — if it breaks, we fix or replace it</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>No moving headaches</strong> — we pick it up when you leave</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>No depreciation</strong> — you're not sitting on a used appliance that's hard to sell</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>No upfront cost</strong> — your first month is just $59.99</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Chooses Long-Term */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Who Chooses Long-Term Appliance Rental
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Home className="h-8 w-8 text-blue-600" />,
                  title: "Renters Who Move Every 1-3 Years",
                  desc: "Moving is already expensive enough. Renting your appliances means one less thing to haul, store, or negotiate with a new landlord about.",
                },
                {
                  icon: <Calculator className="h-8 w-8 text-blue-600" />,
                  title: "Predictable Monthly Costs",
                  desc: "A $59.99/mo line item is easier to budget around than an unpredictable repair bill.",
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600" />,
                  title: "No-Hassle Households",
                  desc: "Some folks just don't want to deal with appliance ownership. That's a completely valid reason.",
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-blue-600" />,
                  title: "Landlords and Property Owners",
                  desc: "Providing in-unit laundry through a rental arrangement keeps your capital free and your maintenance exposure low.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-6">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Long-Term Rental Pricing</h2>
            <p className="text-gray-600 mb-10">Month-to-month. No contracts. No cancellation fees. Cancel anytime.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Basic", price: "$59.99/mo", desc: "Standard-capacity washer & dryer set" },
                { name: "Premium", price: "$79.99/mo", desc: "Larger-capacity units for bigger households" },
              ].map((plan, i) => (
                <div key={i} className="border border-gray-200 bg-white rounded-xl p-6 hover:border-blue-400 transition-colors">
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

        {/* We Handle Everything */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Handle Everything
            </h2>
            <p className="text-gray-700 mb-8">
              Free delivery to your address. Free installation by our team. If the machine ever has a problem — mechanical issue, won't spin, won't drain — you call us and we take care of it. That's the deal.
            </p>
            <p className="text-gray-600 mb-8">We serve all of Jackson County and Harrison County on the Mississippi Gulf Coast:</p>
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
            <h2 className="text-3xl font-bold mb-4">Start Your Long-Term Appliance Rental</h2>
            <p className="text-blue-100 mb-8">Call us or get started online. Next-day delivery is available across most of our service area.</p>
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

export default LongTermApplianceRental;
