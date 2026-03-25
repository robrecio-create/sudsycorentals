import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButtons } from "@/components/FloatingChatButtons";
import { getBlogPost, blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedDate,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sudsy Co. Rentals",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sudsycorentals.com/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://sudsycorentals.com/blog/${post.slug}`
    }
  };

  // Helper to render inline formatting: bold, links
  const renderInline = (text: string): (string | JSX.Element)[] => {
    // Split on bold and markdown links: [text](url)
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        const isExternal = url.startsWith('http');
        return (
          <a
            key={i}
            href={url}
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {linkText}
          </a>
        );
      }
      return part;
    });
  };

  // Simple markdown-like content rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle tables
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        // Skip separator rows
        if (!trimmedLine.includes('---')) {
          const cells = trimmedLine.slice(1, -1).split('|').map(cell => cell.trim());
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        // End of table
        elements.push(
          <div key={`table-${index}`} className="overflow-x-auto my-6">
            <table className="min-w-full border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  {tableRows[0]?.map((cell, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 text-muted-foreground border-b border-border">
                        {cell.includes('**') ? (
                          <strong className="text-foreground font-semibold">
                            {cell.replace(/\*\*/g, '')}
                          </strong>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
      }

      // Skip empty lines
      if (!trimmedLine) {
        return;
      }

      // H2 headers
      if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">
            {trimmedLine.slice(3)}
          </h2>
        );
        return;
      }

      // H3 headers
      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
            {trimmedLine.slice(4)}
          </h3>
        );
        return;
      }

      // Bullet points
      if (trimmedLine.startsWith('- ')) {
        const bulletContent = trimmedLine.slice(2);
        elements.push(
          <li key={index} className="text-muted-foreground ml-6 mb-2">
            {renderInline(bulletContent)}
          </li>
        );
        return;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(trimmedLine)) {
        const listContent = trimmedLine.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={index} className="text-muted-foreground ml-6 mb-2 list-decimal">
            {renderInline(listContent)}
          </li>
        );
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {renderInline(trimmedLine)}
        </p>
      );
    });

    return elements;
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://sudsycorentals.com/blog/${post.slug}`} />
        
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sudsycorentals.com/blog/${post.slug}`} />
        <meta property="og:image" content="https://sudsycorentals.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        
        <main>
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8">
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Blog
                  </Link>
                </nav>

                {/* Header */}
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-10"
                >
                  <Badge variant="secondary" className="mb-4">
                    {post.category}
                  </Badge>
                  
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                </motion.header>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="prose prose-lg max-w-none"
                >
                  {renderContent(post.content)}
                </motion.div>

                {/* CTA Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-2xl"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    Ready to Rent a Washer & Dryer?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Skip the laundromat and get convenient, affordable appliance rentals delivered to your door. 
                    Just $59.99/month with free delivery and installation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="/#pricing">
                      <Button size="lg" className="w-full sm:w-auto">
                        Rent Online Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <a href="tel:+12283383455">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        <Phone className="mr-2 h-5 w-5" />
                        (228) 338-3455
                      </Button>
                    </a>
                  </div>
                </motion.div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-16">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                      More Articles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          to={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="bg-card border border-border rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                            <Badge variant="secondary" className="mb-3 text-xs">
                              {relatedPost.category}
                            </Badge>
                            <h4 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </main>

        <Footer />
        <FloatingChatButtons />
      </div>
    </>
  );
};

export default BlogPost;
