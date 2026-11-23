# Million-user tool economics: separate users, jobs, requests, storage and machine time
**Date:** 2026-11-23. **Owner:** `web-unit-economics-finops`. Rates are dated published list prices, not forecasts of provider billing or publisher RPM.

## The denominator problem
"One million users" can mean cumulative signups, unique monthly active users (MAU), sessions, pageviews, job starts, successful downloads or API requests. They are not interchangeable. The operational model must be explicit:
- `MAU × visits/MAU = visits`.
- `visits × pageviews/visit = public pageviews`.
- `MAU × job_attempts/MAU = total tool attempts`.
- `jobs × remote_fraction = cloud billable jobs`, not all public pageviews.
- `jobs/(30×86400) × peak_multiplier = peak job arrivals/s`. Peak live jobs approximately rate × job wall time; provisioned cores approximately arrival rate × measured CPU seconds / utilization.
- `remote_jobs × measured CPU_seconds / 3600 / utilization = indicative billed core-hours` when using an hourly-vCPU model. Actual provider bills use different tiers/rounding and idle rules.

### Four reproducible illustrative scenarios
| Scenario manifest | Hypothesis | Major meter |
|---|---|---|
| `million-browser-local.json` | 1M MAU, 3 jobs each, all local; static delivery 0.25 MB/page | Static delivery and ongoing product/support, not billable remote transcoding |
| `million-hybrid-file-tools.json` | 1M MAU, 3 jobs each, 5% remote, 30 core-sec/cloud job | 150k remote jobs/mo, CPU-hours, object writes/reads and queue |
| `million-cloud-video.json` | 1M MAU, 3 jobs each, **all** remote, 120 core-sec/job, 250MB input +200MB output | 3M CPU jobs/month plus 1.35 **petabytes** of monthly input+output traffic before caching/compression; formidable peak burst |
| `million-ai-token-tool.json` | 1M MAU, 3 jobs each, 10% remote LLM jobs | Input/output tokens, retries, context/quality, inference provider and ads economics |

Every scenario is **synthetic and hypothetical**, not actual traffic or a cloud provider compute quote. Cloud compute USD/core-hour and model token price are user-declared modeling parameters; never cite them as Cloudflare/AWS official prices. Static CDN hypothetical $0 applies only where actually covered by a provider plan, not globally.

### Dated official meter snapshot (check current pricing again before launch)
| Resource | Included Workers Paid baseline | Incremental published list price |
|---|---|---|
| Workers Paid account | $5/mo base | Worker invocations: first 10M/mo then $0.30/1M; CPU: first 30M CPU-ms/mo then $0.02 per 1M CPU-ms |
| R2 Standard | 10 GB-month, 1M Class A, 10M Class B | $0.015/GB-month, $4.50/1M Class A, $0.36/1M Class B; direct R2 egress $0 |
| Queues Paid | 1M standard operations/mo | $0.40/1M operations; normal message can involve write+read+delete (3 operations), retries add reads |
| D1 Paid | 25B rows read, 50M rows written, 5GB storage | $0.001/1M read rows, $1/1M written rows, $0.75/GB-month above storage inclusion |

These are **product-specific** meters, not all fees of a hypothetical site. Worker static assets may avoid per-dynamic Worker invocation charges; don't bill the same cached asset as a full Worker invocation by default. R2 billing rounds by units; the executable model rounds above-free Standard storage and operation units conservatively. Queues count per 64KB payload chunk and retry. D1 charges rows scanned/written, not simply query count, and indexes/poor queries can change usage.
Sources:
https://developers.cloudflare.com/workers/platform/pricing/
https://developers.cloudflare.com/r2/pricing/
https://developers.cloudflare.com/queues/platform/pricing/
https://developers.cloudflare.com/d1/platform/pricing/

### Cost trap: "free egress" doesn't mean free video
Cloudflare R2 direct egress is priced $0, but that doesn't eliminate upload origin data transfer, CPU worker execution, storage, object operations, client device network, customer support, billing taxes, third-party API calls, observability or security incidents. For video encoding, CPU/GPU compute and A/V correctness dominate. Rate-card tool leaves external core-hour cost to explicit scenario assumptions.

### How to run scenarios
```sh
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-browser-local.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-hybrid-file-tools.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-cloud-video.json
node scripts/model-tool-economics.mjs --scenario templates/architecture/scenarios/million-ai-token-tool.json
```
Output fields include `monthly_active_users`, `attempted_jobs`, `browser_local_jobs`, `remote_jobs`, `peak_remote_inflight_jobs`, `indicative_peak_cpu_cores`, resource meters, each dollar line item, known subtotal, missing price categories and modeled budget breach. NEVER turn a modeled known subtotal into "total cost" when support or legal or another provider meter is unpriced. The CLI may exit with nonzero status when budget known-line breach is detected; that is an early economics warning, not site failure.

### Break-even revenue
Compare cost/**verified successful job** with real attributable revenue and actual hosting cost (Google AdSense revenue in owned reports, paid subscriptions, API contracts, etc). RPM is **revenue per thousand eligible ad impressions/pageviews as defined by publisher**; impressions are not MAU or successful files. CPC keyword value from Ahrefs does not equal publisher income. If no Ads publisher account data, keep expected ad revenue UNKNOWN; make scenario assumptions explicit if any.

### Attack modeling
Before launch simulate 10× and 100× remote abuse, 4× token variance, 10% corrupt retries, object storage retention failures, expensive codecs, fake free-download bots, and sudden CDN cache-miss or WAF errors. Make per-tenant CPU credits and a global hard spending limit enforceable, not mere email alert.

### Remaining unknowns for production
Peak workload shape, true output bytes, actual codec CPU-seconds on target CPU, support/maintenance, privacy obligations, contracts, AdSense account RPM, real provider storage invoicing, SLO and queue throughput. Revisit per product and at each significant price change.
