# Evidence boundary of automated audits

`validate-skills.mjs`: validates structure of YAML front matter and skill discovery. Does not evaluate writing quality or policy correctness.

`check-sources.mjs`: validates the local registry format and stale dates. Does not fetch URLs or re-check vendor policies.

`audit-static-site.mjs`: checks built HTML files, titles, descriptions, H1s, canonicals, a robots sitemap pointer and sitemap output. Does not test live redirects, WAF, CDN, Google indexing, structured data eligibility, policy, or UX. Script is intentionally a conservative baseline, not a complete technical SEO scanner.

`audit-live-site.mjs`: checks a few public HTTP endpoints; does not impersonate crawlers, verify actual bot IPs, or prove indexation/ranking/AI citations. User must inspect Search Console, Bing Webmaster Tools and server logs.

`npm test`: verifies code-level examples and happy/failing static fixtures, not site readiness. Real Astro production verification must run in each consuming site.

An automated test PASS never overrules a policy reviewer, licensed keyword dataset, actual user task, site-review outcome or business unit economics.
