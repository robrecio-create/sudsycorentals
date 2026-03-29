import { motion } from "framer-motion";
import { Truck, Wrench, Calendar, Award, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Truck,
      title: t("benefits.items.freeDelivery.title"),
      description: t("benefits.items.freeDelivery.description"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Wrench,
      title: t("benefits.items.repairs.title"),
      description: t("benefits.items.repairs.description"),
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Calendar,
      title: t("benefits.items.noCommitment.title"),
      description: t("benefits.items.noCommitment.description"),
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: Award,
      title: t("benefits.items.quality.title"),
      description: t("benefits.items.quality.description"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      title: t("benefits.items.locallyOwned.title"),
      description: t("benefits.items.locallyOwned.description"),
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            {t("benefits.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t("benefits.title")} <span className="text-primary">{t("benefits.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("benefits.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
