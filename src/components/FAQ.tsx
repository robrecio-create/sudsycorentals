import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data exported for schema usage
export const faqs = [
  {
    question: "What are the lease terms?",
    answer: "We offer washer and dryer rentals on a month-to-month basis with a 6 month minimum. Keep the machines as long as you need them; just call us for a free pickup when you're done. We provide flexibility with no long-term contracts required.",
  },
  {
    question: "Will I ever own the machines?",
    answer: "No, this is not a rent-to-own program. This is a lease program. You rent the appliances for as long as you need them, and we handle all maintenance and repairs.",
  },
  {
    question: "Are there requirements to rent?",
    answer: "We don't require credit checks.",
  },
  {
    question: "Can I choose my machines?",
    answer: "The appliances we deliver depend on what we have available on the delivery day. If you have specific space constraints, such as a narrow laundry area, please inform us so we can try to accommodate your needs with a suitable model.",
  },
  {
    question: "What do the machines look like?",
    answer: "Our standard machines consist of side-by-side white washers and dryers with agitators. Typically, the washing machines have about 3.5 cubic feet of interior space. We strive to provide matching washer and dryer sets; however, you may receive units of different brands. Please note that as these are rental units, they may show signs of wear such as scratches and small dents.",
  },
  {
    question: "How do payments work?",
    answer: "Your monthly rental fee will be automatically charged on the same day of the month as your initial delivery.",
  },
  {
    question: "What if my machine breaks?",
    answer: "We typically provide service within one to two days of receiving a maintenance request. If we cannot resolve the issue during your maintenance appointment, we will replace your washer or dryer machine on that same day at no additional cost to minimize disruption.",
  },
  {
    question: "What makes Sudsy Co. stand out?",
    answer: "We are a local business committed to operational efficiency and customer satisfaction. When you call or text us, you will reach a real person right away. We strive to make every customer experience smooth and hassle-free.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our washer and dryer rental service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border/50 px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
