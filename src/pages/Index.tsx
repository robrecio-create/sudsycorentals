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
  return (
    <>
      <Helmet>
        <title>Washer & Dryer Rental Gulfport, Biloxi, Ocean Springs | Sudsy Co.</title>
        <meta 
          name="description" 
          content="Skip the laundromat! Affordable washer and dryer rentals in South MS. Free delivery & repairs. No credit checks. Rent today in Gulfport & Biloxi." 
        />
        <link rel="canonical" href="https://sudsycorentals.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Washer & Dryer Rental Gulfport, Biloxi, Ocean Springs | Sudsy Co." />
        <meta property="og:description" content="Skip the laundromat! Affordable washer and dryer rentals in South MS. Free delivery & repairs. No credit checks. Rent today in Gulfport & Biloxi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/" />
        <meta property="og:image" content="https://sudsycorentals.com/favicon.png" />
        <meta property="og:site_name" content="Sudsy Co. Rentals" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Washer & Dryer Rental Gulfport, Biloxi, Ocean Springs | Sudsy Co." />
        <meta name="twitter:description" content="Skip the laundromat! Affordable washer and dryer rentals in South MS. Free delivery & repairs. No credit checks." />
        <meta name="twitter:image" content="https://sudsycorentals.com/favicon.png" />
        
        {/* Additional SEO */}
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
