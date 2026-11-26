---
name: web-dominant-studio-v29
description: Build, verify and release an evidence-led browser-local data studio with Astro, deterministic output, bounded performance, SEO and ethical publisher integration. Opt-in companion to the original 50 registered skills.
---

# Sense Dominant Studio — V29 additive execution companion

## Scope, activation and truthful outcomes

Load this standalone companion when the actual job involves browser-local CSV, TSV, JSON, JSONL, table repair, structured-data formatting or a proposed Parquet/TOON expansion. Coordinate with web-dominant-tool-creator and the task-specific specialist skill; never load all 50 by default. The V23 registry and its frozen 50-skill tests remain untouched. This file is an OPTIONAL 51st companion, not activated in the registry.

Working prototype: examples/astro-dominant-studio-v29. Exactly twenty-eight deterministic CSV/TSV/JSON/JSONL workflows and four hubs, with an actual Astro build, background Web Worker, strict UTF-8 reader, gzip support for selected text formats, export, and formula-escape option. Not a 28-route Parquet/TOON platform, not an AdSense-approved property, and not a live website.

## 0. Demand and competition gate

First identify a real user job, input, independently verifiable expected output, target audience, privacy assumptions and device performance envelope. Collect dated source URLs and original artifacts, including direct user complaints, actual same-input competitor output and available keyword evidence. No fabricated traffic/KD/CPC; never infer monthly search volume from Google Trends 0–100 relative index.

Zero-paid research is allowed with scripts/assess-manual-opportunity-v29.mjs. A legitimate packet includes a raw Trends CSV control-anchored against csv to json, documented competitor task/limit with original evidence and an independently sourced CPC proxy. Such evidence is HUMAN_REVIEW, never automatic GO or proven profitability.

## 1. Browser-local architecture and limitations

Start with deterministic local processing when the user benefits from privacy and low marginal compute. Explicitly model memory, CPU, output download, browser compatibility and fallback. Zero server compute does not mean zero hosting, bandwidth, CDN or support costs.

Current sample decodes File.stream with fatal UTF-8 and optional native gzip decompression, but then accumulates the text into RAM. Its present caps are 16 MiB decoded text, 200,000 rows and 500 columns. This is NOT unlimited row processing. Keep the V21 2 MB/5,000-row test fixture intact. Validate a separate genuinely streaming parser/writer with real 25/100/250 MB files and constrained devices before promising 500 MB uploads or exports.

Parquet/TOON/Excel workbook support needs separate audited dependencies, independent result oracles, memory testing and licensing review; do not publish routes until they function. CDN DuckDB-Wasm must be pinned, integrity reviewed, CSP compatible, gracefully degrade on outage and not require global COEP isolation on ad-supported pages.

## 2. Data fidelity and security

Test raw output bytes, exact CSV quotation, doubled quotes, CRLF, UTF-8 BOM, malformed rows, truncated gzip, large integers, leading zeros, JSONL blank records, null vs empty, Unicode controls and spreadsheets. A CSV string ID 00501 must stay a string. JSON.parse cannot preserve arbitrary-precision numeric lexemes; refuse unsafe integer export or use a separately verified lossless parser.

Enable spreadsheet formula escaping for CSV/TSV data cells by default, retaining lexical valid negative numbers; report it as best-effort CWE-1236 mitigation, not a universal spreadsheet guarantee. Reopen exported data in target spreadsheet applications. HTML preview uses textContent only. Secret/PII masking is opt-in and heuristic. Never persist private files or place raw secrets in URL hashes without informed consent. Reject decompression bombs by enforcing the post-decompression byte budget.

## 3. UX, page architecture and AI discovery

Expose a usable workspace first, with accessible labels, errors, ready/working/success states, keyboard focus, downloadable output and stable responsive layout. Search text must describe actual product behavior; four category hubs provide honest navigation, not mass doorway landing pages. Every generated URL must pass an independent same-input output mutation test.

A real owner-controlled HTTPS domain requires correct canonicals, sitemap, HTTP 200, no accidental noindex/nosnippet on intended indexable pages and actual crawler permissions. The example.org domain must remain explicitly noindex and robots-blocked. Google says AI Overviews/AI Mode use standard Search technical eligibility; no mandatory FAQPage schema, llms.txt, max-snippet:-1 tag, or a special AI citation optimization. Distinguish Googlebot Search, OAI-SearchBot retrieval, ChatGPT-User and training crawlers per owner policy.

WebMCP is early-preview and must be feature-detected using document.modelContext or navigator.modelContext. Chrome recommends name length up to 30, parameter description up to 150, tool description up to 500 and response around 1.5K characters; these are CURRENT RECOMMENDATIONS, not normative W3C hard limits. Use scripts/webmcp-contract-v29.mjs for conservative 1,400-byte agent summaries. Never expose private user file payload without explicit authorization.

## 4. Monetization, Cloudflare and live-gate verification

Use scripts/audit-v29-production-gates.mjs on actual Astro dist. The internal 24 MiB asset safety margin is below Cloudflare Pages' documented 25 MiB per-file cap. Confirm current hosting costs and product terms for the selected vendor; do not claim commercial hosting is free forever.

Run the existing V28 release guards for intended indexable and ad-monetized routes. COEP require-corp is a high-risk blocking header for ads unless a full compatibility design is verified; credentialless remains browser-review only. CLS below 0.01 and 32px between ads and actions are optional internal design targets, NOT official AdSense requirements. The current V29 prototype has no ad provider configured, so real ad-render, invalid-click, consent and account review must stay NOT_RUN. Never force extra pages, timer refresh or fake user activity to increase impressions.

The project owner must verify actual publisher terms and privacy/consent by audience and ad vendors. Google does not set a universal 20 indexed URLs / 15 x 800-word post threshold for AdSense approval. Legal page templates must be reviewed for true owner identity and actual data practices.

For Indian payments and RBI service-export compliance, use current official RBI guidance, including the October 2026 distinction for resident individuals (deemed EDF submission through information provided to an AD) and other exporters above ₹10 lakh per inward remittance, with different deadlines for software and other services. Do not universally mandate 30-day EDF, specific bank exchange spreads, or a fixed KYC duration. Seek qualified account-specific bank/legal advice.

## 5. Verification and launch receipts

Run node --test tests/v29-studio-and-gates.test.mjs, npm test, and npm run audit:public-agent:v27. In the Studio directory run npm ci, npm run check, npm run build, npm test and npm run test:browser with installed Chromium/Firefox/WebKit. Then run node scripts/audit-v29-production-gates.mjs --dist examples/astro-dominant-studio-v29/dist --origin https://studio.example.org for the expected nonindexable local fixture.

For an authorized public domain set SITE_URL to owned HTTPS origin and SENSE_RELEASE=public, build again, then rerun the V29 gate with --production and V28 live/HTTP/browser checks. Submit changed URLs with scripts/ping-indexnow-diff-v29.mjs DRY_RUN by default, and only --live with a verified key and exact authorized owned origin. IndexNow submission does not establish indexing.

Record each stage as PASS_TESTED, FAIL, HOLD or NOT_RUN, with exact browser, file, owner-domain, original market and provider account evidence. Passing CI or having fifty-one files can never certify Google rankings, AI citations, AdSense approval, 500 MB memory safety or revenue.

## Nine reported defect classes: actual disposition

1. V21 2 MB cap: intentional; preserved; V29 adds only a bounded 16 MiB path. Large-file proof outstanding.
2. COEP AdSense: V28 checks available; live ad fill NOT_RUN.
3. Cloudflare 25 MiB: new internal 24 MiB artifact gate.
4. Noindex, robots, snippets: V28 plus V29 checks; keep owner-configurable crawler access, no universal magic robots directive.
5. Compound extensions: recognize gzip/zstd/snappy names; only gzip text inputs decoded in current build.
6. Spreadsheet injection: guarded in V29 CSV/TSV download paths; Excel reopen study outstanding.
7. Ad/CLS geometry: no real ad integration yet; stage still HOLD, not a fake successful test.
8. WebMCP: current preview features and conservative response budgets; not a hard W3C promise.
9. Manual demand research: structural source bridge; original market evidence NOT AUTHENTICATED.

Prioritize real large-file streaming and cross-browser output fidelity before adding complex Parquet/TOON dependencies or multiplying routes.

## V30 hardening: real bug evidence, not a simulated score

For any CSV/TSV export, **validate both the header row and data rows** with adversarial formula cells. The original V29 serializer missed dangerous header names; V30 guards all exported cells whenever formula escaping is enabled. Explicitly warn that the user can switch this best-effort safety off, and that Excel type coercion can still damage identifiers.

Before reading a local file, the UI must verify its extension and compression match the active converter's supported input kind. An accepted filename is not proof of valid data; run the relevant parser after strict UTF-8 decoding and refuse unsupported binary Parquet/TOON as before.

For SEO-quality routing, audit the actual original use-case, emitted format and failure limitations for **each** of the 28 pages. Run the source- and built-page gate in `scripts/audit-v29-production-gates.mjs`. The `verifyEditorialDistinctness` gate catches identical/thin route explanations; the existing transformation oracle verifies behavior. Neither gate is proof of Google doorway-policy acceptance, rankings, or monetizable human demand.

Read `docs/audits/2026-11-26-v30-external-claims-reality.md` for the measured state of all nine external V26-report claims before repeating them. Keep 16 MiB / 200k row constraints and no live ads/deployment claims. Do not automatically install DuckDB, TOON, XLSX, COEP, third-party CDNs or advertising code merely because an outside report asserts they are missing.
