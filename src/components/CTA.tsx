import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            Ready to Ditch the Laundromat?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Get started today with free delivery and installation. No credit check required!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Schedule Delivery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6"
            >
              <Phone className="h-5 w-5 mr-2" />
              (228) 338-3455
            </Button>
          </div>

          <p className="mt-8 text-primary-foreground/70 text-sm">
            Serving Biloxi, Gulfport, Ocean Springs, and the entire Mississippi Gulf Coast
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
