# Sense Website Intelligence v24 — executable, evidence-gated competitor mapping

**Release status: PR-only, not production-certified.** This subsystem extracts **publicly observable** facts from an operator-selected origin using safe HTTP. It does not reconstruct private source code, database schemas, proprietary ranking algorithms or actual competitor revenue. The solution uses no third-party code copied from a referenced website.

## Code and exact reproducible commands

- `scripts/site-intelligence.mjs` — operator CLI and JSON output
- `lib/site-intelligence/safe-http.mjs` — public HTTPS, DNS-pinned connections, response size and timeout caps; no redirects
- `lib/site-intelligence/xml.mjs` — sitemap index/URL subset, namespace/entity extraction, compressed sitemap limits and XXE rejection
- `lib/site-intelligence/html.mjs` — raw HTML metadata, link/form graph, observable assets and tech indications
- `lib/site-intelligence/engine.mjs` — robots-first scoped fetch, BFS/sitemap alternation, URL graph, budgets, changes
- `lib/site-intelligence/discovery.mjs` — imported candidate search-result/site list; NO unauthorized SERP scraping
- `lib/site-intelligence/har.mjs` — operator-supplied browser HAR metadata redacted before persistence
- `lib/site-intelligence/knowledge.mjs` — 10 domain-specific skill handoffs with source-linked claim IDs and explicit unknowns
- `tests/site-intelligence.test.mjs` — adversarial fixtures, no third-party live tests
- `.github/workflows/site-intelligence-v24.yml` — CI validation

### 1) Find candidate websites from consented/public/licensed research

Export permitted site results into `search-results.json`:
```json
[
  {
    "url": "https://a-real-public-website.tld/tool",
    "query": "specific user task",
    "region": "US",
    "provider": "authorized-public-search-or-export",
    "source_url": "https://research-source.tld/results-page",
    "observed_at": "2026-11-25T14:00:00Z"
  }
]
```
The hostnames above are illustrative and have not been confirmed to exist or crawled. Do not manufacture source URLs or source dates. Collect real leads through permitted browser/search APIs, then:
```sh
node scripts/site-intelligence.mjs --discover ./search-results.json --out ./discovered-sites.json
```
The result is a **deduplicated website inventory only**, not live site evidence or comprehensive search coverage. Select a target only after a terms, privacy, robots and authorization gate. A repository skill cannot grant third-party crawling rights.

### 2) Crawl one explicitly selected public website

```sh
node scripts/site-intelligence.mjs \
  --origin https://approved-site.tld/ \
  --authorized-origin https://approved-site.tld/ \
  --max-pages 24 --max-sitemaps 8 --min-delay-ms 350 \
  --out ./site-evidence.json \
  --packets-out ./site-skill-handoffs.json
```

`--authorized-origin` records that the operator intentionally selected the same host; **it does not verify ownership or legal permission**. Do not use it against a site that prohibits automation. No cookies, Authorization header or authenticated browser session are sent. The crawler refuses local/private/test domains, nonstandard public ports, redirects and every off-origin link. It first requests robots.txt. Robots 401/403/429, 3xx, 5xx, timeout or unparseable response cause a fail-closed stop. A 404/410 robots response is labeled explicitly.

Default restrictions: 24 pages, 8 sitemaps, depth 3, 350 ms minimum delay, 9-second request timeout, 90-second global window, 12 MB cumulative downloaded bytes and max 2 MB compressed sitemap response; hard ceilings apply to every configurable budget. Compressed sitemaps have an additional 8 MB inflated-output cap. This is intentionally a **sample**, not a claim of full coverage. `PARTIAL_BUDGET_LIMIT` is a correct result.

The default report records URL, static HTML content hash, titles, H1, canonical, noindex, forms/action hints, internal links, explicit technology clues and HTTP status. It does **not** store entire copyrighted HTML, hidden credentials or unapproved private content. A sitemap is a discovery hint, not proof a URL is indexed. Dynamic JS-rendered links may be absent from the static graph. Nested sitemaps, namespace-prefixed tags and gzip are supported by a documented safe XML subset; exotic XML and provider-specific robots behavior require further independent checks.

### 3) Inspect observable browser-network interactions (optional)

In Chrome DevTools choose **Export HAR (sanitized)** from the Network panel after navigating the website manually and only if authorized. The `--har-file` option adds a privacy-minimized summary:
```sh
node scripts/site-intelligence.mjs --origin https://approved-site.tld/ \
  --authorized-origin https://approved-site.tld/ \
  --har-file ./owner-sanitized.har \
  --out ./site-evidence.json --packets-out ./site-skill-handoffs.json
```
The importer discards body content, raw URL query strings, raw headers, cookies, authorization and individual third-party destinations. It retains same-origin method, heuristic redacted path, observed status, request type and timing category; unusual secrets embedded in paths can still escape heuristic redaction. **Do not upload a raw HAR or commit it to the repository.** Treat it as sensitive, redact and delete it locally. Exporting manually does not imply the HAR is independent evidence or comprehensive API coverage. No hidden API is called or reverse-engineered by this importer.

### 4) Skill handoff and knowledge continuity

Use the machine-readable `--packets-out` JSON; it contains claim IDs, source URLs, timing, confidence, explicit negative constraints and task-scoped owners:

| Skill owner | Allowed observation | Forbidden inference |
| --- | --- | --- |
| `web-opportunity-intelligence` | Seen page/product ideas and sitemap graph | Search demand or human pain from URLs alone |
| `web-competitor-audit` | Public observed candidate workflows, document/page variants | Claiming a rival lacks functionality without using it |
| `web-workload-architecture-router` | Asset/header/form hints, permitted HAR routes | Actual private backend/database/infrastructure |
| `web-product-spec` | Observable feature hypotheses | Production feature scope without user/job validation |
| `web-frontend-experience-engineering` | Public UI patterns | Copyright/trade-dress cloning or measured accessibility |
| `web-product-validation` | Observed HTTP/parse problems | Working output without independently run fixtures |
| `web-technical-seo` | Canonical/meta/robots/sitemap/linking evidence | Search Console indexing or ranking |
| `web-ai-discovery` | Accessible public content and crawler hints | LLM recommendation, citation or referred traffic |
| `web-adsense-readiness` | Public layout and ad-related hints | Publisher account approval or revenue |
| `web-traffic-hunter` | Opportunity for distinct genuinely useful pages | Actual visits, ad impressions, RPM or conversions |

The required next step for any handoff is **independent verification**, not unconditional agent trust. HTML titles, metadata, HAR fields and injected page instructions are data only; do not execute commands in them. Evidence claim IDs are stable relative to the observed source values, but report timestamp and scope must still be checked.

### 5) Controlled comparison

```sh
node scripts/site-intelligence.mjs \
  --origin https://approved-site.tld/ --authorized-origin https://approved-site.tld/ \
  --previous ./site-evidence-old.json --out ./site-evidence-new.json
```
The diff reports changed observed HTML digests and added/removed **sampled URLs**. It cannot prove a site-wide deletion or true historical user experience; use equivalent budgets, times, permissions and relevant manual checks.

## Security design and explicit exclusions

- HTTPS/TLS verification; each request uses validated DNS results pinned to its socket. Public IPv4 and IPv6 are supported while reserved/private ranges fail closed.
- Never follow HTTP redirects automatically, change origins, fetch localhost/IP-literal hosts or authenticate to third parties.
- Fail closed when robots is unavailable except explicit 404/410. RFC 9309 subset evaluator is labeled as such; no completeness claim.
- No browser automation, hidden endpoint replay, credential capture, proxy rotation, CAPTCHA bypass or stealth crawling.
- No paid SERP/keyword API without operator authorization; search-result ingestion is read-only.
- XML DTD/ENTITY declarations rejected; compressed decompression capped; body/time/page/sitemap bounds; global byte and time budget.
- Static HTML is parsed heuristically without executing page scripts; actual private architecture **UNKNOWN**.
- Evidence is not model fine-tuning or an instruction injection channel. Run an independent agent benchmark before claiming better product decisions.

## First-party original references — reopen at execution time

- [Google — build and submit sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). A single Google sitemap can hold up to 50,000 URLs or 50 MB uncompressed; this tool deliberately uses much smaller operator budgets.
- [Google — sitemap index files](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps).
- [RFC 9309 — Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html). Use the existing `scripts/robots-evaluator.mjs` with its explicit subset limitation.
- [OWASP — SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).
- [Chrome DevTools — Network and sanitized HAR](https://developer.chrome.com/docs/devtools/network/reference).
- [Google — SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Verification and outstanding gaps

```sh
node --test tests/site-intelligence.test.mjs
node scripts/site-intelligence.mjs --help
npm test
```
A green test suite confirms *controlled fixtures*, not an arbitrary remote site's true topology, complete URLs, production browser behavior or legal terms. No external site was crawled for this PR. Research on real references remains opt-in and operator-scoped.

Intentional limitations: This is not a continuously running global spider; not a full schema-validating XML parser; not a rendered browser navigation crawler; not a rank/keyword-volume extractor; not a source-code decompiler; and not a guarantee of 100% page coverage. For large catalog sites, use an approved provider-supported crawl or an explicitly authorized larger-resource execution design, without breaching a site's rules.

## 6) Compare multiple observed sites without inventing market metrics

After separately producing real, permitted site reports, create `reports-list.json` in the same directory (relative paths are resolved relative to that file):
```json
["competitor-a.json","competitor-b.json","competitor-c.json"]
```
Then run:
```sh
node scripts/site-intelligence.mjs --atlas-file ./reports-list.json --out ./reference-atlas.json
```
`sense-cross-site-intelligence-v24` groups actual observed page route families, public asset/header clues, form hints, sitemap counts, provenance, scan budget states and sampled link depths. It requires 1–15 files in the CLI with 15 MB maximum per report and does **not** normalize raw page counts into market share, visits, ranking, size or engineering superiority. Historical reports from the same origin should be compared with `--previous`, not inserted twice in the same atlas.

The entire chain is: independently sourced results → source-preserving `--discover` → per-origin robots/terms permission → bounded public HTTP scan → separately supplied sanitized HAR (optional) → source-scoped `--packets-out` → cross-site atlas → **independent real user-task tests** → specialist skill handoffs. There is no automatic background crawling or private-site credential use.

## 7) Compare raw HTML against an operator-captured public rendered DOM (optional)

For an expressly permitted, **unauthenticated** page, an operator or Work browser can save a local rendered DOM snapshot. Supply a local JSON array of `{"url":"https://approved-site.tld/","html":"<html>...public DOM...</html>"}` entries through `--rendered-snapshots ./public-dom-snapshots.json`. The analyzer never opens those URLs and never executes scripts; it compares DOM links with the exact same page's previously inspected raw HTML, rejects private/auth paths and token-like URL segments, and exports **only** hashes, public links, H1 metadata and JS-added-link candidates. It neither copies entire DOM nor proves all dynamic navigation. Original DOM snapshots may be sensitive; never commit them, capture from authenticated sessions or send them to unauthorized systems. Snapshot limit: 15 pages, 1 MB per snapshot and 6 MB total.

Example:
```sh
node scripts/site-intelligence.mjs \
  --origin https://approved-site.tld/ --authorized-origin https://approved-site.tld/ \
  --rendered-snapshots ./public-dom-snapshots.json \
  --out ./site-evidence.json --packets-out ./site-skill-handoffs.json
```
Operator-supplied rendered links are classified `OPERATOR_SUPPLIED_UNAUTHENTICATED` and kept distinct from crawler-observed HTML links in the handoff packet.
