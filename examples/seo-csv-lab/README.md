# Sense CSV Lab — real working tool fixture, not a live product

A locally served, static, browser-only CSV deduplicator with objective output verification. Its canonical and sitemap use synthetic https://csv-lab.example.org for **testing only** and MUST NOT be deployed unchanged. No ads, analytics, calls to external sources or backend uploads.

Core: assets/csv-core.mjs (parsed rows, dedupe, malformed input, formula guard with numeric/scientific exception).
UI: assets/tool.mjs (paste, selected file, Blob URL download, status/errors/revoke).
Browser proof: tests/seo-csv-browser-e2e.mjs in GitHub CI (Chromium, Firefox and WebKit).
Static SEO: npm run audit:seo-example (indexable HTML, canonical, robots, sitemap).
Production NOT established: localhost/browser fixtures are not real mobile Safari, connected Search Console, host DNS/TLS, publisher approval or revenue.
