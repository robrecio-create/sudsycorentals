import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import { Reviews } from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ServiceArea from "@/components/ServiceArea";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import HomePageSchema from "@/components/seo/HomePageSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const Index = () => {
  // Handle hash navigation from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs</title>
        <meta
          name="description"
          content="Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast."
        />
        <link rel="canonical" href="https://www.sudsycorentals.com/" />
        <meta property="og:title" content="Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs" />
        <meta property="og:description" content="Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sudsycorentals.com/" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta property="og:site_name" content="Sudsy Co. Rentals" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs" />
        <meta name="twitter:description" content="Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast." />
        <meta name="twitter:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Ocean Springs, Mississippi" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Helmet>
      
      <HomePageSchema />
      <FAQSchema />
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <main>
          <Hero />
          <Benefits />
          <Pricing />
          <HowItWorks />
          <Reviews />
          <FAQ />
          <ServiceArea />
          <Contact />
          <CTA />
        </main>
        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default Index;
