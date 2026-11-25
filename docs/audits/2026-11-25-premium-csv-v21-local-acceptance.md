# Independent V21 premium CSV Studio acceptance audit — 2026-11-25

**Repository:** LETSCOOKTECH/web-earnings-master  
**Proposed change:** PR #22; parent main V20.  
**Claim scope:** bounded local software engineering acceptance only. **PUBLIC HOSTING NOT CERTIFIED.**

## Real result, not another source-list score

The previously basic CSV fixture was rebuilt into a two-panel, responsive and usable data utility. It accepts pasted/selected CSV, runs a bounded pure parser in a dedicated module Worker, supports exact full-row and intentionally lossy column-key matching, optional matching normalization, strict selected-file UTF-8 decoding, status/cancel/reset, preview, copy and actual downloaded CSV with quoted fields. All untrusted preview text is assigned as textContent. Inputs/settings revoke stale Blob downloads.

The actual browser script tested **Chromium, Firefox and WebKit**, each with original standard regressions and premium UI holdouts: source precedence, exact output bytes, one-column deduction, corrupt UTF-8, malicious-looking HTML cells not parsed as HTML, broken UI module, broken worker, no off-origin requests, JS-disabled meaningful initial content, delayed-worker cancellation with no later output and mobile viewport reflow.

## Reproducible observations

- Full Node suite **668/668 passed** at PR head b4ce7a84155f44e5b6f4bf38bbf9e573a368b012, GitHub Actions check job 139038811103.
- Three-engine Playwright **12/12 passed** at the same head, job 139038811095. Each engine launched a real browser process and executed live localhost HTTP served modules. Browser screenshots and details were uploaded as artifact 14998894897 in GitHub Actions run 45565390515.
- Hard limit test: generated exactly **2,000,000 bytes**, 5,000 rows and 200 columns; expected 1 retained row and 4,999 removed, correct serialization. Runtime **204.9 ms** for that single Node CI test run, a benchmark observation on that runner only. It does NOT represent mobile p95 latency or million-user scale.
- An additional byte above maximum must fail, not silently truncate records.
- Responsive and visual smoke: manually inspected actual Chromium initial/cleaned desktop screenshots and Chromium/WebKit 390px mobile screenshot. No obvious horizontal clipping or missing primary action in these images. Visual review is NOT WCAG certification or real physical Safari testing.
- Existing V20 public-domain safety: csv-lab.example.org is IANA documentation-only. The local preview prints a real localhost URL; public deployment remains NOT_DEPLOYED. The build-only root-domain converter now includes csv-worker.mjs but does NOT host it.
- Provenance: opened RFC 4180 original section 2, MDN TextDecoder constructor and OWASP WSTG-INJT-20 plus OWASP CSV Injection. An outdated OWASP WSTG path was found and corrected to /latest/11-Injection/20-CSV_Injection/. Formula guard was expanded for tab, zero-width and fullwidth variants; OWASP expressly cautions no universal CSV sanitization and save/reopen may remove protection. 
- The existing 49-skill evidence map now includes the scoped original RFC, OWASP, MDN/WHATWG and WCAG leads for applicable owners. Eight owning Codex skill entrypoints have product-specific usage and negative-case instructions. The map remains source leads, not complete original-provider certification.

## Release decision matrix

| Gate | Actual evidence | Status |
| --- | --- | --- |
| Primary job and deterministic file output | Actual file contents/download and first-match summary | PASS_LOCAL |
| Worker failure, cancellation and stale result | Three-engine E2E negative controls | PASS_LOCAL |
| CSV parser and encoding behavior | Unit/negative tests and selected-file strict decoder | PASS_LOCAL |
| Maximum declared capacity | Exactly 2 MB, 5,000 x 200 Node stress oracle | PASS_ON_CI_RUNNER |
| Desktop/mobile-viewport UI | 3 engines, 390px screenshot + desktop screenshots | PASS_TESTED_VIEWPORTS |
| Accessibility and safety on real devices | No native iPhone/Android, screen-reader or office-app save/reopen study | HOLD_EXTERNAL |
| Real public hosting | No owned DNS/TLS, no deployment permission/record | NOT_DEPLOYED |
| Search visibility/AI recommendation | No live site or authorized Search Console/provider responses | UNKNOWN |
| Ad network approval, qualified users and revenue | No owner-account/user evidence | UNKNOWN |
| All 49 skills globally complete | Eight domain-specific improvements; V20 unresolved issue #21 remains | NOT_CERTIFIED |

## Source-scope limits and residual risks

The tool intentionally accepts a restricted CSV dialect (UTF-8, comma delimiters, quoted newlines and RFC-style quotes) and rejects differing column counts. It is not XLSX, TSV, enterprise backup/recovery, streaming gigabyte files or a statistical data-cleaning suite. Case folding uses en-US semantics and is not language-neutral. One-column matches can discard different later records (UI warns). The spreadsheet guard can modify file text and may not survive transformations by external Excel/LibreOffice clients. Processing is bounded and moved off the UI thread, but still in-memory and not yet benchmarked on low-end hardware. A bare JS-disabled page remains informative but cannot process CSV, as explicitly disclosed.

**Sign-off classification:** LOCAL PRODUCT READY FOR HUMAN/STAGING REVIEW; NOT PUBLICLY PRODUCTION-CERTIFIED. Passing CI is concrete evidence of functioning code for the tested environments; neither SEO/AI #1 placement nor AdSense outcomes have been achieved by these tests.

## Required next real-world steps (not self-certified)

Obtain explicit domain/hosting permission, build for the owner-controlled root origin, deploy to the authorized host without publishing private repo contents, independently observe real DNS/TLS/HTTP, exact deployed bytes, worker CSP, phone and assistive tech, WAF, security headers, 404 and rollback. After a useful public product exists, use authorized owner search/publisher reports and preregistered provider answer panels to test actual human discovery and monetization. Preserve unfavorable outcomes. Never claim a universal rank or earnings formula.
