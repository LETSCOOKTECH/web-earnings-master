# V13 — Technical SEO from HTTP bytes to verified indexing

Owner: web-technical-seo. Route browser details to web-browser-runtime, crawling rules to web-crawler-governance, and owner analytics to web-search-analytics. Source atlas: CRAWL_INDEX, SEARCH_APPEARANCE, SEARCH_POLICY.

## 1. DNS, TLS, HTTP and host identity
- Confirm authoritative DNS, registered public origin, TLS certificate/chain, canonical host, HTTPS redirects, HSTS and real deployment. No keyword in the domain can force ranking.
- Valid content must return 200 with actual HTML. Redirect permanent changes through correct 301/308, no redirect chains; invalid pages must return real 404/410 instead of soft-404. Actual overload may use 429/503 with relevant Retry-After. A status header and visible app error must not contradict each other.
- Test cold and hot CDN, cache, WAF challenge, origin availability, IPv4/IPv6 and both browser and crawler fetches. Do not whitelist spoofed bot user-agent strings blindly.
- Service workers, edge redirects, cached robots and JavaScript app shells can hide failures. Capture raw response, headers, resolved IP/domain and rendered content with a real browser.

## 2. Discovery, crawl and index eligibility
- Serve actual HTML anchor navigation, contextual links and task category hubs. Measure real click depth and orphan URLs, rather than assuming shorter URL strings boost rankings.
- robots.txt is for crawler access, not authentication or assured deindexing. Evaluate Googlebot, Bingbot and image crawlers with correct group precedence and URL patterns. Treat training bot versus search bot as different policy decisions. Read Google robots implementation and RFC 9309 before consequential policy edits.
- Meta robots and X-Robots-Tag must match public indexability intent. A page blocked by robots may not let crawler see a noindex; changing initial noindex only after JS is unsafe.
- Canonical hints (HTML link, redirect, sitemap, linking) should agree for duplicate page families, query parameters, locale and trailing slash. Google selects the actual canonical; the declaration is not a command.
- Sitemaps enumerate chosen crawlable indexable canonical URLs, use valid XML, true modification time, current host and intentional exclusions. Submitting a sitemap does not guarantee Google indexing.
- Handle faceted navigation, sessions, search results, private file/editor paths, large pagination and parameter spaces with deliberate crawl controls; avoid infinite variants.
- International content needs genuine reviewed translation, correct language/region and valid reciprocal hreflang where applicable; avoid spun city/locale pages.

## 3. Rendering and functionality
- Initial response should contain descriptive title, body, primary task summary and crawlable links with JS disabled. Hydration can add interactive functionality but must not be the sole source of SEO text.
- Compare raw HTML and rendered DOM, browser console, network waterfall, blocked CSS/JS and CSP errors. Fetch/parse MIME, cache and source maps. Google renders JavaScript in some situations; other crawlers and tools differ.
- Working tools must pass independent output checks, malformed input and download reopening, not just metadata screenshots or static checklists. Use a false success/broken JS mutant to confirm tests reject it.
- File URLs and data endpoints must have proper access control and output privacy. Hide user-specific upload/result URLs from search and sitemap.

## 4. Search appearance, schema and content
- Unique human-useful title and natural H1/intro, descriptive meta description and task examples; Google may rewrite the Search title/snippet. No meta-keywords trick or fixed text length rule.
- Structured data can qualify for a currently supported Google rich result only when visible truth matches schema and quality policy; Schema.org vocabulary alone does not establish feature eligibility.
- No invented ratings, deprecated features, mass identical FAQs or AI-only schema. Use real original images (rights/alt/context) and video watch pages only when video is primary content.
- Mobile accessible task controls, non-disruptive ads, keyboard/focus, reduced motion, real-device memory and network conditions are independent performance concerns.
- Measure field Core Web Vitals (LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75); synthetic Lighthouse is diagnostic, not owner field evidence or rank guarantee. Optimize image dimensions, fonts, LCP resource, JS boot and long tasks with no task correctness regression.

## 5. Error-first diagnosis
DNS/TLS/WAF -> real HTTP/crawl -> robots/noindex -> canonical/index decision -> meaningful initial content/render -> eligible supported appearance -> impressions -> clicks -> task start -> verified finish -> retention -> legitimate revenue. Identify the first failed observable link. An indexed URL with no impressions may indicate no interest or poor relevance rather than an indexing bug.

## Commands and proof
- npm run audit:seo-example checks synthetic built site only.
- node scripts/check-robots-policy.mjs --file public/robots.txt --path /tools/actual-job/ --bot Googlebot --bot Bingbot tests local directives, not real crawler fetch.
- npm run lab:seo-browser runs actual supported Playwright engines and output checks in authorized environment.
- node scripts/audit-live-site.mjs --origin https://owned-domain/ --authorized-origin https://owned-domain/ --routes-file real-pages.json --missing-path /not-found/ verifies public HTTP only, under proper owner authorization.
- Owner Google Search Console URL Inspection and Performance verify actual indexed URL and impressions; a local check cannot do that.
- Test broken canonical, noindex, wildcard/specific bot blocks, orphan link, missing script, bad HTTP 200-on-404, unsupported schema and unstable JS deliberately; preserve actual logs.

Sources: [Search technical](https://developers.google.com/search/docs/essentials/technical), [Robots](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [structured data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [CWV](https://developers.google.com/search/docs/appearance/core-web-vitals), [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Original body must be reopened at action time.
