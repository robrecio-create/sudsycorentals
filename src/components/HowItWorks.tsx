import { motion } from "framer-motion";
import { FileText, Truck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: FileText,
      step: "01",
      title: t("howItWorks.steps.choose.title"),
      description: t("howItWorks.steps.choose.description"),
    },
    {
      icon: Truck,
      step: "02",
      title: t("howItWorks.steps.schedule.title"),
      description: t("howItWorks.steps.schedule.description"),
    },
    {
      icon: Sparkles,
      step: "03",
      title: t("howItWorks.steps.enjoy.title"),
      description: t("howItWorks.steps.enjoy.description"),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            {t("howItWorks.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t("howItWorks.title")} <span className="text-primary">{t("howItWorks.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}

              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl hero-gradient mb-6 shadow-lg group-hover:shadow-glow transition-shadow">
                <step.icon className="h-10 w-10 text-primary-foreground" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
                  {step.step}
                </div>
              </div>

              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
