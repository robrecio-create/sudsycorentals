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
import { MessengerButton } from "@/components/MessengerButton";

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
        <Contact />
        <CTA />
      </main>
      <Footer />
      <MessengerButton />
    </div>
  );
};

export default Index;
