import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// Detect language from URL path
function detectLanguageFromURL(): string {
  if (typeof window === 'undefined') return 'en';
  const path = window.location.pathname;
  return path.startsWith('/es/') || path === '/es' ? 'es' : 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: detectLanguageFromURL(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

/**
 * Helper to get the current language prefix for URLs.
 * Returns '/es' for Spanish, '' for English.
 */
export function getLangPrefix(): string {
  return i18n.language === 'es' ? '/es' : '';
}

/**
 * Build a localized path. Strips any existing /es prefix first,
 * then prepends the correct one.
 */
export function localizedPath(path: string): string {
  const cleanPath = path.replace(/^\/es(\/|$)/, '/');
  const prefix = getLangPrefix();
  if (cleanPath === '/') return prefix || '/';
  return `${prefix}${cleanPath}`;
}
