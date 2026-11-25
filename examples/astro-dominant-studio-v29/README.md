# Sense Data Studio — V29 local Astro prototype

This is a real, testable Astro 7 static website and browser-local converter sample, derived from the pinned toolchain of V22. It is **not** the publicly hosted commercial tool ecosystem, and its 28 supported transformations should not be represented as a 28-tool Parquet/TOON product. Google indexing, traffic, AI citations, AdSense approval, monetization and 500 MB file support are **NOT VERIFIED**.

## Run

Node 24.22.3 (or the exact supported Node release in package.json), installed dependencies and Chromium/Firefox/WebKit for E2E:

    npm ci --no-audit --no-fund
    npm run check
    npm run build
    npm test
    npx playwright install chromium firefox webkit
    npm run test:browser

From repository root, run:

    node scripts/audit-v29-production-gates.mjs --dist examples/astro-dominant-studio-v29/dist --origin https://studio.example.org

The default hostname is an IANA example; the site deliberately emits noindex and robots Disallow. No live publication is implied.

## Implemented end-to-end features

Twenty-eight-eight route-specific browser Worker jobs: CSV to JSON, JSONL, TSV, Markdown, HTML table, SQL INSERT, Excel-friendly BOM CSV, CSV deduplication; TSV to CSV, JSON and JSONL; JSONL to JSON, CSV, Markdown and validation; JSON to JSONL, CSV, Markdown, pretty formatting and minification. Four category hub pages, static semantic explanations, real preview and downloads, opt-in best-effort secret masking and enabled-by-default spreadsheet formula escaping for CSV/TSV data cells.

File.stream with streaming fatal TextDecoder and native DecompressionStream for .csv.gz/.tsv.gz/.jsonl.gz is supported on eligible browsers. It **still aggregates text** and limits post-decompression input to 16 MiB, at most 200,000 rows and 500 columns. This is an intentional safety contract, not proof of high-volume throughput. The filename classifier recognizes Parquet .zst/.snappy suffixes but does NOT decompress or parse Parquet. Flat JSON objects only; nested data and unsafe numeric integers are refused. Converting null to CSV empty string is inherently lossy and explicitly warned.

Do not paste confidential records into public issue reports. The current frontend performs no external requests, does not upload files, and has no ad scripts, cookie consent vendor or IndexedDB persistence. Browser extensions and local device security remain outside this promise.

## Authorized production workflow

Set SITE_URL to your actual owned HTTPS root and SENSE_RELEASE=public, replacing the placeholder brand, owner contacts and disclosure/legal draft with correct details. Build and run the v29 artifact audit with --production. Then run V28 owner-authorized live HTTP, crawler/header and any intended ads tests. Validate CSP, caching, compression, physical mobile devices, real search index observations, actual user tasks and application-level accessibility. Do not publish an unreviewed legal template or fabricate an ads.txt seller ID. Use scripts/ping-indexnow-diff-v29.mjs only as a reviewed, opt-in changed-page notification; dry-run is default.

## Original source and verification constraints

- Cloudflare Pages 25 MiB individual static asset cap: https://developers.cloudflare.com/pages/platform/limits/
- Google AI Search: no special AI Overview SEO markup required: https://developers.google.com/search/docs/appearance/ai-features
- Chrome WebMCP metadata: recommended, revisable 30/150/500 and ~1.5K characters, not hard W3C specification: https://developer.chrome.com/docs/ai/webmcp/secure-tools
- Spreadsheet CSV injection pitfalls: https://owasp.org/www-community/attacks/CSV_Injection
- IndexNow submission is a discovery notification: https://www.bing.com/indexnow/getstarted
- Current RBI services-export requirements differ between resident individuals and other exporters: https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3961

See extensions/v29/skills/web-dominant-studio-v29/SKILL.md for the optional agent instruction set, and docs/audits/2026-11-26-v29-implementation-truth.md for the exhaustive status matrix.
