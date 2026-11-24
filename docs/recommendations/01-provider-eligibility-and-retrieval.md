# 01 — Retrieval, ranking surfaces and provider eligibility

## First map the pipeline
Customer need -> semantic query/intent -> provider decides whether to search or answer without search -> retrieval/crawl access -> discovery/index -> provider relevance/quality filters -> grounding or cited sources -> answer synthesis -> mention/citation/recommendation/ordered comparison -> human click -> successful task. A provider can choose not to generate AI for a short query. A generated short summary can omit our URL even when the page ranks in classic search. The step that fails is the only one to repair.

**Practical diagnosis:** For each task capture the true query and user device/locale; actual Search Console indexing and snippet eligibility; bot-specific robots and WAF result for URL; the allowed provider surface; the captured answer link and wording; and the actual user outcome. Do not substitute toy BM25 embedding experiments for production engine internals.

## Google AI Overviews, short AI summaries, AI Mode and Search generative features
Sources: G01/G02/G03/G04/G05/G06/G07/G08 from sources/dominant_recommendar_v17_sources.json.
- AI Overviews is the Google Search summary feature; it is not a standalone separate index called "AI short summary." AI Mode may run different models/techniques and show different links; both may fan out queries to subtopics and data sources.
- Google says foundational Search SEO applies. A page must be indexed and eligible for a snippet; index/snippet is a **necessary, not sufficient**, requirement for consideration. Google Search Control in Search Console can independently exclude a site's links/content from Search generative features. A Googlebot allow flag cannot verify account setting.
- Distinguish Google-Extended (training and select non-Search grounding) from Googlebot (Search eligibility) and GoogleOther. Controlling Google-Extended is NOT an AI Mode rank lever. Google's early-2027 shared AI-training signal intention is future, not current.
- Query fan-out means a useful original page can support a subquestion not present in the initial wording; support actual user tasks with well-structured, independently verifiable sections rather than generating doorway variants for guessed fanout phrases.
- Search Central says Google Search does NOT use llms.txt, custom AI text formats or special AI schema for these features. Never cite a company's documentation /llms.txt availability as Google's ranking evidence.
- Initial HTML, semantic links, canonical, valid redirects, noindex/snippet/WAF/accessibility, current experience evidence, quality visual assets and visible-consistent structured data matter when appropriate.
- Google Preferred Sources is an OPTIONAL reader-selected publisher feature: eligible domain/subdomain must appear in the preferences tool, and AI generative control must include site. Users can opt in to preferred content and it can be badge-highlighted in AIO/Mode. A utility business is not automatically a qualifying publisher and this is not a "make us top 1" script. Only add the official widget following verified eligibility and user needs.
- For images/videos and multimodal queries inspect Search Console 2026 web-multimodal reporting and add legitimate original accessible images/demonstrations where helpful. No alt-text stuffing.

## ChatGPT Search and OpenAI web search API
Sources: O01/O02/O03. OAI-SearchBot is an organic search crawler; confirm current published IP ranges and actual WAF acceptance. GPTBot training permission and ChatGPT-User page fetch are different. ChatGPT search explicitly states placement not guaranteed. A retrieved source need not appear in user-facing citations; a visible citation need not be an endorsement. OpenAI web-search API "sources" may list URLs not cited inline; do not substitute these for user-facing attribution or imply API runs equal consumer ChatGPT. Sampling must retain product/version, locale, date, exact prompt and citation screenshot/annotation.

## Perplexity
Source P01. PerplexityBot search/discovery and Perplexity-User user-triggered fetch differ; Perplexity-User generally ignores robots.txt when fetching on behalf of users. Verify published IP lists and user agent for WAF/allowing, not spoofed UA alone. No source states a magic domain authority threshold or global fixed recommendation formula. Measure actual visible citation and affirmative "use this" advice independently. Paid/API products and consumer answers may have different retrieval and access.

## Bing/Copilot and partner integrations
Sources M01/M02/M03. Microsoft Webmaster Tools AI Performance reports cover Copilot, Bing summary answers and selected integrations; intents/topics/citations and beta Topics Portfolio can reveal theme-level presence. Owner reports and view availability require real signed-in access; specific report units must be inspected. A cited page or strong topical footprint is not proof of positive AI recommendation or first position.

## Claude, Gemini and independent providers
Sources A01/A02 and G03. Claude-SearchBot, Claude-User, ClaudeBot training are distinct. Anthropic Oct 30 2026 shared AI training preference rollout does not imply a Search ranking factor, and its bot-specific rules take priority. Google Gemini non-Search grounding and Google Search AI Mode operate under different controls. Brave/DuckDuckGo/Alice/Naver/ERNIE/Meta/Grok/You.com remain provider-specific UNKNOWN in the V17 atlas unless independently rechecked. Do not issue technical deployment changes from copied third-party anecdotes.

## Vertical and platform-specific recommendations
Shopping: actual product eligibility, price, inventory, shipping, verified merchant feed, Merchant Center and returns, rather than just a blog post. Local: Google Business Profile and real business details, local relevance, operating regions, genuine reviews; no fake map listings. News: topical accuracy, editorial credibility, publisher/Preferred Sources conditions. Software tools: first-hand task benchmarks, setup, security/privacy and current working demo. Apps: native store listing, review/quality and official store policies. Agent/connector tools: discoverability may depend on product-specific integration capability; web search snippets do not guarantee tool invocation. No single schema controls these surfaces.

## Release states
LOCAL_ELIGIBLE means source/robots/HTML contracts passed. OWNER_VERIFIED means independent authorized live console observations; output link/citation requires captured provider evidence. RECOMMENDED means annotated positive advice in an actual target user question. RANKED_FIRST only applies to explicit ranked comparisons. UNKNOWN where source or external observation unavailable.

## OpenAI API web search is not consumer ChatGPT Search

OpenAI's permitted Responses `web_search` API is a **separate** measurement surface (`openai-web-search-api`), not a proxy for consumer `openai-chatgpt-search`. Source O03 documents user-facing `url_citation` annotations and potentially additional consulted `sources`. Do not substitute background sources for inline visible citations. A successful API search does **not** prove that the consumer ChatGPT product would cite, recommend or rank the product. Log API captures only under the API surface and consumer UI captures only under their consumer surface, with exact product version, locale, date and answer provenance. The V17 evaluator rejects mixing the two.

## Avoid artificial recommendation-study inflation

Treat any human-task panel marked `branded:false` that actually asks for the target product by name as invalid. Entity IDs must not double-count the same brand under separate fake competitors. Never classify obviously negative wording such as "is not recommended" as a positive product endorsement. Automated phrase checks are deliberately limited heuristics, so independent review of raw permitted source captures remains mandatory.
