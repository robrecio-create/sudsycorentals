import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "@/i18n";

const cities = [
  { name: "Gulfport", slug: "gulfport" },
  { name: "Biloxi", slug: "biloxi" },
  { name: "D'Iberville", slug: "diberville" },
  { name: "Ocean Springs", slug: "ocean-springs" },
  { name: "Long Beach", slug: "long-beach" },
  { name: "Pass Christian", slug: "pass-christian" },
  { name: "Gautier", slug: "gautier" },
  { name: "Pascagoula", slug: "pascagoula" },
  { name: "Moss Point", slug: "moss-point" },
];

const ServiceArea = () => {
  const { t } = useTranslation();

  return (
    <section id="service-area" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            {t("serviceArea.badge")}
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            {t("serviceArea.title")} <span className="text-primary">{t("serviceArea.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("serviceArea.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {cities.map((city, index) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={localizedPath(`/locations/${city.slug}`)}
                className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{city.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
