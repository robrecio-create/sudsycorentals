import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const LaundryCareCheatSheet = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Laundry Care Cheat Sheet for Washer and Dryer Rental | Sudsy Co.</title>
        <meta name="description" content="Free laundry care cheat sheet for washer and dryer rental customers. Washing temps, fabric care symbols, stain removal & sorting tips." />
        <link rel="canonical" href="https://sudsycorentals.com/resources/laundry-care-cheat-sheet" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Laundry Care Cheat Sheet for Washer and Dryer Rental | Sudsy Co." />
        <meta property="og:description" content="Free laundry care cheat sheet for washer and dryer rental customers. Washing temps, fabric care symbols, stain removal & sorting tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudsycorentals.com/resources/laundry-care-cheat-sheet" />
        <meta property="og:image" content="https://sudsycorentals.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Laundry Care Cheat Sheet for Washer and Dryer Rental | Sudsy Co." />
        <meta name="twitter:description" content="Free laundry care cheat sheet for washer and dryer rental customers. Washing temps, fabric care symbols, stain removal & sorting tips." />
        <meta name="twitter:image" content="https://sudsycorentals.com/og-image.png" />
      </Helmet>

      {/* Print-hidden navigation */}
      <div className="print:hidden bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto p-8 print:p-4">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-primary">
            <h1 className="text-3xl font-bold text-foreground mb-2">Laundry Care Cheat Sheet</h1>
            <p className="text-muted-foreground">Your quick reference guide from Sudsy Co. Rentals</p>
          </div>

          {/* Sorting Guide */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
              Sorting Your Laundry
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">⚪</div>
                <h3 className="font-semibold text-sm">Whites</h3>
                <p className="text-xs text-muted-foreground">Towels, sheets, underwear</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🔵</div>
                <h3 className="font-semibold text-sm">Darks</h3>
                <p className="text-xs text-muted-foreground">Jeans, dark shirts, black items</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🟡</div>
                <h3 className="font-semibold text-sm">Lights/Colors</h3>
                <p className="text-xs text-muted-foreground">Pastels, bright colors</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🩷</div>
                <h3 className="font-semibold text-sm">Delicates</h3>
                <p className="text-xs text-muted-foreground">Lingerie, silk, lace</p>
              </div>
            </div>
          </section>

          {/* Water Temperature Guide */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
              Water Temperature Guide
            </h2>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="p-3 text-left">Temperature</th>
                    <th className="p-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">🔥 Hot (130°F+)</td>
                    <td className="p-3">White towels, sheets, heavily soiled items, sanitizing</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/20">
                    <td className="p-3 font-medium">🌡️ Warm (90-110°F)</td>
                    <td className="p-3">Permanent press, synthetic fabrics, moderately soiled items</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">❄️ Cold (80°F or below)</td>
                    <td className="p-3">Darks, colors, delicates, lightly soiled items (saves energy!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Care Symbols */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</span>
              Common Care Symbols
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">🔄</span>
                <div>
                  <p className="font-medium text-sm">Machine Wash</p>
                  <p className="text-xs text-muted-foreground">Safe for washer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">🚫</span>
                <div>
                  <p className="font-medium text-sm">Do Not Wash</p>
                  <p className="text-xs text-muted-foreground">Dry clean only</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">🌀</span>
                <div>
                  <p className="font-medium text-sm">Tumble Dry</p>
                  <p className="text-xs text-muted-foreground">Safe for dryer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">📏</span>
                <div>
                  <p className="font-medium text-sm">Line Dry</p>
                  <p className="text-xs text-muted-foreground">Hang to dry</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">♨️</span>
                <div>
                  <p className="font-medium text-sm">Iron Safe</p>
                  <p className="text-xs text-muted-foreground">Can be ironed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">💧</span>
                <div>
                  <p className="font-medium text-sm">Bleach OK</p>
                  <p className="text-xs text-muted-foreground">Chlorine safe</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stain Removal */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">4</span>
              Quick Stain Removal Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">🍷 Wine/Coffee</h3>
                <p className="text-sm text-muted-foreground">Blot immediately, apply cold water, then use dish soap before washing.</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">🩸 Blood</h3>
                <p className="text-sm text-muted-foreground">Always use COLD water. Soak in cold water with salt, then wash normally.</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">🛢️ Grease/Oil</h3>
                <p className="text-sm text-muted-foreground">Apply dish soap directly, let sit 5 mins, then wash in hottest safe temp.</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">🖊️ Ink</h3>
                <p className="text-sm text-muted-foreground">Dab with rubbing alcohol, blot (don't rub), then wash as normal.</p>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-8 bg-primary/5 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-primary mb-4">💡 Pro Tips</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Clean the lint trap before every dryer load to improve efficiency and prevent fires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Don't overload the washer—clothes need room to move for proper cleaning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Use less detergent than you think—too much leaves residue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Zip up zippers and turn jeans inside out to prevent damage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Leave the washer door open between loads to prevent mildew</span>
              </li>
            </ul>
          </section>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Brought to you by <strong>Sudsy Co. Rentals</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Washer & Dryer Rentals • $59.99/mo • Free Delivery • (228) 338-3455
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              sudsycorentals.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaundryCareCheatSheet;
