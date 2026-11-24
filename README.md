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

## Skill library

**28 specialized Codex skills**, stored under [`.agents/skills/`](.agents/skills/), cover:

| Workstream | Skills | What they produce |
| --- | --- | --- |
| Research and market selection | `web-research-freshness`, `web-niche-validation`, `web-keyword-intent`, `web-competitor-audit` | Dated evidence ledger, query clusters, SERP reviews and documented opportunity decisions |
| Product and architecture | `web-product-spec`, `web-astro-engineering`, `web-accessibility-agent-ux`, `web-security-performance` | Testable product requirements, static-first architecture, accessible workflows and risk controls |
| Search and AI discovery | `web-technical-seo`, `web-content-and-image-seo`, `web-ai-discovery`, `web-authority-distribution` | Indexability audits, high-value information, crawl policy and earned distribution plans |
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
Source-backed [SEO Master execution protocol](docs/seo-master/README.md), [keyword intelligence](docs/seo-master/01-keyword-intelligence.md), [technical website engineering](docs/seo-master/02-technical-fullstack.md), [Google Search/Ads/AdSense separation](docs/seo-master/03-policy-separation.md), [negative and production acceptance](docs/seo-master/04-evidence-and-sandbox.md), and [31 first-party source leads](sources/seo_v11_source_map.json). Includes root homepage validator repair, AEO self-report uncertainty guard, noindex/sitemap blocker tightening and regression tests. Independent sandbox laboratory exists as a companion user artifact, not a deployed website. This repository still has 48 skills; no ranking or publisher account evidence implied.

**V11 live HTTP auditor:** requires an actual owner-authorized HTTPS origin and a project-specific nonfixture route manifest: `node scripts/audit-live-site.mjs --origin https://owned-domain/ --authorized-origin https://owned-domain --routes-file live-routes.json`. It never certifies indexing or revenue. 25 newly added SEO/manifest regression tests exercise scope, evidence uncertainty and fail-closed behavior.

## V12 — Independent Observability and real shipped-tool testing
V12 repairs crawler-specific Googlebot/Bingbot robots precedence, adds real JS/CSS asset presence checks and placeholder production-domain rejection, builds an actual browser-only CSV duplicate remover, and runs real shipped download-byte E2E in Chromium/Firefox/WebKit in GitHub CI. scripts/release-truth-gate.mjs provides a fail-closed plan/evidence firewall: fake Google indexed, publisher approval and revenue flags never certify production. See docs/seo-master/05-independent-observatory-v12.md and examples/seo-csv-lab/README.md. Ten controlled local criteria are not a universal 10/10 SEO ranking or real-business guarantee; real HTTPS, mobile hardware, first-party Search Console/AdSense and actual traffic remain separate.

V13 includes [legitimate authority and distribution research](docs/seo-master/15-earned-authority-distribution-v13.md), with real original assets, ethical editorial referrals and outcome-based measurement, not paid link manipulation.
