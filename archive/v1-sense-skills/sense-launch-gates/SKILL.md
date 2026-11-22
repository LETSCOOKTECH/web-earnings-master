---
name: sense-launch-gates
description: Perform evidence-based preflight, domain deployment, crawling/monetization checks and GO/NO-GO release of Astro utility websites.
---


# Release gates

## Gate 0 — identity and operations
Real owned domain, brand conflict review, legitimate operator/contact, privacy/terms matching actual process, hosting commercial-use policy, budget, backup/recovery and security owner.

## Gate 1 — validated product
Core functions tested in real browsers including low-end mobile, output independently verified, no privacy leaks or broken workflow. Known limitations explained.

## Gate 2 — public HTML + SEO
Astro production build succeeds; `dist` static audit passes; real host redirects, canonical, 200/404, robots, sitemap, indexability, schema and mobile speed inspected. GSC/Bing verified; AI crawler IP/WAF response evidence collected.

## Gate 3 — advertising eligibility
Account and site review under correct provider, meaningful original content, ad placement/privacy/CMP, authorized seller records. No Monetag popunders, misleading download ads, policy-conflicting co-serving or paid invalid traffic.

## Gate 4 — actual distribution
Site live, indexed where applicable, demonstrated acquisition campaign, first-party source and task events, error monitoring and cost reporting. No ranking or revenue predictions represented as observed performance.

## Run
`npm test; npm run lint:skills; node scripts/audit-static-site.mjs --dist /path/to/site/dist --origin https://actual.domain; node scripts/audit-live-site.mjs --origin https://actual.domain` then fill `templates/release-evidence.md` with screenshots/logs and manually check Search Console, Bing, consent, ads and actual user conversions.

## Decision
**NO GO if any blocker is UNKNOWN or FAIL**. Source file/commit existence alone does not pass live checks. Publish a release report with owner, SHA, evidence links, unresolved risks and next verification date.

