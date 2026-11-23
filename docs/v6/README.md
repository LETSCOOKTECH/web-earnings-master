# V6: Search forensics, complete web engineering and publisher monetization
**As of 2026-11-23.** These documents are for agent decisions and verifiable code, not Google insider ranking hacks. **Research upload:** 118,420-byte `Pasted text(5).txt`; selected-claim ledger covers 45 important assertions, not every sentence.

## Route by the actual missing outcome
| Specialized skill | Manual | Outcome evidence |
|---|---|---|
| `web-search-forensic-evidence` | [01 Search architecture and claims](01-search-rank-forensics.md) | Court/provider evidence distinguished from speculation |
| `web-fullstack-production-executor` | [02 Fullstack blueprint](02-fullstack-production-blueprint.md) | Working tool and deployment acceptance contract |
| `web-frontend-experience-engineering` | [03 Every page quality](03-page-quality-seo-publisher-gates.md) | Real accessible user workflow and initial HTML |
| `web-backend-api-engineering` | [02 Fullstack blueprint](02-fullstack-production-blueprint.md) | API schemas, storage/jobs/auth and malicious-input integration |
| `web-security-assurance-asvs` | [05 OWASP assurance](05-security-asvs-threat-verification.md) | Versioned controls, runnable security evidence, risk register |
| `web-publisher-policy-eligibility` | [03 Every page gate](03-page-quality-seo-publisher-gates.md) | Separate site/account/page/ad policy states |
| `web-monetization-network-operator` | [04 Provider contract/eligibility](04-publisher-networks-and-policy-engine.md) | Verified terms, legitimate audience economics, no ad conflicts |
| `web-release-observability-operator` | [07 Release and privacy](07-release-observability-and-ad-privacy.md) | Staging, rollbacks, telemetry, human go/no-go |

Cross-cutting [06 Search surfaces](06-seo-discovery-and-page-operations.md) covers traditional Search, AI, visual, Discover, videos, IndexNow and agentic interfaces without making all the surfaces one ranking engine.

## Bounded executable audits
```sh
node scripts/audit-publisher-page.mjs --file templates/v6/page-example.json
node scripts/evaluate-publisher-eligibility.mjs --file templates/v6/publisher-site-example.json
node scripts/audit-web-security-manifest.mjs --file templates/v6/security-example.json
node scripts/check-v6-evidence.mjs
node --test tests/v6-production.test.mjs
```
Fixtures are **illustrative** and explicitly say no site account or live deployed page was inspected. Offline PASS is not indexed/ranked, no true security certification or Google/AdSense approval; external state is UNKNOWN.

## Research source and revision policy
- `sources/v6_claims_2026-11-23.json`: 45 scoped statements from research report, with original line ranges and limitations.
- `sources/v6_publisher_network_registry_2026-11-23.json`: 15 networks/business models, current primary sources or unverified provider rules.
- `sources/foundation_refresh_targets.json`: live documentation-change watch, *not semantic re-certification*.
- Existing `docs/research/`, `docs/foundations/`, `docs/discovery/`, `docs/architecture/` remain in scope.
- Source verification: first-party official/current page > disclosed sworn court document for historical system existence > reproducible independent benchmark > provider sales study/third-party traffic estimate > patent/leak hypothesis. NONE alone guarantees production rank.

## Production outcome criteria
Actual user job succeeds on target devices with defined fidelity/latency/privacy; site/index and AI citation measured by authorized sources; AdSense or alternative approval observed in owner account; mobile ad UX and policy checked; real valid human visits and sustainable net revenue with tracked costs. Anything missing is `UNKNOWN_EXTERNAL` or `NOT_RUN`.
