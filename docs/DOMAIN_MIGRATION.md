# Domain binding — 2026-10-12

Historical record. The user's subsequent new-domain request is tracked in `NEW_DOMAIN_SETUP.md`; the existing blog remains at `joeyddong.top` unchanged.

Current target (user revision): `www.joeyddong.top` serves the Cloudflare homepage; `joeyddong.top` serves the existing GitHub Pages blog. Domain registration remains at Alibaba Cloud; DNS remains at Cloudflare.

## Revised domain allocation

Before this revision, the root domain was a proxied Worker binding to `joeyddong-homepage`; `www` was a DNS-only CNAME to `weiweiweidong.github.io`; GitHub Pages used `www.joeyddong.top` and enforced HTTPS. All three TXT records were retained. Cloudflare production build variable was `PUBLIC_BLOG_URL=https://www.joeyddong.top`.

Revision completed: the Worker binding now uses `www`, and the root is a DNS-only CNAME to `weiweiweidong.github.io`. GitHub Pages custom domain is `joeyddong.top`, DNS check passed, and Enforce HTTPS is enabled. Homepage production build variable is `PUBLIC_BLOG_URL=https://joeyddong.top`. Both Astro's site URL and shared metadata URL are `https://www.joeyddong.top`; the default Blog destination is the root domain. No www/root redirect was added to Cloudflare.

Source changes were committed and pushed to `main` as `e26f72c`. Local `pnpm check` and `pnpm build` passed. The automatic build (`b7b2233d-f847-4a8a-8e85-ac0b09c3ec33`) failed during the ongoing Cloudflare API issue. The verified local `dist` folder was subsequently uploaded using Chrome's native file picker and successfully deployed through the Cloudflare dashboard; production version `1c28c102` shows Ready.

At approximately 22:39 JST, all six www Home/Portfolio pages returned HTTPS 200 against the authoritative Cloudflare endpoint (`104.21.45.168`, using curl --resolve with certificate validation enabled). Each page has the correct www canonical URL, language, and root-domain Blog link. Root blog home and archive returned normal HTTPS 200 with the expected blog titles. Public resolver 1.1.1.1 and Cloudflare's authoritative nameserver return Cloudflare IPs for www.

The current local resolver still points www to GitHub Pages and receives GitHub's automatic www-to-root 301, so normal browsing on that network may temporarily show the old redirect. This is a DNS propagation/cache limitation, not a Cloudflare redirect rule. Allow those caches to expire before treating normal www browsing on every network as verified. The previously retained Alibaba record set is unchanged.

To roll back this revision, restore the Worker root binding, the `www` DNS-only CNAME and GitHub Pages domain, the previous build variable, and the homepage source URLs. Remove conflicting bindings/records before recreating them. The earlier migration history below describes the previous allocation, not the new target.

## Original configuration (before changes)

Authoritative nameservers: `dns27.hichina.com`, `dns28.hichina.com`.

All five Alibaba Cloud records were enabled, default resolution line, TTL 600 seconds:

| Name | Type | Value |
| --- | --- | --- |
| @ | CNAME | weiweiweidong.github.io |
| www | CNAME | weiweiweidong.github.io |
| @ | TXT | google-site-verification=_eCvcPHeDMobgTyKesDKOu5TZlYjJOM1umh_53eS1Sw |
| _dnsauth | TXT | 202502220000000uu4e96f579u1bilb9ojipi9d9bcv9vlzn253u5ka1aav1un9p |
| _dnsauth | TXT | 202412120000002rtla6u9jjsx6b4dcszysjaiczgas9e2ff8om970ilzxbfpj1e |

Blog repository: `weiweiweidong/weiweiweidong.github.io`, branch `main`. Its original CNAME file contains `joeyddong.top` (commit `615af37de122b08a54ca800e02dcf9a2a95e31d0` was the latest repository commit). Direct HTTPS access to `www.joeyddong.top` failed with a certificate name mismatch before migration.

## Recovery

To restore the original arrangement, remove the homepage Worker's root custom-domain binding in Cloudflare, restore the blog Pages custom domain/CNAME to `joeyddong.top` and the root CNAME to `weiweiweidong.github.io`, then restore the original Alibaba nameservers if rolling back DNS hosting. Alibaba's original record set is retained. Allow DNS caches and certificate issuance to settle; restoring nameservers alone does not revert GitHub Pages configuration. Restore or remove the homepage `PUBLIC_BLOG_URL` override as appropriate for the recovered blog address.

## Earlier migration status

Cloudflare Free zone created; all five original records imported. Both CNAME records initially use DNS only. TXT values match the original records. Cloudflare assigned `aisha.ns.cloudflare.com` and `nile.ns.cloudflare.com`.

Alibaba registrar saved both Cloudflare nameservers after user-completed SMS verification. Registrar DNSSEC has no DS records. Cloudflare now shows the domain is active/protected; public resolver 1.1.1.1 returns both Cloudflare nameservers.

GitHub Pages custom domain changed to `www.joeyddong.top`; DNS check succeeded and Enforce HTTPS is enabled. Homepage production build variable `PUBLIC_BLOG_URL=https://www.joeyddong.top` saved in Cloudflare.

The original root CNAME was removed from Cloudflare after backup. The dashboard created a proxied Worker record for `joeyddong.top` targeting `joeyddong-homepage`, and the Worker domain table lists this production binding. `www` remains a DNS-only CNAME to `weiweiweidong.github.io`; all three TXT records are retained. Alibaba's original record set is unchanged.

## Earlier verification

At approximately 22:15 JST on 2026-10-12, curl verified HTTP 200 with certificate validation enabled on `/`, `/zh/`, `/ja/`, `/portfolio/`, `/zh/portfolio/`, and `/ja/portfolio/`. All six pages have the expected HTML language, root-domain canonical URL, and blog links pointing to `https://www.joeyddong.top/?lang=…`.

Chrome opened `https://joeyddong.top/zh/` successfully and its Blog link led to `https://www.joeyddong.top/?lang=zh`. Blog home and `/archives/` also returned HTTPS 200, and archive navigation stayed on `www`. No Cloudflare redirect between www and root was added.

## Deployment API limitation

Build `6f687953-3d10-4ce8-82ed-fac3be1e9569` built and uploaded the updated assets, but the deployment API returned 504 at `/deployments`. A retry (`48595267-9bbd-417b-970a-f8b4608ad00e`) returned 504 at `/versions`. The final bounded retry (`d17a35a7-5684-4fdc-be1c-b81b026b851d`) completed static build but returned 504 while reading the existing Worker service, at 22:18 JST. All three dashboard builds show failure despite the public site serving the updated blog links. No additional retries were scheduled. The pending operational issue is a clean successful build/deploy status once the Cloudflare API recovers; the domain binding and live-site acceptance checks passed.
