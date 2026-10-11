import { pagePath, type Locale } from './i18n';

export const site = {
  name: 'JoeyDDong',
  url: 'https://joeyddong.top',
  github: 'https://github.com/weiweiweidong',
  portrait: '/images/portrait-placeholder.jpg',
  destinations: {
    blog: import.meta.env.PUBLIC_BLOG_URL || 'https://blog.joeyddong.top',
    projects: import.meta.env.PUBLIC_PROJECTS_URL || 'https://projects.joeyddong.top',
    photography: import.meta.env.PUBLIC_PHOTOGRAPHY_URL || 'https://photography.joeyddong.top',
  },
};

export type Destination = keyof typeof site.destinations;

// The receiving subsite can read this query parameter before its browser-language fallback.
export function destinationUrl(destination: Destination, locale: Locale) {
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
