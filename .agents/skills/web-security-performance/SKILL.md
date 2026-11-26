---
name: web-security-performance
description: "Secure low-cost Astro and browser-file processing while optimizing field Core Web Vitals, safe hosting, crawler access and operational resilience."
---

# Security Performance

**Use when:** Secure low-cost Astro and browser-file processing while optimizing field Core Web Vitals, safe hosting, crawler access and operational resilience.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## Security and performance gate
1. Model threats: malicious uploads, decompression bombs, untrusted metadata, cross-site scripting, worker and WASM vulnerabilities, hidden third-party tracking, advertising scripts, hotlink and rate abuse, request flooding, leaked API keys and host/CDN mistakes.
2. Enforce input MIME validation by file signature where feasible, limits on bytes/pixels/frames/batch size, memory/CPU timeouts, output decoding validation, object URL cleanup and zero unnecessary remote upload.
3. Audit dependencies and CSP; use TLS, protective response headers after compatibility testing, safe link targets, no cookies unless needed and least-privilege permissions. Don't break image engine / third-party policy scripts with untested headers.
4. Prefer static CDN serving and client-side work where suitable; quantify free-tier bandwidth/request constraints, compute/memory budgets and risk of browser lockups. Offload CPU work to workers, yield or cancel and fail gracefully.
5. Measure LCP/INP/CLS with real users where possible; synthetic Lighthouse alone not enough. Reserve image/ad sizes, optimize fonts and image src sets, lazy-load heavy processing code and ads cautiously.
6. Protect crawlers through bot verification, not user-agent spoof exceptions. Monitor real WAF 4xx/429 and rate-limits; bots should not be forced through a JS challenge on public pages.
7. Define incident response, backups for any server data, monitoring on failures and deployment rollback. Secrets remain in host env or vault; never in public source or logs.

## Outputs
`templates/security-threat-model.md`, performance traces, mobile memory test, dependency/license audit and evidence. See official Astro/Google/web.dev documentation.

## V2.3 production evidence contract (audited 2026-11-23)
**Owner:** Server/browser/worker/WAF threat controls. **Routing:** web-browser-runtime explains engine mechanics; this owns defense.
**Official source entry points requiring action-time reopening:** https://owasp.org/www-project-top-ten/;https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP;https://www.rfc-editor.org/rfc/rfc9110. A saved link is not confirmation of the current provider rule.
**Evidence needed:** Reproduce private-route auth, file limits, CSP, cache leak protections and verified crawler exceptions.
**Critical FAIL / UNKNOWN:** robots is not a privacy mechanism; spoofed User-Agent is not bot identity.
**Mandatory freshness procedure:** Read docs/foundations/19-provider-source-verification.md and docs/RESEARCH_PROTOCOL.md. Re-open official body, log exact applicable claim, evidence date, announced versus effective status, geography/account and contradiction. Use sources/verified_claims.json only as a dated baseline; source watch hashes are not semantic verification. Record tests/actual results, open blockers and rollback; do not infer live indexing, AI citations or AdSense revenue from local tests.

## Denial-of-wallet and file resource boundaries (V5)
Treat unrestricted CPU/GPU/API/queue jobs and URL-fetch SSRF as financial and security incidents. Require per-tenant weighted CPU credits, max bytes/pages/frames, remote call budgets, post-upload signature checks, sandbox egress restrictions, cost alerts AND hard admission stops; fallback may be unavailable rather than infinitely billed. A 128MB Cloudflare Worker is not a general 2GB transcode sandbox. Delegate heavy jobs to `web-conversion-job-platform` and load to `web-scale-reliability`. Primary: https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/ and `docs/architecture/04-scale-and-product-quality.md`.

## V6 production and research handoff (2026-11-23)
Route ASVS 5 and Top 10:2025 threat model to web-security-assurance-asvs. Security issues include BOLA, SSRF, untrusted SVG/PDF/ZIP, data leaks to third-party ad scripts, supply chain and unbounded billable compute. A header-only score is not a full security audit.

## V26 — Trusted upstream method integration

Read `docs/skills/2026-11-25-official-upstream-v26.md` and `sources/official-skill-integration-v26.json` before applying an upstream method. Verify exact upstream file provenance/rights and the relevance to the current stack. Do not run copied third-party scripts.

- `addy-cwv`: Page-level CrUX p75 with origin fallback; browser traces; comparable lab rerun, no fabricated field shift.

**Role-specific test oracle:** Collect page-level CrUX p75 field CWV where available, and label origin-wide CrUX fallback; use browser performance traces with equivalent conditions to isolate LCP/INP/CLS issues. Re-run after changes and track field behavior over a real window, never promise a certain ranking or conversion from a lab score.

Check `node scripts/check-official-skill-integration-v26.mjs`, existing domain tests and real external evidence. Missing field data remains `NOT_RUN`; generated local source, SEO score and a source bibliography are not business certification.

## V29 additive browser-data controls
The V29 prototype validates compound extensions and decodes supported gzip text locally with a post-decompression 16 MiB limit. Downloadable CSV/TSV data has enabled-by-default best-effort CWE-1236 spreadsheet-formula escaping; lexical negative numbers are preserved, but spreadsheet save/reopen testing remains required. Secret redaction is opt-in and heuristic. Never store file payload in public URL hashes or IndexedDB automatically. Ad-supported routes must pass V28 COEP/robots checks, then actual browser ad-compatibility testing; do not silently add global require-corp headers.

