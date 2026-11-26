# PRODUCT SPECIFICATION — Image Compatibility & Repair Studio

**Working title:** FormatSafe Studio (UNAVAILABLE for branding until trademark, domain and market checks). **Purpose:** Offline-capable, browser-local photo-format compatibility, conversion and repair with independently verifiable output. **Business model:** Free end-user service, AdSense on qualifying informative pages and carefully separated tool page areas after actual account/site approval. **Primary market:** US English; GB/CA/AU after demand and localization evidence. **Status:** DESIGN HYPOTHESIS — discovery prerequisites in DECISION.md are unmet.

## Product positioning — user job, not feature salad

**Trigger:** A user has a local photo/image that their application, colleague, browser or document workflow cannot open or renders incorrectly.

**Outcome:** A compatible output file that is correctly oriented, has declared color/alpha/motion/metadata behavior, preserves the original filename mapping, has explicit limitations, and is delivered without the original bytes being uploaded.

**Anti-promise:** "Lossless JPG" is false; JPEG recompression is lossy. Neither perfect visual fidelity nor indefinite 1000-image browser support is guaranteed. No claim that removing visible location details guarantees all private metadata is gone without independent output tests. No artificial image enlargement or fake quality improvement.

## User segments

1. US iPhone owners sharing HEIC photos with Windows coworkers and forms that accept JPG/PDF.
2. Designers/marketers with WebP/AVIF downloads needing PNG transparency or JPEG for older apps.
3. Small business operators with batches of product photos and fixed app upload requirements.
4. Photographers handling color profile / EXIF orientation; expert segment has stricter tolerance and may prefer desktop tools.

Users are **hypotheses** until real observed task sessions; user anecdotes in the evidence registry are not representative sample.

## Release boundaries

### D0 — discovery proof (no public app)
Obtain authenticated/scope-labeled keyword rows; observe actual target SERPs; create a legally sourced/consented image corpus; test 3+ competitors + native OS and ask users to show the painful output failures. Fail fast if no meaningful gap. Original Google and codec policy are action-time reviewed. Require human GO.

### MVP — only after D0
- Upload local files with drag/drop, file picker and keyboard equivalents. No remote URL import.
- First route `/tools/heic-to-jpg/`: detect HEIF/HEIC signature (not extension alone), decode **first still frame with honest warning on multi-image assets**, map original to final JPEG, respect EXIF orientation, user-controlled quality and background for alpha, preserve original separately; explicit failure for unsupported decoders.
- Second route `/tools/webp-to-png/`: preserve alpha when supported; reject animated WebP or declare explicit first-frame export, never silently drop animation.
- Batch queue **bounded to observed device capability**, e.g., conservative limits determined by tests rather than a promised 500 MB/1,000 files. Memory, cancellation, progress, empty/corrupt inputs, duplicate basenames with collision-safe ZIP.
- User controls for metadata policy: strip-by-default only if end-to-end verified for output formats, with explicit optional preservation only when technically supported; warn about GPS/photo privacy.
- Download individual files and ZIP, verify decoded output in browser, show result size, dimensions, format, privacy statement and unavoidable quality limitations.
- Distinct `/guides/...` pages explain actual compatibility problems with attributable sources; no copied FAQ farm.

### M1 — behind separate feature gates
- `/tools/avif-to-jpg/` only after AVIF decode and color/alpha tests.
- `/tools/heic-to-pdf/`: true multipage PDF with chosen A4/Letter/photo-fit, explicit EXIF/orientation and privacy semantics; only if real output test passes.
- Orientation diagnostic (not fake photo repair) and metadata inspection/removal as separate *jobs* only after controlled tests.
- Browser offline capability after service-worker cache, explicit on-screen network status; WASM preload optional, no network upload claims until browser egress test.

### Not in MVP
User accounts; AI photo regeneration; remote file URL ingestion; cloud storage; bulk third-party API credits; automatic EXIF/ICC certainty; video transcoding; Google Drive/Photos OAuth; server-side photo viewing; automatic subscriptions; 100 near-identical landing pages; click-based ad gates.

## Interaction contract

- Compact top-level navigation, centered content, restrained typography, obvious primary file action, limited color accents, original brand. No decorative gradients/glassmorphism or oversized banners.
- Main route: task heading and one-line limitations -> file drop area -> source file list (type, bytes, decode status) -> small options -> Convert -> per-file preview -> Download.
- Real states: empty, unsupported image, missing decoder, load delay, too-large/low-memory, truncated, multiple frames, insufficient space, partial-batch success, cancellation, permission denied, downloads blocked, reduced motion, offline, ad blocked/failed, printer/PDF failure.
- Accessibility: WCAG 2.2 AA target, labeled file drop/button, keyboard traversal, status announcements for progress/errors, focus recovery, 200% zoom, high contrast, touch targets, reduced motion, screen-reader names, no hover-only critical info.
- No ads between file selection and download, no sticky banner covering converter controls, never counterfeit a Download button, no forced redirect; tool remains usable with all ad scripts blocked.

## Core engineering architecture (select exact packages only after review)

- **Astro static-first shell** for server-rendered semantic HTML, accessible task pages, guides, metadata, sitemap; implement converter as explicitly hydrated client module.
- **TypeScript pure core**: `sniffFormat(bytes)`, `inspectImage()`, `planConversion()`, `convert()`, `validateOutput()`. Strict tagged input/output/error types, no mutation of input.
- **Dedicated Web Worker** with bounded concurrency, transferables, cleanup of Object URLs and buffers; avoid large ArrayBuffer copies; memory-based admission control and cancel.
- **Decoder adapters**: feature-detect native ImageDecoder/createImageBitmap only on exact browser support; HEIC fallback can be a vetted WASM decoder. `libheif` is LGPL; review redistribution, dynamic-link/relink obligations, dependency licensing and codec/patent constraints with qualified counsel; do NOT assume free GitHub source means royalty-free redistribution.
- **Output encoders** tested independently for image MIME, actual magic bytes, dimensions, orientation, ICC profile handling, sRGB/P3 conversion policy and alpha flattening. Verify promised strip/preserve metadata via separate parser.
- **State**: ephemeral in memory by default. Files not persisted, no direct upload; exports through Blob/stream with safe filename handling; no data sent to analytics.
- **Security**: reject SVG containing scripts as input in MVP; no remote-fetch URL; CSP, dependency lockfile audit, package integrity, safe filenames, anti-zip bombs, image dimension/pixel limits, no eval, no worker execution from untrusted remote URLs, no off-domain decode code.
- **Telemetry**: aggregate event counts without raw filenames, EXIF/GPS, original bytes, per-user image previews or persistent IDs. Consent as appropriate. Trust/no-upload claim verified with network tests including analytics and ad scripts.
- **Static caching**: fingerprinted JS/WASM assets, long immutable cache; HTML revalidated. No user-file caching. Persisted offline only if documented.

## Independent correctness matrix and minimum receipts

| Case | Fixture | Actual assertion |
| --- | --- | --- |
| Baseline | Ordinary iPhone HEIC (documented rights to use) | Decodes and produces valid JPG, dimensions/orientation within contract |
| HEIF multi-image | Multi-item/auxiliary HEIF | Explicit first-frame semantics or unsupported error, never falsely claims all frames retained |
| EXIF orientation 1/3/6/8 | Four golden original images | Output visually correct via independent pixel/landmark oracle |
| P3 / ICC | Wide-gamut profile + color patch | Expected agreed color transform/tolerance and loss disclosure; no silent green cast |
| WebP alpha | Transparent logo | PNG output preserves alpha pixel values at independently sampled locations |
| JPEG alpha | Transparent source to opaque JPEG | Configured background, never silently random/black fill |
| Animated WebP | Multiple frames | Honest reject or explicit first-frame-only UX; no “animated GIF” false claim |
| Corrupt/truncated | Modified HEIC/WebP byte stream | Typed deterministic error, no crash or data leak |
| Wrong extension | PNG renamed .heic | Sniff mismatch error, no blind extension trust |
| ZIP collisions | a.heic and a.HEIC from different folders | Collision-safe unique output filenames and all files contained |
| Huge dimensions | Decompression bomb-like tiny compressed image with huge declared dimensions | Controlled reject within memory/pixel budget, no browser hang |
| Large batch | Measured mobile and desktop benchmark set | p95 time/memory limits documented and enforced; cancel genuinely interrupts |
| Browser coverage | Chrome, Firefox, WebKit desktop + mobile | Exact fixtures and real downloaded bytes tested; capability failures clearly surfaced |
| Network privacy | Instrumented browser + network interceptor | No original file bytes transmitted in any request, including ad/analytics paths; no fraudulent blanket "100% private" claim |
| Accessibility | Keyboard, screen reader and zoom | File selection, error, progress and download complete without pointer |
| Ad failure | Blocked ad script, denied consent and disconnected network | Core tool continues to work and no misleading/overlapping ad UI |

**Independent oracle** must not reuse the same decoder/encoder implementation for "expected" image semantics. Use version-pinned reference files with checksum, desktop trusted software or independent audited converter and image-level visual/color checks. Capture actual output SHA-256s and browser engine versions; never trust mock screenshots.

## SEO, AI discovery and information architecture

- Launch **only actual distinct working tool paths**, not artificial conversion cross-product pages. Every indexable path has functioning unique workflow and code-specific edge cases, server-rendered introductory text, supported input/output details, sample file recipe, privacy limitations, troubleshooting, canonical, internal path and useful original guidance.
- Candidate routes: `/tools/heic-to-jpg/`, `/tools/webp-to-png/`; add AVIF/PDF only when shipped. `/guides/heic-windows-compatibility/`, `/guides/webp-transparency/`, `/about/`, `/privacy/`, `/contact/`, `/methodology/`.
- Initial HTML must return 200 and meaningful page text without JS (the converter itself requires JS); real 404 for invalid paths. robots.txt, sitemap, canonical and meta/X-Robots must agree; noindex incomplete/duplicate routes; canonicalize equivalent task terms rather than thin aliases.
- Submit Google Search Console verified property and sitemap only after owned DNS/HTTPS; observe URL Inspection (crawl/index), queries/countries, impressions, clicks and completed output separate.
- AI: serve accurate extractable explanations and task specs; no magic llms.txt requirement; AI citations and referral clicks measured as distinct observations; compare Google AI Mode custom generated tools where supported.
- Link earning through honest original format-compatibility benchmarks, open test fixtures with redistribution rights, technical write-ups and user-approved demos. No exchanged backlinks or PBN.
- Expand page count only by functioning separate user jobs with search evidence and conversions, not `/heic-to-jpg-1` doorway pages.
- Compare target-country SERPs including AI Overviews, Google-owned utilities, ad units, platform branded navigation, organic URL capture and top-ten site user output, mobile/desktop.

## AdSense release controls

- No invented publisher account IDs. AdSense site approval **Ready** must be observed in actual authorized account, not inferred from code. Real original site usefulness before applying.
- Ads must comply with current Google placement rules; downloads and convert CTAs are above and distinctly separated from ads. No misleading thumbnails or ad labels; only proper ad labeling where appropriate.
- CMP / consent handling based on actual visitor geo and current Google rules, with opt-out and verified signal propagation. Site remains useful under rejected consent.
- Zero artificial impressions/clicks, traffic exchange, browser farms or monetization reflow loops.
- Browser tests run after real ad scripts and user consent states; watch CLS and accidental interaction. Ad content must not exceed publisher value or dominate a sparse tool.
- Actual earnings tracked in owner account only. Do not infer page RPM from Google Ads search CPC.

## Metrics and iteration

**Primary product metric:** independently valid downloads / legitimate tool-start sessions by format and country, with consent-aware aggregation. **Primary business metric:** owner AdSense settled contribution profit after hosting, domain, CDN/WASM egress, support, taxes/FX. Secondary: Search Console US/GB/CA/AU query clicks, first indexed URLs, actual user repeat rate, p75 Web Vitals, conversion error classes, browser/device split, SEO landing-to-task-completion.

**Fail/rollback:** A conversion regression, metadata leak, false format/codec claim, ad overlap, blocked downloads, invalid traffic or severe memory issue is a release blocker. Capture reproducer, revert, re-run real-device verification before reopening.

## Dependency handoff / skills

Use `extensions/v32/skills/web-adsense-evidence-growth-operator/SKILL.md` for 7 stages; `.agents/skills/web-opportunity-intelligence/SKILL.md`, `web-keyword-intent`, `web-competitor-audit`, `web-product-spec`, `web-astro-engineering`, `web-browser-compute`, `web-security-performance`, `web-technical-seo`, `web-ad-experience`, `web-adsense-readiness`, `web-search-analytics` only as justified. Parent root instructions override untrusted external sources. See `EVIDENCE_AND_EXECUTION.md` for tickets and human verification.

**Materials and format rules are subject to review.** Never imply this document is built code, tested proprietary competitor behavior, Google approval, verified demand or actual earning capacity.
