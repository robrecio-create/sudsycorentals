import { motion } from "framer-motion";
import { FileText, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Choose Your Package",
    description: "Select the washer, dryer, or combo package that fits your needs. No credit check required!",
  },
  {
    icon: Truck,
    step: "02",
    title: "Schedule Delivery",
    description: "Pick a convenient delivery date. We'll deliver and professionally install your appliances for free.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Enjoy Clean Laundry",
    description: "Start enjoying the convenience of in-home laundry. We handle all maintenance and repairs.",
  },
];

const HowItWorks = () => {
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
            HOW IT WORKS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Getting Started is <span className="text-primary">Easy</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to fresh, clean laundry at home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
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
