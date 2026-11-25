<div align="center">

# Web Earnings Master

### Engineering knowledge. Evidence-based discovery. Sustainable website businesses.

**Private Codex skill system maintained by LETSCOOKTECH**

[Getting started](docs/START_HERE.md) · [Skill library](#skill-library) · [Research protocol](docs/RESEARCH_PROTOCOL.md) · [Official sources](sources/official_sources.json) · [Governance](AGENTS.md)

</div>

---

## Mission

A continuously improved technical research and execution library for the **entire lifecycle of high-value websites**: understanding browsers and servers; validating genuine market demand; designing and shipping useful products; making pages eligible for search and AI retrieval; building legitimate distribution; meeting monetization and privacy requirements; and improving profitability from observed data.

**This repository is a knowledge and verification system—not a website template, not a guarantee of Google rankings, and not proof of AdSense approval.** Research is dated; provider rules must be checked against current primary sources before consequential decisions.

## CURRENT LAUNCH TRUTH — local examples are not public websites

**LOCAL CSV LAB — NOT PUBLIC.** The repository's [CSV deduplication example](examples/seo-csv-lab/README.md) is a **working local test fixture**, not a hosted demo. `csv-lab.example.org` is an IANA-reserved example hostname, not an actual deployable site; do not click or share it as a live product. To use the tool, run `node scripts/preview-seo-csv-lab-v20.mjs` locally and open the exact localhost address printed. To prepare a candidate root-domain build, use `node scripts/build-public-csv-demo-v20.mjs --origin https://YOUR_ACTUAL_OWNED_DOMAIN/ --out .tmp/csv-public`, then run the real domain and browser checks **after** actually deploying. A successful build or local Playwright test never means DNS, public HTTPS, Google indexing, AdSense approval or human visits are verified.

**Skill-library status:** 50 registered Codex skills. Existing static manifests and tests do **not** independently validate the completeness, originality, policy accuracy or production effectiveness of all 49. See [the V20 entire-skill quality inventory](docs/audits/2026-11-25-skill-library-truth-v20.md), [49-skill first-party source and test crosswalk](sources/skill-evidence-crosswalk-v20.json) and [full-stack release evidence specification](docs/quality/real-world-release-contract-v20.md) for measured deficiencies and mandatory real-world checks.

## V21: premium functioning CSV Studio — LOCAL ONLY

The former minimal CSV fixture has been upgraded to a [real browser-only CSV Studio](examples/seo-csv-lab/README.md), with a responsive two-panel UI, a bounded background Worker, valid UTF-8 file reading, deterministic full-row or column-key deduplication, case/whitespace matching controls, preview/statistics, downloaded CSV and explicit error/cancel/reset states. [The V21 acceptance guide](docs/quality/21-premium-csv-studio-acceptance.md) pins exact output bytes, 2 MB / 5,000-row / 200-column boundaries, RFC/OWASP/MDN source scopes, security failures and live release conditions. [Actual browser tests](tests/seo-csv-browser-e2e.mjs) assert saved bytes and corrupted-data/HTML-injection/worker-crash failures in Chromium, Firefox and WebKit, with real screenshot artifacts recorded by CI.

To actually use it on your machine, run `node scripts/preview-seo-csv-lab-v20.mjs` from this repo root, then open the printed localhost address. **This is not deployed on a public URL.** No real DNS/TLS, Google indexing, AI citation, AdSense approval, native mobile or earnings is asserted from the code.

## V22 — Dominant Tool Creator: functional Astro + market gates + AI/SEO workflow

The [50th master Codex skill](.agents/skills/web-dominant-tool-creator/SKILL.md) orchestrates actual user jobs, source-checked market demand, competitor output benchmarks, cost-efficient workload architecture, accessible Astro or alternative implementation, independent file/API tests, SEO/AI eligibility, authorized deployment and genuine traffic/publisher economics. It **does not guarantee a 100× improvement, ranking #1 or AdSense approval.** [Source-by-source upstream adaptation and licensing](.agents/skills/web-dominant-tool-creator/references/05-upstream-integration.md) covers Croftweaver, Astro Skills, Claude SEO and selected QA methods without blindly importing unknown instructions.

Our [standalone Astro 7 JSONL Studio](examples/astro-jsonl-studio/README.md) is a working local tool, not an SEO-only placeholder: fixed package/lockfile, real Astro pages, Worker, pure JSONL parser, error line report, download, mobile-responsive original UI and 3-engine Playwright tests. Its default canonical is a reserved example.org URL with **noindex and robots Disallow** until an actual owned public domain is supplied. The old `templates/astro` remain examples-only. Run `node scripts/scaffold-astro-tool-v22.mjs --out .tmp/my-tool` to create a **local** copy. Run `npm run audit:tool-creator:demand` to verify the deliberately synthetic market brief fails to claim real demand.

## The operating loop

```text
Research the user problem and market
    ↓
Measure search demand and real competitors
    ↓
Design a distinctly valuable end-to-end workflow
    ↓
Build accessible, secure and fast web software
    ↓
Verify crawlability, indexing, SEO and AI retrieval
    ↓
Validate publisher compliance and ad experience
    ↓
Acquire real people through search and distribution
    ↓
Measure task success, qualified traffic and economics
    ↺  Investigate failures, improve and retest
```

The loop is adaptive. Codex must investigate the current problem and only invoke applicable skills, rather than following an arbitrary fixed sequence or adding features for their own sake.

## Dominant Recommendar (V17): legitimate AI search recommendations

New dedicated [Dominant Recommendar skill](.agents/skills/web-dominant-recommendar/SKILL.md) and [five-chapter recommendation research laboratory](docs/recommendations/README.md) cover Google AI Overviews/Mode, ChatGPT Search, Perplexity, Bing/Copilot, Claude and other surface-specific probes. Tracks brand mention, citation, positive recommendation and explicit ranked-first as **different** outcomes; requires real human tasks, hard-to-fake product benchmarks and actual sources. [Source atlas](sources/dominant_recommendar_v17_sources.json): 18 provider/product surfaces, eight with unverified recommendation mechanics. [Strict evaluator](scripts/evaluate-recommendar-v17.mjs) rejects missing experiments and fake #1 labels. It cannot promise placement.

## Skill library

**50 active Codex skills**, stored under [`.agents/skills/`](.agents/skills/), cover:

| Workstream | Skills | What they produce |
| --- | --- | --- |
| Research and market selection | `web-research-freshness`, `web-niche-validation`, `web-keyword-intent`, `web-competitor-audit` | Dated evidence ledger, query clusters, SERP reviews and documented opportunity decisions |
| Product and architecture | `web-product-spec`, `web-astro-engineering`, `web-accessibility-agent-ux`, `web-security-performance` | Testable product requirements, static-first architecture, accessible workflows and risk controls |
| Search and AI discovery | `web-technical-seo`, `web-content-and-image-seo`, `web-ai-discovery`, `web-dominant-recommendar`, `web-authority-distribution` | Indexability audits, high-value information, crawl policy and earned distribution plans |
| Monetization and trust | `web-adsense-readiness`, `web-network-monetization`, `web-privacy-consent`, `web-ad-experience` | Publisher eligibility evidence, network comparisons, privacy/consent and safe ad layouts |
| Reliability and growth | `web-product-validation`, `web-search-analytics`, `web-experiments`, `web-launch-review`, `web-portfolio-growth` | Real tests, conversion funnels, experiments, release decisions and portfolio economics |

### Core search and browser foundation (v2.2 deep upgrade)

Read [the foundational operating system](docs/foundations/README.md), which contains 18 technical/reference chapters, seven dedicated foundation skills (plus the original 21), a 32-link annotated primary-source registry, a fresh-source check utility and offline contract tests. It covers browser/DNS/HTTP/TLS internals, search crawl/index/rank, crawler controls, Google/Bing/AI answer engines, agent browsers, SEO/AEO/GEO and app-store ASO. **It does not expose proprietary ranking weights or guarantee search/AI placement.**

Use the relevant focused skill rather than injecting all foundation chapters into one Codex context. Read chapters 11–18 for Chromium/Firefox/WebKit architecture, DNS/HTTP/TLS, inverted indexes/BM25/PageRank/hybrid retrieval, the global engine atlas, AI grounding/citations/agents, 2026–27 future-effective controls, deep SEO/AEO/GEO and adversarial test gates. Use `node scripts/ir-reference-lab.mjs` for a reproducible educational search engine, **not** proprietary Google ranking. A separate 26-target official-source watcher uses daily GitHub Actions polling only after the proposed workflow reaches the default branch; automated hashes are not policy evidence. The agent must inspect current first-party docs before material decisions.

Run `node scripts/check-foundation-sources.mjs` for registry validation and optionally `node scripts/check-foundation-sources.mjs --live --limit 12` for reachability only; semantic live provider policy recheck is always required.

Full routing is in [`AGENTS.md`](AGENTS.md). The [master curriculum](docs/MASTER_CURRICULUM.md) organizes the knowledge domains, while [`docs/START_HERE.md`](docs/START_HERE.md) covers practical usage.

## Knowledge layers

| Directory | Contents |
| --- | --- |
| [`.agents/skills/`](.agents/skills/) | Codex-compatible `SKILL.md` instructions and trigger descriptions |
| [`docs/`](docs/) | Extended lifecycle guides: AdSense, SEO, AI, security, analytics, distribution, technical research |
| [`references/`](references/) | Subject-specific field notes for working through a skill |
| [`sources/`](sources/) | Curated primary-source URLs and verification metadata; links are not permanent policy certificates |
| [`learning/`](learning/) | Supplementary tutorials and training resources, distinct from authoritative policies |
| [`scripts/`](scripts/) | Local audits for rendered HTML, links, robots, page intent, ads.txt and evidence |
| [`templates/`](templates/) | Evidence, market, competitor, publisher, UX, and Astro patterns |
| [`tests/`](tests/) | Tests and deliberately failing examples validating audit behavior |
| [`research/`](research/) | Dated historical studies, with their original uncertainty preserved |
| [`archive/`](archive/) | Earlier skill generations retained for provenance; not the active instructions |

## Using with Codex

1. **Open this repository as a workspace.** Codex can follow [`AGENTS.md`](AGENTS.md) and select `.agents/skills/*/SKILL.md` in that repository context.
2. **State the concrete job**, such as “audit the crawlability of my deployed Astro site” or “research and verify this niche before implementation.”
3. **Verify live evidence.** Read the relevant skill and current official documentation; collect first-party data only when access has been granted. Report unknowns clearly.
4. **Make changes and test them.** Every implementation or research decision should include commands, outputs or verifiable evidence.
5. **Reuse across other projects deliberately.** Clone, copy or reference the skills and their supporting documents; a private repository is not automatically available in another Codex workspace.

Example tasks:

```text
Audit this Astro site's rendered output against web-technical-seo.
Show every check, evidence, failed URL, proposed repair and verification.

Verify current AdSense and Monetag eligibility for my actual site,
country and ad formats. Separate hard policies from recommendations.

Analyze Search Console queries and competitor SERPs; identify one
high-intent workflow worth building, with source confidence and costs.

Test ChatGPT, Google, Bing, Claude and Perplexity crawler eligibility.
Distinguish crawl access, indexing, AI citations, referrals and visits.
```

### Run automated checks

Requires **Node.js 20+**; the audit scripts do not require installing dependencies:

```bash
npm test
npm run lint:skills
npm run audit:sources
npm run audit:fixture
```

For an Astro static build:

```bash
node scripts/audit-static-site.mjs --dist ./dist --origin https://your-real-domain.example
node scripts/audit-live-site.mjs --origin https://your-real-domain.example
node scripts/check-evidence.mjs --file templates/evidence-manifest.example.json
```

The example origin is **not** a real deployment URL. The live audit needs a deployed website and network access; it cannot be passed by inspecting source code alone. Full instructions and limitations are in [`docs/WHAT_AUTOMATION_CAN_AND_CANNOT_VERIFY.md`](docs/WHAT_AUTOMATION_CAN_AND_CANNOT_VERIFY.md).

## Evidence standard

Use the [research protocol](docs/RESEARCH_PROTOCOL.md) and [claim ledger](templates/claim-ledger.csv): **question → primary sources and checking date → observations → inference/uncertainty → proposed action → tests → measured result → rollback**.

- **Policies** are not the same as official guidance, industry anecdotes, market estimates or internal quality gates.
- **SEO eligibility** is not a Google #1 ranking guarantee; **AI crawler access** is not citation or referral traffic.
- **Ad network signup** is not publisher approval; approval is not meaningful revenue.
- **Search volume** is not obtainable traffic, and third-party competitor traffic estimates are not first-party analytics.
- **A passing script** is not a live compliance certificate; manual, provider and legal reviews remain necessary.

## Maintenance and contribution

For each change: cite a current source or test, explain the affected scope, update the relevant skill/reference, add or adjust a test where possible, and document known uncertainty. Follow [`CONTRIBUTING.md`](CONTRIBUTING.md), [`SECURITY.md`](SECURITY.md), and [`CHANGELOG.md`](CHANGELOG.md).

**No API keys, publisher IDs, private customer records, unredacted analytics or uploaded user files belong in this repository.** Use least-privilege access and protected branches where available.

## Status and ownership

- **Repository:** `LETSCOOKTECH/web-earnings-master` — intended **private** research and skills workspace.
- **Baseline:** 28 Codex skills and a dated primary-source registry. These are living references, not a comprehensive proof that every provider requirement has been satisfied.
- **Scope today:** Research, verification and skill improvement. Site development begins separately when requirements and evidence justify it.
- **License:** [Proprietary — All rights reserved](LICENSE). Authorized internal use only. External references and third-party components retain their own terms.

---

<div align="center">

**Build what people need. Prove what works. Earn trust before revenue.**

Maintained by **LETSCOOKTECH**.

</div>


## v2.3 research reliability and real execution
- **20 foundation chapters:** browser/network, protocol standards, search IR, global search engines, RAG/AI agents, 2026–27 changes, production SEO, adversarial cases, first-party-source verification (19), and real HTTP/browser lab (20).
- **Original skills:** All 21 original Codex skill bodies individually audited and patched with scoped provider source entry points, evidence criteria, failure gates and routing. Seven complementary skills remain; total 28.
- **Provider claims:** 48 dated, specific claims supported by inspected first-party documents; one inaccessible/unverified Applebot case. Baidu public documentation was re-opened, but owner-only dashboard data remains unavailable. No blanket claim to have read every source paragraph. `sources/verified_claims.json` is a history of checked claims, NOT automatically current.
- **Official-source monitoring:** 33 pinned provider pages/feeds; schedule detects changes and can create a review GitHub issue AFTER workflow is on the default branch. The bot never rewrites live policy. Source review requires current official text, effective date, product, locale and evidence.
- **Executable owned lab:** `npm test` exercises local real HTTP behavior, robots policy subset, response semantics, source/skill contracts, and previous audits. Separate `npm run lab:browsers` needs pinned Playwright and real Chromium, Firefox, WebKit via browser-specific GitHub Action. Tests prove those fixtures only, not any commercial index.
- **Go/no-go:** See [Section 1 Acceptance](docs/SECTION1_ACCEPTANCE.md). No fake full-completion claim for external provider dashboards we do not have.

### Per-action current-document enforcement (v2.3.1)
`scripts/require-action-time-sources.mjs` checks claim IDs and dated task-time first-party excerpts before consequential robots, AI, indexing, publisher or privacy operations. `npm test` includes negative tests for stale snippets, unavailable Applebot, future Bing training/grounding and URL mismatch. Example: `node scripts/require-action-time-sources.mjs --file private/source-evidence.json --claim-id G-AI-NOLLM`. This validator enforces evidence **shape and timeliness**, not semantic truth or live search results. An agent must still open current original vendor docs and verify the meaning.

## Current v3 research phase (pending separate review)
The v2.3.1 foundation remains on main. The separate research/v3-competitive-intelligence-2026-11-23 branch holds the first FreeConvert/CloudConvert/Convertio competitive investigation, 24 carefully scoped source records, seven explicitly unproven hypotheses, a 12-domain/84-question evidence atlas and manual per-skill verification process. Begin with docs/research/01-freeconvert-competitive-evidence-2026-11-23.md, docs/research/02-research-atlas-and-gates.md and docs/research/03-manual-module-upgrade-protocol.md. This is a RESEARCH BACKLOG, not proof that 84 studies or live SEO results have been validated. Original 28 skills are not silently rewritten until each module is separately proven and evaluated.

### Uploaded FreeConvert case: primary-source URL/AI Mode correction (2026-11-23)
The research branch includes a priority audit of 32 hypotheses/claims in the user's uploaded 85KB FreeConvert teardown. Most importantly, URL pathname segment count is NOT a direct Google rank/PageRank bonus, and Google's AI Mode fan-out relies on Search indexing/snippet eligibility rather than shallow root slugs. Three owning skills now have source-backed negative/positive decision rules. `node scripts/url-architecture-reference-lab.mjs` demonstrates that a three-segment URL can be one click away while a one-segment URL can be three clicks away. See `docs/research/04-user-teardown-google-ai-url-causality-audit-2026-11-23.md` and `sources/research/freeconvert-upload-priority-claim-audit-2026-11-23.json`. This is NOT Google ranking reproduction or a full 1,542-line report certification.

## V4 AEO / GEO / ASO specialized skills — draft research expansion
The discovery build introduces four **non-overlapping specialist skills**: `web-aeo-answer-optimization` (answer surfaces), `web-generative-engine-optimization` (AI search citations and referrals), `web-aso-google-play` (Android Play metadata/quality and experiments), and `web-aso-apple-app-store` (Apple byte-accurate fields, searchable custom pages and PPO). See `docs/discovery/README.md`.
- **Reusable offline QA:** `node scripts/audit-answer-page.mjs --file templates/discovery/answer-page.example.json`; `node scripts/audit-aso-listing.mjs --file templates/discovery/google-play.example.json`; `node scripts/audit-aso-listing.mjs --file templates/discovery/apple-app-store.example.json`; `node scripts/evaluate-ai-citations.mjs --file templates/discovery/ai-citation-batch.example.json`.
- **Source governance:** 32 dated official provider assertions with first-party original-body vs indexed-excerpt evidence distinction; 53 official watch targets, including future 2027 Android vitals. These are not complete accounts or secret rank weights.
- **Boundaries:** static validators cannot guarantee Google/Apple Play approval, index position, AI citation, downloads or profit. Live results require authorized Search Console, Play Console, App Store Connect and traffic data.

## V5 architecture and million-user economics — buildable research, not hypothetical free hosting
Six additional specialist skills guide execution placement, production-grade client-side code, bounded cloud jobs, cost modeling, 1M-MAU load testing and commercial host eligibility. See `docs/architecture/README.md`, `sources/architecture_rate_card_2026-11-23.json` and `scripts/model-tool-economics.mjs`. The scripts model **distinct visits, jobs, remote jobs and peak load** instead of calling 1M users 1M simultaneous jobs. They use dated first-party Cloudflare list prices and explicitly hypothetical external CPU/token rates; provider invoice, AdSense earnings, real browser correctness and actual 1M throughput remain unverified.

## V6 source-governed fullstack, security and publisher eligibility
Eight specialized skills join the 38 previously built (46 total). Deep manuals: `docs/v6/README.md`; 45 priority source claims and 15 monetization models accompany runnable but bounded page, network and security checks. No real deployed site, Google ranking, AdSense approval or 1M-user production benchmark has been certified.

## V8 — Traffic Hunter (47th active Codex skill)
`web-traffic-hunter` adds a comprehensive channel opportunity and ethical user-acquisition system: organic search, AI, video, social, Pinterest, forums, developer ecosystems, Product Hunt/HN, credible partnerships, newsletters, referrals and bounded paid pilots. Includes source-checked policies, a candidate/experiment ledger, output-focused attribution and unit economics, a local manifest evaluator, and an adversarial regression suite. Read [the operating manual](docs/traffic-hunter/README.md), [skill](.agents/skills/web-traffic-hunter/SKILL.md), and [acceptance report](docs/traffic-hunter/ACCEPTANCE.md). No platform posts, paid campaigns, traffic, Google rankings, citations, or ad revenue are asserted by this library release. This is distinct from historical V6's 46-skill baseline.

## V9 Opportunity Intelligence — 48th Codex skill
New browser-first market research and idea-validation system: documented Google Trends GUI and official alpha access distinction, Semrush/Ahrefs licensed keyword data, Google Ads Keyword Planner, owned GSC/Bing, legal public community review, source independence, first-person pain verification limits, reproducible competitor output, product feasibility and cost. A staged **zero-paid-credits-by-default** research budget prevents expensive agent loops; code validates evidence types, normalized Trends exports and decision gates. Read [skill](.agents/skills/web-opportunity-intelligence/SKILL.md), [full guide](docs/opportunity/README.md) and [acceptance](docs/opportunity/ACCEPTANCE.md). The package has no real credentials or automatic third-party scraping; it cannot invent keyword volumes or certifiably approve a market.

## V10 — Fail-closed Computer Use permission check
Added `scripts/check-computer-use-permission.mjs`, a conservative action-specific gate for actual advertised tool capability, original provider permissions, user/account scope, destination and credits. Its example is deliberately HOLD; it neither launches a browser nor claims live vendor approval. See `docs/opportunity/08-computer-use-permission.md`.

## V11 — SEO + fullstack mastery operating guide
Source-backed [SEO Master execution protocol](docs/seo-master/README.md), [keyword intelligence](docs/seo-master/01-keyword-intelligence.md), [technical website engineering](docs/seo-master/02-technical-fullstack.md), [Google Search/Ads/AdSense separation](docs/seo-master/03-policy-separation.md), [negative and production acceptance](docs/seo-master/04-evidence-and-sandbox.md), and [31 first-party source leads](sources/seo_v11_source_map.json). Includes root homepage validator repair, AEO self-report uncertainty guard, noindex/sitemap blocker tightening and regression tests. Independent sandbox laboratory exists as a companion user artifact, not a deployed website. At the historical V11 milestone there were 48 skills; the current verified inventory is 49. No ranking or publisher account evidence implied.

**V11 live HTTP auditor:** requires an actual owner-authorized HTTPS origin and a project-specific nonfixture route manifest: `node scripts/audit-live-site.mjs --origin https://owned-domain/ --authorized-origin https://owned-domain --routes-file live-routes.json`. It never certifies indexing or revenue. 25 newly added SEO/manifest regression tests exercise scope, evidence uncertainty and fail-closed behavior.

## V12 — Independent Observability and real shipped-tool testing
V12 repairs crawler-specific Googlebot/Bingbot robots precedence, adds real JS/CSS asset presence checks and placeholder production-domain rejection, builds an actual browser-only CSV duplicate remover, and runs real shipped download-byte E2E in Chromium/Firefox/WebKit in GitHub CI. scripts/release-truth-gate.mjs provides a fail-closed plan/evidence firewall: fake Google indexed, publisher approval and revenue flags never certify production. See docs/seo-master/05-independent-observatory-v12.md and examples/seo-csv-lab/README.md. Ten controlled local criteria are not a universal 10/10 SEO ranking or real-business guarantee; real HTTPS, mobile hardware, first-party Search Console/AdSense and actual traffic remain separate.

V13 includes [legitimate authority and distribution research](docs/seo-master/15-earned-authority-distribution-v13.md), with real original assets, ethical editorial referrals and outcome-based measurement, not paid link manipulation.

## V15 AI Search current provider controls (November 24 2026)
Retains the existing 48 skills. Adds first-party Google generative AI control separation, corrected August 31 2026 reporting rollout, stricter surface/locale citation prompt completeness and independent local adversarial tests. See docs/ai-search/07-2026-11-24-provider-controls-v15.md and npm run audit:ai-controls. Neither code nor guides can certify actual external citations or monetization.

## V23 — trusted upstream expertise and complete specialist routing (merged)

The curated `sources/skill-network-v23.json` maps **all 50 active Sense skills** to seven evidence-gated lifecycle owners and **30 upstream methodology leads plus 160 existing first-party source records (70 distinct IDs linked to the 50 skills)**. Source methods from OpenAI, Anthropic, Superpowers, Croftweaver, Astro specialists, Semrush, SE Ranking, Addy Osmani, Corey Haines, Cloudflare and Vercel are **methodology references only**: no third-party skill installation or execution is implied. The [V23 integration manual](docs/skills/2026-11-25-trusted-upstream-integration-v23.md) specifies concrete source risks, handoffs and controlled skill-evaluation cases.

Run `node scripts/check-skill-network-v23.mjs` and `node --test tests/skill-network-v23.test.mjs`. The new sixteen integrity and adversarial tests cover owner/source mapping, dropped originals, misleading upstream associations, and ownership, source provenance, unsupported installation claims, missing upstream links and broken routing. They are **not** evidence of live SEO ranking, actual agent uplift, public deployment, AdSense approval or business revenue. A controlled isolated real-agent benchmark and authorized account/hosting experiments remain separate future work.

## V24 — real website discovery and observable competitor-intelligence engine (merged)

**Verified release state:** The V23 and V24 source changes were merged to `main` on 2026-11-25. Local/CI tooling and controlled HTTP evidence passed, but public deployment, genuine search traffic, AI citations and publisher earnings remain unverified. See the [main-branch release readiness audit](docs/audits/2026-11-25-main-readiness-v24.md) before claiming real-world production readiness.


**Implementation:** `scripts/site-intelligence.mjs` plus `lib/site-intelligence/` provides an actual public HTTPS, DNS-pinned, robots-first bounded site crawler, recursive sitemap index/gzip reader, public HTML navigation graph, evidence-qualified asset/header/framework hints, imported legal search-result leads, a privacy-minimized sanitized HAR analyzer and **ten connected Sense-skill evidence handoffs**. Use `--discover search-results.json` for source-preserving imported candidate sites; use `--origin https://selected-site.tld/ --authorized-origin https://selected-site.tld/ --out report.json --packets-out claims.json` only with operator approval and applicable terms. Read [the complete operator manual](docs/website-intelligence/README.md).

The crawler is **not** a global search-engine index, universal 100% sitemap/DOM browser crawler, private backend decompiler, account-data access, SERP ranking extractor, or proof of live traffic/revenue. Its output is bounded public evidence with fail-closed errors and limited XML/robots/HTML parsers, not a universal competitor architecture truth. Code tests: `node --test tests/site-intelligence.test.mjs`, then `npm test`. External site behavior, real browser journeys and business performance remain independently verifyable only when authorized.


## V25 — checked skills, Astro 7 release gate, evidence-first tool/demand hunter and deep site analysis

This release adds `scripts/hunt-web-tools-v25.mjs` plus its CLI `scripts/run-tool-hunter-v25.mjs` (complete six-pillar opportunity plans, independent source groups, explicit missing/contradictory evidence and no fabricated rankings), `scripts/audit-astro-v25.mjs` (current Astro static/server output, adapter/runtime boundary and built-page evidence), and `scripts/analyze-site-depth-v25.mjs` (sampled HTTP/HTML sitemap/canonical/link diagnostics without claiming private architecture or Search Console indexing). All 50 existing skill entrypoints were inspected; repository tests now check inventory and V25 routing. See [the V25 field playbook](docs/skills/2026-11-25-v25-validation-field-playbook.md). Run `npm run test:v25` and the full `npm test`; market demand, source authenticity, deployment, search visibility and AdSense approval still require real external evidence.


## V26 — official engineering skill methods integrated into Sense

Sense integrates **13 directly inspected original skill instructions** from Vercel (`vercel-labs/agent-skills`), Anthropic (`anthropics/skills`), Cloudflare (`cloudflare/skills`), and independent web-quality maintainer Addy Osmani (`addyosmani/web-quality-skills`). Their exact Git **blob SHA**, legal provenance and role-specific method handoffs are listed in [V26 official source manifest](sources/official-skill-integration-v26.json). They inform **20 existing specialist skills** and preserve the 50-skill registry; no unreviewed packages, upstream scripts, or copyrighted source files were installed.

This is a **source-pinned, methodology-integrated** release, not proof that 13 upstream skills are installed or that any provider guarantees search rank. Vercel guidance is React/Vercel-scoped, Cloudflare guidance is platform-scoped, Anthropic examples require adaptation to the actual agent runtime, and Addy's collection is independently maintained rather than an official Google repo.

Use `npm run audit:upstream:v26` and `npm run test:upstream:v26` for provenance/negative tests, and `npm run eval:agent-skills:v26 -- --file ACTUAL_TRIALS.json` for transparent paired-task arithmetic (not independently authenticated results). See [the complete V26 official-source and engineering transfer playbook](docs/skills/2026-11-25-official-upstream-v26.md). Human task completion, safe live deployment, market demand, rankings and monetized traffic remain separate evidence gates.
