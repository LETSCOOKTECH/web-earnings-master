# Section 1 — Browser, search and AI retrieval foundation: scope-based acceptance

Reviewed on 2026-11-23. This project's goal is an up-to-date, authoritative **engineering decision system**, not supernatural knowledge of every undisclosed proprietary search feature. A 100% complete *closed specification* is impossible when vendors change policies without notice and commercial ranking weights remain unpublished. Claim gates below are objective and cannot be silently waved through.

## Delivery inventory
- 28 active Codex skills: 21 original individually read, reviewed and appended with exact v2.3 evidence/source contracts; 7 special foundation skills.
- 20 foundation chapters: protocol fundamentals, browser engines, search indexes/retrieval, independent/partner/global engines, AI search/RAG/agents, all SEO/GEO/AEO/ASO mechanics and source governance.
- 48 individually bounded primary-source claims with checked date and scope, plus one UNKNOWN Applebot case (HTTP 429). Baidu's original Search Resource Platform and AI traffic page are accessible, but the account dashboard is not.
- 33 priority first-party documentation URLs/feeds with a read-only hash-change watcher; 33 accessible dated public page bodies (not account data) as recorded at 2026-11-23. 33-watch targets ≠ all official pages on earth; 48 claims ≠ every paragraph inspected.
- Node-owned HTTP fixture: real request-response handling, RFC9309 subset evaluator, soft404/actual 404, robots groups, noindex/headers, 308, cache 304, 401 auth, JS vs raw HTML, CSP/WAF/503.
- Independent Playwright CI for current pinned Chromium, Firefox and WebKit builds. Check actual Actions logs before declaring PASS.
- Day-specific source-change review GitHub issue after default-branch schedule starts; robot does not rewrite live policies.

## Acceptance gates and evidence
| Gate | Required artifact | How to PASS | Scope limit |
|---|---|---|---|
| S1 source-truth | sources/verified_claims.json + docs 19 | Each material claim in tested set has actual first-party source body, date, scope, stage and exception; inaccessible sources UNKNOWN | Does not include undisclosed internals or inaccessible docs |
| S2 21-skill audit | docs/audits/ORIGINAL_21_SKILLS_AUDIT... + each SKILL.md | All 21 full bodies reviewed and contractual source/check/FAIL route present; scripts/check-research-evidence passes | Text/contract pass, NOT live skill behavior certification |
| S3 real network/crawler | tests/owned-web-lab.test.mjs | Local HTTP tests PASS on 127.0.0.1 under Node; evaluated robots provider subset disclosed | Not a real Googlebot or independent search crawl |
| S4 real browser engines | tests/browser-e2e.mjs + browser-engine-e2e.yml | Actual 3 named browser builds PASS; record browser versions, event errors and JSON artifact | Linux Playwright WebKit ≠ actual iPhone; no low-end real device |
| S5 continuous freshness | foundation-source-watch.yml + watcher report | Dated fetch output, changed/unknown states, no unsafe policy rewrite, semantic review issues upon change | Cron only after merge to default; no automatic correctness guarantees |
| S6 research quality | docs chapters 01–20 + local reference IR lab | Correctly separate standards, toy implementation, observed provider facts, unknown proprietary weights; project CI PASS | Documentation isn't empirical engine ranking reverse engineering |
| S7 live owned website | actual site URL, verified Search Console/Bing/AdSense account and server logs | URLs observed crawled/indexed, indexed state and real citation/referral/advertiser states separately | NOT IN SCOPE absent domain/permissions/property data |
| S8 market and ad ROI | validated user job, current SERP, real tool success and paid/organic accounting | Task completion, real traffic channel, real owner revenue/cost period | Next project section, not generic browser/search theory |

## Classification of completion
INTERNAL V2.3 FOUNDATION: can be marked PASS after S1–S6 proofs including green Actions, subject to dated source limits and known unknowns. This supports moving to next section. EXTERNAL PROPERTY VALIDATION S7–S8 remains PENDING BY DESIGN until real user-selected sites/accounts; cannot fail an abstract reference library for not having property data. Recheck first-party documentation before any consequential act; the internal library never stays magically permanently current.

## Mandatory update lifecycle
1. New source or changed body detected (daily workflow after merge, or direct task-time search).
2. GH issue created for a material changed fingerprint.
3. Reviewer/agent opens first-party text, verifies claim old/new, publication/effective/rollout/jurisdiction and contradiction.
4. Update claim ledger, linked SKILL, provider module, tests, changelog and affected production checklist in reviewed PR.
5. Local + browser CI PASS, optionally authorized live site test, approval and rollback.
6. Human merge. No automatic trust of LLM/HTML text as instructions and no unattended live robots/ads/legal modification.

## Known unresolved external boundaries
- Applebot original body returned 429; retained UNKNOWN. Baidu portal was re-opened successfully later, but account-specific AI traffic data requires site verification. Other provider docs can change tomorrow.
- Current Google/Bing/Brave model weights and AI citation selection weights are private; label unknown not guessed.
- World-scale live indexing/ranking requires authorized Search Console/Bing/robots logs and provider SERP samples; local snippets don't prove this.
- AdSense approval, ad yields, GDPR/DPDP compliance and app-store ranks depend on actual account/region/site evidence.
- Live Microsoft AI training/grounding controls announced for 2027 are not assumed to be enforced in November 2026.
- GitHub scheduled source freshness is inactive on this draft branch. Only a reviewed merge to main activates cron. A push smoke run does not persist background monitoring after conversation.

## What to move to next
Once internal S1–S6 green, shift to country-specific demand analysis, competitor benchmark and actual website choice. During that work activate S7–S8 with real domain/account access and apply all current-source mandates rather than restarting the foundation research.

## S9 added: time-limited action-specific evidence gate
Run `node scripts/require-action-time-sources.mjs --file private/current-source-evidence.json --claim-id G-AI-NOLLM` for a material Google search/AI claim; for multiple provider controls repeat `--claim-id`. `npm test` exercises seven negative/positive cases including future-effective Bing rules and unavailable Applebot. For releases, a passing artifact plus actual opened original-source body, resolved conflicts and authorized site evidence are required; a structural checker alone cannot certify policy correctness. Example template is deliberately stale and NOT valid real proof.
