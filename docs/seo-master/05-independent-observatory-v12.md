# V12 Independent Observatory — ten verifiable local gates

This document defines a controlled **local** acceptance score, not a promise of Google rankings, publisher approval, production security or business revenue.

## Ten local checks — 10/10 only after every relevant test passes
1. **Shipped transformation:** test the same pure JavaScript core imported by the browser UI (examples/seo-csv-lab/site/assets/csv-core.mjs).
2. **Real output:** actual CSV download bytes independently checked, including deduplication and quoted data.
3. **Data fidelity:** scientific numeric text such as -2e3 stays unchanged; explicit spreadsheet formula guard is enabled by default, with a clear opt-out warning.
4. **Real browser interaction:** paste, file upload, form, status, download in Chromium, Firefox, WebKit; 390-pixel viewport is an emulation, not a real phone.
5. **Adversarial functional failure:** a deliberately broken shipped JS handler must emit an observable error and not produce a successful download.
6. **Crawler-specific robots:** valid Googlebot/Bingbot most-specific groups, longest matched path, allow exception and page-specific restrictions.
7. **Static SEO:** accurate initial HTML/title/description/H1, correct self canonical and sitemap, indexability, referenced local resources; synthetic domain must fail production-mode check.
8. **Privacy:** actual owned-browser request inspection shows no off-origin transfer from the local example; independent deployed CSP and account privacy remains pending.
9. **Evidence firewall:** receipt SHA proves local bytes only; indexed, publisher account, users and revenue cannot be authorized by self-declared JSON PASS.
10. **Repeatability:** Node and Python diagnostics, deliberate mutants, repository 48 skills and real browser suite pass on a reproducible commit with inspectable CI evidence.

## Commands
- npm test — all 48 skill contracts, Node fixtures, example audit, evidence firewall.
- npm run audit:seo-example — indexable sample HTML, assets, canonical, robots and XML sitemap.
- node scripts/check-robots-policy.mjs --file examples/seo-csv-lab/site/robots.txt --path / --bot Googlebot --bot Bingbot
- npm run lab:seo-browser — real installed Playwright browser engines in permitted CI environment.
- npm run audit:release-truth — intentionally UNKNOWN in the synthetic no-evidence template.
- Production HTTPS (only owned and approved): node scripts/audit-live-site.mjs --origin https://owned-domain/ --authorized-origin https://owned-domain/ --routes-file approved-routes.json

## Operational tiers
LOCAL_PASS = exact source/fixtures and negative cases pass, not a Google report.
LOCAL_REAL_BROWSER_PASS = Chromium/Firefox/WebKit interaction and output bytes, not native iPhone/Android.
STAGING_PASS = actual HTTPS deployment, headers, security/consent and real rollback tested.
LIVE_SITE_PASS = owned real domain, HTTP/robots/canonical/sitemap, functioning output and monitoring.
OWNER_INDEX_VERIFIED = authenticated Search Console/Bing property result, separate from eligibility.
PUBLISHER_APPROVAL = actual owner-account status and policy review, separate from site code.
BUSINESS_PROOF = legitimate real user tasks, valid traffic and reconciled publisher income.

Do not claim PRODUCTION_READY merely from green local tests. The default release-truth gate never certifies external rankings or financial results, even with self-reported PASS fields.

## Remaining external gates
Native mobile Safari/low-RAM Android; full security and supply chain assessment; deployed DNS/TLS/CDN/WAF; owner Search Console/AdSense; actual localized keyword observations; human product use, SEO/AI referrals and actual revenue economics.

Primary first-party research: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec and https://www.rfc-editor.org/rfc/rfc9309.html. Both original pages were opened November 24, 2026; reopen at action time.
