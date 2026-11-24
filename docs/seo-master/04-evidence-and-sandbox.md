# 04 — Release acceptance: independent sandbox and evidence safety

## Actual local prototype results
Built six indexable HTML pages with accurate canonical/robots/sitemap and a browser-local CSV deduplicator implemented as JavaScript that parses quoted CSV, removes repeated rows and produces local downloadable CSV. **22/22 Node output/edge tests and 32/32 Python local static SEO mutation/HTTP tests passed.** Local static audit found no warnings and production mode properly rejected the placeholder test origin. Chromium Playwright navigation to localhost produced net::ERR_BLOCKED_BY_ADMINISTRATOR; therefore actual clickable GUI/download, cross-browser, mobile and deployment gates were **NOT verified**, not bypassed. No actual Google ranking, indexing, keyword volume, ad approval or revenue is claimed.

## Mandatory negative tests
- Working metadata but deliberately broken JS must be caught by the actual tool-output oracle, NOT static SEO alone.
- Missing H1/title (project consistency), wrong canonical, noindex on declared indexable URL, robots catch-all, missing sitemap entry, orphan/broken link, invalid/fake structured review, unapproved ad tag or ad-click incentive, duplicate human job must produce blocker/review.
- Homepage path '/' is valid; don't reject due to a malformed canonical route regex.
- A source manifest saying indexing VERIFIED or claim SUPPORTED is not proof: only actual opened original source, dated screenshot/export or owner Search Console/AdSense account can certify that particular external fact.
- Every live site audit must use **actual project routes**, not hardcoded image-converter paths.
- Critical failing test must fail release; inability to run browser or open source must stay UNKNOWN, not a synthetic PASS.

## Output states
PASS_LOCAL = tested implementation and static local content, not Googlebot.
BROWSER_VERIFIED = tested actual interactive job and output bytes on appropriate devices.
LIVE_HTTPS = actual deployed host, status/headers, robots/canonical/sitemap, security and rollback.
OWNER_GSC_INDEXED = verified indexed URL with authorized property.
PUBLISHER_APPROVED = authorized real publisher account state.
TRAFFIC_VERIFIED = real human referrals, successful jobs and costs.
Never assume any one state implies another. Stop production-ready language until required states are evidenced.

## Agent output checklist
Actual sources and dates; user-job and keyword/page map; output fixtures and checks; deployment architecture and cost; HTTP/HTML/real browser evidence; security/privacy/consent; source rights; publisher approval; measured GSC; business funnel; unknowns, rollback and cheapest corrective action. Do not inject all 48 skills into every tiny task.
## Dynamic live HTTP route guard
`scripts/audit-live-site.mjs` now requires explicit `--routes-file`, `--origin` and `--authorized-origin` and rejects synthetic manifests by default; it cannot infer project pages from the name of an example converter. Use actual approved site routes, current real canonical and sitemap. The output is `PASS_HTTP_ONLY` or `FAIL_HTTP`, never Google indexed or publisher-approved. Use separate working-browser, GSC and monetization evidence before release.

## V12 repeatable shipped-UI validation
The original standalone six-page lab had 22 Node and 32 Python passing checks but an administrator-blocked browser. V12 adds an independently GitHub-tested single-page *actual shipped* CSV tool with JavaScript parser, file/paste UI and verified browser downloads in Chromium/Firefox/WebKit, a deliberate broken-script negative case, crawler-specific robots checks and self-declared evidence firewall. Its example.org hostname is testing-only. The standalone sandbox sample was separately extended with 27 Node and 37 Python checks. These results are from different test scopes and must never be added up as production search ranking, native phone tests or AdSense approval.
