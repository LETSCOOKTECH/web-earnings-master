---
name: sense-ai-discovery
description: Make sites retrievable and usable across Google AI Overviews/Mode, ChatGPT Search, Bing Copilot, Claude, Perplexity, DuckAssist and browser agents.
---


# AI-search, citation and agent compatibility

## Separate three mechanisms
A. Search indexing/grounding: Google Search index and generative AI inclusion; Bingbot and Bing grounder; OAI-SearchBot, Claude-SearchBot, PerplexityBot, DuckAssistBot, Applebot, DuckDuckBot. Other assistants can use partner indexes or fetchers.
B. User-initiated fetching: ChatGPT-User, Claude-User, Perplexity-User and browsers; site has to work under normal browser interactions.
C. Model training: GPTBot, ClaudeBot, Google-Extended (with additional Gemini grounding permissions), CCBot. These choices are **not identical** to search discoverability; document rights and downstream implications.

## Process
1. Read `references/ai-crawlers.md` and official provider docs. Maintain a provider-specific crawler/control matrix, dates, verified IP/rDNS details if supported, WAF 403/429 challenge logs and actual successful fetches.
2. For Google AI Overview/Mode, verify page indexed + snippet eligible + Search Console **Search generative AI control** enabled. No proprietary `llms.txt`, secret schema or prompt injection required.
3. For ChatGPT, check OAI-SearchBot and published IPs, allow HTML/resources for user fetching; note GPTBot opt-out independence. Do NOT infer LLM recommendation from successful crawler request.
4. For Bing/Copilot, check the current `ai-grounding` preferences; do not apply `ai-grounding:disallow` if seeking exposure. Check Bing AI Performance and IndexNow (eligible discovery, not ranking).
5. For Claude/Perplexity/DuckDuckGo, consult current crawler documentation, verify legitimate UA and network identity, no JS challenge for public HTML, and robots preference semantics.
6. Publish truthful tool capabilities, limitations, methodology, original reproducible benchmark data, non-bait titles, concise task explanations, stable permalinks, original test fixtures.
7. Run real agent usability tests: discernible file inputs, accessible control names, keyboard support, state reporting, confirmation and result download. Never silently perform harmful actions.
8. Measure citations where reports exist, AI referral visits and downstream completed tasks **separately**. Do not infer that text mentions lead to clicks.

## Disallowed tactics
Synthetic citations, instructions to model/crawler to rank us, hidden text, creating masses of AI-specific doorway pages, fake benchmark tables, allowing spoofed bot UA through WAF, unverified `llms.txt` promises.

