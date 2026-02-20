import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  return (
    <div className="bg-primary py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo placeholder */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-primary-foreground tracking-wide">
            SUDSY CO.
          </span>
        </div>

        {/* Center text */}
        <div className="hidden sm:flex items-center gap-2 text-primary-foreground/90">
          <MapPin className="h-4 w-4" />
          <span className="font-medium text-sm">Serving the MS Gulf Coast</span>
        </div>

        {/* Call Now button */}
        <Button
          size="sm"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-md"
          asChild
        >
          <a href="tel:+12283383455">
            <Phone className="h-4 w-4 mr-1.5" />
            Call Now
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
