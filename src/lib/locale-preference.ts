import { locales, type Locale } from './i18n';

const preferenceKey = 'joey_locale';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export function readLocale(): Locale | undefined {
  try {
    const cookie = document.cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${preferenceKey}=`))?.split('=')[1];
    if (isLocale(cookie)) return cookie;
  } catch { /* Fall back to local storage when cookie access is blocked. */ }
  try {
    const stored = localStorage.getItem(preferenceKey);
    if (isLocale(stored)) return stored;
  } catch { /* Language switching also works when storage is unavailable. */ }
}

export function rememberLocale(locale: Locale) {
  try { localStorage.setItem(preferenceKey, locale); } catch { /* Cookies and explicit routes remain available. */ }
  const hostname = window.location.hostname;
  const sharedDomain = hostname === 'joeyddong.top' || hostname.endsWith('.joeyddong.top') ? '; Domain=joeyddong.top' : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  try {
    document.cookie = `${preferenceKey}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${sharedDomain}${secure}`;
  } catch { /* Explicit language links also work when cookie access is blocked. */ }
}

export function browserLocale(): Locale {
  for (const language of navigator.languages) {
    const base = language.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return 'en';
}
