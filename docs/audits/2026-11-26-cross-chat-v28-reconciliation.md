# Sense cross-chat project reconciliation and V28 release guard — 2026-11-26

**Repository:** LETSCOOKTECH/web-earnings-master (public). **Scope:** reusable Codex / AI agent skills and audit utilities, **not** an already-profitable tool company, live search ranking, automatic AdSense approval or a complete operating system.

## 1. Operating objective recovered across the six Sense discussions

Build an evidence-led skills library that gives an agent a reproducible path from finding a real user problem through competition and keyword research, choosing low-cost/browser-local architecture, creating a genuinely working tool (Astro preferred when justified), verifying output correctness, preserving privacy/security, evaluating crawl/index/AI-search visibility, meeting publisher restrictions and measuring actual user acquisition, retention and net contribution.

The system must challenge weak opportunities instead of auto-approving them. Never conflate crawl eligibility with indexing, ranking, AI citation, ad account eligibility, fill rate, revenue or profit. Every positive claim needs an inspectable original artifact and a clear verification scope; synthetic examples are not business evidence.

### Historical milestones — previous conversation reports, **not newly reproduced here**

| Phase | Earlier reported scope | Durable limitation |
| --- | --- | --- |
| Foundation / V3 | Research, source watch, SEO and browser fundamentals | Source inventories are not deployed-site proof |
| V7–V14 | SEO, publisher rules, keyword provenance, AI-surface readiness | Ranking, citations and ad approval unverified |
| V20–V22 | Domain-safe CSV demonstration; JSONL Astro starter; evidence-gated tool creator | Local bounded task success only, no public service |
| V23–V25 | 50 active skills; discovery, demand triage and Astro engineering auditor | No real customer demand or revenue proof |
| V26 | Upstream-skill provenance and integration verification | Comparison with holdout agents not completed |
| V27 | Public agent-access discovery workflow | Repository discoverability is not guaranteed crawler indexing |

The attached 2026-11-26 competitor and engineering memo is a **research lead**, not authenticated Semrush owner-account evidence. Its absolute traffic numbers, CPC estimates, search terms and competitor restrictions must be verified with dated original exports or capture receipts before they are used in GO decisions.

## 2. Seven attached claims — verified assessment and action

1. **2 MB CSV / 5,000 rows:** Real product constraint, explicitly tested in V21. This is **not evidence of a parsing bug**. Test a streaming/OPFS/DuckDB alternative on representative 25–250 MB inputs and weak devices before changing it; Web Workers do not give unlimited RAM.
2. **COEP and AdSense:** A real compatibility risk on monetized HTML; added route-level checks for `Cross-Origin-Embedder-Policy: require-corp` as a blocker and `credentialless` as a browser-verification warning. The header alone cannot verify actual ad rendering.
3. **noindex/robots:** Starter `example.org` is intentionally nonindexable. Existing static/live audits already checked some noindex rules; V28 closes HTML meta attribute-order gap and evaluates deployed robots groups per route for search and ad crawlers.
4. **28+ tool click depth:** No deployed 28-tool graph was supplied, so this is a **design hypothesis**. For a hub-and-spoke navigation, instrument actual HTML anchors and shortest-path depth; missing sampled links are not proof of orphan pages or Google ranking loss.
5. **CSV → JSONL → Parquet → CSV:** Useful pending fidelity suite. Exact value/schema equivalence requires explicit schema and reversible encoding; generic CSV cannot preserve all null, scalar type and nested-object semantics on its own. Do not claim lossless round trips without a specified type contract.
6. **No paid Semrush API:** The V22 evidence schema already accepts manually documented operator sources and V25 does not certify demand. Review quality and independent authenticity, not an assumed mandatory paid API dependency. Google Trends 0–100 is relative interest, not search volume.
7. **CLS / ad-control proximity:** Real placement risk. Build end-to-end transient-state and mobile-viewport tests with actual ad containers; the proposed 32 px distance and CLS 0.01 are internal design targets **not official AdSense thresholds**.

## 3. V28 checks and use

Shared module: `scripts/publisher-indexability-v28.mjs`; called by `scripts/audit-live-site.mjs` and the static audit for HTML noindex detection. Existing older guards and code remain in place.

Declare intended publisher routes explicitly in the owner-authorized live manifest (example only; replace the origin and inspect your own deployment):

```json
{
  "site_origin": "https://your-owned-domain.tld",
  "ai_discovery": true,
  "sitemap_path": "/sitemap-index.xml",
  "pages": [
    {"path": "/", "indexable": true, "monetized": true},
    {"path": "/tools/jsonl-validator/", "indexable": true, "monetized": true}
  ]
}
```

Run `node scripts/audit-static-site.mjs --dist dist --origin https://your-owned-domain.tld --production --monetized` for an all-monetized static site. For mixed monetization use the per-route live manifest. Run `node scripts/audit-live-site.mjs --origin https://your-owned-domain.tld --authorized-origin https://your-owned-domain.tld --routes-file owner-routes.json --out live-release.json` on an explicitly authorized public HTTPS origin.

The live audit now reads `robots.txt` first; validates Googlebot and Bingbot access to indexable routes; checks Mediapartners-Google access **only** where `monetized: true`; inspects initial HTML and `X-Robots-Tag` for noindex; and checks COEP only on ad-enabled routes. OAI-SearchBot / PerplexityBot restrictions are **warnings** when `ai_discovery: true`, since crawler permissions are an owner choice and are not a guarantee of citation.

Do not treat a `PASS_HTTP_ONLY` receipt as approval, ranking, ad fill, accessibility, cross-device stability or conversion proof. Production failures still require source inspection, actual browser verification, and owner search/publisher dashboard evidence.

## 4. Hard launch gates outstanding

- **Demand:** original keyword/Trend exports + dated SERP/user-job tests and accessible competitor same-input outputs. Do not use pasted Semrush figures as verified measurements.
- **Product:** representative correctness, malformed/adversarial inputs, actual downloads, browsers and low-memory-device tests; large-file upgrade only after measured benchmarks.
- **SEO/discovery:** real owner-domain DNS, TLS, deployed robots, canonical, sitemap, Search Console coverage, AI crawler logs, independent answer-panel observations and citations by real engine.
- **Publisher:** original account/network eligibility, consent/privacy, actual ad rendering with browser network/console inspection, error/preview-induced CLS, adequate ad/action separation, no misleading placements and human review.
- **Economics:** user acquisition sources, retention, ad RPM by geography and page type, variable costs, hosting/egress, invalid-traffic risk, downside and rollback strategy.

### Original primary references

- Google Search noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Google special-case crawlers / Mediapartners-Google: https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers
- Google AdSense placement policies: https://support.google.com/adsense/answer/1346295
- AdSense implementation practices: https://support.google.com/adsense/answer/1282097
- COOP/COEP browser isolation: https://web.dev/articles/coop-coep

**Evidence status:** bounded local V28 tests must pass in CI. Live domain audit, ad request success, search traffic, AI citations, business margins and production launch: **NOT VERIFIED** in this reconciliation.
