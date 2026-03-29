import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();

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
            {t("cta.title")}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6"
              asChild
            >
              <a href="tel:+12283383455">
                <Phone className="h-5 w-5 mr-2" />
                (228) 338-3455
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
              asChild
            >
              <a href="#pricing">{t("cta.rentOnline")}</a>
            </Button>
          </div>

          <p className="mt-8 text-primary-foreground/70 text-sm">
            {t("cta.servingAreas")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
