# Sense V25 — complete active skill-library verification

**Scope:** All 50 active skill entrypoints under `.agents/skills/`, as registered by `sources/skill-network-v23.json`; inspected on 2026-11-25. **Interpretation:** file and contract verification is not proof of 50 independently successful production agents.

## Inventory outcome

| Lifecycle stage | Active skill entrypoints | Evidence focus |
| --- | ---: | --- |
| Orchestration | 1 | Master planning and bounded delegation |
| Research | 6 | Niche/demand/keyword/competitor/source provenance |
| Engineering | 12 | Workload routing, Astro, browsers, APIs, conversion infrastructure |
| Quality | 7 | Actual task validation, security, accessibility, observability |
| Discovery | 13 | Technical SEO, AI retrieval, GEO/AEO and app stores |
| Publisher | 6 | Ad policies, consent, payout readiness, UX |
| Growth | 5 | Valid acquisition, authority, analytics, financial operations |
| **Total** | **50** | **One owner per active specialist** |

The `tests/sense-v25-quality.test.mjs` inventory test opens every actual `SKILL.md`, confirms its frontmatter, compares the exact 50 registry IDs with active directories and runs `auditSkillLibrary()` from `scripts/audit-skill-depth-v20.mjs`. A red inventory test blocks PR; this verifies files and auditable metadata only.

## Main gaps uncovered

1. **Execution-proven vs prose-only guidance:** Several specialist entrypoints have source-aware checklists but no immediately runnable test cited within that entrypoint. The existing V20 auditor reports `lacking_executable_reference`, `shorter_than_650_words` and the `DOMAIN_REVIEW_REQUIRED` rows. These are *triage signals*, not semantic skill failures. Use `npm run audit:skills:depth` on the exact branch to enumerate them; do not pretend that Markdown length predicts agent quality.
2. **Market opportunity:** V22 `evaluate-tool-opportunity` validated declared evidence shapes but did not compare a portfolio. V25 `huntWebTools` now runs six-pillar candidate triage with policy/negative guards. External source truth, licensed research and viable product outcomes still need real evidence.
3. **Astro:** Old versioned documentation includes the obsolete `hybrid` output. V25 uses the current `static`/`server` distinction, adapter requirements and an executable local source/built-shell validator. Multi-browser task outcomes and deployment must be tested separately.
4. **Website deconstruction:** V24 can safely map a scoped public domain and its sitemap and raw HTML, with explicit permissions and size limits. V25 adds direct-vs-hypothesis classification for contradictory crawl, canonical and content signals. Complete JS behavior, protected backend, entire site inventory and real SEO performance remain unknowable from such data alone.
5. **Domain specialist audits still to prove independently:** real backend API authz/idempotency and queue crash recovery; large uploads/codec failures; domain DNS/TLS and rollback; actual provider AdSense decisions; dynamic bot/indexing changes; actual user retention; cost-per-completed-job at scale. Source-linked instructions or local fixture success cannot certify these cases.
6. **Prompt/skill improvement:** V23 pre-registers ten isolated real-agent A/B cases, but that experiment has not been executed as an independent baseline-vs-upgrade benchmark. The repo cannot infer a "100× better" result or any outcome uplift from increased sources or 50/50 routing.

## Priority V25 skill changes

`web-dominant-tool-creator`, `web-opportunity-intelligence`, `web-niche-validation`, `web-keyword-intent`, `web-competitor-audit`, `web-astro-engineering` and `web-technical-seo` now explicitly route the agent to runnable V25 modules and real evidence gates. Global `AGENTS.md` preserves the existing V13 first-line source gate and adds V25 instructions.

## Executable review

```sh
npm test
npm run test:v25
npm run audit:skills:depth
npm run audit:skills:sources
npm run audit:astro:v25 -- --project examples/astro-jsonl-studio
npm run hunt:tools:v25 -- --file FULL_CANDIDATE_BATCH.json
npm run audit:site-depth:v25 -- --file OBSERVED_V24_REPORT.json
```

The last two inputs require real previously collected data; they must never be synthesized and presented as evidence of external research. The Astro example is source-only until built and deployed; a local build is not an owner-controlled externally observed service.

**Final conclusion:** **50/50 entrypoint integrity audit** is a foundation check. It is defensible to begin a bounded research and first-site pilot, but **not** to declare every domain skill production-perfect, the toolkit a competitive winner, or the web business profitable until actual reproducible external outcomes and benchmark comparisons exist.

## CI-measured audit baseline — not a subjective score

Actual GitHub Actions source: run `45653926439` on commit `b080ded8b5d2bd7b17ce8b15990b975fd3130c92`, `npm run audit:skills:depth`. A reproducible 50-record snapshot is committed at `sources/skill-verification-v25.json`. **This snapshot predates some later V25 entrypoint changes**; rerun the exact auditor when comparing against the final merge.

| Exact CI metric | Measured |
| --- | ---: |
| Registered active skill directories | 50 |
| Actual matching entrypoints | 50 |
| Entrypoints flagged for domain review by text heuristics | 32 |
| Entrypoints shorter than 650 words | 22 |
| Entrypoints without direct runnable command cited | 26 |
| Entrypoints without a linked source/manual/document reference | 0 |

These warnings identify a maintenance queue; they **do not** imply 32 broken tools or prove 18 fully working agent skills. A short entrypoint can correctly delegate to substantial supporting manuals, while a long entrypoint can still fail a real task. Focus future remediation on independent real task tests, permission gates, field failures and re-opened official originals—not forcing documents to meet a word count.
