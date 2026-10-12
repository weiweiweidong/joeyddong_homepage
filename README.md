# JoeyDDong — Personal Homepage

Astro + TypeScript + native CSS, built as a static site.

The visual direction is inspired by Kickpush: a coral-red canvas, oversized white sans-serif headings, a centered typographic hero, colorful illustrated section cards, and a portrait in the personal introduction section.

## Run locally

Use Node.js **22.12 or newer** (Node 24 is recommended) and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro, normally `http://127.0.0.1:4321`.

```sh
npm run check
npm run build
npm run preview
```

The production output is `dist/`. The homepage's primary domain is `https://joeyddong.top` on Cloudflare Workers. `www.joeyddong.top` and `joeyddong-site.top` redirect to the primary domain with HTTP 301, preserving paths and query parameters. The old GitHub Pages blog is offline; its repository is retained. The separate new Blog's target address is `https://blog.joeyddong.top`.

## Cloudflare Workers deployment

The production branch is `main`. Set the deployment command to `npx wrangler deploy` and use the repository root. `wrangler.jsonc` runs `npm run build` before packaging the static files in `dist/`, so the dashboard build command can be left empty. This also builds a fresh checkout where `dist/` does not yet exist.

Use Node.js 24.19.0 and npm 11.19.0 in the build environment. To check the deployment flow locally without publishing, run `npx wrangler deploy --dry-run`.

Set the Cloudflare production **build** variable to `PUBLIC_BLOG_URL=https://blog.joeyddong.top`; it is consumed during Astro's static build, not at runtime. An existing override with the previous Blog address must be updated before rebuilding and deploying. The separate Blog also needs its own custom-domain binding and DNS configuration for the new address. Homepage custom domains are declared in `wrangler.jsonc`. `src/worker.js` redirects the two aliases and otherwise serves the `ASSETS` binding. Domain registration stays at Alibaba Cloud, with DNS hosted by Cloudflare. Current setup and verification are recorded in `docs/PRIMARY_DOMAIN_SWITCH.md`; earlier domain changes are historical records in `docs/NEW_DOMAIN_SETUP.md` and `docs/DOMAIN_MIGRATION.md`.

## Pages and languages

| Content | English | Chinese | Japanese |
| --- | --- | --- | --- |
| Home | `/` | `/zh/` | `/ja/` |
| Portfolio | `/portfolio/` | `/zh/portfolio/` | `/ja/portfolio/` |
| Photography | `/photography/` | `/zh/photography/` | `/ja/photography/` |
| Projects | `/projects/` | `/zh/projects/` | `/ja/projects/` |

- On an unprefixed URL, choose the saved language, then the first supported browser language, then English.
- An explicit localized URL is respected. `?lang=en`, `?lang=zh`, and `?lang=ja` can select a language when arriving from another subsite.
- A language dropdown in the top-right header stays on the equivalent page, including each project demo, and remembers the choice.
- The `joey_locale` cookie is scoped to `joeyddong.top` on that domain and its subdomains; the browser's local storage is an additional fallback. The separate Blog receives the language through the `lang` query parameter.
- Without JavaScript, every language page and the language links still work. Automatic language selection requires JavaScript.

## Subsites

Blog, Projects, and Photography are planned as independent projects. Their links are centralized in `src/lib/site.ts`; external links carry a `lang` query parameter. Projects opens a local card index with two sections: hand-written Coding projects (currently “Work in progress”) and Vibe Coding demos. Each demo has a separate localized page. Photography opens a local gallery with 78 original photographs, rewritten copy in three languages, and an accessible image viewer.

Blog defaults to `blog.joeyddong.top`. Projects and Photography always open localized `/projects/` and `/photography/` pages within this site. Their links are not overridden by environment variables. The old GitHub Pages blog has been retired. Use `PUBLIC_BLOG_URL` in a local `.env` file to override the Blog URL when needed.

Copy `.env.example` to `.env` to point links to other local development servers. Each receiving subsite must adopt the same language preference convention when it is integrated.

## Editing content and design

- `src/lib/photography.ts`: 78 original photo URLs and Photography copy in three languages. Images stay on the original OSS service; responsive WebP previews and lazy loading reduce transfers, and the viewer links to unchanged original URLs.
- `src/lib/i18n.ts`: shared interface translations; `src/lib/portfolio.ts`: approved Portfolio content in three languages.
- `src/lib/site.ts`: external links and portrait filename.
- `src/styles/global.css`: shared colors, typography, spacing, and responsive layouts.
- `src/components/HomePage.astro`: homepage sections.
- `src/components/PortfolioPage.astro`: personal portrait, introduction, education, exploration, interests, and GitHub contact.

The portrait is a temporary sample image, not the owner's photograph. Its source and replacement instructions are recorded in `docs/ASSETS.md`. The site references a local copy and loads no external fonts or image services at runtime.

`PROJECT_CONTEXT.md` records the current requirements, confirmed design direction, implementation status, and remaining decisions.

## Portfolio update (2026-10-13)

Portfolio uses the approved Chinese, English, and Japanese content and a local copy of the owner’s old About portrait. Only the Home portrait remains a temporary sample. Use `npm ci` with the committed `package-lock.json`; no production settings or deployment were changed by this local update.

## Shared animated background

Home, Projects, Photography, and Portfolio share the default-on gradient animation from `src/components/AnimatedBackground.astro`. Home keeps its motion control; the other three pages have no animation toggle. The shared layout adds the background and the translucent navigation styling across all language routes.

## Projects and demos (2026-10-13)

Projects has three interactive demos, each available in English, Chinese, and Japanese. Prefix the following routes with `/zh` or `/ja` for localized versions:

- `/projects/gravity-garden/`: particle sculpture with cursor attraction, click ripples, palettes, and motion controls.
- `/projects/cat-yard/`: a cat that wanders, plays with yarn and a ball, eats food, and responds to the pointer; toys can be dragged.
- `/projects/porsche-garage/`: a Three.js Porsche 911 Turbo viewer with orbit, zoom, independent doors, paint colors, and optional auto rotation.

The index uses static covers; Three.js and the car model load only on the garage demo. Demo motion respects reduced-motion preferences and pauses rendering when hidden. Shared site background behavior remains as documented above.

Card content is maintained in `src/lib/projects.ts`; demo copy lives in the corresponding locale files. The Porsche model is attributed to Karol Miklas / Lionsharp Studios under CC BY 4.0, with source and modifications recorded in `public/models/porsche-911/LICENSE.txt` and linked on the demo. The optimized model is committed so builds do not need to download it. To regenerate its textures and independent door geometry, run `npm run porsche:prepare` (requires network access; source revision is pinned).
