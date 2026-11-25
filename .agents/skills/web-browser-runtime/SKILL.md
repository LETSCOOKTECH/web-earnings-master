---
name: web-browser-runtime
description: "Diagnose browser, HTTP, DNS, TLS, HTML rendering, caching, workers, performance and protocol failures with reproducible network and DOM evidence."
---

# web-browser-runtime

**Trigger:** The user asks how the browser or web server works, why a page fails to load or render, to trace HTTP/TLS/network, compare SSR/SSG/CSR, or investigate client runtime/performance.

**Read:** docs/foundations/01-browser-http-runtime.md, 02-domain-dns-tlds.md when DNS involved, docs/foundations/09-source-refresh.md for changing standards, relevant originals.

**Input contract:** Authorized host or local build, expected behavior, device/browser/region, network logs or access. Do not pretend these are known if absent.

**Mechanism:** URL/hostname -> resolver/cache -> IP/route -> TCP/TLS or QUIC -> HTTP -> CDN/origin -> HTML/CSS/JS -> DOM/layout/paint -> interactive tool output. Name the first failing stage before prescribing a repair; distinguish page load from completed human task.

**Procedure:**
1. Parse URL and establish HTTPS, origin and scheme. Check DNS, TLS certificate and IPv4/IPv6/redirect behavior.
2. Capture actual status, headers, body bytes and relevant cache/WAF behavior using allowed tools or authorized curl/dig.
3. Compare raw HTML, JS-disabled page, rendered DOM, accessibility tree and working browser task.
4. Inspect request waterfalls, main-thread work, worker and WASM support, caching/CSP/storage, security and mobile performance. CWV field ≠ synthetic Lighthouse.
5. Create a root-cause hypothesis and one counterexample; reproduce on low-end/client failure fixtures where possible.
6. Deliver exact measured evidence, repair, regression and rollback. Without a live host mark production status UNKNOWN.

**Output:** protocol trace table, error stage, reproducibility commands/artifacts, security/privacy risks, implementation and verification plan.

**Red flags:** user-agent spoofing treated as verified crawler, 200 soft-404 called healthy, one Lighthouse score equated with ranking, cache clearing as generic fix, uploading private HAR/cookies.

**Acceptance:** One false-positive diagnostic and one negative case tested. Every proprietary browser/vendor internal not established by evidence remains UNKNOWN.

## Deep operations extension (v2.2)
Read foundation chapters 11 (Chromium/Blink vs Firefox/Gecko/Necko vs Safari/WebKit) and 12 (DNS/TLS/QUIC/HTTP/cache) whenever a request reaches beyond generic web vocabulary. Create stage-by-stage timeline of navigation, process selection, fetch, HTML parser, CSS/JS scheduling, layout/paint/compositor, storage, service-worker and user interaction. Separate origin/site, DOM/source, security/browser compatibility, synthetic vs field CWV, BFCache and low-end memory. Test source HTML, rendered DOM, network, JS-disabled and final task. Re-open current browser release documentation; older Chromium design documents are explanatory and may not match current version. Do not claim browser compatibility or production trace unless run.


## V20 browser/network failure-stage contract
Before blaming frontend JavaScript classify the first failing stage: reserved/typo hostname, DNS, TLS/QUIC, HTTP/redirect, CDN/stale assets, HTML, JS, UI event and downloadable result. A real localhost HTTP test exercises a different environment from public hosting. For csv-lab.example.org the earlier step (IANA documentation-only hostname) fails; no web application is deployed there.
**Reproduce and repair:** record exact URL, browser/device/date, first error and network tab. Inspect DNS authority and A/AAAA only on authorized hosts; certificate/SNI, status and response bytes; initial HTML, no-JS state, console exceptions and failed requests; finally actual user action and exact output. Include intentional broken JS and 404/soft404 controls. Use node scripts/preview-seo-csv-lab-v20.mjs for the ACTUAL local URL rather than a document-only one.
**Evidence:** LOCAL_HTTP_VERIFIED is not EXTERNAL_HTTP_OBSERVED. Real-mobile, external DNS/TLS, owner Search Console, WAF and revenue are separate. MDN mechanism https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview and docs/quality/real-world-release-contract-v20.md.
