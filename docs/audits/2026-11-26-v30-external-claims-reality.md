# External V26 assessment vs. actual V29/V30 source — 2026-11-26

## Decision

The uploaded external review claimed 84.5/100 from a purported production simulation and proposed nine defects. Its stated repo snapshot is **V26**, but the current public `main` already contains the V28 release guards and the V29 optional Studio skill. A score, a "top-1%" percentile, an assertion of inaccessible GitHub files, or a predicted 97/100 must never be promoted as verified evidence.

This V30 branch contains a **limited, reproducible security and usefulness patch**, not a claim to have solved all nine items or launched a revenue-producing domain. Every measured result must come from the exact final branch CI and independent browser tests.

## Nine claims: measured state and necessary next gate

| External claim | Current code / V30 action | Remaining acceptance gate |
| --- | --- | --- |
| 1. V21 2 MiB/5k limits need 50–500 MiB processing | V21 compatibility caps remain frozen. V29 reads File.stream and gzip but accumulates decoded text and limits it to 16 MiB / 200k rows. | **OPEN:** actual incremental parser and output writer, file integrity/fidelity, CPU/memory/browser testing with 25/100/250 MiB real fixtures and low-memory devices. Do not label File.stream alone "large-file streaming." |
| 2. Cloudflare Pages 25 MiB static asset limit | Existing `scripts/audit-v29-production-gates.mjs` rejects assets above 24 MiB (internal margin). No big DuckDB-Wasm asset is bundled. | **BUILD CHECK ONLY:** rerun on the final output. Actual Cloudflare deployment and CDN/WebAssembly performance remain unverified. |
| 3. COEP can obstruct ad integration | Existing V29 frontend does not install ads or globally require COEP; release gate warns if `_headers` introduces `require-corp`. | **NOT A PRESENT AD BLACKOUT:** test with a real approved ad integration before claiming cross-origin isolation behavior or ad fill. |
| 4. One-pageview workflow / IndexedDB chain | V29 already offers explicit user-approved, one-time, same-origin IndexedDB handoff; 2 MiB cap and 30-minute logical TTL. | **IMPLEMENTED BOUNDED:** no evidence of 3–4x pageviews; no forced navigation, refresh or implied user consent. |
| 5. Spreadsheet formula injection / Unicode BOM / long identifiers | **V30 fixes a verified defect:** CSV/TSV spreadsheet formulas in **header cells** were unsanitized; exported header cells are now protected when the safety option is enabled. BOM is already emitted for the Excel-friendly CSV route. Added exact-byte Node and Playwright regression tests. | **PARTIAL:** verify behavior in real Excel/LibreOffice; JSON/CSV/Excel type inference can still corrupt long identifiers. BOM alone does not preserve 16-digit IDs or create XLSX. |
| 6. Dynamic CLS and ad/download clearance | Existing `audit-ad-geometry-v29.mjs` validates bounded fixture/receipt geometry and explicitly refuses to authenticate a receipt as actual live compliance. V29 prototype has no ad units. | **OPEN:** real publisher account, actual ad slots, browser measurement over dynamic conversion states, responsive devices, consent, invalid-traffic policy review. Internal 32 CSS px and CLS 0.01 are not universal Google policy thresholds. |
| 7. Programmatic doorway risk on 28 routes | Existing V29 oracle executes real route transformations and detects duplicate outputs for selected fixtures. **V30 adds 28 specific task explanations, output contracts, limitations, source-file validation and build-time enforcement of nonduplicate route metadata.** | **PARTIAL:** human SERP quality review, real task testing, distinct search intent, indexing and Search Console observation. Unique text and tool behavior do not guarantee page quality or rankings. |
| 8. WebMCP and small agent responses | V29 detects `document.modelContext ?? navigator.modelContext` when available, registers only safe status metadata and supplies a 1400-byte conservative contract helper. | **EARLY PREVIEW:** test on actual supported agent browsers; do not cite 1400/1500 bytes as a hard W3C normative output limit or auto-share private file contents. |
| 9. Paid keyword research deadlock | `scripts/assess-manual-opportunity-v29.mjs` accepts raw relative Google Trends controls, competitor evidence and dated CPC-proxy receipts without paid APIs. | **STRUCTURAL ONLY:** manually inspect original competitor behavior, dates, search intent and legitimate demand; CPC proxy cannot predict AdSense RPM or visits. |

## Independent source boundaries

- Cloudflare Pages single static asset maximum: https://developers.cloudflare.com/pages/platform/limits/ — 25 MiB per asset; V29's 24 MiB is an internal release margin.
- AdSense ad placement: https://support.google.com/adsense/answer/1346295 — avoid accidental clicks near controls; does not establish a global 32 px clearance.
- Google Search AI eligibility: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — no magic markup, guaranteed AI citation, or scheduled #1 ranking.
- WebMCP Chrome: https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/webmcp — early preview; browser capability detection needed.

## Mandatory release discipline

For V30 require green root `npm test`, green Studio `npm run check && npm run build && npm test`, cross-browser Playwright exact downloaded bytes, and `audit-v29-production-gates` against actual built local artifacts. For any public domain require ownership, TLS/HTTP/CDN verification, business privacy/legal review, real browser and ad script testing, original market evidence, site indexing observations and live user-task metrics.

**No domain has been deployed by this change; no live ranking, visitor share, AdSense approval, CPC, RPM, revenue, 500 MiB support, TOON or Parquet support is inferred.**
