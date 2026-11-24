# V13 — End-to-end web tool engineering for autonomous but reviewable agents

Owner: web-fullstack-production-executor, with web-product-spec, web-workload-architecture-router, web-frontend-experience-engineering, web-backend-api-engineering, web-product-validation, web-security-assurance-asvs, web-scale-reliability, web-unit-economics-finops and web-release-observability-operator. SEO eligibility comes from produced pages and functioning outcomes, not framework marketing.

## 1. Product/requirements first
Define target human, task frequency, inputs, outputs, unsupported formats, correctness oracle, limits, privacy and data rights, locale, accessibility, acquisition hypothesis, retention opportunity, budget and live substitutes. Interview/test actual users or record UNKNOWN. Write a route map with distinct public jobs and indexable/blocked/error/privacy states. No keyword landing page without unique genuine functionality.

## 2. Choose workload placement
- Text/math/small CSV: static meaningful HTML, small client JS pure functions, no DB or backend. Browser-local file output with cancellation and size limits.
- Images/media: browser workers/native codec/WASM only after verifying actual output and low-RAM browser compatibility. For heavy video/PDF/OCR, consent-based private signed upload, bounded async queue, isolated sandbox worker, expiry, deletion proof, finite retry and cost cap may be necessary.
- AI: provider-agnostic model interface, rate/token budgets, prompt injection defenses, BYOK or secure provider keys when appropriate, quality oracle and clear marginal costs.
- Accounts/sync: only add auth, tenant authorization, private storage, DB/migrations, backup restore, audit logs and retention when actual durable user state requires them. Never assume Cloudflare/Astro/Next/React makes Google rank pages.

## 3. Frontend and UX
Semantic initial HTML with distinct true title/H1, body purpose, canonical and real href navigation; accessible labels, keyboard focus/error/status, progress/cancel/download, failed/empty/offline states, mobile sizing, reduced motion and honest format/size constraints. Keep heavy JS lazy, CPU work in workers and ads separate from primary controls. No fake tool output or deceptively ad-shaped download.

## 4. Backend/API/data
OpenAPI or JSON Schema contract, server-side input/ownership validation, auth/session hardening, CSRF/CORS, HTTP status consistency, private file buckets and expiring signed URLs, quotas by expensive operation, cancellation, idempotent job transitions and retries/deadletters. Protect against SSRF, path traversal, decompression bombs, untrusted SVG/HTML, XSS/SQLi and cross-tenant downloads. Version DB migrations, restore drills and data retention/deletion; no credentials in frontend bundle.

## 5. Security and privacy
Threat model who can abuse site and what asset matters. Map applicable OWASP ASVS controls; test malicious files, dependency supply-chain, CORS/CSRF, auth/IDOR, storage defaults, token exfiltration, CPU/egress abuse, quotas, secrets, logs, CSP and incident response. Limit analytics to required privacy-preserving events, not filenames/content. Verify claim that browser work remains local by inspecting network requests.

## 6. Performance, cost and scale
Field performance vs lab, p50/p95 task processing, load spikes, CPU time, memory, CDN cache, bandwidth/egress, storage duration, 3rd-party fees, retries, malicious activity and support cost per successful job. Low hosting fee is not unlimited computing. 1M monthly visits is not equal to 1M simultaneous file conversions. Validate concurrency and recovery with actual staging tests and budget alarms.

## 7. Testing matrix and deploy
Unit pure shipped output, property tests/independent decode, API and database integration, malformed/oversized/hostile input, real Chromium/Firefox/WebKit browser E2E (including downloaded bytes), actual low-end mobile Safari/Android where appropriate, keyboard/screen reader, SEO build/static and live HTTP, security/ad privacy, backup restore and load. Deliberately mutate broken JS/robots/canonical/sitemap and verify rejection. No fake PASS flags.
Staging uses actual HTTPS/DNS/TLS, secure headers, proper origin and secrets, immutable assets, analytics/consent review, rollback strategy and monitoring. Release only with owner signoff and verified smoke; user data must not leak in logs. After release inspect GSC indexed state and legitimate publisher account separately.

## Required outputs
Spec with human job and proof; route/keyword map; architecture decision and budget; threat model; source ledger and effective date; actual source code; test logs and hashes; screenshots for UI only; independently reopened real outputs; CI; browser engine versions; real-device unknowns; deployment/rollback; GSC evidence if connected; publisher account and financial reports if connected; honest unresolved blockers. Stop at critical failed output, security, robots, privacy, approval or budget.

Developer references: [HTML standard](https://html.spec.whatwg.org/multipage/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [OWASP ASVS](https://asvs.owasp.org/), [API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/), [File Upload Security](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html), [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), [Playwright browser testing](https://playwright.dev/docs/browsers), [web.dev metrics](https://web.dev/articles/vitals), [Cloudflare runtime limits](https://developers.cloudflare.com/workers/platform/limits/). Reopen source body before production decisions.
