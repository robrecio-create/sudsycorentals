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

const Index = () => {
  return (
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
  );
};

export default Index;
