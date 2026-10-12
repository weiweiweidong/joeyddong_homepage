# joeyddong-site.top setup — 2026-10-12

Requested primary homepage: `https://joeyddong-site.top`.
Prepared subsite links: `blog.joeyddong-site.top`, `projects.joeyddong-site.top`, `photography.joeyddong-site.top`. Portfolio remains `/portfolio/`, `/zh/portfolio/`, and `/ja/portfolio/` on the primary domain.

User clarified that the existing blog at `joeyddong.top` must remain unchanged. The new Blog is a separate future site at `blog.joeyddong-site.top`; this task does not migrate the existing blog or its content. New Blog, Projects, and Photography are not yet independently deployed; their addresses are prepared for future work.

## Before setup

Alibaba registrar lists `joeyddong-site.top` as registered, with registry review in progress. Holder real-name verification is successful. Original nameservers: `dns27.hichina.com`, `dns28.hichina.com`. Alibaba DNS contains zero records. Registrar DNSSEC contains zero DS records.

Existing production: homepage Worker `joeyddong-homepage` bound to `www.joeyddong.top`; blog GitHub Pages repository `weiweiweidong/weiweiweidong.github.io` bound to `joeyddong.top`. Existing production build override: `PUBLIC_BLOG_URL=https://joeyddong.top`. Projects and Photography have not been independently deployed.

## Status

New domain added to Cloudflare Free with assigned nameservers `aisha.ns.cloudflare.com` and `nile.ns.cloudflare.com`. Alibaba registrar has saved those nameservers, and the public resolver at `1.1.1.1` now returns them. Worker `joeyddong-homepage` has the custom domain `joeyddong-site.top`; the existing `www.joeyddong.top` homepage alias was retained. Production build variable `PUBLIC_BLOG_URL` is now `https://blog.joeyddong-site.top`.

Homepage URLs, subsite link defaults, environment example, and language cookie scope were updated and published from commit `b5fa52d`. `pnpm check` and `pnpm build` passed. On 2026-10-12 at approximately 23:33 JST, all six homepage and Portfolio routes returned HTTPS 200, with canonical URLs on `joeyddong-site.top` and the three prepared subsite links on the new domain. Browser verification also showed the new domain serving the updated Chinese homepage. The old blog at `https://joeyddong.top` still returned HTTPS 200 with title `JoeyDDong's Blog`; its configuration was not changed.

Blog, Projects, and Photography still require their own future implementation and deployment before their prepared subdomain links will serve pages.

## Recovery

The old production configuration is recorded in `DOMAIN_MIGRATION.md`. Restore its homepage URL and build overrides if rolling back the homepage source. Do not remove existing live bindings before the new domain is verified. To reverse DNS hosting for the new domain, restore the original Alibaba nameservers above; initially there were no DNS records to restore.
