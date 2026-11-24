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