import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Syncs i18next language with the current URL path.
 * /es/* → Spanish, everything else → English.
 */
const LanguageSync = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isSpanish = location.pathname.startsWith("/es/") || location.pathname === "/es";
    const targetLang = isSpanish ? "es" : "en";
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [location.pathname, i18n]);

  return null;
};

export default LanguageSync;
