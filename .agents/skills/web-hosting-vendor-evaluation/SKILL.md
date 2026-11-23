---
name: web-hosting-vendor-evaluation
description: "Compare commercially permissible website hosting, CDN, VPS, serverless, database and storage vendors using dated official prices, quotas, workload fit, hidden costs and exit paths."
---

# Production vendor and hosting strategy — cheapest viable, policy-safe provider

**Trigger:** Hosting provider selection for commercial web tools, free hosting, Astro/static CDN, 1M MAU websites, VPS, AWS, Cloudflare, Vercel, Netlify, Render, Supabase, storage, hosting migrations or outage/price risks.

**Owner:** Choose provider, region, plan and contractual fit for a *specific workload* rather than declare a universal winner. `web-workload-architecture-router` chooses execution topology, `web-unit-economics-finops` owns numeric monthly cost, `web-scale-reliability` owns actual load tests.

## Vendor assessment protocol
1. Identify business model before recommending a plan: AdSense-supported public utilities, paid API, subscription SaaS, educational/public nonprofit, private experimentation or app-service backend. **Do not recommend personal/noncommercial free tiers for a commercial site without checking the current terms.**
2. Confirm workload and estimated meters: public HTML/static GB transfer, static asset and deploy counts, Function/Worker invocations and CPU, persistent DB reads/writes, storage GB-month, object A/B ops, queue ops, raw upload/download bytes, server CPU-hours and AI tokens. Derive p95 peaks, not MAU only.
3. Open and date the CURRENT official pricing and permitted-use terms for each shortlisted vendor. Do not use price comparison blog snippets as the billing source. Mark plan/region/effective date/overage/free trial/contract/currency/tax.
4. Shortlist distinct hosting strategies: static-first CDN+browser processing; commercial paid edge plans; VPS behind CDN for sustained CPU; ephemeral serverless/queue for bursty jobs; external managed DB only for stateful jobs; object storage/direct uploads; GPU/AI providers when unavoidable.
5. Model the **same workload** for each: base fee, included resource, cache hit rate, bandwidth charged by geography, CPU+RAM utilization, storage operations, outbound egress, concurrency, idle servers, retries, premium support, backups, monitoring and security. Compare the complete dollar range, not misleading $/request.
6. Explicitly test provider limit/contract pitfalls: static assets count/file-size, Workers memory/CPU/body size, shared/burstable CPU vs dedicated, blocked email outbound, allowed commercial hosting, account quotas, scaling ceilings, deployment limits, suspensions, support SLA and data locality.
7. Build portability/exits: generic static bundle, OCI container/worker adapters, S3-compatible object APIs, SQL backup/export, DNS control, provider-neutral job states and secrets management. Beware Cloudflare-specific bindings and platform SDK lock-in; do not over-engineer portability for a one-page calculator.
8. Confirm actual user location and target audience for latency/data residency (not only business owner city), privacy legislation and reliability expectations; obtain actual hosting/region benchmarks for high-stakes usage.
9. Validate with a **representative pilot**: deploy isolated test, inspect headers/TTFB/performance/billing, run permitted modest load, verify account commercial terms, budget limits and rollback. Never claim 1M production-ready from published CDN capacity alone.
10. Return ranked recommendation WITH rejection reasons, per-scenario estimate, unknown costs, source links checked date, free-tier eligibility and migration/failover trigger. A small paid plan with unlimited business use may beat a misleading free plan.

## Selected provider gotchas verified / needing action-time recheck
- **Cloudflare Workers/Pages/R2:** Static-first cost can be low, but Workers paid billing, 128MB isolate memory, Pages Free asset/file limits, R2 A/B ops and Queue retries must be separately priced. https://developers.cloudflare.com/workers/platform/pricing/
- **Vercel Hobby:** official Terms/Hobby restrict to personal noncommercial use; don't place AdSense monetized commercial tool SaaS on Hobby by default. Pro is a separate paid commercial plan; pricing/product design evolved in 2026. https://vercel.com/docs/plans/hobby ; https://vercel.com/legal/terms ; https://vercel.com/pricing
- **GitHub Pages:** official limits say not intended/allowed as free host for an online business/commercial SaaS. It remains appropriate for source docs and some noncommercial projects; don't recommend it as a default monetized production utility host. https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- **AWS Lambda/CloudFront:** Lambda charges request + memory-duration (GB-seconds), CloudFront has distinct price models; AWS networking/logging/other services need explicit bills. https://aws.amazon.com/lambda/pricing/ ; https://aws.amazon.com/cloudfront/pricing/
- **Managed hosting (Render), database (Supabase), VPS (Hetzner), CDN (Bunny), storage (Backblaze B2):** use dated current primary provider descriptions to evaluate tradeoffs. Supabase Free can pause unused projects; a self-managed VPS may be cheap at sustained utilization but demands patching, security, backups and on-call. https://render.com/pricing ; https://supabase.com/pricing ; https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/ ; https://bunny.net/pricing ; https://www.backblaze.com/cloud-storage/pricing

## Release blockers
- UNKNOWN if no verified commercial-use entitlement for the website's actual revenue model.
- UNKNOWN if relevant server CPU, bandwidth, paid quotas or external API prices are absent. Missing price != free.
- FAIL for deploying multi-GB upload or transcode directly through a platform request route lacking memory/body/CPU capacity.
- FAIL for commercial projects that knowingly violate a provider's noncommercial free-tier terms.
- FAIL for claims of infinite free bandwidth/CPU, guaranteed uptime or 1M simultaneous task support from plan marketing alone.
- FAIL for production deployment without measured browser task correctness, quotas and real spend/cost alerts.
- FAIL for moving sensitive user files to an undisclosed region/provider without permission and retention controls.

## Outputs and references
- `docs/architecture/06-vendor-cost-comparison.md` — eligible plan matrix, pricing/time validity, portability and breakeven.
- `docs/architecture/03-million-user-economics.md` + `scripts/model-tool-economics.mjs` — workload-based arithmetic.
- `sources/architecture_provider_claims_2026-11-23.json` + official source watchlist — source/provenance ledger.

**Handoff:** Provider choice ADR with current official price/terms, same-workload comparison, owner-reviewed commercial eligibility, actual pilot and fallback. Never imply a specific company endorsed this design or that a pricing calculator approves provider billing.
