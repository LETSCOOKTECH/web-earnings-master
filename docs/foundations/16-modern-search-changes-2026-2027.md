# 16 — 2026–2027 Search, AI and crawling change ledger (dated, scope-first)
Baseline verified 2026-11-23 from original provider pages where accessible. Treat announcement, effective date, account rollout and actual live behavior as SEPARATE.

| ID | Date/event | Effective/availability | Operational effect | Evidence |
|---|---|---|---|---|
| CH01 | Google Generative AI performance reports announced June 3 2026 | Google notes worldwide rollout August 31 2026 | Separate generative Search/Discover impressions, pages, countries, devices/dates as applicable; not all AI prompt citations | https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports |
| CH02 | Google AI optimization guide published May 2026 and updated thereafter | Current provider guidance Nov 2026 | Ordinary SEO foundations; Google Search ignores llms.txt, rejects AI-only schema/chunking as universal optimization | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide |
| CH03 | Google Search multimodal reporting announced Sep 24 2026 | Global rollout beginning Sep 24; property availability should be checked | Lens/image upload/Circle to Search search reporting, not ordinary keyword click equivalent | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc |
| CH04 | Google Search Analytics API filter/report update Nov 16 2026 | Announced Nov 16 | New API dimensions/reporting possibilities must be implemented against actual API schema, permissions and property data | https://developers.google.com/search/blog/2026/11/search-analytics-api-update |
| CH05 | Google Preferred Sources help updated 2026 | Global Top Stories; AI Mode/Overviews where available | Users select preferred domain/subdomain publishers; not a technical auto-ranking hack, inclusion control may matter | https://developers.google.com/search/docs/appearance/preferred-sources |
| CH06 | Google Search docs updates November 2026 | Ongoing | New read-more links guidance, AI feature updates, schema deprecations; do not rely on archived feature checklist | https://developers.google.com/search/updates |
| CH07 | Google crawling docs moved under crawling site Nov 2025; added new agent/user-triggered families 2026 | Current; identity lists change | Verify Google-Agent/user-triggered fetcher IP categories; do not equate with classic Googlebot | https://developers.google.com/crawling/docs/changelog |
| CH08 | OpenAI bot family current guide | Current Nov 2026 | OAI-SearchBot/GPTBot/ChatGPT-User/OAI-AdsBot are separate purposes; check current IP list and robots handling | https://developers.openai.com/api/docs/bots |
| CH09 | Bing AI Performance preview Feb 10 2026 | Public preview; interface may vary | Official observed citations/grounding, not search rank or visits | https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ |
| CH10 | Bing Citation Share insight June 16 2026 | 2026 features; property and scope dependent | Citation Share measure is for particular grounding query/citation space; not a direct Google-like authority score | https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/ |
| CH11 | Bing Topics Portfolio Beta Oct 13 2026 | Beta | Topic groups and citations for AI Performance; don't assert everyone has the same view | https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/ |
| CH12 | Microsoft training and grounding preferences announced Oct 30 2026 | BEGIN Feb 1 2027. March 1 deadline transition; temporary preferences can expire Sept 30 2027 | AI Training preference in robots/page; AI Grounding page-level. Grounding DisallowExtended can disallow third-party grounding while permitting Microsoft-operated experiences. Special NoCache/NoArchive transition | https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/ |
| CH13 | IETF AIPREF work Nov 2026 | Internet-Draft, NOT universal RFC or mandated crawler compliance | Monitor vocabulary/attachment and the narrower draft training purpose signal; don't deploy a draft syntax as assumed cross-provider standard | https://datatracker.ietf.org/group/aipref/documents/ |
| CH14 | Chrome WebMCP proposed; Modern Web Guidance describes early preview in 2026 | Early Preview; opt-in experimental behavior; availability depends on Chrome versions | May enable structured browser-agent tools, not SEO rank or guaranteed agent compatibility | https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/webmcp |
| CH15 | Anthropic and Perplexity bot docs | Current provider doc, often changing | Separate training/search/user roles, account/robots handling and verified IPs | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://docs.perplexity.ai/docs/resources/perplexity-crawlers |

## Critical deadline alert: Microsoft 2027 transitions
Microsoft's Oct 30 2026 notice says the separate controls start taking effect as pages are crawled beginning Feb 1, 2027. Existing NoArchive/NoCache use is relevant to a temporary grounding transition: eligible sites can specify temporary preference in Bing Webmaster Tools from Dec 15, 2026; relevant March 1, 2027 action deadline; temporary options expire upon recrawl or Sept 30 2027. AI Training and AI Grounding are *independent*; do not infer a grounding opt-out is an indexing exclusion. The proposed IETF training vocabulary is evolving, not a blanket standard for every search bot. Before action, open current Microsoft support FAQ, the blog's exact syntax, effective dates and site/property state. Do not prematurely insert future control directives without verified implementation requirements.

## New Google Preferred Sources, not a generic promotion tactic
Only users choosing a preferred source may see publisher emphasis; domain/subdomain eligibility and Search generative inclusion setting apply. This is most relevant to actual publications and returning audiences. It does not create brand demand, rank a new web image converter for unrelated queries or guarantee AI citations.

## New Google robots/agent identities
Google crawler infrastructure has common/special/user-triggered robots and a new Google-Agent family. Purpose tokens, actual HTTP User-Agent, IP list and privacy/security are separate. Revalidate against official docs and bot IP ranges before any WAF rule; no UA-only blanket exemption.

## Suggested source review schedule (internal operational cadence, not provider promise)
Daily CI read of public official changelog/RSS sources (lightweight, with artifacts).
At every material engineering/compliance action: agent must open current original source body and report checked-at UTC.
Within 24 hours of detected breaking crawler/security/publisher change: review deployment impact and regression.
Monthly: broad spider/provider matrix and source ledger review.
Quarterly: all legacy skill contradictions and test coverage.
Do not automatically alter live robots, security, ads or canonical settings from a checksum or search excerpt. A failing network fetch is UNKNOWN, not a statement that guidance was removed.

## Source conflict rules
Official controlling account setting and effective policy > current first-party docs and changelogs > first-party observed website data for its own state > reproducible scholarly/open-source reference model > third-party vendor estimates > community anecdote. Record whether release is beta, preview, rolled out, region-specific or future effective. Every claim needs applicability and counterevidence; a provider's public claim cannot prove its proprietary implementation line-by-line.

## Mandatory 2027 recheck test
On or after Feb 1 2027, check real page headers/robots per official Microsoft definitions before marking AI Grounding policy applied. On/after March 1 2027 verify NoCache/NoArchive legacy protections not assumed active; preserve site owner's chosen policies and specific exception. For days before effective date result must be PENDING_FUTURE, not PASS.
