# Sense CSV Studio — premium browser-only data utility

**Deployment status: LOCAL WORKING PRODUCT FIXTURE — NOT PUBLICLY DEPLOYED.**

This is a fully interactive, static web tool intended to prove whether the Sense development skills can produce a real product rather than simply an SEO landing page. The hostname `csv-lab.example.org` is an **IANA-reserved documentation domain**, so there is no public website at that address. It must never be shown as an online demo.

## Use the actual application

From the repository root with Node.js 22 or later:

```bash
node scripts/preview-seo-csv-lab-v20.mjs
```

Open the exact `http://127.0.0.1:<port>/` URL printed by the server in a browser on that machine. Stop it with Ctrl+C. The app is usable locally without logging in, server uploads, ads or third-party requests.

### Features implemented

- Responsive two-panel editor and result workspace with dark, restrained SaaS styling.
- Paste CSV or choose a CSV file; choosing one source clears the other so the selected data is explicit.
- Keep first matching row, compare entire records or one chosen 1-based column; optional case-insensitive or trim-before-match behavior.
- A background module Worker performs bounded parsing, with cancellation and visible failure status.
- Rejects malformed quotation/column counts and invalid UTF-8 selected-file bytes (no silent replacement).
- Result statistics and safe text-only preview of up to eight retained rows; full cleaned CSV downloaded with CRLF line endings.
- Spreadsheet-formula escaping is enabled by default, with signed number exceptions and an explicit fidelity toggle. It is risk reduction, not guaranteed safe across all spreadsheet applications.
- Reset, load sample and copy-to-clipboard actions; stale download URLs are revoked when input or settings change.
- Semantic labels, keyboard focus, live status, reduced-motion support and useful no-JavaScript explanation.

**Limits:** 2 MB of UTF-8 input, 5,000 rows and 200 columns; CSV only (not TSV or XLSX). One-column matching can intentionally drop later records that differ in other fields. Unicode case folding is not linguistically correct for every locale.

## Test against actual output

```bash
npm test
npm run lab:seo-browser
npm run audit:seo-example
```

The browser tests require installed Playwright Chromium, Firefox and WebKit. The CI workflow installs those engines and tests the actual shipped static HTML/JS, selected file, worker, downloaded bytes, visible error states and a controlled broken-script/broken-worker negative case. It also saves initial and processed desktop screenshots as workflow artifacts. Green CI is **local-engineering evidence only**.

Read the [original specifications, failure oracles and release acceptance guide](../../docs/quality/21-premium-csv-studio-acceptance.md). Technical standards and risks include RFC 4180, WHATWG/MDN strict UTF-8, OWASP CSV injection, workers, object URL revocation, and WCAG 2.2.

## Create a deployment candidate — not a live URL

Only when you possess a domain and deployment permission:

```bash
node scripts/build-public-csv-demo-v20.mjs --origin https://YOUR_ACTUAL_OWNED_DOMAIN/ --out .tmp/csv-public
node scripts/audit-static-site.mjs --dist .tmp/csv-public --origin https://YOUR_ACTUAL_OWNED_DOMAIN --production
```

The build replaces synthetic canonical and sitemap references and includes the Worker module. Its `BUILD_EVIDENCE.json` says `BUILD_ONLY_NOT_DEPLOYED`. It is root-hosted; do not publish unchanged under a GitHub Pages project subpath. A real launch requires explicit authorization, public DNS/HTTPS, the exact deployed output, mobile/browser/security/privacy/rollback tests, search-owner observation and AdSense evidence separately. Do not publish the private repository or its assets to GitHub Pages without permission.

**Main files:** [HTML](site/index.html), [styling](site/assets/style.css), [UI controller](site/assets/tool.mjs), [CSV parser](site/assets/csv-core.mjs), [background worker](site/assets/csv-worker.mjs), [browser tests](../../tests/seo-csv-browser-e2e.mjs).

**No claim of:** live site, Google indexing, SEO ranking, AI recommendation placement, native-mobile compatibility, AdSense approval, real users or income.
