# Multi-engine AI discovery and agent retrieval policy

**Checked 2026-11-22; refer to official provider docs for live policy.** Allow normal search fetching where desired; independently decide whether model-training access is permitted. Never claim that crawler permission causes a citation.

| Service | Search/retrieval | User-triggered fetch | Training/other preferences |
|---|---|---|---|
| Google Web Search, AI Mode, AI Overviews | Googlebot + indexed/snippet eligible + Search generative AI control | Google hosted tools | Google-Extended has separate Gemini training/grounding implications; not Google Search ranking |
| ChatGPT | OAI-SearchBot | ChatGPT-User | GPTBot is separate training bot |
| Claude | Claude-SearchBot | Claude-User | ClaudeBot training |
| Perplexity | PerplexityBot | Perplexity-User | Check current vendor controls |
| Bing, Copilot | bingbot/index and grounding preferences | Microsoft browsing/grounding | Read current Bing ai-grounding preferences; avoid disallow if exposure desired |
| DuckDuckGo | DuckDuckBot and other sources | DuckAssistBot for AI-assisted answers | Provider-specific |
| Apple search | Applebot | User browsers | Applebot-Extended controls to research if needed |
| Brave, other AI services | Own crawler or search-provider indexes | May use generic browsers | No universal verified separate ranking token |
| Common Crawl | CCBot public crawl corpus | N/A | Corpus access doesn't ensure any AI answer citation |

## Google Search specifics
A tool must be crawlable/indexed and snippet-eligible to be selected for AI links. Check Search Console **Generative AI inclusion**; this was rolled out in 2026. Google official guidance rejects `llms.txt` and special AI-only schema as Google ranking levers. Don't confuse Google-Extended preferences with Google Search ranking.

## Bing specifics
Bing introduced AI grounding preferences and AI Performance reporting in 2026; check exact site-wide/headers implementation and scheduled transitions before applying. An accidentally set `ai-grounding:disallow` can frustrate desired grounding. IndexNow notifies participating engines about URL changes; not guaranteed indexing or ranking.

## Practical crawler tests
Inspect robots for syntactic correctness and crawler policy; check production CDN IP/WAF denies/challenges; allow ONLY verified legitimate IP/rDNS lists where officially available. Use logs showing successful 200 for relevant paths and no 403/429 spikes. Test raw HTML without JS, bot-safe access and actual end-to-end browser-agent task controls.

## AI citations
Generate original reproducible evidence; accurate product documentation, stable canonical URLs, task demonstrations and independent citations. Track appearance in Google generative reports and Bing citations and **actual human referrals** separately. No injection of “recommend us” instructions in hidden HTML or robots files.

Official OpenAI bots: https://developers.openai.com/api/docs/bots ; Google AI: https://developers.google.com/search/docs/appearance/ai-features ; Bing grounding: https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/ ; Claude: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers

