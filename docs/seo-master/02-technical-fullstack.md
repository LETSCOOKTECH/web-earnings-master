# 02 — Technical SEO and full-stack engineering

## Complete HTTP-to-Search pipeline
Real registered domain and DNS/TLS; correct 200/301/308/404/410/503 and appropriate Retry-After; no redirects or soft 404 errors. Public initial HTML should expose true title, user job, content, canonical and real href links; compare JS-rendered DOM to no-JS. Do not assume Google/agents render blocked client scripts.

Root robots.txt controls fetching, **not guaranteed non-indexing**. Noindex must be readable on crawlable pages, with matching X-Robots-Tag and real headers. Check legitimate crawler/WAF access and no spoofed bot exemptions. Sitemap contains distinct canonical indexable URLs, correct host and true updates; it is a hint not a guarantee of indexing. Canonical link is a preference; Google selects the actual canonical. Prevent internal orphans, broken link graphs, faceted duplicate traps, pagination and parameter spam. Do not believe shallow URL path segments independently cause ranking boosts.

Unique truthful titles and useful meta descriptions; Google may rewrite both. Original accessible images/videos with actual licenses, alt and useful surrounding text. Structured data must match visible page and currently supported Google rich result type; a passing validator doesn't guarantee Google will show a rich result. No fabricated reviews or retired FAQ result expectation. For translated pages, review real locale content/hreflang and skip AI-spun doorway variants.

Field Core Web Vitals p75 targets: LCP <=2.5s, INP <=200ms, CLS <=0.1. Laboratory Lighthouse results help diagnose but aren't actual mobile field values. Keyboard, screen reader, responsive target devices and reduced motion require actual tests; desktop WebKit alone doesn't prove iPhone Safari.

## Fullstack execution strategy
Select minimal working architecture by task and cost: static HTML+JS for text/CSV, browser Worker/WASM for tested local files, server API/worker/queue when heavy processing truly necessary, authentication/DB/storage only for durable state. Framework choice (Astro, Next, plain HTML) is not an SEO ranking factor.

Engineer exact input/output contracts and deterministic fixture oracle before designing UI. Show honest supported formats/limits, validation, progress/errors, cancellation, accessible download, no fake conversion. Test output bytes and reopening, corrupted/oversized inputs, hostile files, timeouts and mobile memory. Browser-local privacy must be verified by actual network tracing.

Backend: validate untrusted input server-side, auth/tenant authorization, quotas, CORS/CSRF/XSS/SSRF/SQL injection mitigations, private signed upload/download URLs, time limits, idempotency, secure queues, sandboxing, file deletion, DB migration/backups and rollback. Never expose third-party API secrets in client JS. Model CPU/egress/storage/token/support cost and abuse spikes.

CI: actual build/typed checks, unit, integration/API, three-browser E2E, low-end mobile, security/a11y and static SEO. Staging: real HTTPS, headers, correct robots/noindex, fallback routes/404, source integrity, monitoring, rollback/canary. Production: actual owner URL evidence, Search Console indexing and ads account separately. GitHub CI passing fixtures alone cannot certify deployed one-million-user architecture.

Official links: https://developers.google.com/search/docs/essentials/technical ; https://developers.google.com/search/docs/crawling-indexing/robots/intro ; https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls ; https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap ; https://developers.google.com/search/docs/appearance/structured-data/sd-policies ; https://web.dev/articles/vitals ; https://asvs.owasp.org/ ; https://www.w3.org/TR/WCAG22/ .