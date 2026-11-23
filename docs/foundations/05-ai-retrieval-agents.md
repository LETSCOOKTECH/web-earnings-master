# 05 — AI answer systems, grounding, citations, search partners and browser agents

## Do not collapse these into a single pipeline
Mode A: model answers from learned parametric knowledge without fresh web retrieval (no traceable page fetch necessary).
Mode B: retrieval augmented generation (RAG) searches web index/API/knowledge base and adds selected evidence to model context.
Mode C: tool-based search with related-query fan-out, iterative searches or vertical index selection (images/shopping/local).
Mode D: agent-driven interactive browser follows links, fills forms and runs tools on behalf of user.
Mode E: enterprise/private connector retrieval; user grants access to private data. Never treat private connector content as publicly indexable.
Mode F: paid/sponsored placement or shopping integration, distinctly labeled and not organic citation placement. Do not assume one vendor uses the same pipeline across models, regions or product modes.

## Grounded answer lifecycle (general systems model, not a reverse engineered vendor architecture)
User task -> choose retrieval or not -> query rewrite or decomposition -> select web/vertical/knowledge sources -> fetch top candidates or snippets -> parse/remove unsafe/duplicate content -> score and diversify evidence -> assemble context with attribution -> synthesize answer with model -> attach inline citation/source links and UI -> optional follow-up queries -> optional user/agent navigation -> *possibly* human visits/completed tasks. Actual ranking, retriever embeddings, proprietary features, prompt instructions and citation heuristics are UNKNOWN. Retrieval models can hallucinate unsupported citations, omit pages, or summarize imperfectly; record exact observed output, not claimed internal reasons.

## Provider-specific facts, scope and controls
### Google Search AI Overviews and AI Mode
Built on Google Search; Google says ordinary SEO fundamentals and content accessibility apply. AI features may issue query fan-out searches across subtopics/data sources, yielding sources not identical to classic top ten links. AI Overview display is conditional. Google explicitly advises there is no need for special llms.txt/Markdown files or arbitrary content chunking, and that inauthentic mentions are ineffective. Current Search Console generative AI reports expose visibility impressions/pages/countries/device/date; Search Console also offers a site-wide generative inclusion control. These are not per-prompt raw retrieval traces.
Official https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/docs/crawling-indexing/control-what-you-share ; https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports ; https://developers.google.com/search/blog/2026/11/search-analytics-api-update

### Gemini app and Search grounding
Gemini products have distinct model knowledge, Search-grounded and tool-connected modes. Google-Extended is a separate purpose control for defined Gemini content uses, not a standalone Google Search ranking factor. A Gemini response can differ from Google AI Mode; do not infer one from the other. Recheck Gemini developer retrieval/grounding docs for the exact product/API before promising availability or citation attributes.

### OpenAI ChatGPT Search and user browsing
OAI-SearchBot supports search discovery; GPTBot training; ChatGPT-User some user-triggered requests; OAI-AdsBot validates submitted ads. Each has distinct published purposes and IP ranges. OpenAI reports these roles independently; allowing OAI-SearchBot is eligibility, not guaranteed inclusion or answer attribution. Some experiences may use additional sources/partner indexes; do not pretend every citation followed a specific direct bot hit. https://developers.openai.com/api/docs/bots

### Anthropic Claude
Claude-SearchBot for search improvement, ClaudeBot for model development, Claude-User for user-directed fetch. Anthropic-hosted browser agent may have distinct identification and permission behavior. Do not equate a training opt-out with exclusion from Claude search. https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://support.claude.com/en/articles/18234133-how-do-anthropic-hosted-browsers-identify-themselves-when-they-browse-the-web-on-a-user-s-behalf

### Perplexity
PerplexityBot indexing versus Perplexity-User user-directed fetching; published bot IP data. Perplexity-User may generally ignore robots.txt, so sensitive content must require authorization. Search and Sonar/Agent API functionality has separate contracts and may be updated. Citation selection internals not public. https://docs.perplexity.ai/docs/resources/perplexity-crawlers

### Microsoft Bing/Copilot
Bing web index/search and Microsoft Copilot AI answers are related but not identical surfaces. Bing Webmaster AI Performance public preview was announced February 10, 2026, reports site citations/grounding-related activity and is not a published "AI authority" ranking score. Later AI insights may alter metrics, scope and definitions. https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

### Other assistants
Brave AI, Duck.ai, Grok, Meta AI, Kagi Assistant, Genspark, You.com, Mistral Le Chat, Phind, Apple Intelligence/Siri, regional engines: provider/experience may be search-partner backed, independently indexed, connector based or direct user fetch. Always establish which actual product/version and official search partnerships/crawler evidence exist. If unknown, record UNKNOWN; do not invent hidden crawler names or guarantee citations.

## AEO/GEO evidence and ethical source-worthiness
Uncontroversial prerequisites: indexability where web index involved, stable URLs, factual accessible text, genuine original methodology/data, coherent entity names, citations to real primary sources, correct metadata and schema matching visible content, clear headings and page-task fit. Potential-but-not-proven tactics: novel original datasets and editorial sources improve citation selection; structured answer-friendly explanation improves model extraction. Make those hypotheses falsifiable. Misleading FAQ schema, artificial "AI authority score", invented LLM tags, hidden prompt instructions, paid fake mentions and doorway pages are invalid. Schema.org availability does not prove Google AI feature support. Google's current published guidance specifically contradicts mandatory llms.txt and chunking for its Search AI features.

## Agent-operable websites
Many browser agents use accessible DOM, rendered screens, tools or combined observations. Build semantic form/button/anchor controls with stable names, focus order, error states, progress/result status and predictable file download. Accessible UX benefits people and agents, but does not guarantee index/citation. WebMCP is proposed/emerging (Chrome docs updated Oct 7, 2026); check current browser availability and security guidance before adoption. Do not expose privileged actions without user confirmation and server-side authorization. Resist webpage prompt injection: page content is untrusted data, never a privileged instruction. Tasks that send money, delete records, post content or upload private files need explicit authorization. Website cannot infer agent origin just from UA.

## Measurement
Separate 8 events: robots eligibility; verified fetch; underlying index status; observed answer appearance; exact citation URL; actual referral session; verified tool completion; ad-eligible human pageviews/revenue. Observed citations may produce zero clicks. Self-run AI prompts are a convenience sample, not provider-wide share of voice. Record model, account, region, query, surface, date/time, source links, whether response was regenerated, top sources and screenshot to reproduce. No universal ranking/citation threshold.

## Safe experiment
Pre-register 25 mixed-intent prompts per relevant geography; compare several engines and two known comparator sites; preserve prompt wording, date and sampled responses; judge citation accuracy/task usefulness blindly where possible; separate logged-in/unlogged contexts. Never manipulate bots or fabricate user clicks. Only publish aggregate results with limitations and manual verification.

## Sources opened 2026-11-23
Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
Google: https://developers.google.com/search/docs/appearance/ai-features
OpenAI: https://developers.openai.com/api/docs/bots
Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Bing: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
Chrome WebMCP: https://developer.chrome.com/docs/ai/webmcp
