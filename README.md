# JoeyDDong — Personal Homepage

Astro + TypeScript + native CSS, built as a static site.

The visual direction is inspired by Kickpush: a coral-red canvas, oversized white sans-serif headings, a centered typographic hero, colorful illustrated section cards, and a portrait in the personal introduction section.

## Run locally

Use Node.js **22.12 or newer** (Node 24 is recommended) and pnpm.

```sh
pnpm install
pnpm dev
```

Open the Local URL printed by Astro, normally `http://127.0.0.1:4321`.

```sh
pnpm check
pnpm build
pnpm preview
```

The production output is `dist/`. The homepage's primary domain is `https://joeyddong-site.top` on Cloudflare Workers. The existing Blog stays at `https://joeyddong.top` on GitHub Pages and is not migrated. A separate new Blog, Projects, and Photography site are planned under the new domain.

## Cloudflare Workers deployment

The production branch is `main`. Set the deployment command to `npx wrangler deploy` and use the repository root. `wrangler.jsonc` runs `pnpm build` before packaging the static files in `dist/`, so the dashboard build command can be left empty. This also builds a fresh checkout where `dist/` does not yet exist.

Use Node.js 24.19.0 and pnpm 11.25.0 in the build environment. To check the deployment flow locally without publishing, run `npx wrangler deploy --dry-run`.

The Cloudflare production **build** variable is `PUBLIC_BLOG_URL=https://blog.joeyddong-site.top`; it is consumed during Astro's static build, not at runtime. Custom domains are managed in the Cloudflare dashboard. Domain registration stays at Alibaba Cloud, with DNS hosted by Cloudflare. Current setup and verification are recorded in `docs/NEW_DOMAIN_SETUP.md`; the earlier domain changes and rollback records are in `docs/DOMAIN_MIGRATION.md`.

## Pages and languages

| Content | English | Chinese | Japanese |
| --- | --- | --- | --- |
| Home | `/` | `/zh/` | `/ja/` |
| Portfolio | `/portfolio/` | `/zh/portfolio/` | `/ja/portfolio/` |

- On an unprefixed URL, choose the saved language, then the first supported browser language, then English.
- An explicit localized URL is respected. `?lang=en`, `?lang=zh`, and `?lang=ja` can select a language when arriving from another subsite.
- A language dropdown in the top-right header stays on the equivalent Home or Portfolio page and remembers the choice.
- The `joey_locale` cookie is scoped to `joeyddong-site.top` on that domain and its subdomains; the browser's local storage is an additional fallback.
- Without JavaScript, every language page and the language links still work. Automatic language selection requires JavaScript.

## Subsites

Blog, Projects, and Photography remain independent projects. Their links are centralized in `src/lib/site.ts` and carry a `lang` query parameter.

The default targets are `blog.joeyddong-site.top`, `projects.joeyddong-site.top`, and `photography.joeyddong-site.top`. These new subsites are not yet deployed; this repository prepares their links without creating DNS bindings to unrelated content. The existing Blog at `joeyddong.top` remains separate. Use `PUBLIC_BLOG_URL` in a local `.env` file to override the Blog URL when needed.

Copy `.env.example` to `.env` to point links to other local development servers. Each receiving subsite must adopt the same language preference convention when it is integrated.

## Editing content and design

- `src/lib/i18n.ts`: all three language versions of the current content.
- `src/lib/site.ts`: external links and portrait filename.
- `src/styles/global.css`: shared colors, typography, spacing, and responsive layouts.
- `src/components/HomePage.astro`: homepage sections.
- `src/components/PortfolioPage.astro`: basic introduction; add verified personal experience here later.

The portrait is a temporary sample image, not the owner's photograph. Its source and replacement instructions are recorded in `docs/ASSETS.md`. The site references a local copy and loads no external fonts or image services at runtime.

`PROJECT_CONTEXT.md` records the current requirements, confirmed design direction, implementation status, and remaining decisions.
