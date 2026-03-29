import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === "es";
  const baseUrl = "https://www.sudsycorentals.com";

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
        <html lang={isSpanish ? "es" : "en"} />
        <title>
          {isSpanish
            ? "Sudsy Co. Alquiler de Lavadoras y Secadoras | Servicio de Alquiler en Ocean Springs"
            : "Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs"}
        </title>
        <meta
          name="description"
          content={
            isSpanish
              ? "Sudsy Co. es el principal servicio de alquiler de electrodomésticos en Ocean Springs, ofreciendo alquiler de lavadoras y secadoras desde $59.99/mes. Entrega gratis, sin verificación de crédito. Sirviendo la Costa del Golfo de Mississippi."
              : "Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast."
          }
        />
        <link rel="canonical" href={isSpanish ? `${baseUrl}/es` : `${baseUrl}/`} />

        {/* hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/`} />
        <link rel="alternate" hrefLang="es" href={`${baseUrl}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />

        <meta property="og:title" content={isSpanish ? "Sudsy Co. Alquiler de Lavadoras y Secadoras" : "Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs"} />
        <meta property="og:description" content={isSpanish ? "Alquiler de lavadoras y secadoras desde $59.99/mes. Entrega gratis, sin verificación de crédito." : "Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isSpanish ? `${baseUrl}/es` : `${baseUrl}/`} />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:site_name" content="Sudsy Co. Rentals" />
        <meta property="og:locale" content={isSpanish ? "es_US" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isSpanish ? "Sudsy Co. Alquiler de Lavadoras y Secadoras" : "Sudsy Co. Washer and Dryer Rentals | Appliance Rental Service in Ocean Springs"} />
        <meta name="twitter:description" content={isSpanish ? "Alquiler de lavadoras y secadoras desde $59.99/mes. Entrega gratis, sin verificación de crédito." : "Sudsy Co. is Ocean Springs' premier appliance rental service offering washer and dryer rentals starting at $59.99/mo. Free next-day delivery, no credit checks. Serving the Mississippi Gulf Coast."} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
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
