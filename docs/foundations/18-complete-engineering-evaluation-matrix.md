# 18 — Adversarial implementation/evaluation battery for browser, crawler, search and AI systems
Version 2026-11-23. Labels: LOCAL = simulated/owned fixture; LIVE = owned deployment; PROVIDER = actual Search Console/Bing and provider account; OBS = sampled external SERP. No fixture proves proprietary ranker behavior.

## Test artifact standard
For every test: ID, provider/surface, claim, source URL/checked time, environment, authorized host, input fixture, expected behavior, actual status/header/body/screenshot/result, PASS/FAIL/UNKNOWN, likely counterexplanation, security/privacy risk, owner and rollback. Keep sealed secrets outside repo.

### Browser and protocol (LOCAL + LIVE)
B01 Valid HTTPS with correct SNI/ALPN; B02 expired/mismatched certificate; B03 IPv6 wrong origin; B04 DNS old TTL/negative cache; B05 H3 blocked fallback; B06 incorrect Content-Type; B07 301/308 redirect loops; B08 304 served without matching validator; B09 private resource cached publicly; B10 CSP blocks own editor/worker; B11 CORS versus same-origin confusion; B12 cookie partition affects login; B13 service worker serves stale HTML; B14 heavy JS makes INP poor; B15 layout shift from image without dimensions; B16 BFCache return loses unsaved file state; B17 MIME sniffing of malicious SVG; B18 oversized image decompress; B19 low RAM abort; B20 JavaScript disabled page still shows meaningful tool purpose.
For each compare Chromium/Gecko/WebKit where available and specify actual browser version/OS; synthetic emulation is not real iPhone hardware coverage.

### Discovery and index (LOCAL + PROVIDER)
S01 Orphan page without links; S02 sitemap lists noindex; S03 blocked robots page contains noindex which cannot be read; S04 200 with "not found" body soft-404; S05 live route 404 correctly; S06 canonical conflicts with redirect; S07 hreflang points wrong locale; S08 query parameter trap; S09 pagination hidden in JS click handler; S10 JS resource 403 only for actual bot; S11 CDN challenge says 200 HTML; S12 WAF 429 on legitimate crawler; S13 invalid lastmod; S14 outdated robots in CDN cache; S15 duplicate site on www/http variants; S16 crawler discovers but GSC says crawled-not-indexed; S17 indexed but no impressions; S18 first-party manual action versus guessed algorithm penalty; S19 schema valid but Google rich feature not eligible; S20 URL Inspection live fetch succeeds while indexed version is old. The observable stages must be separated and recommendations evidence-specific.

### Crawler bot identity and purpose (LOCAL + LIVE)
C01 UA claiming Googlebot from random source; C02 real Google identity using published IP or forward/reverse DNS; C03 OAI-SearchBot allowed but GPTBot disallowed; C04 training blocked doesn't block user fetch by definition; C05 ClaudeBot versus Claude-SearchBot path; C06 Perplexity-User may ignore robots while server ACL protects /account; C07 Google-Extended is purpose token not HTTP agent; C08 new Google-Agent user-triggered fetch; C09 Brave crawler has no distinctive UA; C10 Facebook/LinkedIn preview not counted as human; C11 AdsBot and Mediapartners not organic search; C12 HEAD versus GET status mismatches; C13 multiple REP groups and path specificity; C14 UTF-8 percent encoding; C15 robots redirected to different host and RFC/provider differences; C16 blocked bot only in certain edge geography; C17 false response from IP spoofing; C18 crawler IP ranges changed, stale allowlist. Never weaken authorization to win crawler eligibility.

### Query retrieval/ranking (LOCAL toy + OBS)
R01 Posting list correctness; R02 BM25 term frequency and document length response; R03 synonym lexical failure; R04 vector semantic retrieval versus literal constraints; R05 RRF rank fusion; R06 dangling graph node PageRank; R07 query interpretation ambiguous; R08 translation/localization ranking; R09 navigational brand SERP versus newcomer; R10 top organic result below AI/ad/local pack; R11 external links unequal to authority guarantee; R12 site with perfect performance fails actual user job; R13 session starts but corrupted output; R14 source estimates (KD/traffic) wrongly treated as rank proof. No lab claims to reproduce any provider's undisclosed algorithm.

### AI answer, citation and agents (OBS + LIVE)
A01 Google AI Mode query fan-out response with evidence; A02 same query/classic organic different URL list; A03 llms.txt absent (Google still eligible under ordinary Search conditions); A04 AI answer citation but zero user clicks; A05 one citation in three experiments no statistical rank guarantee; A06 ChatGPT Search index bot vs user click; A07 Anthropic training bot blocked, search still possible; A08 PerplexityBot verified IP vs spoofing; A09 invalid hallucinated citation/quote; A10 user-directed browser meets auth gate; A11 prompt injection inside fetched web content rejected; A12 agent uploads private file without user permission (MUST FAIL); A13 browser with unlabeled canvas action causes agent failure; A14 Chrome WebMCP preview unavailable, semantic HTML still works; A15 monetization not counted from automated fetch; A16 Gemini app sources not equated to Google AI Mode; A17 Microsoft preferences dated 2027 not treated as currently active; A18 agent sees ad pretending download control (MUST FAIL UX/publisher gate).

### Provider atlas and ASO (OBS)
P01 Brave crawler cannot be distinguished by invented UA; P02 DDG links largely Bing but other sources exist; P03 Kagi combines Teclis/TinyGem plus others; P04 Mojeek independent index; P05 Yandex provider docs not Google clone; P06 Baidu submission not index guarantee; P07 Naver Korean docs translation provenance; P08 Seznam older published architecture not guaranteed current; P09 Ecosia/Yahoo current supplier UNKNOWN pending official confirmation; P10 website without Play listing cannot claim ASO wins; P11 Apple App Store ranks not dictated by web meta title.

### Source freshness and security (OFFLINE + LIVE source body)
F01 registry duplicates fail; F02 unsupported/unlisted hostname blocked; F03 cross-host redirect blocked; F04 HTML content fingerprint changes creates REVIEW, not policy assertion; F05 429 or anti-bot creates UNKNOWN, not confirmed removal; F06 Internet-Draft treated as nonfinal; F07 2027 deadline is future at 2026-11-23; F08 missing account data yields UNKNOWN; F09 provider content changed without URL change re-review required; F10 official report versus own property access must be distinguished; F11 semantic review must cite relevant exact passage/date; F12 source quote must be short and scoped.

## Lab priorities and critical pass gate
Critical: never claim confidential access control from robots, assign Google rank from toy BM25, claim ad revenue from bot requests, certify GSC indexing without dashboard, or apply future Microsoft AI Grounding controls as already enforced.
High: fail on 200 soft-404, SPA content absent from crawler HTML, incorrect canonical host, missing task output, fake star JSON-LD and WAF accidental block.
Medium: field CWV, metadata refinement, secondary media and rare-market engine behavior where target audience not yet proven.

## New local runnable reference implementation
Run Node 22+:
- node scripts/ir-reference-lab.mjs : deterministic toy postings, BM25 lexical scoring, RRF fusion and graph PageRank. EDUCATIONAL, never vendor rank formula.
- node scripts/watch-official-updates.mjs : validate source watch configuration without web access.
- node scripts/watch-official-updates.mjs --live --limit 8 : fetch only pinned first-party documentation and produce dated hash/reachability review queue (not semantic verification; may exit with UNKNOWN network).
- npm test : tests are local structural & mathematical reference invariants, not GSC/citation validation.

## Exit certification language
A PASS on all local tests = RESEARCH SYSTEM STATIC/LAB CHECKS PASS. It does not mean search engine reverse engineering complete, live domain is indexed, citations guaranteed or ads approved. A PRODUCTION-OBSERVED claim requires actual connected provider dashboard/live site logs/fixtures. The long-term audit can expand into a controlled owned staging site and Playwright cross-browser E2E where authorized.

Primary source anchors: https://www.rfc-editor.org/rfc/rfc9309.html ; https://developers.google.com/search/docs/fundamentals/how-search-works ; https://developers.google.com/search/docs/appearance/ai-features ; https://developers.openai.com/api/docs/bots ; https://safe.search.brave.com/help/brave-search-crawler ; https://nlp.stanford.edu/IR-book/ .
