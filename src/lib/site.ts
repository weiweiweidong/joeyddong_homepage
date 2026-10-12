import { pagePath, type Locale } from './i18n';

export const site = {
  name: 'JoeyDDong',
  url: 'https://joeyddong-site.top',
  github: 'https://github.com/weiweiweidong',
  portrait: '/images/portfolio-portrait.jpg',
  destinations: {
    blog: import.meta.env.PUBLIC_BLOG_URL || 'https://blog.joeyddong-site.top',
    projects: import.meta.env.PUBLIC_PROJECTS_URL || '',
    photography: import.meta.env.PUBLIC_PHOTOGRAPHY_URL || '',
  },
};

export type Destination = keyof typeof site.destinations;

// The receiving subsite can read this query parameter before its browser-language fallback.
export function destinationUrl(destination: Destination, locale: Locale) {
  if (destination === 'projects' && !site.destinations.projects) return pagePath(locale, 'projects');
  if (destination === 'photography' && !site.destinations.photography) return pagePath(locale, 'photography');
  const url = new URL(site.destinations[destination]);
  url.searchParams.set('lang', locale);
  return url.toString();
}

export function navigation(locale: Locale) {
  return [
    { key: 'home', href: pagePath(locale) },
    { key: 'blog', href: destinationUrl('blog', locale) },
    { key: 'projects', href: destinationUrl('projects', locale) },
    { key: 'photography', href: destinationUrl('photography', locale) },
    { key: 'portfolio', href: pagePath(locale, 'portfolio') },
  ] as const;
}
