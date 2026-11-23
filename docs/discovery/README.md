# AEO / GEO / ASO field and execution manuals
**Research intake 2026-11-23. Draft skills, not a promised engine ranking.**

## Invoke only one specialist for the actual question
| Surface | Owning skill | First manual | What does NOT count as proof |
|---|---|---|---|
| Traditional answers, Google featured snippets, PAA, explanatory tasks | `web-aeo-answer-optimization` | [01 Answer Engine Optimization](01-answer-engine-optimization.md) | Having a concise answer/FAQ schema isn't snippet selection |
| Google AI Mode, ChatGPT Search, Perplexity, Claude, Bing/Copilot and citations | `web-generative-engine-optimization` | [02 GEO](02-generative-engine-optimization.md) | A model mention, crawler hit or llms.txt presence isn't an AI Search citation or referral |
| Android Google Play search, ratings, store page and quality | `web-aso-google-play` | [03 Google Play ASO](03-google-play-aso.md) | A 30-char title or search keyword doesn't create Play ranking |
| iOS/iPadOS Apple App Store, keyword fields, CPP and PPO | `web-aso-apple-app-store` | [04 Apple ASO](04-apple-app-store-aso.md) | The Google Play keyword model or an Apple promotional text keyword doesn't boost App Store search |

**Boundary:** `web-app-store-discovery` routes store questions; `web-ai-discovery` verifies AI crawler/index eligibility; `web-ai-retrieval-lab` models generic retrieval; `web-search-visibility-systems` orchestrates the wider SEO/traffic work.

## Executable offline labs
```sh
node scripts/audit-answer-page.mjs --file templates/discovery/answer-page.example.json
node scripts/audit-aso-listing.mjs --file templates/discovery/google-play.example.json
node scripts/audit-aso-listing.mjs --file templates/discovery/apple-app-store.example.json
node scripts/evaluate-ai-citations.mjs --file templates/discovery/ai-citation-batch.example.json
node scripts/check-discovery-evidence.mjs
npm test
```

The fixtures use **invented illustrative app metadata and prompt sample values**, not a real tracked app or deployed SEO result. A valid output proves only structural input properties. The tools do not call Google Search Console, Play Console, App Store Connect, Bing Webmaster, or actual third-party AI search accounts. Reports state `UNKNOWN_LIVE` when external proof is unavailable.

## Evidence classes and exclusions
`sources/discovery_provider_claims_2026-11-23.json`: 32 bounded official provider claims with direct original-body versus indexed excerpt provenance. `sources/foundation_refresh_targets.json`: 53 official URL change targets (38 direct bodies accessed on 2026-11-23, 15 not confirmed for current full body), not a certification of complete rules. The 28 original skills and 4 new skills form a **32-skill library on this branch**, but neither all engine behavior nor an arbitrary "100%" of rankings is knowable.

For each consequential change: verify today's provider original in the actual jurisdiction and account; instrument reproducible page/app/task tests; acquire owner-authorized metrics; distinguish eligibility, rank, citation/mention, referral, task completion and actual profit; use independent reviewer before publishing an algorithm or policy claim.

## Important live/future controls
- Google Search generative AI inclusion control + report rolled out worldwide on August 31, 2026, with property-level application. Read current official docs and owner setting; no ranking boost.
- Google Play July 2026 reporting shift changes metrics and denominators. Preserve before/after metric glossary.
- Google Play February 2027 memory/bitmap/DEX bad-behavior visibility requirements were FUTURE on 2026-11-23.
- Apple custom product pages can be discovered in App Store search through approved assigned keywords, contrary to old URL-only descriptions.
- Apple's App Store Connect keyword field technical limit is 100 UTF-8 bytes; public marketing descriptions may say "100 characters".
- Chrome WebMCP/Agentic Browsing is experimental and optional, not a Google Search ranking score.

Release status remains DRAFT until the PR passes CI and reviewed current sources. No audited source guarantees AdSense, app approval, rank #1, AI citation or revenue.

- [05 — Multi-provider AI/search source atlas](05-geo-provider-surface-atlas.md): 21 distinct engine surfaces with exact source confidence; eight retrieval sources are currently explicitly UNKNOWN. Dataset: `sources/geo_provider_surface_atlas_2026-11-23.json`.
