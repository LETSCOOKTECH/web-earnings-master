# End-to-end production web utility engineering: frontend, backend, data, CI and deployment
**Reviewed 2026-11-23. Owners:** `web-fullstack-production-executor`, `web-frontend-experience-engineering`, `web-backend-api-engineering`.

## Requirements, product and route architecture
For every new tool write a **user-job contract**: who searches, why the result is needed, input ranges, accepted file types, output oracle, privacy constraints, latency, target devices, user support language, accessibility, revenue path and realistic advantage over incumbent converters. Create a named owner, threat model and test fixtures before a page.
A utility with 30 genuinely different operations can justify 30 SEO pages; 3000 arbitrary title-swapped URLs are a scaled-content risk. Define routes for actual user needs, category hubs linking genuine tasks, help/reference pages with original examples and verified statements, contact/about/privacy/terms, error pages. Every generated route needs a functioning outcome and must not exist solely to capture synonyms.

## Architecture selector: no default universal stack
| Job | Strong candidate | Upgrade when |
|---|---|---|
| Currency/math/color/text transformation | SSG/SSR public HTML, client JS pure function | Current dynamic source data demands API |
| Image resize/conversion | Web Worker + native codec, optional WASM | Target low-RAM/mobile codec unsupported; opt-in remote worker |
| Large video/PDF/OCR | Browser if real formats pass, otherwise direct signed upload → queue → sandboxed worker | CPU budgets, storage/privacy and retry policies prove sustainable |
| AI tool | Auth + provider-priced tokens/quotas, optional BYOK/local model | Quality/latency/privacy needs justify alternative provider |
| Account project/editor | Durable auth+DB and backups, minimal static public documentation | Real collaboration, sync, saved state require consistency |

Illustrative repo: `apps/web` (public pages + UI), `packages/tool-core` (pure input/output engine), `packages/contracts` (schemas), `packages/ui` (components), optional `services/api`, `services/conversion-worker`, `packages/fixtures`, `ops/` and `docs/`. Do not require monorepo for a single static calculator. Source of truth for backend endpoint contracts is an OpenAPI/JSON Schema and tested behavior; TypeScript types alone do not validate untrusted network input.

## Frontend build contract
- Semantic initial HTML: accurate page title, description, H1, canonical, native anchors, optional supported structured data, useful description, limits and privacy proof; no link discovery dependent on click handlers.
- Minimal HTML/CSS, lazy noncritical JS, heavy codec workers, appropriate images and fonts, reasonable core-vitals budgets, bfcache and responsive mobile.
- Functional state machine: idle → validating → processing → output_verified → downloadable, plus unsupported, timeout, quota, cancelled, disconnected, memory-failed and retry.
- Strict file preview safety: don't inject SVG/HTML into `innerHTML`, use object URLs with revocation, isolate untrusted media, independent output decoder and secure download headers.
- WCAG 2.2 AA target: name/role/value controls, keyboard full task, focus ordering, error text and screen-reader progress, touch sizing, reduced motion and contrast.
- Ad adapter separated from primary conversion input/download controls. Don't use a sticky ad obstructing the file-picker or use ads resembling download links; reserve layout space.

## Backend and database contract
- Default no API for deterministic local jobs. If needed, use versioned schemas, JSON errors, deadlines and validation. Public API rate limiting is per expensive resource, not only raw request.
- Authenticated state: server-checked tenant ownership, object/property permissions, session hardening, CSRF and CORS policy. Never trust client-supplied account_id to grant file downloads.
- Data: constraints/unique indexes, prepared queries, migrations, backup and restore, encryption/retention. Keep personal file content out of logs.
- Upload: signed operation/key with expiry + byte limit, untrusted file signature and quota checks, storage private by default, async queue, sandboxed processor, verified output and result TTL/deletion proof. Validate malicious file and decompression-bomb scenarios.
- Idempotency for queue/paid work, finite retries, dead letters, regional data controls, cost ceilings and cancellation. D1/Workers/R2 are *candidates*; choose by measured workload and current commercial plans.
- Secrets only in server secret manager, no hard-coded AI keys, use least-privileged roles and rotated credentials. SSRF prevention for remote import/screenshot/OCR tools.

## Test pyramid and evidence
| Layer | Test | Required evidence |
|---|---|---|
| Unit | Codec/core deterministic output | File fixtures + independent oracle |
| Contract | HTTP types/status/permissions | Valid/invalid payloads, auth/CSRF/CORS |
| Integration | Realish DB/queue/storage state | duplicate job, partial upload, migration |
| Browser | Chromium/Firefox/WebKit + real low-end mobile | keyboard/input/result, measured memory/latency |
| Security | ASVS trace, SCA/SAST, malformed uploads | exploit negative cases, secret scanning |
| Search | initial HTML, robots/canonical/sitemap and WAF | real fetched headers/snapshots, indexed account UNKNOWN |
| Publisher | policy, ad distance, consent, ads.txt | local checks + approved account UNKNOWN |
| Operations | load, restore, canary/rollback, cost stop | staging traces/invoices/recovery runbook |

## Deployment
Use staging with separate secrets and no live ads, immutable assets, safe DB migration, DNS/TLS/canonical, cache headers, error pages and sampled business telemetry. Deploy canary then monitor p95, completion, crashes, ad request errors and actual costs. A GitHub Actions green build is not a deployed one-million-user production acceptance test.

Primary baseline: https://asvs.owasp.org/ ; https://top10.owasp.org/2025/0x00_2025-Introduction/ ; https://www.w3.org/TR/WCAG22/ ; https://developers.google.com/search/docs/essentials ; https://developers.cloudflare.com/workers/platform/limits/ .
