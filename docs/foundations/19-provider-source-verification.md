# 19 — First-party source verification, live-recheck contract and change-response protocol
Date: 2026-11-23. This is an ENGINEERING CONTROL document, not a "we verified every sentence in the whole web" claim. Primary input: sources/verified_claims.json (53 discrete selected factual claims supported by opened official pages, plus 1 explicitly unverified), and sources/foundation_refresh_targets.json (37 priority URLs). The original 32 reference links and 92 general links remain navigation catalogs, NOT 100% semantically audited knowledge.

## Canonical evidence levels
E0 NO SOURCE: pure hypothesis or claim awaiting authoritative documentation.
E1 OFFICIAL DISCOVERY: provider result/link known, body not opened, translated snippet only or transport blocked.
E2 PRIMARY BODY OPENED: retrieved first-party body at a dated check; only specifically inspected assertions are supported.
E3 SOURCE + REPRODUCED LOCAL: normative/public behavior tested on an owned controlled fixture (e.g. HTTP 404, robots longest-match); does not prove Search-specific effects.
E4 FIRST-PARTY PROPERTY OBSERVED: Google/Bing account, verified server logs, owned site test or publisher portal; proves only that property/period.
E5 REPEATED INDEPENDENTLY EVALUATED: controlled replication across browsers/geographies/times where legally and technically feasible, with still bounded statistical scope.
Moving a claim from E1 to E2 requires reading the actual relevant body; a 200, search index snippet or content hash is not enough. No level reveals proprietary model ranks.

## Exact agent sequence EVERY material site, crawler or publisher action
1. Identify question, target provider/product SURFACE, site/host, country, language, account, user-agent purpose and current date (UTC). Ask whether the action is reversible; identify potential privacy, security, publisher or legal consequences.
2. Route to one primary Codex skill plus necessary foundations. Consult sources/verified_claims.json and the current 37-source watch target list for discovery, not as legal/policy truth.
3. OPEN the provider's official live original source and the corresponding changes/RSS feed before implementation. If official page redirected or moved, follow to actual new provider URL; preserve provenance. Check any site-specific controlling dashboard/contract and current production feature availability.
4. Capture concise exact supported claim with section anchor/short non-copyright-violating excerpt, published/modified timestamp if present, checked-at UTC timestamp, jurisdiction, version, effective date, rollout/beta status, examples and explicit exceptions.
5. Independently search the original provider changelog for conflicting newer documentation. Distinguish 2026 ANNOUNCEMENT vs effective 2027 RULE vs account rollout vs retroactive practice. If disagreement: mark UNRESOLVED, record both, escalate to reviewer. An HTTP 429, timeout or JS-only page is UNKNOWN, not a removed policy.
6. Decide an implementation hypothesis. Check interaction: robots vs noindex vs Search Console control vs model training; rendering vs WAF; app-store listing vs website SEO; ad crawler vs organic; a DNS host/port redirect vs authenticated app data.
7. Build an owned fixture and/or use legally authorized live account to test the exact failure. Record HTTP status, headers, body, DOM, browser/version, verified bot identity where possible, task output, screenshot and anonymized log. Use actual GSC/Bing/AdSense data only when authorized and available.
8. Edit the corresponding SKILL.md, reference module, sources/verified_claims.json and this changelog. The watcher does not write policy; the agent may propose a human-reviewed PR with evidence and rollback.
9. Run npm test, explicit Node HTTP fixture tests, and browser Playwright CI. If unavailable, label untested, do NOT claim 100% complete. For high-risk changes require a second reviewer or user approval and server rollback plan.
10. Recheck official source immediately before a material deployment. Record actual production outcome separately from local test. Update experiments/analytics at the provider-defined cadence.

## Provider-source scope matrix (E2 claims only)
- Google Search Central: Google Search generative index+snippet eligibility, llms.txt non-requirement, 2026 FAQ rich result retirement, Preferred Sources user choice and Search Console reports.
- Google crawling infrastructure: generic 15MB limit is different from Googlebot 2MB/64MB PDF. Source includes HTTP headers in Googlebot 2MB. Respect product-specific override and current version.
- Google-Agent: user-directed, verify UA+published IP and optional Web Bot Auth experimental signatures; allow challenge-free behavior only after verification. IP-only whitelists risk dynamic changes.
- Google Search referral: HTTP Referer contains origin information but not the query; use GSC query reports, expect data privacy/attribution caveats.
- OpenAI: OAI-SearchBot for Search, GPTBot training, ChatGPT-User user-directed, OAI-AdsBot ad submitted landing pages. Controls independent; user fetch may ignore robots.
- Anthropic: ClaudeBot/Claude-SearchBot/Claude-User separate, Anthropic says supports nonstandard Crawl-delay.
- Perplexity: PerplexityBot vs Perplexity-User, published IP lists, user-fetch generally ignores robots.
- Bing/Microsoft: AI Performance public preview citation stats ≠ ranking; October 30 2026 independently specified AI Training and AI Grounding preferences begin February 1, 2027; March 1 2027 transition deadline for certain NoCache/NoArchive sites; grounding page-level, training robots or page. Always fetch exact future rule/FAQ again at deployment.
- Brave: independent crawl but no distinct UA, and uses Googlebot crawlability as a guard; no fabricated Bravebot token.
- DuckDuckGo: organic links/images largely sourced from Bing, Instant Answers and other sources exist. No fixed partner law for every surface.
- Kagi: Teclis/TinyGem AND other external sources; changing partner inventory cannot be deduced from a static graph.
- Mojeek: own MojeekBot and NO nonstandard Crawl-delay support.
- Yandex: official crawl/index/storage/serve stages and its independent language/region interface.
- Naver: Korean Search Advisor original title/description guidance; translation caveats apply.
- Seznam: engineering article describes processor/index/snippet pipeline, but do not claim exact current topology.
- Chromium/Gecko/WebKit: high-level engine docs E2; browser lab (E3 when CI passes) tests actual representative release builds, not production Chrome/Safari with every flag.
- WHATWG HTML and RFC 9309/9110: normative public specs, but toy parsers are limited by subset implementation and vendor differences.
- Apple App Store and Google Play: own published listing/search guidance; only for actual store listings.
- IETF AIPREF: Internet-Drafts at review date, not an RFC or universal publisher enforcement.
- Chrome WebMCP: opt-in early preview/origin trial, not an SEO requirement or production compatibility guarantee.
- **Baidu:** original https://ziyuan.baidu.com/doc and https://ziyuan.baidu.com/aiflow/index were opened on 2026-11-23; the portal visibly lists submission/index/crawl tools and an AI traffic analysis interface. Its site-specific dashboard requires a verified website; no AI traffic performance data or detailed algorithm claims were obtained. Re-open Chinese original content before changes.
- **Applebot** https://support.apple.com/en-in/119829 returned 429; do not claim full current Applebot instruction verification.

## Machine-readable verification contract
Each claim in sources/verified_claims.json has: id, original source URL, topic, precise paraphrased assertion, applicability/limitations, temporal mode (CURRENT/REFERENCE/FUTURE/PREVIEW/EXPERIMENTAL/DRAFT/HISTORICAL/STANDARD/UNVERIFIED), source section, evidence method and original body check date. Important note: neither this JSON nor the 37 URLs are a substitute for action-time verification. A claim can become wrong tomorrow without a URL change.

## Daily CI watcher and change issue lifecycle
Schedule on GitHub default branch (after PR merge only); read pinned original URLs with bounded requests and only approved HTTPS hosts; persist content fingerprints using cache; upload dated report artifact. A first run is BASELINE, a changed digest is CHANGED_REVIEW_REQUIRED, inaccessible resources UNKNOWN_NETWORK. On scheduled change queue, create/update a GitHub Issue for an authorized reviewer to open current provider page, identify meaning and update affected skills. The watcher MUST NOT commit automatic robots/AI/ad/legal preferences. If an extracted HTML page changes due to navigation chrome or analytics banner only, reviewer resolves as NO_SEMANTIC_CHANGE with evidence. Follow-up PR includes exact test and source.

## Re-verification triggers
- Always when making a consequential product/policy change or user specifically asks "latest".
- On source watcher change, conflict, source 429 or missed review, on provider release/bot identity/IP list change.
- Before applying ANY Microsoft 2027 AI training or grounding control, before changing Googlebot/Google-Agent WAF rules, and before asserting AdSense/Google Play policy compliance.
- At every experiment interpretation if provider changed metric definitions or Search Console API behavior.
- Before freezing new browser feature support: current engine/version and compat-data test.

## Change ticket format
Provider, product/surface, claim IDs, sources (old and new), exact effective date, scope, observed diff, semantic decision, affected skills/references/tests, user impact, rollback, accountable reviewer, PR commit and execution evidence. Keep professional legal/privacy boundaries.

## Explicit unsupported claims
"Search ranking is complete/guaranteed", "all 33 URLs were semantically read word-for-word", "all ~92 general sources fresh", "Google's exact model weights known", "all AI engines use the same crawler", "an unverified 429 means blocked by provider", "source-watch automatically rewrites our skills", "GitHub cron is active while PR is draft", "local Playwright proves Google indexed us" are NEVER allowed.

**Identity control invariant:** USER-AGENT alone is insufficient to authenticate a crawler or hosted browser agent; follow current verified IP list or experimental HTTP signatures for the exact provider and purpose.

## Enforced action-time source artifact — fail-closed before material decisions
Offline first-party research ledgers cannot prove the current vendor policy. For each actual production decision produce a new `templates/action-time-source-evidence.example.json`-shaped artifact with current UTC verified page section, <=25 directly inspected original source words, exact source URL matching the registered claim ID, region/account/product applicability, reviewer, implementation status, and evidence of tests or explicit inability to test. Use `node scripts/require-action-time-sources.mjs --file path/to/evidence.json --claim-id NAME`. Multiple claims each require a separate `--claim-id`. Default age 24 hours, maximum configurable 168 hours. Missing/uncertain Applebot source, a search snippet, a stale check, wrong URL, or asserted-current FUTURE control returns FAIL. This is structurally enforceable; the checker cannot independently authenticate an agent truly read the source or certify semantic meaning, which must be reviewed from primary evidence. Never commit private credentials or vendor account data.

## 2026-11-24 semantic review

## November 23 2026 official identity correction
https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers
APIs-Google is a user-triggered webhook fetcher; the documented header starts `APIs-Google;`. It ignores robots.txt and uses user-triggered fetcher IP ranges. Authenticate webhook requests with the product's own mechanism, not UA or IP alone. Google documented six additional existing special clients and six existing user fetchers; this is documentation of existing behavior, not a new organic ranking signal. See https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers and https://developers.google.com/crawling/docs/changelog.

## November 23 2026 Search spam clarification
https://developers.google.com/search/docs/essentials/spam-policies
Back-button hijacking applies to browser navigation even from non-Search referrals and Discover. Third-party advertising code is not prohibited merely for being third-party; test actual behavior. External app navigation is outside this specific policy. Test browser Back with ads enabled, including social referrals, and reject history traps; this is not a blanket app or ad policy exemption.

## November 2026 privacy update
https://support.google.com/adsense/answer/18818765?hl=en
Google announced GPC-triggered RDP for Louisiana and Vermont ad requests starting on or after November 17 2026, ahead of state provisions on or after January 1 2027. Test regional GPC handling, actual ad request behavior and consent separately; do not infer legal compliance or remove publisher obligations.

## Future AFS policy transition — January 17 2027
https://support.google.com/adsense/answer/9336650?hl=en
Unified AFS policies are announced, not yet effective. Reopen current separate policies https://support.google.com/adsense/answer/1354757 and https://support.google.com/adsense/answer/7003954 until transition. For future AFS review test genuine user search intent, nonempty meaningful results, one request per action, ad-to-organic ratio, and no mixing/backfill in AFS slots. Provider-approved feature exceptions and written repeat-ad approval must be checked. Other non-AFS slots may use other permitted demand subject to the concurrent Google Ads text-demand restriction. Do not generalize AFS rules to ordinary content ads.
