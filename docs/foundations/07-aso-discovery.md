# 07 — ASO, app-store search, vertical/local/multimodal discovery

## A hard scope gate
If the product is only an Astro website, Google Play/App Store ASO is not a direct ranking strategy. ASO starts when there is a published store listing for an actual app. A PWA install prompt does not create a Play/App Store listing. Do not suggest wrappers whose sole function is to embed a low-value website without reviewing store quality policies.

## Google Play
Discovery surfaces include Play search, categories/browse, recommendations and editorial placements; listing views and installs are separate stages. Official Play Help emphasizes accurate, comprehensive listings: title, short/full text, relevant keyword language without repetition, locale, screenshots/videos that represent actual app and high app quality. Additional factors are not exhaustively public. The listing and package quality, app integrity, crash/ANR rates, compatibility, honest reviews and compliance matter to user acquisition. Do not invent exact ranking factor weights, rating threshold, installs required or keyword density. Measure source/region, store listing visitors, acquisition, first-run success and retention. Run official listing experiments where supported.
Primary: https://support.google.com/googleplay/android-developer/answer/4448378 (opened 2026-11-23)

## Apple App Store
Apple's search page describes app name, subtitle, keywords and other relevance and quality considerations; review accurate metadata, localized terms, categories, user ratings/reviews and product page screenshots/video. Store conversion is distinct from search visibility and paid Search Ads is not an organic boost. Apple App Analytics and custom product pages must be checked for current product availability and scopes. Never promise #1 from exact-match name.
Primary: https://developer.apple.com/app-store/search/ (opened 2026-11-23)

## Other discovery surfaces
- Google Images/Video, Lens and multimodal search require appropriate accessible, original image/media resources and useful surrounding context. Video Search may have dedicated content/page eligibility.
- Google Discover is interest-driven, not a direct keyword-rank list. Do not promise inclusion based on schema.
- Local Google Maps and Bing Places need genuine eligible business records and current official local listing guidelines; virtual-only tools may not meet local business policies.
- YouTube search/video discovery, GitHub README and useful open-source packages, Reddit/forums, product directories and newsletters can send referrals to exact jobs; each has own policy and ranking.
- Bing/Copilot and DuckDuckGo/partners may involve different indexes. Verify source, do not assume all search placements share the same signal.
- AI assistants/agents may perform actions without generating a monetizable pageview.

## ASO research lab
For one real app and locale: 30 user-intent terms; manually sample store search by country/device; capture query, competing app listing, title, paid tag, icon/screenshots, content/reviews, last updated if visible, features and actual install friction. Reproduce comparator app job with legal test fixture, record failures. App sales/download estimates from third parties are models; first-party Play Console/App Store Connect is controlling for our property.

## Exit decisions
Choose app-store entry only when native application produces value that the website cannot (offline workflows, on-device integration, OS features, push with legitimate recurring use) AND can meet store policy, update, support and retention economics. Otherwise focus on website distribution. Outcome is net retained task users, not raw impressions.

## Cross-check
User journey -> store impression -> listing view -> install -> first successful task -> return/retention -> monetization. Do not multiply estimates across unmatched source intervals. No fake reviews, fake installs or competitor brand impersonation.
