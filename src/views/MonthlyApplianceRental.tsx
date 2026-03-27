import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, DollarSign, Phone, Users, Home, Shield, Calendar } from "lucide-react";

const MonthlyApplianceRental = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Monthly Appliance Rental Ocean Springs MS",
    "description": "Monthly appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month starting at $59.99/mo. Free delivery. No credit check. Cancel anytime.",
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
    "serviceType": "Monthly Appliance Rental"
  };

  return (
    <>
      <Helmet>
        <title>Monthly Appliance Rental Ocean Springs MS | No Contract | Sudsy Co.</title>
        <meta
          name="description"
          content="Monthly appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month starting at $59.99/mo. Free delivery. No credit check. Cancel anytime."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/monthly-appliance-rental" />
        <meta property="og:title" content="Monthly Appliance Rental Ocean Springs MS | No Contract | Sudsy Co." />
        <meta property="og:description" content="Monthly appliance rental in Ocean Springs, MS. Rent a washer and dryer month-to-month starting at $59.99/mo. Free delivery. No credit check." />
        <meta property="og:url" content="https://www.sudsycorentals.com/monthly-appliance-rental" />
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
              Monthly Appliance Rental in Ocean Springs, MS
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Buying appliances is a big commitment — especially when you're renting your place, moving in the next year, or stationed at Keesler and headed somewhere new in 18 months. Monthly appliance rental gives you a working washer and dryer delivered and installed for free, with no contract and no credit check.
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

        {/* What's Included */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Monthly Appliance Rental Includes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Truck className="h-8 w-8 text-blue-600" />,
                  title: "Free Next-Day Delivery",
                  desc: "To your door anywhere on the Mississippi Gulf Coast.",
                },
                {
                  icon: <Wrench className="h-8 w-8 text-blue-600" />,
                  title: "Free Installation",
                  desc: "We hook up your machine, you don't lift a finger.",
                },
                {
                  icon: <Calendar className="h-8 w-8 text-blue-600" />,
                  title: "Month-to-Month Billing",
                  desc: "No 12-month contracts, no cancellation fees.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                  title: "No Credit Check",
                  desc: "We don't pull your credit, ever.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-blue-600" />,
                  title: "Maintenance Coverage",
                  desc: "If something goes wrong with the machine, that's on us, not you.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Monthly Rental Pricing</h2>
            <p className="text-gray-600 mb-10">Both plans include free delivery and free installation. No hidden fees.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Basic", price: "$59.99/mo", desc: "Standard-capacity washer & dryer set" },
                { name: "Premium", price: "$79.99/mo", desc: "Larger-capacity units for bigger loads" },
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

        {/* Flexibility */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Month-to-Month Means Real Flexibility
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                A lot of appliance rental companies lock you into annual contracts. We don't. Sudsy Co. rents month-to-month because we know that Gulf Coast life doesn't always follow a plan.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>If you get PCS orders, you can cancel without penalty.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>If you buy a house and invest in your own machines, just give us a call.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>If your landlord installs in-unit laundry, we'll come get our machine out of your way.</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-6">No hassle, no fees.</p>
            </div>
          </div>
        </section>

        {/* Who Uses */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Who Uses Monthly Appliance Rental on the Gulf Coast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Shield className="h-6 w-6" />, title: "Military Families", desc: "Short-duty assignments where buying doesn't make sense" },
                { icon: <Home className="h-6 w-6" />, title: "Apartment Renters", desc: "Convenience of in-unit laundry without purchasing" },
                { icon: <Wrench className="h-6 w-6" />, title: "Homeowners", desc: "Your washer broke and you need something while you decide" },
                { icon: <Users className="h-6 w-6" />, title: "Seasonal Residents", desc: "Snowbirds who spend part of the year on the Coast" },
                { icon: <DollarSign className="h-6 w-6" />, title: "Property Managers", desc: "Offer laundry to tenants without capital expense" },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
                  <div className="text-blue-600 mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Delivery Across the Mississippi Gulf Coast
            </h2>
            <p className="text-gray-600 mb-8">We deliver monthly appliance rentals to all of Jackson County and Harrison County:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Ocean Springs", "Biloxi", "Gulfport", "D'Iberville", "Pascagoula", "Gautier", "Long Beach", "Pass Christian", "Moss Point"].map((city) => (
                <span key={city} className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Next-day delivery is available across most of our service area.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Started with Monthly Appliance Rental</h2>
            <p className="text-blue-100 mb-8">Call us or start your rental online. We'll have your appliance delivered and installed as soon as tomorrow.</p>
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
              Locally owned in Ocean Springs, MS.<br />
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

export default MonthlyApplianceRental;
