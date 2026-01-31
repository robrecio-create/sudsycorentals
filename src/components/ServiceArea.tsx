import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const cities = [
  "Gulfport",
  "Biloxi", 
  "Diberville",
  "Ocean Springs",
  "Gautier",
  "Pascagoula",
];

const ServiceArea = () => {
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
            SERVICE AREA
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Proudly Serving the <span className="text-primary">Mississippi Gulf Coast</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We deliver and install washers and dryers throughout these communities.
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
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{city}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
