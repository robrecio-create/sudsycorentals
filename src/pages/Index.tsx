import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
