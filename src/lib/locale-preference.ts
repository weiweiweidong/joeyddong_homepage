import { locales, type Locale } from './i18n';

const preferenceKey = 'joey_locale';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export function readLocale(): Locale | undefined {
  const cookie = document.cookie.split('; ').find((part) => part.startsWith(`${preferenceKey}=`))?.split('=')[1];
  if (isLocale(cookie)) return cookie;
  try {
    const stored = localStorage.getItem(preferenceKey);
    if (isLocale(stored)) return stored;
  } catch { /* Language switching also works when storage is unavailable. */ }
}

export function rememberLocale(locale: Locale) {
  try { localStorage.setItem(preferenceKey, locale); } catch { /* Cookies and explicit routes remain available. */ }
  const hostname = window.location.hostname;
  const sharedDomain = hostname === 'joeyddong-site.top' || hostname.endsWith('.joeyddong-site.top') ? '; Domain=joeyddong-site.top' : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${preferenceKey}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${sharedDomain}${secure}`;
}

export function browserLocale(): Locale {
  for (const language of navigator.languages) {
    const base = language.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return 'en';
}
