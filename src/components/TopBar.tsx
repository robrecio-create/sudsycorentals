import { Phone, Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-gradient py-2.5">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2 text-sm text-primary-foreground">
        <div className="flex items-center gap-6 flex-wrap">
          <a href="tel:+12283383455" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold">
            <Phone className="h-4 w-4" />
            <span>(228) 338-3455</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 opacity-90">
            <Clock className="h-4 w-4" />
            <span>{t("topBar.hours")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-90">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">{t("topBar.servingFull")}</span>
          <span className="sm:hidden">{t("topBar.servingShort")}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
