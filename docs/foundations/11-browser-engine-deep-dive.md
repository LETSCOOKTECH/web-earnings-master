# 11 — Browser engines deep dive: Chromium/Blink, Gecko, WebKit, navigation, rendering and agent behavior
Date: 2026-11-23. Domain: browser implementation principles and independently observable diagnostics. Internal architectures change per release. This is NOT claiming a browser's exact live binary call graph.

## Browser is a family of subsystems, not just HTML/CSS/JS
Separate application shell/UI (address bar, tabs, history), browser-process security/orchestration, content/renderer processes, network service, storage/cookie management, GPU/compositor pipeline, JavaScript VM, document parser/layout/style engine, media codecs, extensions, sandbox, operating system integrations and developer tools. Browser choice can change observable behavior even on identical origin/JS.

### Three major rendering-engine lineages
| Family | Products commonly using it | Principal engine | JavaScript execution | Important boundaries |
|---|---|---|---|---|
| Chromium | Chrome, Edge, Brave, Opera and many Android embedded/desktop variants | Blink + Chromium stack | V8 | Browser and renderer process separation, site isolation, compositor/rendering pipeline; product differences in privacy/network/feature flags |
| Firefox | Firefox desktop/Android and Gecko-based environments | Gecko/Quantum/Stylo; Necko networking | SpiderMonkey | Gecko pipeline and Mozilla-specific process isolation, networking and standards implementation |
| WebKit | Safari, many Apple platform web views | WebCore, WebKit2 | JavaScriptCore | UIProcess, WebContent, NetworkProcess, storage partition/session behavior; feature support and media codecs differ by platform |

Do not assume Chromium family browsers behave identically: default tracking prevention, permission prompts, cookie partition, service workers, TLS policies, ads, browser extensions and releases vary. Do not infer exact mobile WebKit obligations in a jurisdiction without fresh Apple/platform documentation. Headless Chromium is an automation substrate and may not behave like logged-in consumer browsers. Robots do not "run Chrome" just because rendered HTML uses similar primitives.

## Browser startup and navigation mechanisms
1. A top-level navigation can start from address bar, link, form, script, history, redirect, prerender or service worker. Check user activation and navigation type.
2. Parsing a URL uses browser URL standard with scheme/host/port/path/query/fragment, percent-encoded bytes and IDN. Origin = (scheme, host, port), *site* uses registrable domain/public suffix; confusing them breaks SameSite/CORS analysis.
3. Navigation chooses browsing context and possibly a different renderer/process (site isolation). Browser can consider service workers, cache, security policies, DNS/connection and HTTP redirect chains before committing a document.
4. Provisional fetch examines redirect URLs, security headers and response MIME. CSP, mixed-content, certificate errors, CORS for subresource script reads, COOP/COEP, CORP and X-Frame-Options have distinct scopes; not every policy applies to initial top-level navigation.
5. Commit creates or swaps document, executes parser tasks and script schedules. Same-document hash/history navigation generally doesn't trigger new HTML document fetch. SPA history routes may render content without proper server-side 404 behavior.
6. Lifecycle: loading, DOMContentLoaded, load, visibility, pagehide/pageshow, BFCache restore, freeze/discard and background tabs. A page restored from BFCache may have different network/JS activity than a cold navigation. Test back/forward behavior and abortable jobs.
7. Navigation result is different from usable task. An agent that opens a page still must find and operate labeled controls, get correct output and respect permission boundaries.

## Parsing and CSS/JS coordination
HTML streams into tokenizer/tree builder; error recovery can rearrange invalid markup. Preload scanner discovers resources, while scripts can block parsing depending on async/defer/module semantics; CSS needed for render can block some script paths. DOM != literal source HTML; server HTML can differ from JS-mutated DOM. CSS cascade resolves origins/layers/specificity/inheritance, container queries and media constraints. Style recalculation, layout, paint, rasterization and compositing are different performance work. GPU compositor can move layers without layout, but wrong layer promotions cost memory. JS promises/microtasks, event loop tasks, rendering opportunities and Long Tasks interact; a Web Worker avoids main-thread work only when data transfer/serialization/CPU scheduling remain manageable. WASM is a code format, not an unbounded compute quota.

## Cross-browser and device critical paths
### Chromium
Chrome design documents describe browser/renderer/GPU-related process architecture and site isolation. RenderingNG describes style/layout/paint/compositing across site isolation and renderer lifecycle. Network service manages requests, cookies and cache around security boundaries; implementation evolves, so examine current docs and actual DevTools traces before promising process counts. DevTools Protocol/Playwright automation enables local network/DOM/performance snapshots; it does not emulate Googlebot authenticity.
Refs: https://www.chromium.org/developers/design-documents/multi-process-architecture/ ; https://developer.chrome.com/docs/chromium/renderingng-architecture ; https://www.chromium.org/developers/design-documents/site-isolation/

### Gecko
Firefox Source Docs describe Gecko and Necko networking; SpiderMonkey executes JS, Stylo/Gecko manage style/layout, e10s/Fission isolation varies by configuration. Firefox Remote Debugging/BiDi can be used for automation and logs; compare cross-engine unsupported API behavior rather than declaring site wrong based only on Chrome. Gecko extensions and privacy features can change referrers, storage, cookie usage and attribution. Refs https://firefox-source-docs.mozilla.org/overview/gecko.html ; https://firefox-source-docs.mozilla.org/networking/index.html

### WebKit
WebKit2 uses UI/WebContent/Networking processes; WebCore implements rendering and DOM, JavaScriptCore executes scripts; WebKit platform integration and WKWebView restrictions matter. Check Safari/WebKit release notes for file uploads/downloads, IndexedDB, WASM, media formats, background execution and cookie/storage partitioning. Refs https://docs.webkit.org/Getting%20Started/Introduction.html ; https://docs.webkit.org/Deep%20Dive/Architecture/WebKit2.html

## Security/permission systems
Same-origin policy prevents script access to foreign-origin content; CORS response headers selectively relax scripted reads, but do not stop cross-origin navigation or prove sensitive data is private. CSRF targets state-changing requests carrying user credentials; SameSite helps but is not a complete CSRF strategy. CSP helps reduce XSS but does not replace escaping/sanitization, consent and authorization. Browser sandbox isolates renderer privileges; website must still defend server APIs. Cookies require domain/path and Secure/HttpOnly/SameSite controls; partitioned cookies, storage partitioning and anti-tracking can affect attribution. Permissions policy, user gestures and device APIs determine camera/microphone/file/system access; no diagnostic website may assert arbitrary access to OS processes or network packets.

## Performance field metrics and laboratory
LCP: perceived largest rendered content element; INP: user interaction responsiveness; CLS: layout shifts. Field data are user-centric p75 windows; DevTools synthetic and Lighthouse are diagnostic. Metrics can change over releases; trace real CPU utilization, memory, request waterfall, long task breakdown and soft navigation metrics. Test slow Android Chrome, Safari iPhone, Firefox desktop, no-JS, offline, worker crash, file memory pressure, cross-origin subresource blocked, reverse proxy 503, BFCache replay, privacy blockers.

## Diagnostic state machine
BLANK → inspect HTTP 200 body vs DOM, JS exceptions, CSP and hydration.
INCOMPLETE → preload CSS/JS timing, blocked CDN, import errors and third-party scripts.
JANK → trace main thread, layout thrashing, IO callbacks, worker serialization, huge canvas decode.
BROKEN MOBILE → unsupported codecs/APIs, WebKit worker lifetimes, touch/keyboard, memory caps.
BROKEN AGENT → missing accessible names, custom canvas controls, unpredictable progress, consent-gated navigation.
SEO CRAWLER DIFFERENCE → initial HTML, status, robots, redirected resources, WAF and render budget; check Google Search Console evidence separately.

## Controlled lab
Build owned fixture routes: /full-html (SSG content), /hydration-only (empty body until JS), /js-error, /http-404, /soft-404, /cross-origin-block, /worker-cpu, /unstable-layout and /bfcache-form. Test Chromium, Firefox, WebKit via browser automation; record HTML response, DOM, accessibility role tree, network trace, screenshot and task outputs. Do not misrepresent mocked user agent as actual Googlebot. Use original fixture data only, no personal files.

## Source freshness
Before implementation use the CURRENT browser release/MDN compatibility data, not just historical architecture design docs. Chromium docs may carry outdated assumptions. Read original source and date at task time; store direct observations rather than declaring every browser supports the same feature. Changed engine release → add targeted compatibility regression, not mass rewrite all site templates.

Official refs: https://www.chromium.org/developers/design-documents/multi-process-architecture/ ; https://developer.chrome.com/docs/chromium/renderingng-architecture ; https://firefox-source-docs.mozilla.org/overview/gecko.html ; https://docs.webkit.org/Getting%20Started/Introduction.html ; https://html.spec.whatwg.org/multipage/ ; https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work ; https://developer.chrome.com/docs/devtools/ .
