import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Printer, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const HookupChecklist = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Washer and Dryer Rental Hookup Checklist | Free Download | Sudsy Co.</title>
        <meta name="description" content="Free printable washer and dryer hookup checklist. Verify your apartment has the right connections before your washer and dryer rental delivery." />
        <link rel="canonical" href="https://www.sudsycorentals.com/resources/hookup-checklist" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Washer and Dryer Rental Hookup Checklist | Free Download | Sudsy Co." />
        <meta property="og:description" content="Free printable washer and dryer hookup checklist. Verify your apartment has the right connections before your rental delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sudsycorentals.com/resources/hookup-checklist" />
        <meta property="og:image" content="https://www.sudsycorentals.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Washer and Dryer Rental Hookup Checklist | Free Download | Sudsy Co." />
        <meta name="twitter:description" content="Free printable washer and dryer hookup checklist. Verify your apartment has the right connections before your rental delivery." />
        <meta name="twitter:image" content="https://www.sudsycorentals.com/og-image.png" />
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Washer & Dryer Hookup Checklist</h1>
            <p className="text-muted-foreground">Verify your connections before scheduling delivery</p>
          </div>

          {/* Instructions */}
          <div className="bg-primary/5 p-4 rounded-lg mb-8">
            <p className="text-sm">
              <strong>Instructions:</strong> Walk through your laundry area and check each item below. 
              All items must be present for standard washer and dryer installation. 
              Print this checklist and bring it with you when viewing apartments!
            </p>
          </div>

          {/* Washer Hookups */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
              Washer Hookups
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Hot Water Supply Valve</h3>
                  <p className="text-sm text-muted-foreground">Look for a valve handle (usually red) connected to a pipe. Should be located behind or near where the washer will sit.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Cold Water Supply Valve</h3>
                  <p className="text-sm text-muted-foreground">Similar to hot water valve (usually blue handle). Both valves are typically located together.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Drain Pipe (Standpipe)</h3>
                  <p className="text-sm text-muted-foreground">A 1.5-2 inch diameter pipe, typically 30-42 inches off the floor. The washer's drain hose connects here.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Electrical Outlet (120V)</h3>
                  <p className="text-sm text-muted-foreground">Standard 3-prong outlet for the washer. Should be within 6 feet of where the washer will be placed.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dryer Hookups */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
              Dryer Hookups
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Dryer Vent</h3>
                  <p className="text-sm text-muted-foreground">A 4-inch diameter duct opening in the wall that leads outside. This is where hot, moist air from the dryer exits.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-amber-50">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Electric Dryer Outlet (240V) - Option A</h3>
                  <p className="text-sm text-muted-foreground">Large 4-prong outlet (NEMA 14-30). Much larger than a standard outlet. This powers an electric dryer.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-blue-50">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Gas Line Connection - Option B</h3>
                  <p className="text-sm text-muted-foreground">A gas shutoff valve near the dryer location. If you have this, you need a gas dryer (not electric).</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm"><strong>Note:</strong> You'll have EITHER a 240V electric outlet OR a gas line—not both. Let us know which type when you schedule delivery!</p>
            </div>
          </section>

          {/* Space Requirements */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</span>
              Space Requirements
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Width: At least 54 inches (side-by-side)</h3>
                  <p className="text-sm text-muted-foreground">Standard washers and dryers are each about 27" wide. Allow 54"+ for side-by-side placement.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Depth: At least 30 inches</h3>
                  <p className="text-sm text-muted-foreground">Standard depth is 27-28" plus space for hoses and venting behind the units.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Height: At least 36 inches</h3>
                  <p className="text-sm text-muted-foreground">Standard height is 36-42". Ensure clearance under any shelving or cabinets.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <Square className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Doorways: At least 27 inches wide</h3>
                  <p className="text-sm text-muted-foreground">Ensure all doorways between the entrance and laundry area are wide enough for delivery.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Notes */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">📝 Additional Notes</h2>
            <div className="border border-border rounded-lg p-4 min-h-[100px]">
              <p className="text-sm text-muted-foreground italic">Use this space to note any concerns or questions for your landlord or our delivery team:</p>
              <div className="mt-4 border-b border-dashed border-muted-foreground/30 pb-6"></div>
              <div className="mt-4 border-b border-dashed border-muted-foreground/30 pb-6"></div>
              <div className="mt-4 border-b border-dashed border-muted-foreground/30 pb-6"></div>
            </div>
          </section>

          {/* Summary Checklist */}
          <section className="mb-8 bg-primary/5 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-primary mb-4">✅ Quick Summary</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Washer Needs:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> Hot water valve</li>
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> Cold water valve</li>
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> Drain pipe</li>
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> 120V outlet</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dryer Needs:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> Dryer vent duct</li>
                  <li className="flex items-center gap-2"><Square className="h-4 w-4" /> 240V outlet OR gas line</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Questions? Call us at <strong>(228) 338-3455</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Sudsy Co. Rentals</strong> • Washer & Dryer Rentals • $59.99/mo
            </p>
            <p className="text-xs text-muted-foreground">
              Free delivery & installation • No credit check • Month-to-month flexibility
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

export default HookupChecklist;
