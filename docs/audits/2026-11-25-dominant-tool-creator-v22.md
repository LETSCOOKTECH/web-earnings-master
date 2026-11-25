# V22 — Dominant Tool Creator integration and independent implementation audit

**Date:** 2026-11-25. **Scope:** LETSCOOKTECH/web-earnings-master PR #24. **Previous active skills:** 49. **New:** 50.

## Objective and release decision

Create a cross-specialist Codex master that can coordinate actual user demand evidence, competitor outcome benchmarks, cost-based architecture, a fully functioning Astro 7 application, real accessibility/security/SEO acceptance and honest separate SEO/AI/distribution/AdSense outcomes.

**Decision:** This is a substantially stronger human-supervised implementation baseline, **not globally production-certified AI SEO business automation**. No public website was deployed or claimed; no Google/AI/publisher account outcomes were obtained or fabricated. No measured 100× performance claim is justified.

## Open-source comparison and legal provenance

Inspected actual repositories and source rather than aggregating names:
- Croftweaver (MIT, 2026 Daniel Melter): `new-website`, `website-qa`, `website-launch-check`, `customer-research`, actual Astro starter and lockfile; upstream's own THIRD-PARTY-LICENSES.md highlights extra MIT sources. Used stage orchestration and dependency lock patterns but **did not paste the 70K-character master instructions**. Retained exact upstream MIT license in `examples/astro-jsonl-studio/CROFTWEAVER_LICENSE`.
- Methedrone Astro Skills (Apache-2.0): framework-specific reasoning and modular references; source code/skill prose not copied verbatim.
- AgriciDaniel claude-seo (MIT): scoped audits, first-party provider evidence and negative findings.
- Bhanunamikaze Agentic SEO (MIT): reproducible audit approach.
- SE Ranking SEO Skills (MIT): data/market evidence routing, not implied paid API access.
- Vercel Agent Skills and Illyism SEO Skills: implementation pattern references only, no unreviewed source copied.

See `.agents/skills/web-dominant-tool-creator/references/05-upstream-integration.md`. LICENSE of a repository is not a blanket commercial/security guarantee for all dependencies and upstream embedded third-party works.

## Concrete deliverables

1. `.agents/skills/web-dominant-tool-creator/SKILL.md`: full Stage 0–7 orchestration and stop conditions with five stage-specific source references.
2. `scripts/evaluate-tool-opportunity-v22.mjs`: fail-closed schema for actual job/oracle, three independent normal/malformed/adversarial fixtures, at least two alternative products, source categories and comparable units, honest acquisition/cost assumptions and false #1/profit claims. This **cannot authenticate human sources**, so a syntactically complete real brief is STRUCTURAL_ONLY_OWNER_REVIEW_REQUIRED. Synthetic sample always SYNTHETIC_NOT_MARKET_PROVEN.
3. `scripts/scaffold-astro-tool-v22.mjs`: local-only copier refusing clobber and emitting a truthful NOT_DEPLOYED receipt.
4. `examples/astro-jsonl-studio/`: installable Astro 7.4.13 dependency-locked original application, with actual index, tool, 404, robots/sitemap, accessible dark responsive layout, Worker, JSONL parser, file UTF8, error reporting, safe DOM and downloaded normalized output.
5. `tests/dominant-tool-creator-v22.test.mjs` plus project Node/Playwright tests; real CI workflow `.github/workflows/astro-tool-creator-v22.yml`.
6. Updated Codex AGENTS, README, source map, registry and inventory tests.

## Technical mechanisms that were actually verified

- Astro 7.4.13 installed using the lockfile on GitHub Actions Node 24.22.3, and `astro check` and `astro build` ran. Real generated HTML, robots/sitemap and bundled assets were tested on the local build. Default fixture canonical is documentation-only example.org and requires noindex and Disallow.
- A second **freshly scaffolded copy** of the app was installed independently, typechecked, built and Node-tested in the workflow. This validates copying and bootstrapping instead of trusting the reference tree alone.
- `SENSE_RELEASE=public SITE_URL=https://jsonl-studio.example.org npm run build` must hard-fail; it did in the first clean copy gate. This prevents declaring a synthetic example domain a live public utility.
- JSONL parser preserves arbitrary-precision numeric lexical source text by not reserializing parsed numeric values; blocks partial download on malformed records; displays line-specific errors; decodes selected files strictly as UTF-8; uses a Worker, no backend. The maximum is 2 MB and 5,000 lines, with at most 100 error details. A holdout exposed an incorrect total-invalid count over 100, which was repaired to display true total while capping details.
- Existing local V21 CSV Studio remains a separate genuine example (12/12 browser tests), not a substitute for Astro verification.

## Bugs discovered and corrected in this V22 iteration

1. First Astro package.json browser test script referenced a nonexistent `tests/browser.test.mjs`; changed to `playwright test`.
2. Initial Playwright mobile test asserted copy that was not in the actual HTML; switched to the exact existing no-upload statement.
3. V22 master contract lacked explicit **AdSense account** and **SENSE_RELEASE** controls under test; added operative controls, not just relaxed assertions.
4. JSONL parser truncated the **total invalid-record count** when details exceeded 100; fixed and hardened oracle.
5. Exact upstream Croftweaver MIT copyright owner was verified and complete license was preserved, rather than a generic "contributors" notice.

## Evidence scopes and blockers

| System | Current evidence | Honest status |
| --- | --- | --- |
| Market evidence JSON | Structural/adversarial checks only | SYNTHETIC_NOT_MARKET_PROVEN for bundled example |
| Standalone Astro install and static build | GitHub Actions clean runner | LOCAL PASS |
| Fresh scaffold actual install/build | Independent second copied project on CI | LOCAL PASS |
| JSONL output logic | Pure Node unit/negative tests | LOCAL PASS |
| Astro browser task, exports, keyboard/a11y | Multi-engine Playwright + axe; depends on final head CI | Check final runs before approval |
| Public DNS/TLS, ownership and real hosted output | No authorized public deployment supplied | NOT_DEPLOYED |
| Actual mobile devices/assistive technology | Headless viewports only | EXTERNAL UNKNOWN |
| Real search index and Google AI/ChatGPT citations | No published owned property and source captures | UNKNOWN |
| Genuine market-fit and paid acquisition | No paid/recruited user panel | UNKNOWN |
| AdSense approval, qualified traffic, profit | No authenticated account or revenue records | UNKNOWN |
| All 50 skills blind-agent benchmarked | 1 new runnable Astro tool, 1 existing CSV tool; no 5-task controlled A/B | NOT CERTIFIED |

## Remaining gates to evaluate "best" rather than sell "100×"

- Independent agent benchmark with and without master skill across five unfamiliar tools (including backend, large media and calculations), objective output, time/cost/errors and human design review.
- Owner-authorized domain hosting with public DNS/TLS, actual served commit/body, real browser/device checks and rollback.
- Current owner GSC/Bing metrics, original AI answer captures and conversion/return statistics, policy verification and commercial publisher account approval.
- Full semantic first-party-original review of linked reference materials and maintenance alerting on provider change; a dated source URL alone cannot prove current validity.
- Current runtime dependency security audit and maintenance on future Astro releases.

**Recommendation:** Merge only after all GitHub Actions check runs on PR HEAD succeed. Release wording should be "V22 MASTER + ASTRO STARTER: TESTED LOCAL ENGINEERING; EXTERNAL BUSINESS OUTCOMES UNVERIFIED." Never say all possible sources, guaranteed rankings or 100× validated.
