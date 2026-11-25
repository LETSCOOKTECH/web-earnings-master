# V20 complete 49-skill inventory and actual readiness gaps

**Date:** 2026-11-25. **Repository:** LETSCOOKTECH/web-earnings-master. **Base HEAD:** 742f8d7db8d2b667ee3065c93ef73512ed5db13e.

## Independent findings

The 49 active SKILL.md entrypoints were individually opened and their text measured. **Median 619 words; minimum 302; maximum 2,038; 30/49 shorter than 650 words, 10 shorter than 500.** These numbers are descriptive only. Each skill may route to much longer manuals, scripts and first-party source registries, so short ≠ automatically shallow, and long ≠ verified correct. Neither the existing skill frontmatter linter nor 616 passing local tests demonstrates the conceptual completeness of every domain.

**Critical release mistake confirmed:** the CSV demo used IANA documentation-only csv-lab.example.org as canonical and sitemap. The fixture README said not live, but clickable/bare example URLs and our explanation led a real human to open it as a product. There was never public deployment. The existing Playwright suite tested localhost; that is useful local evidence, not public hosting proof. This failure should have been surfaced automatically and prominently.

**Systemic blockers:** current workflows do not perform authorized DNS/TLS/host/browser production validation for an actual owner-operated site; 49 skill contracts do not represent 49 autonomous agent performance evaluations; original documentation references can drift; existing code and documentation contain historical 46/47/48 counts; source registries are not proof of original semantically checked policy on a specific day. The skill-depth script now reports per-entrypoint executable-reference and source-reference signals and explicitly refuses production certification.

## All active entrypoint inventory

The numbers below are **observed SKILL.md words**, not the size of linked manuals. "Review" means every skill still requires a user-task/competitor/official-source/end-to-end evidence gate; it is not a fabricated failure score.

| Codex skill | Domain | Words |
| --- | --- | --- |
| web-accessibility-agent-ux | UX / accessibility | 503 |
| web-ad-experience | Ad UX | 485 |
| web-adsense-readiness | Publisher compliance | 627 |
| web-aeo-answer-optimization | AEO answers | 862 |
| web-ai-discovery | AI discovery | 1298 |
| web-ai-retrieval-lab | AI retrieval | 447 |
| web-app-store-discovery | App discovery | 415 |
| web-aso-apple-app-store | Apple ASO | 669 |
| web-aso-google-play | Google Play ASO | 672 |
| web-astro-engineering | Static web architecture | 580 |
| web-authority-distribution | Earned distribution | 511 |
| web-backend-api-engineering | API/backend | 572 |
| web-browser-compute | Browser compute | 619 |
| web-browser-runtime | Browser/network | 378 |
| web-competitor-audit | Competitive research | 625 |
| web-content-and-image-seo | Content/media SEO | 486 |
| web-conversion-job-platform | Conversion jobs | 651 |
| web-crawler-governance | Crawler controls | 622 |
| web-domain-operations | DNS and domains | 302 |
| web-dominant-recommendar | AI recommendations | 2038 |
| web-experiments | Experiment design | 380 |
| web-frontend-experience-engineering | Frontend | 571 |
| web-fullstack-production-executor | Fullstack | 902 |
| web-generative-engine-optimization | GEO | 1213 |
| web-hosting-vendor-evaluation | Hosting | 827 |
| web-keyword-intent | Keyword research | 831 |
| web-launch-review | Release gates | 588 |
| web-monetization-network-operator | Ad-network ops | 577 |
| web-network-monetization | Network comparisons | 630 |
| web-niche-validation | Market validation | 508 |
| web-opportunity-intelligence | Opportunities | 1149 |
| web-portfolio-growth | Portfolio growth | 470 |
| web-privacy-consent | Privacy | 510 |
| web-product-spec | Requirements | 513 |
| web-product-validation | Product QA | 737 |
| web-publisher-policy-eligibility | Publisher policy | 725 |
| web-release-observability-operator | Release/monitoring | 518 |
| web-research-freshness | Source freshness | 847 |
| web-scale-reliability | Scalability | 605 |
| web-search-analytics | Search analytics | 861 |
| web-search-forensic-evidence | Search forensic QA | 579 |
| web-search-internals | Search mechanisms | 369 |
| web-search-visibility-systems | Search pipeline | 491 |
| web-security-assurance-asvs | Application security | 629 |
| web-security-performance | Web security/perf | 574 |
| web-technical-seo | Technical SEO | 1161 |
| web-traffic-hunter | Distribution | 1096 |
| web-unit-economics-finops | Unit economics | 713 |
| web-workload-architecture-router | Architecture choice | 696 |
## Highest-priority quality upgrades

**P0 — false website-ready declarations:** web-fullstack-production-executor, web-launch-review, web-product-validation, web-domain-operations, web-browser-runtime, web-technical-seo, web-security-assurance-asvs. Required fix is real deployment taxonomy, non-public origin hard rejection, actual output/browser, DNS/HTTPS/404/WAF, source artifact, owner signoff, rollback and independent acceptance.

**P0 — invented search outcomes:** web-search-internals, web-search-visibility-systems, web-ai-retrieval-lab, web-aeo-answer-optimization, web-generative-engine-optimization, web-dominant-recommendar, web-search-analytics. Must differentiate crawling, actual indexing, retrieval, answer citation, positive recommendation, actual referrals and verified revenue. Technical tests establish eligibility only. Each provider's current original and real owner panel required for claims.

**P1 — unproven economic claims:** web-opportunity-intelligence, web-competitor-audit, web-niche-validation, web-traffic-hunter, web-adsense-readiness, web-ad-experience, web-network-monetization, web-unit-economics-finops. Require actual human need and product test, eligible publication, genuine publisher accounts, verified traffic and costs rather than keyword scores or synthetic RPM.

**P1 — security/engineering depth:** web-astro-engineering, web-frontend-experience-engineering, web-backend-api-engineering, web-scale-reliability, web-privacy-consent, web-accessibility-agent-ux, web-browser-compute and all other infrastructure skills. Need runtime-specific official manuals, malicious cases, actual device/account probes, data retention boundaries, time/cost/capacity limits and rollback.

## What V20 actually repaired

1. Domain policy validator disallows example.com/.net/.org and subdomains, reserved .test/.invalid, localhost and IP literal origins for a claimed public launch.
2. Both static-site production and live-site audits use the same origin restriction before presenting any production status.
3. A **working local** CSV tool preview command explicitly prints the real localhost origin and says NOT PUBLIC; repository documentation no longer asks humans to visit a reserved hostname.
4. A separate build-only artifact generator rewrites canonical/sitemap/robots for a supplied root-domain candidate, and emits BUILD_ONLY_NOT_DEPLOYED with all external outcome flags false.
5. Independent tests verify local HTTP, origin blockers, exact build artifacts and disclosure, unsafe folder handling, and no false live link.
6. A measured skill-depth observatory scans every current skill and flags short, no executable command, no direct original/reference pointer and missing evidence-gate language. This is a diagnostic inventory, NOT skill approval.
7. The V20 full release contract defines five distinct evidence states, independent positive/negative user-task oracles and a mandatory owner HTTP/SEO/publisher verification packet.

## Remaining technical debts (NOT DONE)

- Rebuild and end-to-end test **an unfamiliar external customer's actual tool** using only agent instructions in a clean room and an independent reviewer; include failures, security, accessibility and deployment ownership.
- Audit every linked professional chapter for semantic accuracy and current original first-party documentation, not only the 49 short frontmatter entrypoints.
- Set up a real authorized deployment with public DNS and HTTPS (none was authorized or verified for this CSV fixture). Do not invent a site or publish a private repo.
- Verify actual Search Console/Bing indexing, AI answer citations/positive recommendations, valid AdSense eligibility and real revenue on a site that has human users. These cannot be simulated.
- Review stale source originals per task/country, monitor provider changes, and store real read receipts with exact claims and counterevidence.
- Validate even the new release checker in a genuinely hosted domain/dual network, including DNS rebinding and SSRF guard for arbitrary audit URLs when expanded. User-provided --authorized-origin strings are not independent property control.
- Improve individual low-depth skill ownership paths with specific official sources, reproducible failure fixtures, and practical operator outputs; adding generic paragraphs to 49 files would be counterproductive.

## Verdict

**Do not label the complete library as 10/10, production-certified, SEO-dominating, or globally first-recommended.** It is a developing, human-supervised skill/research library with substantial local code/test coverage and meaningful yet incomplete provider evidence. V20 makes false live URL claims harder and exposes incomplete skill instruction evidence; it does not establish every-source omniscience or autonomous production-grade execution.

See docs/quality/real-world-release-contract-v20.md, examples/seo-csv-lab/README.md, scripts/audit-skill-depth-v20.mjs, tests/public-demo-v20.test.mjs, and sources/seo_v13_primary_atlas.json. Action-time original vendor pages are mandatory; URLs alone are not proof.
