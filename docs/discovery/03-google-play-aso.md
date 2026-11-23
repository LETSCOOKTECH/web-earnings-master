# Google Play ASO: discovery, quality, experiments and reporting
**Research date:** 2026-11-23. **Owner:** web-aso-google-play. Google Play ASO != Apple ASO != web SEO. None guarantees store ranks or featuring.

## 1. What Play says about ranking
Google Play explains that the discovery system considers **multiple contextual factors**, including relevance of app content/listing to user query, user behavior/feedback, developer support and overall app experience. Factor weighting differs with store surface, device and individual preferences, and exact weights are private. First-party references:
https://support.google.com/googleplay/android-developer/answer/9958766 ; https://support.google.com/googleplay/android-developer/answer/4448378 ; https://support.google.com/googleplay/android-developer/answer/9042516 .
Some official Help pages returned 429 during review: indexed first-party excerpts support bounded claims, but current complete policy must be reopened before a release.

## 2. Correct metadata and policy
For the current main Google Play listing:
| Field | Official bound / behavior | Gate |
|---|---|---|
| App title | <=30 characters | Distinct, relevant, real name; no fake "No. 1", awards or keyword stuffing |
| Short description | <=80 characters | One clear user benefit and actual primary task |
| Full description | <=4000 characters | Accurate feature/limits, trustworthy privacy and actual capabilities |
| Screenshots/media | Real app visuals, device/locale requirements | Never depict unbuilt features or unreal UI |
| Category/tags | Match what app actually does | No irrelevant keyword targeting |
| Policy/privacy | Data safety, ads, permissions, contact, real behavior | External current policy & truthful declarations |

Sources: https://support.google.com/googleplay/android-developer/answer/9859152 ; https://support.google.com/googleplay/android-developer/answer/13393723 ; https://support.google.com/googleplay/android-developer/answer/18265346 .
Character metadata limits are structural; valid length **does not certify policy compliance**. Avoid competitor trademarks, misleading value or "guaranteed #1" in title/icon/listing.

Example for an actually working local image compressor: name "Private Image Tools", short "Resize and compress images privately, without uploading files." Only claim no-upload if privacy network test proves supported workflows and no hidden server processing. Never scrape and duplicate competitor screens as "conversion optimization".

## 3. Discoverability methodology
- Country + language + device + store version, exact branded/nonbranded query, Play search vs Explore vs external link. Capture real observed result slots, competitor value and ad position.
- Study user-facing requirements (offline, batch, image dimensions, speed, Android minimum version, no watermark, accessibility), not only keyword density.
- Localize metadata, screenshots, examples and support. Google's automated translation is not a substitute for native language QA in high-value markets.
- Prioritize own reliable functional advantage with legitimate user reviews. Ratings, installs, retention and quality can be relevant, but no invented numerical weights.
- Non-Play Google Search demand is a separate metric. There is no universal keyword difficulty/volume directly convertible into Play app-store impressions.

## 4. Keyword-targeted custom store listings
2026 Google Play supports custom store listings by countries/other segments, and **search keyword targeting** for eligible listings. This permits a separate store creative aligned to the query, not arbitrary duplication of an app or a ranking lever. Check eligibility and publication state in Play Console, avoid overlapping contradictory keyword definitions, and measure conversion. https://support.google.com/googleplay/android-developer/answer/9867158 .

Do NOT confuse with Apple App Store custom product pages. Play ad-targeted custom listings have restrictions distinct from Google Play search ads; official provider wording may evolve.

## 5. Quality/ranking signals and future rules
- Android vitals user-perceived crash/ANR and other bad-behavior signals affect current Play discovery; check device/category thresholds in Play Console, not a universal static number. https://support.google.com/googleplay/android-developer/answer/9844486 ; https://developer.android.com/google/play/vitals .
- **February 2027**: Google announced further memory (anonymous RSS + Swap), bitmap memory and DEX optimization bad-behavior thresholds. FUTURE as of Nov 2026; test early but do not call them enforced today. https://developer.android.com/blog/posts/elevating-app-quality-reducing-memory-usage-and-improving-device-migration .
- Check ANR, crashes, slow start, excessive battery, support channels, feedback, uninstall reasons and core task success. No large app portfolio should scale a template with unacceptable vitals.

## 6. Store listing experiments and reporting
Google Play native store listing experiments support variants for selected text/creative and show visitor conversion outcomes. Use pre-registered hypothesis, holdout/traffic allocation, country/locale/device cuts, practical effect and downside checks. https://support.google.com/googleplay/android-developer/answer/12053285 .
**Important July 2026 reporting discontinuity:** Play store listing performance shifted emphasis to clicks/user intent while old acquisition reports and CSV use different denominators. Use metric glossary and annotate the date before comparisons. https://support.google.com/googleplay/android-developer/answer/9859173 .
Recommended funnel: Play search impressions (when available) -> listing visitors -> installs/acquisitions -> first meaningful value -> D1/D7/D30 retention -> ad/IAP/subscription net proceeds. Separate search from explore, paid and external.

## 7. Operating sequence
1. Verify current app and Play Console account; no account=UNKNOWN.
2. Capture market/product competitor evidence and query mapping.
3. Validate metadata, screenshot accuracy, localization and license.
4. Build and QA real app, device coverage, crash/ANR, accessibility and store policy.
5. Publish with proper authorization and review.
6. Inspect actual Play Console search/acquisition/quality.
7. A/B experiment one listing claim or creative, not unbounded keyword rewrites.
8. Compare business ROI using real installs, task success and net revenues.
9. Update research ledger and existing ASO skill; roll back misleading changes.

### Offline validator
`node scripts/audit-aso-listing.mjs --file templates/discovery/google-play.example.json`. Tests static metadata and confirmed promised-features mapping only. It does not connect to Google Play, verify policy account state, deliver correct screenshots, create installs, or rank.

**Reject immediately:** fake/download bots, irrelevant listing keywords, trademark abuse, sham developer accounts, fake reviews, misleading monetization or permissions, unjustified "best"/"number one" claims, nonfunctional apps and manufactured user engagement.
