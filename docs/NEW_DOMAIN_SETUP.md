# joeyddong-site.top setup — 2026-10-12

Requested primary homepage: `https://joeyddong-site.top`.
Prepared subsite links: `blog.joeyddong-site.top`, `projects.joeyddong-site.top`, `photography.joeyddong-site.top`. Portfolio remains `/portfolio/`, `/zh/portfolio/`, and `/ja/portfolio/` on the primary domain.

User clarified that the existing blog at `joeyddong.top` must remain unchanged. The new Blog is a separate future site at `blog.joeyddong-site.top`; this task does not migrate the existing blog or its content. New Blog, Projects, and Photography are not yet independently deployed; their addresses are prepared for future work.

## Before setup

Alibaba registrar lists `joeyddong-site.top` as registered, with registry review in progress. Holder real-name verification is successful. Original nameservers: `dns27.hichina.com`, `dns28.hichina.com`. Alibaba DNS contains zero records. Registrar DNSSEC contains zero DS records.

Existing production: homepage Worker `joeyddong-homepage` bound to `www.joeyddong.top`; blog GitHub Pages repository `weiweiweidong/weiweiweidong.github.io` bound to `joeyddong.top`. Existing production build override: `PUBLIC_BLOG_URL=https://joeyddong.top`. Projects and Photography have not been independently deployed.

## Status

New domain added to Cloudflare Free with assigned nameservers `aisha.ns.cloudflare.com` and `nile.ns.cloudflare.com`. Alibaba registrar has saved those nameservers. Homepage URLs, subsite link defaults, environment example, and language cookie scope are prepared locally for the new domain. `pnpm check` and `pnpm build` passed. Activation, publication, and verification remain in progress.

## Recovery

The old production configuration is recorded in `DOMAIN_MIGRATION.md`. Restore its homepage URL and build overrides if rolling back the homepage source. Do not remove existing live bindings before the new domain is verified. To reverse DNS hosting for the new domain, restore the original Alibaba nameservers above; initially there were no DNS records to restore.
