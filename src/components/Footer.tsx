import { Phone, Mail, MapPin, Facebook, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "@/i18n";
import logoImageImport from "@/assets/logo.png";

// Handle both Vite (string) and Astro (object with src property) image imports
const logoImage = typeof logoImageImport === 'string'
  ? logoImageImport
  : (logoImageImport as { src: string })?.src || logoImageImport;

const serviceAreas = [
  { name: "Biloxi", slug: "biloxi" },
  { name: "Gulfport", slug: "gulfport" },
  { name: "Ocean Springs", slug: "ocean-springs" },
  { name: "D'Iberville", slug: "diberville" },
  { name: "Gautier", slug: "gautier" },
  { name: "Long Beach", slug: "long-beach" },
  { name: "Pascagoula", slug: "pascagoula" },
];

const serviceCityLinks = [
  { name: "Gulfport", slug: "gulfport" },
  { name: "Biloxi", slug: "biloxi" },
  { name: "Ocean Springs", slug: "ocean-springs" },
  { name: "D'Iberville", slug: "diberville" },
  { name: "Gautier", slug: "gautier" },
  { name: "Long Beach", slug: "long-beach" },
  { name: "Pascagoula", slug: "pascagoula" },
  { name: "Pass Christian", slug: "pass-christian" },
  { name: "Moss Point", slug: "moss-point" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("footer.home"), href: `${localizedPath("/")}#home` },
    { label: t("footer.pricing"), href: `${localizedPath("/")}#pricing` },
    { label: t("footer.howItWorks"), href: `${localizedPath("/")}#how-it-works` },
    { label: t("footer.faq"), href: `${localizedPath("/")}#faq` },
    { label: t("footer.contact"), href: `${localizedPath("/")}#contact` },
  ];

  const serviceLinks = [
    { label: t("footer.washerDryerRental"), to: localizedPath("/washer-and-dryer-rental") },
    { label: t("footer.applianceRental"), to: localizedPath("/appliance-rental-service") },
    { label: t("footer.furnitureRental"), to: localizedPath("/furniture-rental-service") },
    { label: t("footer.ourServices"), to: localizedPath("/services") },
    { label: t("footer.areasWeServe"), to: localizedPath("/areas-we-serve") },
    { label: t("footer.blog"), to: localizedPath("/blog") },
    { label: t("footer.resources"), to: localizedPath("/resources") },
    { label: t("footer.promo"), to: localizedPath("/20-dollar-promo") },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImage}
                alt="Sudsy Co. Rentals"
                className="h-12 w-auto rounded-md"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-background">
                  SUDSY CO.
                </h3>
                <p className="text-xs font-medium text-primary tracking-wider">{t("header.tagline")}</p>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://theseawallms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-primary transition-colors font-semibold"
                >
                  Newsletter
                </a>
              </li>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.serviceAreas")}</h4>
            <ul className="space-y-3">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={localizedPath(`/locations/${area.slug}`)}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Washer & Dryer Rental by City */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.rentalByCity")}</h4>
            <ul className="space-y-3">
              {serviceCityLinks.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={localizedPath(`/washer-dryer-rental/${area.slug}`)}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.contactUs")}</h4>
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
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">1302 Fort St</span><br />
                  <span itemProp="addressLocality">Ocean Springs</span>,{" "}
                  <span itemProp="addressRegion">MS</span>{" "}
                  <span itemProp="postalCode">39564</span>
                </span>
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
              {t("footer.servingProudly")}
            </p>
            <div className="inline-flex items-center gap-2 bg-background/10 text-background/80 px-4 py-2 rounded-full text-sm font-medium shrink-0">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              {t("footer.familyOwned")}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-background/60 text-sm">
            <p>{t("footer.copyright", { year: currentYear })}</p>
            <div className="flex gap-6">
              <Link to={localizedPath("/privacy-policy")} className="hover:text-primary transition-colors">{t("footer.privacyPolicy")}</Link>
              <Link to={localizedPath("/terms-of-service")} className="hover:text-primary transition-colors">{t("footer.termsOfService")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
