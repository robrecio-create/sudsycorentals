import { motion } from "framer-motion";
import { Truck, Wrench, Calendar, Award } from "lucide-react";

import { Heart } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Delivery & Installation",
    description: "We deliver and professionally install your washer and dryer sets at no extra cost.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wrench,
    title: "Complimentary Repairs",
    description: "We will repair or replace any machine within 2 business days, guaranteed.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Calendar,
    title: "No Long-Term Commitment",
    description: "Rent month to month after your initial term with no penalties for returning.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Award,
    title: "Quality Appliances",
    description: "We carry washers and dryers from trusted brands you know and love.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Locally Owned & Operated",
    description: "Proudly based in Ocean Springs, MS. We're your neighbors, committed to serving our Gulf Coast community with care.",
    color: "bg-accent/10 text-accent",
  },
];

const Benefits = () => {
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
            WHY CHOOSE US
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Why Rent with <span className="text-primary">Sudsy Co?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We make renting appliances easy, affordable, and stress-free for families across the Mississippi Gulf Coast.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
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
