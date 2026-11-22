# Sense Image Tools — First Revenue Website Master Blueprint
**Version:** 1.0 | **Research cutoff:** 22 November 2026 | **Status:** Build decision locked; deployment unverified.

## Executive decision
Build and launch **one Astro-based, globally targeted image utility site** with four high-quality tools and a compact set of substantial pages. Do **not** launch a general converter directory, 100 weak keyword pages, or a second domain for near-identical tools. First monetize conservatively via an acceptable third-party publisher network (Monetag, if that is the intended provider); apply for Google AdSense whenever site readiness is satisfied, rather than waiting for an invented traffic threshold.

This is a **market-supported experiment, not a promise of rankings or income**. Public Semrush October 2026 estimates: FreeConvert ~51.03M total visits, ResizePixel ~3.04M, ImResizer ~1.25M, Bulk Resize Photos ~574K, JSONFormatter.org ~2.63M, WordCounter.net ~13.24M. These are modeled *total site visits*, not the volume of non-branded organic traffic realistically obtainable by a new domain.

## First-principles constraints
1. **User value before keywords:** every tool must complete a real task, independently verify its output, and describe limitations.
2. **One task = one canonical page unless distinct user needs justify more:** no 20KB/30KB/40KB doorway variations.
3. **Site content is crawlable, tools remain usable:** serve descriptive HTML statically, then hydrate the client-only processing interface.
4. **Low marginal compute:** operations run locally where feasible; no free unlimited server conversion jobs.
5. **AdSense-safe from day one:** no fake download ads, popunders, misleading redirects, incentivized clicks or deceptive prompts.
6. **Evidence over claims:** no fake user reviews, benchmark scores, citations, performance stats or manufactured backlinks.
7. **No ranking guarantees:** crawling, indexing, rankings, AI citations, human visits and publisher earnings are separate outcomes.

## Competitor benchmark and research backlog
| Comparator | Target tasks | What we must actually test |
|---|---|---|
| ResizePixel | single resize, compress, crop, convert | Steps, output dimensions, quality, mobile UX, metadata behavior |
| ImResizer | exact-KB, preset sizes, common transformations | Met-target rate, error reporting, resolution compromise, output quality |
| Bulk Resize Photos | multi-file workflow | End-to-end time, max batch size, memory, progress, failed-file recovery |
| Squoosh | codec quality comparison | Output size vs visual fidelity on shared fixtures |
| FreeConvert | standard image conversion | Usability, file-processing limitations, transparency and format behavior |

Create 100 legally usable test fixtures: photographs, screenshots, alpha PNGs, large dimensions, text-heavy artwork, landscape/portrait, invalid headers, truncated files and Unicode filenames. Run consistent processing settings and capture operating system, browser, device, result hash, output bytes, correct MIME, dimensions, visual quality and failure messages. Only publish results after execution.

## Launch information architecture (one domain)
These are **working canonical paths** matching the existing prototype; do not rename until the real URL strategy is finalized.

| URL | Primary job / keyword cluster | Unique utility and page evidence |
|---|---|---|
| `/` | free image tools, online image utilities (brand hub) | Fast direct entry to each flagship tool, benefit and privacy model |
| `/tools/image-resizer/` | image resizer, resize image online, resize JPG/PNG, resize to pixels | Aspect ratio, actual output dimensions, helpful examples |
| `/tools/image-compressor/` | image compressor, reduce image size, JPG compressor, compress image to KB | Actual output size, quality tradeoffs, target-size diagnosis |
| `/tools/image-converter/` | image converter, JPG to PNG, PNG to JPG, WebP to JPG/PNG | Real format conversion, alpha handling, unsupported formats |
| `/tools/batch-image-tools/` | bulk image resizer, batch image conversion, compress multiple images | One input queue, status, per-file validation, ZIP |
| `/guides/how-image-compression-works/` | lossy vs lossless, image quality vs bytes | Original examples, accurate reproducible trade-offs |
| `/guides/transparent-images-to-jpg/` | PNG transparency to JPG, white background JPEG | Real alpha limitations and examples |
| `/research/browser-image-codec-benchmark/` | browser image compression comparison, file quality methodology | Publish **only after actual reproducible measurements** |
| `/about/`, `/contact/`, `/privacy/`, `/terms/` | publisher identity, contact and governance | Truthful content, real contact, data/advertising disclosures |

**Expansion only on evidence:** standalone `/tools/heic-to-jpg/`, `/tools/webp-to-png/`, `/tools/svg-to-png/` or an exact-KB workflow page when there is verified separate intent and a genuinely different product journey. Do not index query-parameter settings or temporary output URLs.

## Per-tool on-page SEO contract
- One accurate primary H1; useful title (~50-65 characters is a *design aid*, not a Google rule), concise descriptive meta text, self-referencing canonical to live domain.
- Deliver the actual UI close to the top of page; users should not scroll through a long SEO essay to find it.
- Crawlable first-party copy: supported format, actual limitations, method, privacy handling, step-by-step use, troubleshooting and real examples.
- Link related legitimate tools and guides through `<a href>`; no JavaScript-only navigation.
- Add valid `WebApplication` / `SoftwareApplication` and `BreadcrumbList` structured data where genuinely applicable. Do not create ratings or review counts.
- Use original visuals, accurate alt text, descriptive filenames, responsive layouts and real accessibility labels.
- No mandatory word-count target. Do not make near-identical pages by changing numbers, brands, or synonyms.

## Technical SEO / AI search gate
- Astro static output and actual server 200/301/404/410 codes; stable HTTPS host, no accidental duplicate origins.
- Fully rendered server/build-time descriptive HTML, unique title/H1 and canonical for every indexable URL.
- XML sitemap contains only canonical approved pages. `robots.txt` references real sitemap URL; do not block indexable pages unintentionally.
- Browser agent and human accessibility: keyboard controls, accessible file input, labels, focus and error states; no mandatory signup, CAPTCHA or hostile overlay on core tool actions.
- Verify Google Search Console site ownership, sitemap, URL Inspection and **generative AI inclusion** preference. Verify Bing Webmaster Tools and IndexNow if appropriate.
- Permit legitimate Googlebot, bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and other relevant search fetchers where desired. Consider training bots (GPTBot, ClaudeBot, Google-Extended) separately according to company policy and product-specific controls.
- Test CDN/WAF against verified bot IP or supported reverse DNS; a spoofable User-Agent is not sufficient for trust.
- Correct OG and social metadata; use supported schema. No `llms.txt` dependency or AI-only schema hacks; no fake agent-specific pages or cloaking.
- Aim for good Core Web Vitals using **75th-percentile field measurements**: LCP <= 2.5s; INP <= 200ms; CLS <= 0.1. These are UX gates, not guaranteed ranking boosters.
- Protect browser inputs, cap file size/dimensions, avoid XSS with untrusted filenames/SVG content, avoid leaking uploaded files, set appropriate security and cache headers.
- Inspect live response HTML and robots via actual HTTP requests and web crawls before release.

## Image engine production contract
Existing prototype: JPG/PNG/WebP processing and 15-file batch, static Astro routes; **not production verified**. Known gaps: Astro production build not tested in previous runtime, main-thread Canvas on large images, mobile RAM, no HEIC/AVIF coverage promise, EXIF and animation not retained.

Required upgrades before release:
- Separate decoder, transform, encoder, validator and output stages.
- Validate **actual decoded type**, output MIME, bytes, pixel dimensions and failure states.
- Test alpha-to-JPEG background explicitly; do not silently lose transparency.
- Prefer worker processing when browser support and device profiling justify it; graceful fallback for unsupported environments.
- Memory bounds, cancellation, progress, limits on concurrent work, individual failure recovery and valid downloadable files.
- Compression goals are maximums unless realistically achievable; disclose when goals cannot be met without downscaling or severe quality loss.
- No server-side file upload for supported workflows. Do not claim broad format coverage until supported, implemented and tested.

Acceptance (internal engineering targets, not outside benchmarks): >98% fixture processing success for documented supported cases; 100% correctly labeled outputs; zero silent corrupt downloads; accessible happy and failure paths on representative desktop and low-end Android devices; all automated unit/integration tests and deployment audit checks passing.

## Monetization rollout
### Phase A — Monetag candidate
Monetag says no fixed traffic minimum, but website addition/verification and policy compliance still apply. Approval/ad serving is not proof of significant revenue. Prefer **one restrained, clearly identifiable in-page ad experiment** only after privacy/consent implementation and site quality verification. Reject OnClick/popunder, intrusive push, deceptive ads, navigation hijacks, forced redirects and ads beside primary processing/download controls. Inspect actual creative landing destinations and performance. Keep integration removable behind a feature flag.

### Phase B — Google AdSense
Apply as soon as the site satisfies official eligibility and site-review criteria. No universally required number of articles or monthly visitors. Complete verified publisher and payment information, real privacy/cookie disclosures, applicable certified CMP requirements for EEA/UK/Switzerland, and accurate ads.txt once a publisher ID exists. Do not advertise on blank pages or create ad-heavy screens. Verify combined policies before co-running any two networks; disable conflicting formats first.

Economics must use **actual page RPM** and human pageviews (not search-volume estimates). Track cost of domains, bandwidth, CDN, support, testing and consent software. No guaranteed 0-cost operation.

## Launch and measurement roadmap (internal checkpoints)
### Gate 0 — Market baseline
Export US/UK/Canada/Australia/India: keyword volume, organic difficulty, SERP top-ten, referring domains to ranking pages, search intent, trends, AI and video features. Capture date and platform for every estimate. Do not use Google Ads advertiser competition as organic KD.
### Gate 1 — Engineering QA
Run npm install/build/check (existing project was blocked at npm install in earlier environment). Run mobile/browser matrix, offline-style local processing, batch ZIP integrity, large-input and invalid-input tests. Repair issues. Pass lighthouse and accessibility checks.
### Gate 2 — Publication
Register actual domain, verify TLS and robots, deploy accurate policies and legal pages, complete sitemap/canonical checks, add analytics events, Search Console and Bing.
### Gate 3 — Real distribution
Publish original comparison evidence after testing. Show practical tutorials, collaborate with relevant educators/developers/creators, publish an open-source processing helper with clear docs if it creates genuine value, and earn legitimate references (not purchased ranking links).
### Gate 4 — Early monetization
Connect conservative third-party ad format after consent/security review and measure meaningful earnings and negative UX impact. Apply for AdSense when ready.
### Gate 5 — Search learning cycles
Weekly inspect indexed pages, non-branded impressions, CTR, clicks, average position by query-country-device, AI impressions/citations, referral visits, conversion starts/completions, support issues, pages per session, repeat users, RPM and operating costs.
### Gate 6 — Expansion decision
Expand only from observed query impressions/requests, user problems or a distinct underserved workflow. If indexed and no impressions: investigate relevance, demand and competitive landscape. If impressions but few clicks: investigate SERP/intent/title and competing result features. If clicks but failures: fix product before publishing more content.

**Timing:** Crawl/index may happen relatively quickly, but ranking competitive non-branded searches may take months and is never guaranteed. Timebox 30/60/90-day *diagnostic reviews*, not promises that traffic will arrive by those dates. AI citations are discretionary and often yield no clicks.

## Data model: what success actually means
**Search**: approved indexed pages, non-branded impressions, clicks, CTR, query-country segments.
**AI**: eligible bots accessing pages, Google AI feature impressions, Bing AI citations, confirmed model referrals.
**Product**: unique human visitors, uploads initiated, valid downloads, successful operations, failure reason, processing latency and repeat usage.
**Business**: usable pageviews, net ad revenue, effective realized page RPM, geographic mix, variable and fixed costs, support burden.
**Guardrails**: accessibility, privacy, misclick signals, slow/frozen mobile interactions, consent compliance, ad load and misleading links.

## Exclusions until evidence arrives
No massive multi-niche directory; no 20KB/50KB/100KB doorway pages; no auto-generated article factory; no paid backlinks or undisclosed affiliate placements; no heavy server-side video/Office conversion; no AI-generated benchmarks or review stars; no new domains serving essentially the same image utilities.

## Official references
- Google SEO Essentials: https://developers.google.com/search/docs/essentials
- People-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI optimization: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google AI inclusion: https://support.google.com/webmasters/answer/16908024
- Google software markup: https://developers.google.com/search/docs/appearance/structured-data/software-app
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Google publisher site readiness: https://support.google.com/adsense/answer/7299563
- AdSense ad placement: https://support.google.com/adsense/answer/1346295
- Monetag onboarding: https://help.monetag.com/en/articles/6726312-how-do-i-get-started-as-a-publisher-add-and-verify-your-website-s
- Monetag/AdSense interaction: https://help.monetag.com/en/articles/6738501-can-i-use-monetag-with-adsense-on-the-same-page-is-it-safe
- Semrush traffic model description: https://www.semrush.com/kb/858-traffic-numbers-in-semrush

**Delivery note:** This document is an execution specification. It does not certify any deployed domain, ranking, ad approval or traffic outcome. Existing source prototype: `/mnt/data/sense-image-tools-astro-project.zip` in the current workspace.
