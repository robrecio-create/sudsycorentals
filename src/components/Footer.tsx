import { Phone, Mail, MapPin, Facebook, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

const serviceAreas = [
  { name: "Biloxi", slug: "biloxi" },
  { name: "Gulfport", slug: "gulfport" },
  { name: "Ocean Springs", slug: "ocean-springs" },
  { name: "D'Iberville", slug: "diberville" },
  { name: "Gautier", slug: "gautier" },
  { name: "Long Beach", slug: "long-beach" },
  { name: "Pascagoula", slug: "pascagoula" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoImage} 
                alt="Sudsy Co. Rentals" 
                className="h-12 w-auto brightness-0 invert"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-background">
                  SUDSY CO.
                </h3>
                <p className="text-xs font-medium text-primary tracking-wider">WASHER AND DRYER RENTALS</p>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed">
              Locally Owned & Operated in Ocean Springs, MS. Sudsy Co. is South Mississippi's premier alternative to the laundromat. We provide affordable washer and dryer rentals with free next-day delivery to the Mississippi Gulf Coast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Pricing", "How It Works", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/areas-we-serve"
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/20-dollar-promo"
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  $20 Off Promo
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/locations/${area.slug}`}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+12283383455"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  (228) 338-3455
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sudsycorentals.com"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  info@sudsycorentals.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Ocean Springs, MS<br />Mississippi Gulf Coast</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61583964994641"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sudsycorentals/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Service Areas SEO + Badge */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <p className="text-background/60 text-sm text-center md:text-left">
              Proudly serving: Biloxi, Gulfport, Ocean Springs, D'Iberville, Gautier, Pascagoula, and Long Beach, MS.
            </p>
            <div className="inline-flex items-center gap-2 bg-background/10 text-background/80 px-4 py-2 rounded-full text-sm font-medium shrink-0">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              Family Owned &amp; Operated
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-background/60 text-sm">
            <p>© {currentYear} Sudsy Co. Rentals. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
