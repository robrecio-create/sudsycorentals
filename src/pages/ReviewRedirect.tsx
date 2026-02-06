import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEW_URL = "https://g.page/r/CeHbve1aGmfBEAE/review";

export default function ReviewRedirect() {
  const handleOpen = () => {
    // Must be user-initiated to avoid popup blockers.
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(GOOGLE_REVIEW_URL);
  };

  return (
    <>
      <Helmet>
        <title>Leave a Review | Sudsy Co. Rentals</title>
        <meta
          name="description"
          content="Quick link to leave Sudsy Co. Rentals a Google review."
        />
        <link rel="canonical" href="https://sudsycorentals.com/review" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <header className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Leave us a Google review
            </h1>
            <p className="mt-4 text-muted-foreground">
              If your browser/network blocks Google domains, use the copy button
              and paste the link into a new tab, or search for “Sudsy Co Rentals”
              on Google Maps and tap “Write a review”.
            </p>
          </header>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button type="button" onClick={handleOpen}>
              Open review page
            </Button>
            <Button type="button" variant="secondary" onClick={handleCopy}>
              Copy review link
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Review URL</p>
            <p className="mt-1 break-all font-mono text-sm text-foreground">
              {GOOGLE_REVIEW_URL}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
