import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";
import { Truck, Wrench, DollarSign, Phone, Star, MapPin } from "lucide-react";

const ServiceEstablishment = () => {
  return (
    <>
      <Helmet>
        <title>Service Establishment | Washer & Dryer Rental | Sudsy Co. Ocean Springs MS</title>
        <meta
          name="description"
          content="Sudsy Co. is a local service establishment in Ocean Springs, MS offering washer and dryer rentals on the Mississippi Gulf Coast. Free delivery, repairs included, no credit check."
        />
        <link rel="canonical" href="https://sudsycorentals.com/services" />
        <meta property="og:title" content="Washer & Dryer Rental Service | Sudsy Co. Ocean Springs MS" />
        <meta property="og:description" content="Sudsy Co. is a local service establishment in Ocean Springs, MS offering washer and dryer rentals on the Mississippi Gulf Coast. Starting at $59.99/mo." />
        <meta property="og:url" content="https://sudsycorentals.com/services" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <TopBar />
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Sudsy Co. — Ocean Springs, MS
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Sudsy Co. is a local service establishment providing washer and dryer rentals throughout the Mississippi Gulf Coast. We handle delivery, installation, and all repairs so you never have to worry about your laundry appliances again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">View Pricing</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455"><Phone className="mr-2 h-5 w-5 inline" /> (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Truck className="h-10 w-10 text-blue-600" />,
                  title: "Delivery & Installation",
                  desc: "We schedule a convenient time to deliver and professionally install your washer or dryer. Free with every rental.",
                  link: "/appliance-rental-service",
                },
                {
                  icon: <Wrench className="h-10 w-10 text-blue-600" />,
                  title: "Repair & Maintenance",
                  desc: "All repairs are covered under your rental. If something breaks, we come fix it at no extra charge.",
                  link: "/appliance-rental-service",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-blue-600" />,
                  title: "Flexible Rental Plans",
                  desc: "Month-to-month plans starting at $59.99/mo. No credit check, no long-term contracts.",
                  link: "/#pricing",
                },
              ].map((service, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="font-bold text-gray-900 text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Link to={service.link}>Learn More</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Sudsy Co.</h2>
            <div className="text-gray-600 text-center">
              <p className="mb-4">
                Sudsy Co. is a locally owned and operated service establishment based in Ocean Springs, Mississippi. We serve customers throughout the Gulf Coast including Gulfport, Biloxi, D'Iberville, Gautier, Pascagoula, and surrounding communities.
              </p>
              <p className="mb-4">
                Our mission is simple: make clean laundry easy and affordable for every household. Whether you're in a rental home, apartment, or just don't want to deal with the laundromat, we have a plan that works for you.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>1302 Fort St, Ocean Springs, MS 39564</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:2283383455" className="hover:text-blue-600">(228) 338-3455</a>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="h-5 w-5 text-blue-600" />
                <span>Mon–Fri: 9AM–6PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8">Same-week delivery available. No credit check, no contracts.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
                <Link to="/#pricing">See Pricing</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold px-8">
                <a href="tel:2283383455">Call (228) 338-3455</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButtons />
    </>
  );
};

export default ServiceEstablishment;
