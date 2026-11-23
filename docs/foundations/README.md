# Web Earnings Master: foundation system (versioned 2026-11-23)

This is a technical operating system, not a list of secret ranking tricks. Start here when a task crosses browser/network, crawler, search, generative answers, or app-store discovery boundaries. The original 21 skills remain applicable; these new foundational skills explain the mechanisms underneath them.

## Invariant pipeline
Human job -> accessible web document -> discovery -> crawler eligibility -> fetch -> render -> canonical/index choice -> query-dependent retrieval/ranking -> result presentation or generative citation -> actual human referral -> verified task completion -> permitted monetization -> net income.

Every arrow has separate failure modes and evidence. Never call a site "rank-ready" based only on HTML checks, and never count a bot fetch as a user. No one outside search-provider systems can know every proprietary feature or exact ranking weight.

## Deep reference order
1. [Browser, HTTP and runtime](01-browser-http-runtime.md): DNS to rendering, caching, JS, security, logs and experiments.
2. [Domain, DNS, TLD and operations](02-domain-dns-tlds.md): ownership, registration, hierarchy, geo, migrations.
3. [Search-engine internals](03-search-engine-internals.md): frontier to SERP, Google/Bing/independent and partner indices, failure diagnosis.
4. [Crawlers and control planes](04-crawlers-robots-control.md): exact bot purposes, REP, noindex, WAF, proof of identity.
5. [AI search, retrieval and agents](05-ai-retrieval-agents.md): citations, grounding, search sources, source-worthiness and agent usability.
6. [SEO / AEO / GEO engineering](06-seo-aeo-geo.md): full requirements, competitive relevance, no unsupported universal "AI tricks".
7. [ASO and alternative discovery](07-aso-discovery.md): only when an actual app is shipped; local, vertical, social and multimedia search.
8. [Reverse-engineering & measurement](08-experimental-reverse-engineering.md): legal black-box experiments and causal limits.
9. [Live-source refresh & contradiction protocol](09-source-refresh.md): automatic *link checks* + mandatory human/agent *semantic* rereview, dated provenance.
10. [Knowledge validation and failure fixtures](10-operational-evaluations.md): acceptance gates and red-team examples.

## Skill routing
- Network rendering/request defect -> web-browser-runtime.
- Domain, registrar, TLD or DNS -> web-domain-operations.
- Why crawler/index/ranking differs -> web-search-internals.
- Robots.txt, bot identity, purpose token or WAF -> web-crawler-governance.
- AI grounding, citation experiments, agent access -> web-ai-retrieval-lab.
- Cross-engine SEO/AEO/GEO planning -> web-search-visibility-systems, then existing web-technical-seo/web-ai-discovery.
- App Store / Google Play discovery -> web-app-store-discovery.
- Every consequential change -> existing web-research-freshness, plus 09-source-refresh.md.

Use the few relevant skills, not all of them in every prompt. Register claims with source scope and checked-at date, prove actual tool results, and escalate unknown internal algorithms instead of guessing.

## Provenance and limits
This version is a first foundation expansion from the project continuity handoff dated 2026-11-23. It is not a line-by-line reconstruction of Google/Bing/AI vendor internals. Each substantive provider assertion cites first-party URLs in the associated document; the verification inventory is in sources/foundation_sources.json. Link existence, live policy semantics, account rollout and production results are different evidence categories. Changes enter a branch and require validation and review before main.
