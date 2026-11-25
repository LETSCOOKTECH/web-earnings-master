# V20 Real-site release and agent-quality contract
Date: 2026-11-25. Owner: all Sense Codex agents. A local green test is not a website launch.

## Five distinct release states

| State | Required evidence | Never infer |
| --- | --- | --- |
| FIXTURE_ONLY | source path, local tests or synthetic canonical | running app or public hostname |
| LOCAL_HTTP_VERIFIED | exact localhost address, real browser interactions and downloadable output bytes | DNS, TLS, public availability |
| BUILD_ONLY_NOT_DEPLOYED | built file hashes, internally consistent intended-domain canonicals/sitemap | hosted files, verified host ownership |
| EXTERNAL_HTTP_OBSERVED | externally resolved owner-authorized DNS/TLS, public HTTPS pages, deployment version, redirects, 404, WAF and real browser task | index/citation/AdSense/revenue |
| EXTERNAL_BUSINESS_OUTCOMES | actual authorized search and publisher account records, real customers and task success | guaranteed future rankings or earnings |

The only allowed public product URL is one actually hosted and verified. IANA-maintained example.com, example.net and example.org (and their subdomains) are reserved for examples and must never be described as working product domains.

## CSV lab: complete and reproducible process

1. Read examples/seo-csv-lab/README.md. Start the real local fixture using node scripts/preview-seo-csv-lab-v20.mjs and open the printed localhost address on the same machine.
2. Run npm test; run browser E2E with installed Chromium/Firefox/WebKit, including download-byte equality, error states, off-origin requests, malformed data and security controls. A local browser test confirms only this local build.
3. A public release requires a domain actually controlled by the publisher. Run node scripts/build-public-csv-demo-v20.mjs --origin ACTUAL_OWNED_HTTPS_ROOT_ORIGIN --out EMPTY_OUTPUT_DIR; the output status is BUILD_ONLY_NOT_DEPLOYED.
4. Execute node scripts/audit-static-site.mjs --dist OUTPUT_DIR --origin ACTUAL_OWNED_HTTPS_ROOT_ORIGIN --production; inspect emitted canonical, robots and sitemap. This command is purely static, never owner or external HTTP authentication.
5. Deploy only after explicit approval to an appropriate service. GitHub Pages may expose a public website even from a private source repository when supported by the plan: check access and publication configuration first. The present example uses root-absolute asset paths; do not put it unchanged on a Pages project subpath.
6. After deployment, independently check public authoritative DNS, IPv4 and IPv6, TLS/SNI certificate, HTTP status, actual served bytes and deployment commit, redirects, robots/sitemap, canonical, live JS and no-JS states, 404/410, browser downloads on phones and desktops, accessibility, WAF, rate limits, privacy and rollback. Check the search engine crawler with provider-verified IP, not just spoofed user-agent.
7. Search Console/Bing indexed state, AI citations/recommendations, user task completion, AdSense approval and verified earnings are further distinct evidence phases.

## Nine attributes of an operationally deep skill

1. Applicability: exact trigger, scope exclusions and mandatory handoff.
2. Inputs: data schemas, relevant audience, permissions, limits, environments and dependencies.
3. Mechanism: implementation reasoning, source-specific configuration and tradeoffs, not generic exhortations.
4. First-party evidence: original provider documents (not just a URL list), read date, jurisdiction, effective date, contradictions and assumptions.
5. Correctness oracle: actual worked input/output, executable procedure, deterministic objective where one exists.
6. Negative oracle: malformed/hostile inputs, failure recovery, privacy and security, accessibility, resource ceilings and adversarial counterexample.
7. Release gates: source, build, actual browser/local, HTTPS/deployment/owner, search index/AI citation, publisher status and revenue explicitly separate.
8. Maintainability: observed failure, priority, smallest reproducible fix, regression, rollback and future source-refresh trigger.
9. Business value: original task differentiation, competitor test on identical input, real distribution opportunity, trustworthy retention and cost bounds.

A short skill can be valid if its referenced operating manuals and tests genuinely provide these. A 2,000-word skill can still be weak if it lacks actual outputs and independent validation. The skill-depth audit is a discovery tool, not certification.

## Failure-mode matrix

| Workstream | Positive acceptance proof | Critical negative check |
| --- | --- | --- |
| Browser converters | actual transformed file bytes, fidelity and supported formats | formula injection, invalid encoding, size overflow and broken JS |
| Full stack | integration, authenticated ownership and idempotent API results | SSRF, session leaks, retry collisions and unbounded billable jobs |
| SEO | original useful page, valid canonical/robots/sitemap, actual indexability | example-domain canonical treated as public, noindex, broken render |
| AI/AEO | real user questions and independently captured citations/recommendations | fake quotes, branded question leaks, missing/unfavorable attempts |
| Ad/publisher | owner-authorized publisher status, legitimate UX and consent | invalid ad clicks, fake publisher approval and deceptive controls |
| Accessibility | keyboard, screen reader, real mobile workflows | errors without feedback, inaccessible primary action |
| Hosting | DNS, real TLS, deployed bytes, real 404, WAF and rollback | localhost-only results, expired cert, stale CDN or spoofed crawler |
| Economics | real qualified humans, verified tasks, actual net cost | synthetic RPM or modeled users called earnings |

## Explicitly banned report statements

- Tests passed, therefore the site exists online.
- A canonical or sitemap referencing csv-lab.example.org establishes deployment.
- A GitHub repo URL is the same as a running web application.
- All 49 skill manifests have source pointers, therefore all 49 are complete.
- A local audit proves Search Console indexing, AI citations or AdSense approval.
- A single prompt with a citation proves rank one across ChatGPT, Gemini and Google.

## Source originals reviewed or queued at audit time

IANA reserved example host: https://www.iana.org/help/example-domains
GitHub Pages sources and privacy: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Google canonical: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
MDN HTTP model: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
OWASP ASVS: https://asvs.owasp.org/
W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
Google URL inspection: https://support.google.com/webmasters/answer/9012289
Full provider registry: sources/seo_v13_primary_atlas.json and docs/foundations/19-provider-source-verification.md

A curated atlas is not an exhaustive list of all changing search engines, AI products, legislation or undisclosed algorithms. For material decisions reopen the original current provider page, date the actual inspected passage and label inaccessible evidence UNKNOWN.

## Required agent packet
Deliver the changed commit and paths, exact user problem, tested competitor weakness, source claim ledger, observed file output/fixture, negative regressions, tested browser/device/HTTP state, whether actual owned public deployment exists, real source account observations if authorized, privacy and security review, rollback, measured cost, residual uncertainty and independent reviewer. 

If the website is not deployed, state exactly: LOCAL BUILD VALIDATED; NOT DEPLOYED. Never convert that into a universal production-ready declaration.
