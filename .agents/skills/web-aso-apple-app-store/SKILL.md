---
name: web-aso-apple-app-store
description: "Optimize Apple App Store search relevance with byte-accurate keywords, metadata, category, product pages, real reviews and Apple Analytics evidence."
---

# Apple App Store ASO — iOS/iPadOS product discovery operator

**Trigger:** Apple App Store iOS/iPadOS app metadata, app name/subtitle/keyword fields, App Store Connect, custom product pages, Apple Ads, screenshots, in-app events, review quality and conversion optimization.

**Scope & handoff:** Owns **Apple store-specific metadata/keyword field, custom product pages, analytics and policy**. Google Play rules are not portable; `web-app-store-discovery` routes multi-store requests.

**Operation:** Reopen applicable primary-source documents at execution time. Source date and market/account matter. An observed surface or passing offline validation does not prove ranking, AI citations, store listing approval, installs, publisher eligibility or revenue.

## End-to-end workflow
1. Verify Apple App Store Connect app identity, iOS/iPadOS region, language, relevant devices, catalog status, approved-version controls and brand/trademark restrictions. No Apple listing = preparation only, no fabricated rankings.
2. Open current Apple discoverability, product-page, App Store Connect metadata reference and App Review rules. Document disclosed search factors: text relevance (name/keywords/category), downloads, rating/review quality and changing country/user context; weights unknown.
3. Build actual user-query map by territory, language, available store suggestions and dated competitors; weigh popularity versus competition with explicitly modeled estimates, never a made-up Apple search volume.
4. Write a distinct descriptive app name <=30 chars, subtitle <=30 chars, approved category and Apple keyword field <=100 **UTF-8 bytes**, not merely JS string length. Separate comma-delimited terms without redundant name/company terms, competing apps, protected trademarks or irrelevant keyword stuffing.
5. Write a trustworthy description <=4000 chars, promotional text <=170 chars (not a search-ranking keyword lever), feature demonstration screenshots and device footage, strong first 1–3 search-visible assets; localize all copy/assets with native QA.
6. Evaluate custom product pages (up to 70 per app at review): eligible approved pages may match assigned approved keywords in App Store search, rather than only external URL campaigns. Ensure unique keyword assignment per page and actual variant relevance; do not assume creating 70 pages yields ranking boost.
7. Use product page optimization experiments (up to three treatments against original at review) for legitimate icon/screenshot/preview changes; review Apple App Analytics confidence instead of superficial winning variants; keep changes isolated.
8. Measure App Store source type search, browse, referrers, unique impressions/product page views, installs, conversion, first-value, retention, reviews, refunds and net proceeds. Distinguish app launch date and territorial data, small-sample suppression and changes in metric definitions.
9. Review screenshots/previews, privacy nutrition labels, support URL with actual contact, age/rating, accessibility, app quality, prohibited rating manipulation and brand misuse before publishing. Check Apple policies at action time.
10. Record per-country observed store result, feature treatment, causal confounders, ASO release window, rollback route and user benefit. Apple Ads campaigns must be labeled paid acquisition, not proof of organic ranking.

## Hard FAIL / UNKNOWN gates
- App Store keyword field is capped at 100 UTF-8 bytes; name/subtitle each at most 30 characters, promo 170 and description 4000.
- Apple product page promotional text does NOT affect app search ranking.
- Do not copy Google Play’s 80-character short description field into Apple store schema.
- Custom product pages can be searchable via approved keyword assignment; do not teach the old 'custom pages are URL-only' rule.
- Do not infer absolute store discovery from a custom product page experiment or high star rating alone.

## Output contract
- Apple market/locale-specific intent and actual store placement research
- UTF-8 byte-validated keyword field, name, subtitle and title/preview/screenshot metadata
- Keyword-targeted custom product page and product-page A/B design
- App Store Connect acquisition/retention/proceeds measurement with unknowns
- App Review compliance report, release limitations and stop/go

## Current first-party source entry points (review again before action)
- https://developer.apple.com/app-store/discoverability/
- https://developer.apple.com/app-store/product-page/
- https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information
- https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions
- https://developer.apple.com/help/app-store-connect/create-product-page-optimization-tests/overview-of-product-page-optimization/
- https://developer.apple.com/help/app-store-connect-analytics/acquisition/acquisition
- https://developer.apple.com/app-store/review/guidelines/

## References, scripts & review
- `docs/discovery/04-apple-app-store-aso.md`
- `scripts/audit-aso-listing.mjs`
- `docs/foundations/07-aso-discovery.md`

**Evidence state:** Source cited → exact provider scope/time verified → mechanism/implementation tested → independently reviewed → (only with owner credentials) live account result. Scorecards without this sequence are planning signals, not completed discovery results.
