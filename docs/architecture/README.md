# Architecture and FinOps for high-value web utilities
**Research and implementation intake: 2026-11-23.** The four prior SEO/AEO/GEO/ASO skills do not decide how to implement/host a 2GB video transcode cheaply or how to prove capacity. Six dedicated architecture skills fill that *decision and evidence* gap without pretending to deploy a 1M-MAU product.

## Choose by workload
| Request | Specialist | Manual |
|---|---|---|
| "Best architecture for this tool" | `web-workload-architecture-router` | [01 Workload placement](01-workload-placement-decision.md) |
| "Do it in browser securely and cheaply" | `web-browser-compute` | [02 Client-side and media pipelines](02-client-and-media-pipelines.md) |
| "Server fallback for PDFs/videos/OCR" | `web-conversion-job-platform` | [02 Media pipeline](02-client-and-media-pipelines.md) |
| "How much for a million monthly users?" | `web-unit-economics-finops` | [03 Cost models](03-million-user-economics.md) |
| "Does the system hold under peak/bots/outages?" | `web-scale-reliability` | [04 Reliability and quality](04-scale-and-product-quality.md) |
| "Which permitted commercial host is cheapest?" | `web-hosting-vendor-evaluation` | [06 Hosting/provider matrix](06-vendor-cost-comparison.md) |
| "AI inference, paid APIs, third-party datasets" | workload architect + FinOps | [05 External/AI cost](05-ai-and-external-data-cost.md) |

## Executable research artifacts
```sh
node scripts/assess-tool-architecture.mjs --file templates/architecture/tool-design-input.example.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-browser-local.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-hybrid-file-tools.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-cloud-video.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-ai-token-tool.json
node scripts/evaluate-hosting-options.mjs --file templates/architecture/hosting-choice.example.json
node scripts/check-architecture-evidence.mjs
node --test tests/architecture-economics.test.mjs
```
The **million-cloud-video** sample is intentionally expected to trip a known-budget gate and may exit status 1. This is a correct guardrail, not failing software. Sample other cost reports are **illustrative**; not a provider invoice.

## Research integrity
- **Sources:** `sources/architecture_rate_card_2026-11-23.json`, `sources/architecture_provider_claims_2026-11-23.json`, `sources/architecture_vendor_claims_2026-11-23.json` with checked dates and official URLs.
- **Source watcher:** official docs change detector; no automatic policy/pricing interpretation or plan switches.
- **Unknowns:** all true live provider account prices, domain owner law/terms, average compute costs by codec/provider, bot traffic, first-party revenues and 1M MAU load testing have not been verified.
- **Deployment gate:** tests, mobile compatibility, correct output artifact, privacy/network transmission, capacity and budget proof must be independently run on actual site infrastructure before "ready".

## Key safety decisions
1. MAU is not concurrent users or completed jobs.
2. Local-first saves paid server compute for supported tasks but consumes user device resources and is not zero business cost.
3. Separate static assets, dynamic edge API, object storage, queued CPU jobs, DB and AI tokens.
4. Prevent cost amplification with quotas and user consent; browser direct signed upload avoids trying to buffer huge files in tiny edge isolates.
5. Don't choose noncommercial free hosting for commercial SaaS/AdSense products without verifying permitted use.
6. The cheapest web tool is worthless if it produces corrupt output or fails on real target devices.
