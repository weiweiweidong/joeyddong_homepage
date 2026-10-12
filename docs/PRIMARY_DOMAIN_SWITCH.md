# Primary domain switch — 2026-10-13

User requested `joeyddong.top` for the new personal website and retirement of the old GitHub Pages blog, rather than swapping the two websites.

## Configuration

- `joeyddong.top`: production custom domain for Worker `joeyddong-homepage`.
- `www.joeyddong.top` and `joeyddong-site.top`: same Worker; HTTP 301 to `https://joeyddong.top`, preserving paths and queries.
- The old repository `weiweiweidong/weiweiweidong.github.io` has Pages publishing branch set to `None`. Its source is retained; GitHub no longer lists a live Pages site.
- The previous DNS-only root CNAME to `weiweiweidong.github.io` was removed. Unrelated TXT records were retained. Registrar and nameservers were unchanged.
- Astro site URL, shared metadata URL, and language-cookie domain now use `joeyddong.top`.
- The separate new Blog at `blog.joeyddong-site.top` is retained, including the existing build variable and homepage navigation link. It is distinct from the retired GitHub Pages blog.
- Custom domains are declared in `wrangler.jsonc`; `src/worker.js` handles alias redirects before serving the static `ASSETS` binding.

## Validation

`npm run check` passed with zero errors or warnings; `npm run build` generated 13 pages. The redirect handler was checked for preservation of path and query parameters and primary-domain asset serving.

Production version `fa8b9153-0e4a-4e88-affb-3aba72f345c1` was deployed successfully with Wrangler. At approximately 03:46 JST, all twelve Home, Portfolio, Projects, and Photography routes returned HTTPS 200 with canonical URLs on `joeyddong.top`. Both alias URLs `/zh/portfolio/?lang=ja` returned HTTP 301 to `https://joeyddong.top/zh/portfolio/?lang=ja`. The old `https://weiweiweidong.github.io/` returned the GitHub Pages 404 page. The separate new Blog returned HTTPS 200.

Python urllib requests returned 403 from Cloudflare, while normal curl requests passed. Acceptance was verified using curl with TLS certificate validation enabled.

## Recovery

The old blog can be republished by restoring its Pages branch to `main` and its custom domain, then removing the Worker's root custom-domain binding and recreating the previous DNS-only CNAME to `weiweiweidong.github.io`. Restore the homepage's previous site URL and cookie scope and remove the alias redirect before deploying a rollback. No repository or blog content was deleted.
