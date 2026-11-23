# Staged launch, monitoring, privacy and SEO/ad incident response
**Reviewed 2026-11-23. Owner:** `web-release-observability-operator`; human reviewer remains accountable.

## CI/CD and infrastructure proof
A reproducible build includes pinned dependencies, locked version/commit, SCA/secrets/SBOM review, clean lint/test/typecheck, deterministic tool fixture tests and minimized output bundle. For real website deployments:
- DNS, HTTPS, canonical domain/redirects, secure headers, scoped secrets and no public storage credentials;
- staging production parity with separate real publisher tag settings; no live invalid-traffic ad testing;
- versioned assets, cache headers, prewarming CDN migrations and preserving indexable raw HTML;
- deployment canary, rollback and database migration backup; no silent production data destruction;
- incident/on-call contacts, alert SLO and cost caps.

## Owner-metric separation
| Outcome | Authoritative source | Not equivalent to |
|---|---|---|
| Tool correct output | Independent fixture and real user completion | Passing UI snapshot |
| SEO crawl/coverage | Verified Google/Bing webmaster account, server logs | Sitemap submitted |
| Search rank/impressions | Country/query/date first-party Search Console | Ahrefs traffic estimate |
| AI source citation | Actual AI result URLs/time/prompt and owner referrals | Model mention, bot log, llms.txt |
| Publisher approval | AdSense/other network owner account status | ads.txt returned 200 |
| Ad revenue | Publisher net earnings and valid inventory after adjustments | Modelled RPM × pageviews |
| User happiness | Completion, retention, support/error resolution | Pageview count alone |
| Scaling | Load test and real p95/queue/CPU/memory metrics | "1M users" title in cost model |

## Risk/incident priorities
1. Secret leak/SSRF/private file access: stop affected API, rotate credentials, revoke grants, investigate customer impact and legal notification requirements.
2. Unbounded AI/token CPU cost: hard admission stop and per-tenant throttles; don't wait for billing email.
3. SEO crawler outage after CDN/WAF change: inspect verified crawler 403/429/503 and origin cache behavior, rollback WAF rule, retain legitimate robots policy.
4. Ad policy warning or invalid traffic: stop suspicious traffic sources, remove deceptive placements, check publisher console/policy center; don't fake or incentivize clicks.
5. User task output corruption: disable affected codec/route immediately, notify users, repair fixture/oracle, audit downloads generated under bad version.
6. Consent outage: do not silently turn on personalized ads without valid consent; region/product-specific CMP tested.

## Privacy and legal caveats
Geo and data-processing rules, consent frameworks, children's data, privacy-by-design, content licensing, trademark, medical/financial claims and international transfer restrictions require country- and operation-specific legal review. Do not treat user-uploaded legal enforcement dates as verified. Google-certified CMP/IAB TCF for EEA, UK and Switzerland has platform requirements separate from global legal compliance; not every request is consented just because a banner appeared.
Source: https://support.google.com/adsense/answer/13554116 ; https://support.google.com/adsense/answer/16737 ; https://www.w3.org/TR/WCAG22/ .

## Every release evidence manifest
Build SHA, URL/country, original source docs checked, manual reviewer, tools/versions/fixtures, actual environment and browser devices, SEO raw HTML and WAF fetch, consent/ad screenshot, security test report, SLO and financial budget, real outputs, known UNKNOWN/NOT_RUN fields, deployment status and rollback. A human-approved go/no-go state is distinct from future search results and ad approval.

## Research iteration protocol
Each discovered missing requirement enters: question → primary-source check → evidence class → minimal implementation → regression test → independent review → monitoring. Update relevant skill rather than generating a generic extra skill per fact. Treat provider docs as changing sources and alert on revisions; not every content hash change is a new binding policy.
