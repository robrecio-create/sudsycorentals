import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

/**
 * EN/ES toggle that navigates via URL to persist language.
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const handleSwitch = () => {
    const currentPath = window.location.pathname;
    let newPath: string;

    if (isSpanish) {
      // Switch to English: remove /es prefix
      newPath = currentPath.replace(/^\/es(\/|$)/, "/");
      if (!newPath.startsWith("/")) newPath = "/" + newPath;
    } else {
      // Switch to Spanish: add /es prefix
      newPath = `/es${currentPath === "/" ? "" : currentPath}`;
    }

    // Use window.location for full-page navigation to work with both Astro and React Router
    window.location.href = newPath;
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      aria-label={isSpanish ? "Switch to English" : "Cambiar a Español"}
      title={isSpanish ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-4 w-4" />
      <span>{isSpanish ? "EN" : "ES"}</span>
    </button>
  );
};

export default LanguageSwitcher;
