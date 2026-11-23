---
name: web-aso-google-play
description: "Run Google Play ASO through search relevance, compliant listings, Android vitals, keyword-targeted custom pages, localization and measured acquisition tests."
---

# Google Play ASO — search and product quality operator

**Trigger:** Google Play Android app store listing optimization, app title/description/screen assets, Play search ranking, custom store listings, Play Console metrics, Android vitals, app localization or discovery regressions.

**Scope & handoff:** Owns **Google Play platform-specific store search, listing compliance, product quality and store experiments**. `web-app-store-discovery` routes platform requests, `web-aso-apple-app-store` handles Apple only, `web-product-validation` handles app function tests.

**Operation:** Reopen applicable primary-source documents at execution time. Source date and market/account matter. An observed surface or passing offline validation does not prove ranking, AI citations, store listing approval, installs, publisher eligibility or revenue.

## End-to-end workflow
1. Confirm real Android package/app Play Console ownership, availability track, target country/language/device, competitors and dated terms. If app does not exist, produce prerelease plan without claiming Play rankings/installs.
2. Reopen current Play Discovery & Ranking, visibility, listing policy and Play Console reporting docs; distinguish disclosed ranking dimensions (relevance, app quality, user behavior, regional/device personalization) from unknown numerical weights.
3. Research nonbrand search queries by locale; collect actual Play Store result screenshots/API where authorized, competitor listing keywords/ratings/real app tasks, quality reports, ad/promo differentiation; do not import Google web keyword volumes as Play search counts.
4. Write accurate app title <=30 characters, short description <=80, long description <=4000, keyword coverage based on functionality, no competitor brand infringement, deceptive quality superlatives, repeated keyword stuffing or irrelevant text. Verify store-specific visual assets and screenshots from actual app UX.
5. Inspect metadata quality: app/category, tags, video and screenshots, language localization, support contact and privacy/Data safety declarations. Check the 2026 Play policy changes and locale-specific privacy/review rules live.
6. Use country/language and (where offered) keyword-targeted custom store listings as appropriate. Google Play custom store listings are not Apple custom product pages; scope campaigns/search keyword targeting accurately and preserve unique relevance.
7. Monitor Android vitals, crash and user-perceived ANR rates, real-device quality, excessive battery, uninstall complaints and review themes. Current core vitals can affect discoverability; February 2027 memory/bitmap/DEX thresholds are **FUTURE**, not already enforcement.
8. Run native Play Store listing experiments where eligible on screenshots/icon/text, pre-register change and user acquisition objective; record experiment audience/variant and uncertainty. Never manufacture installs, fake ratings or paid manipulation.
9. Read Play Console's **July 2026 store listing performance metric change**: user intent/click-based reporting versus legacy acquisitions, and preserve exact source definitions; do not splice series without an annotated metric break.
10. Measure country/query/search-vs-explore store listing visitors, installs, first valuable action, D1/D7/D30 cohorts, uninstall/returns, retention, crash, ad/IAP net economics; compare branded and nonbranded where provider supports it.
11. Combine learnings with production release gates, testing on low-RAM devices, accessibility, policy readiness and rollback. No '100% #1' outcome claims; report observed position by query/device/country/time.

## Hard FAIL / UNKNOWN gates
- Google Play app title <=30; short description <=80; full description <=4000 at review; rules are dynamic so recheck before publication.
- Title/short description repetition, unsupported superlatives, misleading screenshots and fabricated reviews are policy risks.
- 2027 memory/Dex requirements: future-effective; distinguish current vitals from planned enforcement.
- July 2026 analytics reports changed definitions; old downloads ≠ new listing visitors.
- Only authorized Play Console data supports actual installs/revenue; third-party estimates remain models.

## Output contract
- Current country/device-specific Play SERP and keyword intent map
- Policy-safe localized listing metadata + genuine screenshot and asset requirements
- Play search/keyword-targeted custom listing deployment review
- Android vitals and release-quality gate, current vs future rule ledger
- Play Console analytics funnel with July 2026 definition change and A/B decisions

## Current first-party source entry points (review again before action)
- https://support.google.com/googleplay/android-developer/answer/9958766
- https://support.google.com/googleplay/android-developer/answer/4448378
- https://support.google.com/googleplay/android-developer/answer/13393723
- https://support.google.com/googleplay/android-developer/answer/9859152
- https://support.google.com/googleplay/android-developer/answer/9867158
- https://support.google.com/googleplay/android-developer/answer/12053285
- https://support.google.com/googleplay/android-developer/answer/9859173
- https://support.google.com/googleplay/android-developer/answer/9844486
- https://developer.android.com/google/play/vitals

## References, scripts & review
- `docs/discovery/03-google-play-aso.md`
- `scripts/audit-aso-listing.mjs`
- `docs/foundations/07-aso-discovery.md`

**Evidence state:** Source cited → exact provider scope/time verified → mechanism/implementation tested → independently reviewed → (only with owner credentials) live account result. Scorecards without this sequence are planning signals, not completed discovery results.
