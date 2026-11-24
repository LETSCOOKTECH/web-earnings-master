# 01 — Real AI retrieval products, robots, training controls and eligibility

## Product taxonomy — NEVER combine
Google AI Overviews and AI Mode = Google Search experiences built on Search indexing, snippet eligibility, owner site inclusion and grounding. Google Gemini app/API and image/video grounding = separate products. ChatGPT Search = OpenAI search crawler OAI-SearchBot; GPTBot = training; ChatGPT-User = user-triggered fetch. Claude-SearchBot, ClaudeBot training and Claude-User are separate. Bing/Copilot AI grounding, Bing Webmaster AI Performance reports and Bing training policies are different surfaces. PerplexityBot and any user fetch roles require current original official verification. Browser agents interacting with a site are not necessarily search index crawlers.

## Google
Official first-party guidance says AI Search supporting links require indexed plus snippet-eligible URL and site included in Search generative AI features via Search Console. Robots Googlebot allow and actual CDN/WAF access; canonical/sitemap/real meaningful HTML. Indexing still not guaranteed. Existing Google Search snippet controls may constrain AI display, and property opt-out is an owner-only decision. Google-Extended training/use controls do not automatically govern Search AI inclusion. A shared training policy token was announced October 2026 for intended early-2027 support: FUTURE, not universally current. No mandatory special llms.txt file, custom AI schema or arbitrary chunk size for Google AI Search.

## ChatGPT Search
OpenAI source: https://developers.openai.com/api/docs/bots . OAI-SearchBot search-crawl, GPTBot training and ChatGPT-User user fetch have distinct purposes. Owners can decide separate robots preferences. Search inclusion and actual citations aren't guaranteed by allowing OAI-SearchBot. Verify provider source IP ranges when published; a spoofed user agent string alone proves nothing. Actual ChatGPT Work/browser automation may use other transport and needs real human/agent task UX and permissions.

## Claude and Perplexity
Anthropic source: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler . Claude-SearchBot search, Claude-User user fetch and ClaudeBot training are independently configured. Anthropic-hosted browser actions have distinct identification. Perplexity: current provider original crawler docs and authorized owner log are needed before final bot token/IP or inclusion claims; as of this V14 audit the specific source remains a reference lead, NOT opened current policy.

## Bing
AI Performance public preview Feb 10, 2026 offers citation-related publisher insights. June 16 preview expands Intents/Topics/Citation Share/Compare. October 13 Topics Portfolio beta adds topic clusters. Exact availability depends on real owner Bing Webmaster Tools access; observed citations do not imply user visits. Don't assume an announced future Microsoft grounding control is enforced today.

## Independent publisher decisions
For each host, route and bot purpose, decide owner's consent and allowed public content. Test robots rules per bot and path with RFC9309 subset; verify initial HTML and X-Robots-Tag, response HTTP, CDN and WAF separately. Robots is not authentication or a method to hide confidential results. Never auto enable model training or change Search Console AI exclusion controls without explicit owner authorization.

## Source/time acceptance
Original doc and section + retrieval date + exact mode/product + rollout/effective vs announced + country/account scope + observable local test + owner account when necessary. UNKNOWN if source blocked, vendor policy omitted or actual bot identity not verified. Source registry at sources/ai_search_v14_surface_atlas.json records 19 product surfaces without inventing shared retrieval logic.

Key originals: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/docs/fundamentals/gen-ai-controls ; https://developers.openai.com/api/docs/bots ; https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

## V15 independent Google controls correction

Original Google guidance reviewed November 24, 2026 at https://developers.google.com/search/docs/fundamentals/gen-ai-controls explicitly separates Search Console generative-AI owner control, Google-Extended for model training/certain non-Search grounding, GoogleOther for non-Search crawling, page/text snippet directives and future early-2027 training preference. Google-Extended Disallow does NOT disable Search AI. Follow 07-2026-11-24-provider-controls-v15.md and audit-ai-controls-v15.mjs; local results cannot authenticate property settings.
