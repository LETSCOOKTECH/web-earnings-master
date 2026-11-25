# V29 implementation truth and risk ledger — 2026-11-26

## Technical output, not a success advertisement

The requested uploaded master execution prompt proposes nine bug classes, an additional Studio skill and a claimed 28-route, 500 MB, Parquet/TOON/DuckDB, ad-optimized commercial ecosystem. The proposed specifications contain genuine engineering tasks but also unverified or inaccurate requirements. Implement only what tests can validate. The original 50 active skills and V1–V28 fixtures remain preserved.

### Actual working code delivered in V29

- Separate Astro 7 Studio sample with locked dependencies, 28 functional conversion/validation routes and four category hubs.
- Dedicated Web Worker, actual CSV/TSV/JSON/JSONL conversion, text-only preview, download and revoke, limit/error controls.
- Fatal streaming file decode and native gzip decompression for supported text inputs; decoded maximum 16 MiB, at most 200k rows and 500 columns. This is memory-bounded, NOT a 100–500 MB streaming product.
- Explicit-consent one-time IndexedDB output handoff using an opaque URL reference, 2 MiB cap and logical 30-minute TTL, with cross-browser E2E planned. No raw data in the URL.
- Exact-output tests for leading zeros, quoted newlines/commas, malformed CSV/JSONL, Excel BOM, formula-escape for CSV/TSV exports, negative numbers, opt-in best-effort secret masking, and distinct route outputs.
- Cloudflare 24 MiB build artifact gate under published 25 MiB individual file maximum; 26 MiB sparse regression.
- Conservative WebMCP metadata summary and optional browser capability registration, never raw private file content to an agent.
- Explicit owner-authorized, dry-run-first IndexNow changed-URL notification; no claim of instant indexing.
- Zero-paid-API evidence packet structure for independent Trends/competitor/CPC receipts. It NEVER certifies demand, CPC authenticity or revenue.
- Companion skill and scoped appended hooks to existing skills, without changing the frozen 50-item V23 registry.

### Unfulfilled proposals requiring separate development

1. Fully streaming/zero-copy 100–500 MB file and export architecture: NOT IMPLEMENTED. Requires measured memory profiles and output-writer/browser fallback.
2. Binary Parquet, Arrow, Zstd/Snappy decompression, DuckDB-Wasm with OPFS spill and version/integrity/CDN hardening: NOT IMPLEMENTED.
3. TOON ecosystem, live tokenizer comparison, Markdown-table and HTML table input parsing, Excel XLSX workbooks: NOT IMPLEMENTED.
4. IndexedDB cross-route one-time workflow is now implemented with explicit user consent, 2 MiB limit and 30-minute logical expiry; real privacy and physical expiry beyond the next access remain human-review tasks. URL hash payload sharing and locally hosted SQL AI remain NOT IMPLEMENTED.
5. AdSense ad placement, real CLS and visual ad-control gap under a live ad script, consent management and third-party policy review: NOT IMPLEMENTED; no AdSense account used.
6. Microsoft Edge / Firefox store packaging: NOT IMPLEMENTED.
7. External public website, Search Console impressions/indexing, real user demand, AI citations, publisher payouts, paid provider reviews and profitability: NOT VERIFIED.

### Corrected dangerous assumptions in supplied prompts

- Google expressly states AI Overview/AI Mode have no extra mandatory optimization beyond normal Search technical eligibility. max-snippet:-1 is OPTIONAL; FAQPage schema and llms.txt are not mandatory AI citation levers. Source: https://developers.google.com/search/docs/appearance/ai-features
- Chrome WebMCP metadata 30/150/500 and 1.5K character numbers are RECOMMENDATIONS subject to change, not normative spec constraints. Source: https://developer.chrome.com/docs/ai/webmcp/secure-tools
- Google has no fixed universal AdSense approval requirement of 15 guides, 800 words per guide, or 20 already indexed URLs. Review current official requirements: https://support.google.com/adsense/answer/9724 and https://support.google.com/adsense/answer/7299563
- RBI Oct 2026 service exporter EDF applies differently to resident individuals versus other exporters above ₹10 lakh per inward remittance; deadlines differ for software vs non-software. Source: https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3961
- Cloudflare Pages documents 25 MiB single-asset cap. Internal 24 MiB margin is our policy, not provider limit: https://developers.cloudflare.com/pages/platform/limits/
- No 32px distance or CLS 0.01 global AdSense policy is established. These would be **internal acceptance thresholds** in a real browser test, not guarantees of valid traffic.
- Paid Semrush credentials are not necessary to collect operator evidence, but a copied CPC snippet or synthetic Google Trends CSV is NOT proof of search volume.
- Ad RPM increases, paid network thresholds, fixed affiliate conversion rates, 0% ad fill from one header, 3x legal pageview flows and "unlimited row exports" are hypotheses, not proven by this repository.

### Release readiness decision

LOCAL_BUILD_ONLY when actual V29 Astro check, build, 28-route tests, browser tests and asset gate pass in CI. Owner-specific commercial site remains HOLD even if CI passes. Require a real DNS/TLS owned-domain deployment, legal/privacy review, browser runtime and performance results, GSC/AI-source observations, ad network compliance and real cohort economics before any production certification.
