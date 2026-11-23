# Hosting, CDN, database and cloud choices for AdSense-supported tool websites
**Reviewed:** 2026-11-23. **Owner:** `web-hosting-vendor-evaluation`. Primary published sources; neither our account contracts nor measured platform billing is available.

## Question: What actually saves money for a utility portfolio?
**Always distinguish** the cost of hosting the tool's public page from cost of executing the job. One static calculator costs nearly no per-use server CPU when executed entirely in a user's browser. A 2GB video converter may need minutes of CPU/GPU, blob storage, queue writes and multi-GB transfers per successful result. For 1M monthly users the second workload may dominate the infrastructure bill by orders of magnitude.

## Shortlist by the user job, not the brand
| Archetype | Candidates to compare (not an endorsement) | Primary risk |
|---|---|---|
| Static public SEO + browser-only processing | Cloudflare Pages/Workers Static Assets, other commercially licensed CDNs | Static file/bandwidth limits, deploy size, monetization terms, heavy JS/device failures |
| Static+small APIs and caching | Paid Cloudflare Workers, Vercel Pro, comparable serverless CDNs | Per-invocation CPU vs memory/cold-start and limits |
| Sustained CPU workers | Hetzner/DigitalOcean VPS/container provider, Render paid, dedicated servers | Ops burden, burst headroom, patching, backup, egress, queue scaling |
| Bursty compute | AWS Lambda, serverless containers / isolated runners | Duration, memory, cold starts, network and egress fees |
| Temporary job objects | Cloudflare R2 Standard, Backblaze B2, compatible object storage | Op counts, TTL, storage class minima, data region, multipart, egress |
| Dynamic state and accounts | Cloudflare D1, Supabase Postgres, self-managed Postgres | Read amplification, writes, backups, auth, free quota and idle suspensions |
| AI/GPU | Hosted inference API, BYOK, autoscaled GPU containers, native/browser ML | Tokens/sec, GPU utilization, data rights, retries, user credit abuse |

### Not every "free" plan permits a commercial utility product
**Vercel Hobby:** Vercel says personal noncommercial use only. A commercial AdSense/SaaS tool needs a currently permitted paid arrangement. This is a binding plan restriction, not a technical weakness: https://vercel.com/docs/plans/hobby ; https://vercel.com/legal/terms ; https://vercel.com/pricing .
**GitHub Pages:** official policy disallows its use as a free hosting service for online businesses/primarily commercial SaaS; a docs or personal open-source website differs from an operating commercial product. Do not infer all AdSense use is forbidden; evaluate the actual site intent, provider text and revenue model: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits .
**Cloudflare Pages Free:** documented 20k files per site and 25MiB per static asset at time checked; no custom statement here that every commercial workload or bandwidth pattern is contractually unlimited: https://developers.cloudflare.com/pages/platform/limits/ .

### Pricing methodology: apples-to-apples and time aware
For every provider collect:
- official plan, explicit permitted commercial use, account/region/geographic coverage and date;
- fixed monthly base; included requests, CPU, GB-hours, bandwidth, storage, DB operations, queues, build/deploy, logs, support and backups;
- overage increments, minimum billing, egress categories, idle instances, burst/p95 behavior and traffic from bots;
- actual workload: requests and CPU milliseconds per job, average input/output GB, daily peak work and data retention;
- scenario sensitivity: cache hit rates, corrupted outputs/retries, high memory devices, 10×/100× resource abuse, user geo concentration and data residency;
- rollback, portability, operator time, incident costs, software license and security responsibilities.

Don't compare Cloudflare Worker 5ms execution against an AWS Lambda provisioned 2GB/30sec video task by the **same request count**. Don't compare a paid unlimited plan to a free plan that bans your business.

## Current reference sources by vendor
- Cloudflare Workers paid pricing and memory: https://developers.cloudflare.com/workers/platform/pricing/ ; https://developers.cloudflare.com/workers/platform/limits/
- R2 operations and no direct egress: https://developers.cloudflare.com/r2/pricing/ ; https://developers.cloudflare.com/r2/objects/upload-objects/
- AWS Lambda GB-seconds/requests: https://aws.amazon.com/lambda/pricing/ ; CloudFront new pricing plans: https://aws.amazon.com/cloudfront/pricing/
- Vercel noncommercial Hobby, commercial Pro pricing and flat-rate CDN in 2026: https://vercel.com/docs/plans/hobby ; https://vercel.com/pricing ; https://vercel.com/changelog/flat-rate-cdn-is-now-ga-for-pro-teams
- GitHub Pages commercial restriction: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Supabase Free vs Pro and idle pause: https://supabase.com/pricing ; https://supabase.com/kb/faqs/platform/free-postgres-for-side-projects
- Hetzner June 2026 pricing update: https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/
- Render pricing/compute plan updates: https://render.com/pricing ; https://render.com/docs/compute-plans-update
- Bunny CDN: https://bunny.net/pricing
- Backblaze B2: https://www.backblaze.com/cloud-storage/pricing

**Not established:** Which vendor is globally cheapest for our real target workload. Current official price lists alone cannot settle reliability or operational burden; most cases lack comparable benchmark measurements and user billing accounts.

## Portability and staged commitment
- Start with static public HTML, browser utility and minimal provider-specific backend only when needed.
- Keep tool engine separate from UI and hosting adapter, maintain pure functional output fixtures, and use standard Blob/Web Worker interfaces where possible.
- If cloud jobs: separate R2/S3-compatible storage adapter, queue interface, persistent job state, sandbox processor, public result controller, billing and privacy. The public UX must tolerate outages without corrupting results.
- Document a migration plan: DNS, canonical URLs/redirects, billing source, object retention/deletion, auth state, user consent, rate limiting, user audit trails, failover.
- Declare tripwires from actual p95, cost per successful task and provider spend; changing CDN on a whim is a bigger SEO/latency risk than paying a known $5 account fee.

## Enforceable scorecard for a specific tool
```
Candidate: commercial static tool
Job: image resize, 3M monthly operations, input 5MB, browser native supported after mobile tests
Provider A: allowed plan? paid base? assets limits? region? 6M static pageviews? worker invocations?
Provider B: same workload, same month, same traffic geos, same asset bytes
Independent test: local output valid? no upload? p95 on low-end device? actual bill? provider outage?
Decision: selected with real source and failure conditions, otherwise UNKNOWN
```

Do not use **unbounded free third-party APIs** as your computational backend when service terms require consent, impose quotas or forbid resale. Do not silently migrate customer content across providers to save pennies. Commercial viability includes legal, user privacy, support and search visibility controls.
