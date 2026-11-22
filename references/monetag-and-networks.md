# Monetag and other networks — compatibility matrix

Source review 2026-11-22; third-party contracts and requirements change frequently. Reopen provider policies and actual account rules before applying. This is a cautious internal strategy, not a statement that all network formats are universally forbidden.

## Monetag preliminary route
1. Add and verify the website in Monetag; review publisher terms, the formats offered, site ownership, geographies, ad script and payout details; retain verification screenshot and current terms.
2. Site must already be useful and legitimate. **No guarantee of immediate earnings**; Monetag revenue varies by traffic quality, geography, device and ad format.
3. Our **internal disallowed formats**: OnClick/popunder, forced redirects, fake download/next buttons, push permission dark patterns and aggressive obstructive overlays. Treat direct links as ads only if clearly disclosed and not misleading; otherwise do not deploy.
4. Use only conservative, distinct in-page ad formats that meet Google policies, user consent requirements and accessibility criteria. If uncertain, do not insert ad code.
5. Keep a feature flag to disable ads entirely during AdSense review, troubleshooting, or policy issues. Third-party scripts are security, performance and privacy dependencies, not harmless copy-paste.
6. Monetag's own compatibility FAQ is **not** an authorization from Google. Read both sources; resolve conflicts conservatively.

## Other networks: research and qualification only
- **Media.net:** official inventory policies disallow fraudulent, incentivized and certain forced-redirect/popunder acquisition practices. Review traffic-quality requirements, site content, region and payout contracts directly.
- **Raptive:** premium program with varying traffic/age/geographic requirements; see official current FAQ for exact thresholds. Not a new-site default.
- **Journey by Mediavine:** requirements/eligibility and Grow integration can change; published changes in November 2026. Never hardcode an old 10k-session rule as permanent.
- **Ezoic, Adsterra, PropellerAds and others:** account, website acceptance, payout, restrictions, traffic minimums and ad-format implications **UNKNOWN until verified in official live docs and your publisher terms**. Do not assume “instant monetization” means AdSense-safe.

## Approval checklist
Official terms linked + retrieved date; country/legal coverage; traffic thresholds documented as provider-specific; ad inventory and creative quality; consent vendor compatibility; download-button separation; no prohibited popunders; ads.txt and seller identity; net revenue after costs and UX; safe removal process. Do not run several ad scripts together without test evidence and provider permission.

## What to measure
Site-approved status, valid impressions, viewability, real fill, page RPM/eCPM by GEO, page experience/CWV with and without ads, invalid-traffic notifications, verified cash received, user task completion, net revenue.

