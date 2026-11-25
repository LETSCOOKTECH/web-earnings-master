# Sense CSV Lab — local functional test fixture (NOT DEPLOYED)

**Deployment status: NOT DEPLOYED. There is no public demo URL for this example.**
The hostname `csv-lab.example.org` is part of IANA's reserved documentation namespace. It cannot be used as a real public deployment. The browser's `DNS_PROBE_FINISHED_NXDOMAIN` error when opening it does not mean your local network is broken; **there is simply no website deployed at that name.**

## Actually open and use the tool

From the root of this repository on a machine with Node.js 22+:

```bash
node scripts/preview-seo-csv-lab-v20.mjs
```

The command prints a real **local-only** address such as `http://127.0.0.1:<printed-port>/`. Open exactly the address it printed in your browser on that same machine. Use Ctrl+C to stop the server. The local server serves working HTML, JavaScript, CSS and CSV transformation logic. Local access is not public internet access.

## Test the real interaction

```bash
npm test
npm run audit:seo-example
npm run lab:seo-browser
```

The browser test needs Playwright and Chromium/Firefox/WebKit binaries; the GitHub browser workflow installs them. The tests assert real CSV output bytes, malicious spreadsheet-formula protection and failure handling. They **do not** establish real public DNS/TLS, a mobile hardware test, search engine indexing, actual customer usefulness, AdSense approval or income.

## Create a candidate artifact for a domain you control

This is a build step **only**, not a deployment. Replace the candidate domain with your own verified domain, and choose an empty output directory:

```bash
node scripts/build-public-csv-demo-v20.mjs --origin https://YOUR_ACTUAL_OWNED_DOMAIN/ --out .tmp/csv-public
node scripts/audit-static-site.mjs --dist .tmp/csv-public --origin https://YOUR_ACTUAL_OWNED_DOMAIN --production
```

Those commands replace the test-only canonical, robots sitemap and sitemap URLs. They produce a `BUILD_EVIDENCE.json` with `status: BUILD_ONLY_NOT_DEPLOYED`, rather than a fake production certificate. Real deployment then requires an approved host, verified DNS/HTTPS, external HTTP tests, cross-browser checks against the real URL, actual domain-owner permissions, index/citation observation and publisher verification separately. The generator supports a **root-hosted domain only** and deliberately refuses reserved/example/localhost origins. A GitHub Pages project subpath would need a separately verified base-path build; do not upload this root-path artifact unchanged to a project subpath.

**Source ownership:** [CSV tool source](site/) · [CSV core](site/assets/csv-core.mjs) · [real browser regression](../../tests/seo-csv-browser-e2e.mjs) · [local server](../../scripts/serve-seo-csv-lab.mjs).

**Official sources:** [IANA example domains](https://www.iana.org/help/example-domains), [GitHub Pages publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

This example is a small acceptance-test fixture, **not a commercial, publicly deployed product**. It should never be presented as an already-working website link.
