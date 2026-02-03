import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FileText, Download, CheckSquare, Sparkles, Printer } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { Button } from "@/components/ui/button";

interface ResourceGuide {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const resources: ResourceGuide[] = [
  {
    slug: "laundry-care-cheat-sheet",
    title: "Laundry Care Cheat Sheet",
    description: "A quick-reference guide for washing temperatures, fabric care symbols, stain removal tips, and sorting best practices.",
    icon: <Sparkles className="h-8 w-8" />,
    category: "Guide"
  },
  {
    slug: "hookup-checklist",
    title: "Washer & Dryer Hookup Checklist",
    description: "Use this checklist to verify your apartment or home has the proper connections for a washer and dryer before scheduling delivery.",
    icon: <CheckSquare className="h-8 w-8" />,
    category: "Checklist"
  }
];

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Free Resources & Guides | Sudsy Co. Rentals</title>
        <meta 
          name="description" 
          content="Download free laundry guides, hookup checklists, and care instructions. Helpful resources from Sudsy Co. Rentals on the Mississippi Gulf Coast." 
        />
        <link rel="canonical" href="https://sudsycorentals.com/resources" />
        
        <meta property="og:title" content="Free Resources & Guides | Sudsy Co. Rentals" />
        <meta property="og:description" content="Download free laundry guides, hookup checklists, and care instructions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/resources" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Free Downloads</span>
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Helpful Resources
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Free guides and checklists to make your laundry life easier
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Resources Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                          {resource.icon}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {resource.category}
                          </span>
                          <h2 className="font-display text-xl font-semibold text-foreground mt-1">
                            {resource.title}
                          </h2>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {resource.description}
                      </p>
                      
                      <Link to={`/resources/${resource.slug}`}>
                        <Button className="w-full gap-2">
                          <Printer className="h-4 w-4" />
                          View & Print
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-muted-foreground text-sm">
                  Tip: Open the guide and use your browser's print function (Ctrl+P or Cmd+P) to save as PDF
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Rent?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get a washer and dryer delivered to your home for just $59.99/month. Free delivery, free installation, no credit check.
              </p>
              <a href="/#pricing">
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Start Your Rental
                </Button>
              </a>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default Resources;
