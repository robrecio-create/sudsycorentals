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
        <title>Washer and Dryer Rental Near Me | Gulfport, Biloxi MS | Sudsy Co.</title>
        <meta 
          name="description" 
          content="Washer and dryer rental starting at $75/mo with free delivery in Gulfport, Biloxi & South MS. No credit check. Skip the laundromat — rent a washer and dryer today!" 
        />
        <link rel="canonical" href="https://sudsycorentals.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Washer and Dryer Rental Near Me | Gulfport, Biloxi MS | Sudsy Co." />
        <meta property="og:description" content="Washer and dryer rental starting at $75/mo with free delivery. No credit check. The best laundromat alternative on the Mississippi Gulf Coast." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/" />
        <meta property="og:image" content="https://sudsycorentals.com/og-image.png" />
        <meta property="og:site_name" content="Sudsy Co. Rentals" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Washer and Dryer Rental Near Me | Gulfport, Biloxi MS | Sudsy Co." />
        <meta name="twitter:description" content="Washer and dryer rental starting at $75/mo with free delivery. No credit check. Rent today in Gulfport & Biloxi!" />
        <meta name="twitter:image" content="https://sudsycorentals.com/og-image.png" />
        
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
