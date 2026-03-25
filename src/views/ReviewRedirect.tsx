import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CeHbve1aGmfBEAE/review";

export default function ReviewRedirect() {
  const { toast } = useToast();

  const handleOpen = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(GOOGLE_REVIEW_URL);
    toast({
      title: "Link copied!",
      description: "Paste it in a new browser tab to leave your review.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Review Sudsy Co. Washer and Dryer Rental | Leave a Review</title>
        <meta
          name="description"
          content="Leave a Google review for Sudsy Co. washer and dryer rental service on the Mississippi Gulf Coast."
        />
        <link rel="canonical" href="https://sudsycorentals.com/review" />
        <meta property="og:title" content="Review Sudsy Co. Washer and Dryer Rental" />
        <meta property="og:description" content="Leave a Google review for Sudsy Co. washer and dryer rental service on the Mississippi Gulf Coast." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/review" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Review Sudsy Co. Washer and Dryer Rental" />
        <meta name="twitter:description" content="Leave a Google review for Sudsy Co. washer and dryer rental service on the Mississippi Gulf Coast." />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center">
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Leave us a Google review
          </h1>
          <p className="mt-4 text-muted-foreground">
            Click the button below to open our Google review page. If your browser blocks it, use the "Copy link" button and paste it into a new tab.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button type="button" onClick={handleOpen} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open review page
            </Button>
            <Button type="button" variant="secondary" onClick={handleCopy} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy link
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-4 text-left">
            <p className="text-sm text-muted-foreground">Review URL</p>
            <p className="mt-1 break-all font-mono text-sm text-foreground select-all">
              {GOOGLE_REVIEW_URL}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
