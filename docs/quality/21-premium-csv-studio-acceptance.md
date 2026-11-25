# V21 CSV Studio — tested product, provider sources and release acceptance

**Scope:** one browser-only CSV deduplication tool, not a public website. This is the reproducible task oracle for web-fullstack-production-executor, web-product-validation, web-browser-runtime, web-security-assurance-asvs, web-technical-seo and web-launch-review.

## Actual user job and deterministic success

A user pastes CSV or picks a CSV file, optionally selects a match column and comparison normalization, removes duplicate records while retaining the first match, previews the cleaned records, and downloads the complete comma-separated output. No account, backend upload, third-party requests or required cookie storage. UI contains input/error/busy/success/cancel/reset states; input changes invalidate stale results and Blob URLs.

**Fixed acceptance input**

    id,name,city
    1,Asha,Jaipur
    1,Asha,Jaipur
    2,Lee,Delhi
    3,Noor,Jaipur
    3,Noor,Jaipur

Expected output contains exactly the header and first, third and fourth data records with CRLF line endings; the observed statistics must be input 5, kept 3, removed 2. The preview is the first eight kept rows, but the downloadable file contains ALL retained rows.

**Important limitation:** one-column matching can discard rows whose other fields differ. The first record for a matching key is kept. Case and whitespace normalization modify matching keys only; exported values otherwise stay original except when the user enables spreadsheet-formula escaping (on by default). Strict UTF-8 files only; unsupported encodings and malformed CSV fail rather than being silently repaired.

## Verified source leads and engineering decisions

| Source | Actual limited relevance | Explicit limitation |
| --- | --- | --- |
| [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180) | CSV quoting, doubled quote escaping, separators, consistent field counts | The utility also accepts LF-only and CR-only record endings, then exports CRLF; no dialect sniffing |
| [MDN TextDecoder constructor](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder) | Fatal UTF-8 decode rejects invalid selected-file byte sequences | Pasted strings are Unicode already; not an encoding detector |
| [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/) | Browser encoding semantics | Not a replacement for real-file validation |
| [OWASP WSTG CSV Injection](https://wstg.owasp.org/latest/4-Web_Application_Security_Testing/07-Injection/20-CSV_Injection/) | Spreadsheet formula cells can execute unintended expressions when imported | Apostrophe-based neutralization is mitigation, NOT universal spreadsheet safety |
| [OWASP community CSV Injection](https://owasp.org/www-community/attacks/CSV_Injection) | Mitigations can fail after spreadsheet transformations or save and reopen | Do not claim 100% safe in all Excel, LibreOffice or Sheets versions |
| [MDN Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) | Off-main-thread computation and terminate() cancellation | Workers are not authentication or unbounded processing isolation |
| [MDN URL blob object URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) | Downloadable locally generated Blob output | Revocation on change/reset/pagehide required to avoid stale output |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Labels, focus, live error status, keyboard navigation | Headless browser tests do not certify real assistive technology |
| [Google Search helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Original usable content with technical clarity | Does not guarantee ranking or AI citation |

## Why this architecture

Limit workload to 2,000,000 UTF-8 bytes, 5,000 CSV rows and 200 columns. A pure deterministic parser runs inside a dedicated module Worker to avoid long main-thread blocking. It returns statistics, a preview of at most eight data rows and the full CSV result. This is bounded in input size but NOT constant-memory streaming. Actual low-memory phone testing and worst-case input latency remain external release checks.

The app's only network asset requests should be its own HTML/CSS/JS/Worker modules. File data is decoded locally. No backend, DB, cross-device workspace, arbitrary XLSX conversion, account, third-party analytics or advertising integrations are needed for this task. A backend would introduce retention, signed uploads, authorization and operating costs without solving a verified customer need.

## Negative test oracle

| Case | Expected outcome | Required check |
| --- | --- | --- |
| Identical rows and header | First row kept, exact download bytes | core + 3-engine browser |
| Single matching key with conflicting other values | First matching record kept, user notified about lossy rule | core and UI |
| Case differences / trimmed comparison | Normalization changes matching only | core |
| Invalid key column | Visible failure, zero output | core |
| Unclosed quotes, trailing text after quote, inconsistent widths | Visible failure, zero download | core + browser |
| Invalid UTF-8 bytes | Fatal decode error, no replacement-character silent corruption | browser file input |
| Formula-like spreadsheet value | Clearly disclosed configurable guard, signed numeric exceptions | core + browser |
| HTML-looking cell | Render as literal text, no HTML element/script execution | browser XSS holdout |
| Worker crash or invalid UI script | Visible error and no fake successful artifact | mutated worker/browser test |
| Option/file/input change after success | Revoke previous Blob URL and hide old result | browser state test |
| Public link pointing at csv-lab.example.org | NOT DEPLOYED, never present as working public website | reserved-domain V20 guard |
| Lost network / blocked Worker | Do not claim offline or success; report actual functionality | browser; external device review |

## Exact release gates

Run npm test and npm run lab:seo-browser on a clean runner with Playwright Chromium, Firefox and WebKit installed. Review screenshots of first paint and successful result, including mobile viewport and no-JS useful explanatory HTML. Inspect source-specific assertions for real CSV bytes rather than checking a button exists.

For a candidate owned root-domain build, run the V20 root-hosted artifact generator, then the static SEO audit; ensure csv-worker.mjs is present and the CSP allows same-origin worker execution. Such a build is BUILD_ONLY_NOT_DEPLOYED. Only actual owner-approved deployment with observed DNS/TLS/HTTP, real browser use on the deployed URL, 404/robots/canonical, privacy/security checks, device QA and rollback can move to EXTERNAL_HTTP_OBSERVED.

Index state in Search Console/Bing, AI answer citations and positive recommendations, AdSense account status, real sessions, retention and earnings are independent further gates. No local screenshots, source URLs or passing CI can certify them.

## Known limitations / no fake certificates

No verified real iOS/Android device, independent user study, Safari physical accessibility review, 2MB/5K-row benchmark across hardware classes, public owned domain, search indexing, AdSense approval or revenue. CSV export spreadsheet protection depends on client behavior and must be tested by the owner for high-risk contexts. Current status is LOCAL_TOOL_ENGINEERING_UNDER_TEST until all CI is green. Even after green it remains LOCAL_HTTP_VERIFIED, not a public SaaS deployment.
