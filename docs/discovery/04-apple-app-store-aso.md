# Apple App Store ASO: precise metadata, search CPPs and trustworthy acquisition
**Research baseline:** 2026-11-23. **Owner:** web-aso-apple-app-store. Separate iOS/iPadOS store optimization from Android Play and from ordinary website Search indexing.

## 1. What Apple actually discloses about Search
Apple says discovery incorporates textual relevance including app name, keywords, primary category, plus customer behavior including downloads and number/quality of ratings/reviews; app age and other factors may apply depending on search/region. Apple keeps model weights private. Source: https://developer.apple.com/app-store/discoverability/ and current https://developer.apple.com/support/terms/apple-developer-program-license-agreement/ .

No source states keyword density in the visible app description yields a guaranteed rank. The promotional text is expressly not an App Store ranking keyword field.

## 2. Metadata constraints — the byte trap
| Apple field | Current maximum | Important detail |
|---|---|---|
| Name | 30 characters | Relevant and distinctive; no protected competitor brand |
| Subtitle | 30 characters | Clear concise use/benefit, not a duplicate of name |
| Keywords | 100 **UTF-8 bytes** per App Store Connect technical reference | Comma-separated; don't waste budget repeating app/name terms, category or competitors |
| Description | 4000 characters | Informative and localizable; first sentence clear; not a keyword index spam target |
| Promotional text | 170 characters | Updateable independently; Apple explicitly says it is not a search rank keyword signal |
| Screenshots | up to 10 per store product page per relevant specification | Show actual app, key first result-facing images |
| App previews | up to 3 videos, <=30 seconds each | Genuine device capture, relevant localized value |

Two Apple first-party descriptions create an ambiguity: marketing guidance describes a 100-character keyword budget, while current App Store Connect **technical field reference says 100 bytes**. Validate UTF-8 byte length conservatively; multi-byte characters can exceed byte budget even below 100 visible glyphs. Sources: https://developer.apple.com/app-store/product-page/ and https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information .

Example: app named "Private Image Tools" and subtitle "Resize Photos Offline" should not repeat its exact app name in keywords. Use evidence-backed synonyms of *real* features. Exclude other app names/trademarks, duplicates, hidden ranking terms and offensive or irrelevant metadata.

## 3. An important 2026 opportunity: searchable custom product pages
Apple now supports **up to 70 custom product pages** and makes eligible approved custom pages discoverable from **App Store search** using assigned approved keywords, rather than only external unique URLs. Keyword combinations must be relevant and unique to a single page; an app version and page approval and locale/visibility are prerequisites. Sources:
https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions and https://developer.apple.com/app-store/custom-product-pages/ .

A CPP can tell an honest specific story (e.g. "offline privacy" vs "batch resizing") with distinct screenshots/features. This improves presentation and potentially conversion for a query category; it does not create 70 ranking properties or guarantee search inclusion. Track actual CPP keyword-to-page assignment and Apple App Analytics behavior. When the app supports deep links, test proper target and safe Universal Links.

## 4. Product Page Optimization (PPO)
Apple's native product page A/B tools allow **up to three treatments** against original for creative assets such as icons, screenshots or previews, subject to current rules. Test actual value proposition: icon clarity, first three screenshots, visual sequence and localization. Avoid treating small sample apparent winners as deterministic; use Apple Analytics treatment metrics, confidence, sample and segment analysis.
https://developer.apple.com/help/app-store-connect/create-product-page-optimization-tests/overview-of-product-page-optimization/ ; https://developer.apple.com/help/app-store-connect-analytics/acquisition/product-page-optimization .
PPO and CPP are different products; don't tell an agent that new keyword metadata can be A/B tested in PPO if provider only permits specific creative treatments.

## 5. Search data and economics
App Store Connect Analytics distinguishes impressions, unique product page views, conversion, first-time downloads, re-downloads, source search/browse/referrals, retention and proceeds. Know the denominator: a unique impression is not a product page view; a download is not first in-app task completion. Privacy thresholds and territories may withhold details. Sources: https://developer.apple.com/help/app-store-connect-analytics/acquisition/acquisition ; https://developer.apple.com/help/app-store-connect-analytics/reference/metrics-definitions .

To research rankings, record exact keyword, territory, device, language, date, result type and app result; validate against direct account data. Apple Ads impressions/search results are paid placements, not organic store rank. No fake download install farms or incentivized review loops.

## 6. Localized quality requirements
Native-appropriate keyword phrasing, legal feature descriptions, device screenshots, correct preview language, privacy policy, actual support URL, ratings/review replies and long-term retention. App Search may show custom product page directly, so the preview screenshot should demonstrate the matching function. Screenshots that merely advertise AI-generated imaginary features are a rejection risk. Apple's review policies and parental/kids/privacy rules override keyword experimentation.

## 7. Agent operation and output
1. Confirm published app, locale and metadata rights; distinguish prerelease plan from live App Store account.
2. Gather real competing apps, exact query, known search result; preserve date and surface.
3. Validate UTF-8 bytes and field lengths, category, terms, localization and screenshots against working binary.
4. Build CPP targeting map only for approved keywords that correspond to actual app features.
5. Define PPO campaign creative hypothesis and minimum meaningful conversion gain.
6. Analyze App Store Connect acquisition from source and CPP/PPO, actual first-value/retention/net proceeds.
7. Reject nonfunctional/irrelevant app positioning, manipulated ratings, private trademark keywords and unverified #1 promises.

Run `node scripts/audit-aso-listing.mjs --file templates/discovery/apple-app-store.example.json`. Its PASS is static, not Apple App Review, CPP Search inclusion, organic rank or financial outcome.
