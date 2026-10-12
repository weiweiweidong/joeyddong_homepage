import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.joeyddong.top',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja'],
    routing: { prefixDefaultLocale: false },
  },
});
