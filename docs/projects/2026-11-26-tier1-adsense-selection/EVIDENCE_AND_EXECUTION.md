# V34 Field Execution — Tier-1 Search, Competitor Benchmark, Launch and Revenue

This packet is a reusable end-to-end execution source for the Sense agent, **not an instruction to skip human evidence**. Related: [decision](DECISION.md), [product spec](PRODUCT_SPEC.md), [source-and-40-jobs JSON](../../../sources/tier1_utility_market_v34.json), [structural packet](../../../templates/tier1-v34/evidence-packet.NOT_RUN.json) and [gate](../../../scripts/audit-tier1-opportunity-v34.mjs).

## 0. Re-run market decision whenever original data changes

Source change review: Google Search/AI documentation, AdSense site and placement policies; updated Google Ads Keyword Planner region export; actual competitor search pages and downloads; stable browser codec support; license status of any WASM library. Raw creator videos are inputs for hypotheses, not Google policy. Never count raw links as policy verification. Screenshots of someone else's earnings, Ahrefs DR, SEO meta scores, Google Trends 0–100 and third-party site-traffic estimates cannot support first-party claims.

## 1. Country-specific demand investigation (analyst tasks)

**Required original observations:** Four per-country query lists US, GB, CA, AU for base terms and variants:
- HEIC to JPG; convert HEIC to JPEG; HEIC to PNG; HEIC to PDF; bulk HEIC converter; HEIC file won't open.
- WebP to PNG; WebP to JPG; AVIF to JPG; AVIF to PNG; WebP transparent background; image colors change after conversion.
- actual user language variation and possible branded navigational variants.

Export from an **authorized Keyword Planner or licensed source**, preserving query matched/close-variant semantics, range dates, country, language, monthly volume (proper denominator), advertiser CPC separately, source timestamp, export hash and original file securely (not public if it contains account identifiers). Add Trends 12-month seasonality as **relative index only**; add Google Search Console only when own domain exists. Do not blend country volumes across tools without compatible definitions. Search intent classify DO/KNOW/NAVIGATE; user needs to download a real artifact, not just read answer. **Map keywords to single genuine task pages**, consolidate interchangeable intents.

**AdSense revenue proxy?** There is none from CPC alone. The operating model must wait for actual pageviews and AdSense account RPM. No public publisher estimates are authenticated for our property.

**Search visibility audit:** observe real target-country results separately on mobile and desktop, at two different dates if possible. Note screenshot/date/query/device/region, first results, ads, Google AI Overview/Mode, snippet tool, Google-owned converter or answer, top page formats, page count and navigational intent. Source permission must be checked before automatic browsing/scraping; don't use account automation without authorization.

## 2. Same-input competitor lab

**Sites:** https://www.freeconvert.com/heic-to-jpg , https://offlineconvert.com/heic-to-jpg/ , https://heic.dev/ , https://noheic.com/bulk-heic-to-jpg/ , and native Windows/macOS/iPhone alternatives. These are research candidates, not preauthorized automation targets. Only test the operator-approved public interface within service terms and rate limits. No login circumvention or mass upload of sensitive user photos.

**Test fixtures:** rights-cleared, checksum-pinned normal HEIC; wrong extension/magic; old EXIF 3/6/8; ICC/P3; non-Latin filenames; duplicated basenames; corrupt/truncated; extremely tall/wide; 100-item batch with realistically measured memory; lossless alpha WebP; animated WebP; multi-frame HEIF; high-bit-depth input; ZIP integrity.

**For every competitor and case:** input SHA-256, expected result from independent pipeline, actual downloadable file hash, orientation/color/alpha checks, browser/version/device, work duration, server/network upload observation, failure messages, screenshots, privacy disclosures and exact functional gap. Screenshot-only **does not pass**. Compare strongest incumbent's success and the OS native alternative. If all solve the job, write **REJECTED_STRONG_COMPETITORS**, not "we can make it prettier."

**Human task evidence:** recruit and observe >=5 actual users initially, then repeat with more independent users if signal ambiguous. Log current solution, actual sample, reason for failure, willingness to bookmark, privacy sensitivity, browser/OS and measured success; don't treat a self-promoting Reddit post as statistical proof.

## 3. Evidence packet / CLI contract

Run:
```bash
node scripts/audit-tier1-opportunity-v34.mjs --portfolio sources/tier1_utility_market_v34.json
node scripts/audit-tier1-opportunity-v34.mjs --packet templates/tier1-v34/evidence-packet.NOT_RUN.json
node --test tests/tier1-opportunity-v34.test.mjs
npm test
```

The portfolio is expected to return `RESEARCH_INDEX_STRUCTURAL_PASS_NOT_MARKET_VALIDATED` if its references and uncertainty remain internally consistent. The intentionally empty packet is expected to return `HOLD_DISCOVERY` with missing external evidence. A synthetic populated packet is never authenticated by its own declarations. Do not fabricate raw account receipts to make tests pass. The parser does **not** access Google account APIs and cannot approve a website.

**Do not publish sensitive human image fixtures or signed exports to public repository.** Store only permissioned sample hashes and redacted summaries publicly, with original images/owner revenue confined to authorized secure storage.

## 4. Product implementation work packages (only after real D0 GO)

**I01 Architecture:** pin supported browsers, independent decoder/encoder choice, legal/licensing review, secure no-upload design, worker-concurrency/memory budgets and failure types. Exit: signed dependency review and reproducible browser harness.

**I02 Core engine:** parser/magic checks, conversion adapter, orientation correct, color/alpha policy, output validation, bounded worker, cancellation and cleanup. Exit: independent golden suite exact outputs, ordinary/corrupt/large cases.

**I03 Original UI:** compact accessible Astro routes; input -> validation -> settings -> conversion -> real download; no visual-only shell; all loading/error/no-JS/offline states. Exit: Chromium/Firefox/WebKit + mobile source and production build task tests.

**I04 Search route:** published SSR/static initial HTML with original problem-first guides, canonical, sitemap, meaningful internal navigation, content review and default noindex on unfinished routes. Exit: built static audit plus real owned HTTPS live crawl with domain and Search Console evidence.

**I05 Privacy and security:** inspect bytes leaving browser under ad scripts and analytics; check content security policy, license notices, firmware/worker performance, injection and ZipSlip-style output names; test slow network. Exit: independent privacy and security receipts.

**I06 AdSense (post account approval):** confirm site Ready in authorized account, consent/CMP and proper ad labels/separation, never near Convert/Download; browser ad-block/reject consent behavior and reserved layout dimensions. Exit: actual account state and live ad screenshots, zero misleading placement, no page functionality regression.

**I07 Distribution:** publish original benchmark (independent, no false claims), collaborate legitimately with Windows/photo communities only when rules permit, links earned editorially, real feedback. Exit: Search Console and real completed outputs, no fake visitors.

**I08 Economics:** reconcile monthly country pageviews and ad serving with AdSense estimated/ad-adjusted/settled receipts and operating cash. Exit: net contribution decision; don't hide support, license or hosting/egress costs.

## 5. Release acceptance / hold matrix

| Gate | Pass requires | Status at research snapshot |
| --- | --- | --- |
| Market | Original authenticated demand and SERP click opportunity for target country | NOT_RUN |
| Competition | >=3 identical-file competitor outputs, independent golden oracle | NOT_RUN |
| User need | Real user sessions and documentable recurring compatibility failures | NOT_RUN |
| Engineering | Built converter passes actual cross-browser, privacy and performance tests | NOT_BUILT |
| SEO live | Owned HTTPS, useful route HTTP+HTML, GSC verified and observed | NOT_DEPLOYED |
| AdSense | Publisher account Sites Ready, real policy recheck, correct ad UX and consent | NOT_APPLIED |
| Income | Adjusted owner account reports, pageviews, settled cash, costs | UNKNOWN |
| Scaling | Repeatable, profitable organic cohorts and verified ranking opportunity | NOT_ELIGIBLE |

**Publication threshold:** No mass publishing, no revenue forecast stated as fact, and no new-domain SEO win claims while critical stages are unknown. If stage 2 fails because existing free competitors solve the actual user problem, move to the **home-material counterfactual** rather than spend more on converter features.

## 6. Risk and negative-control register

- R1: Search volume is high yet new site cannot rank or AI/search snippets satisfy searches. Test: actual SERP and clicked-task gap; zero-click assumption sensitivity.
- R2: High-volume visitor makes one conversion and leaves; no repeat/ad view depth. Test: legitimate completed task per landing session; no dark pageview expansion.
- R3: WebCodecs native or WASM HEIF support inconsistent. Test: real iPhone/Windows/Android/Firefox/WebKit fixtures.
- R4: HEVC patent/codec LGPL distribution risks. Test: upstream notice, legal review and alternatives before shipping.
- R5: Conversion silently corrupts ICC/exif/alpha. Test: independent visual and metadata oracle.
- R6: 100-file batches exhaust mobile RAM or freeze browser. Test: bounded budget/p75 runtime and cancellation.
- R7: AdSense may reject low-value tool pages or may lower monetization due to ad layout. Test: original helpful explanations, genuine publisher value, owner review.
- R8: Privacy no-upload contradicted by telemetry/third-party code. Test: instrumented full browser/network.
- R9: Site appears indexed but has no clicks. Test: GSC query-click report, not site: search.
- R10: Third-party modeled search volume or competitor traffic misrepresented as verified ROI. Test: external source labels and audit CLI.
- R11: Google AI Mode creates similar working utility in results. Test: same-file actual result feasibility in current surfaces; do not claim AI-proof.
- R12: Monetization tax/consent/geo not ready. Test: actual region-specific account verification and legal review.
- R13: SEO pages split into a hundred thin permutations. Test: independent functionality/intent per canonical route, human content review and Search spam policy.
- R14: Competitor marketed feature actually works. Test: record strongest counterevidence and reject invented weaknesses.

## 7. Operating cadence and veto

**Before GO:** publish hypothesis, dated source, reproducible counterexample, change conditions and human sign-off. Never self-certify a passing packet. **After owned launch:** weekly review of successful conversions and Search Console by country/URL/query, monthly actual AdSense/expense accounting, policy changes at deployment time. Reprioritize on observed product and business outcomes, not a vanity numerical "AI/SEO quality" score.

**Evidence integrity:** if a source is unavailable due to login, robots, 403 or unsupported tool capabilities, mark `UNKNOWN`; do not bypass. If Ahrefs connected app denies access ("Insufficient plan"), explicitly record `NOT_AVAILABLE_PLAN`; public Ahrefs article estimates remain secondary research, not new account data.

## 8. Source entrypoints

Ahrefs 2026: https://ahrefs.com/blog/the-free-tools-seo-strategy/
FormatDrop affiliate PR: https://signalnewswilkesbarre.com/press-releases/11938/an-estimated-half-a-million-plus-u-s-searches-a-month-look-for-a-way-to-convert-image-files-back-to-jpeg/
Google GKP: https://support.google.com/google-ads/answer/7337243
Google Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
Google AdSense placement policies: https://support.google.com/adsense/answer/1346295
libheif upstream/license: https://github.com/strukturag/libheif

All URLs are research starting points. The source-specific semantic-review status is in the JSON. **New source retrieval at action time is mandatory for provider rules.**
