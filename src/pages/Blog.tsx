import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Sudsy Co. Rentals Blog",
    "description": "Tips, guides, and news about washer and dryer rentals on the Mississippi Gulf Coast",
    "url": "https://sudsycorentals.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Sudsy Co. Rentals",
      "logo": "https://sudsycorentals.com/og-image.png"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "url": `https://sudsycorentals.com/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Washer and Dryer Rental Blog | Laundry Tips & Guides | Sudsy Co.</title>
        <meta 
          name="description" 
          content="Washer and dryer rental tips, money-saving guides, and laundry advice for Mississippi Gulf Coast residents. Expert insights from Sudsy Co. Rentals." 
        />
        <link rel="canonical" href="https://sudsycorentals.com/blog" />
        
        <meta property="og:title" content="Washer and Dryer Rental Blog | Sudsy Co. Rentals" />
        <meta property="og:description" content="Washer and dryer rental tips, money-saving guides, and laundry advice for Mississippi residents." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/blog" />
        <meta property="og:image" content="https://sudsycorentals.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Washer and Dryer Rental Blog | Laundry Tips & Guides | Sudsy Co." />
        <meta name="twitter:description" content="Washer and dryer rental tips, money-saving guides, and laundry advice for Mississippi Gulf Coast residents." />
        <meta name="twitter:image" content="https://sudsycorentals.com/og-image.png" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

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
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    The Sudsy Co. Blog
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Tips, guides, and advice for hassle-free laundry on the Mississippi Gulf Coast
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="bg-card border border-border rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                        {/* Featured image */}
                        <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/30 to-primary/10 overflow-hidden">
                          {post.featuredImage ? (
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl">📝</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            
                            <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                              Read More
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Skip the Laundromat?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get a washer and dryer delivered to your home for just $59.99/month. Free delivery, free installation, no credit check.
              </p>
              <a href="/#pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold"
                >
                  Rent Online Now
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
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

export default Blog;
