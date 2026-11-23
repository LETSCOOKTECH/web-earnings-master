---
name: web-ai-discovery
description: "Verify Google AI Mode/Overviews, ChatGPT Search, Bing/Copilot, Perplexity, Claude and other AI retrieval eligibility, crawler controls, citation evidence and agent usability."
---

# Ai Discovery

**Use when:** Verify Google AI Mode/Overviews, ChatGPT Search, Bing/Copilot, Perplexity, Claude and other AI retrieval eligibility, crawler controls, citation evidence and agent usability.

**Workflow contract:** Follow the next steps proportionally to the request. Prefer current primary sources to saved claims. Adapt the sequence when evidence suggests a better route; do not overbuild a minor task. Show exact verification, uncertainty, and safety boundaries. Read `AGENTS.md` and the matching `references/` files when carrying out substantial work.

## AI/search matrix (reverify each provider live)
1. **Google Search / AI Overviews / AI Mode:** normal Search crawl/index/snippet eligibility plus Search Console generative AI inclusion controls. Google's core search systems underpin these. Do not require llms.txt, invented GEO metadata or fake AI-specific schema. Measure Search Console GenAI report separately from organic clicks.
2. **OpenAI:** OAI-SearchBot = ChatGPT search crawler; ChatGPT-User = user-triggered fetch; GPTBot = model training. Respect current official policies, IP ranges and distinctions. Do not claim all ChatGPT browsing goes through OAI-SearchBot.
3. **Anthropic:** Claude-SearchBot, Claude-User and ClaudeBot have different purposes; Claude-Agent browser traffic can have different identification. Use official docs and avoid treating agents as classic crawlers.
4. **Perplexity:** check PerplexityBot, Perplexity-User, published IP-range guidance and robots. Differentiate automated discovery from user actions.
5. **Microsoft:** Bingbot, Bing Webmaster Tools, AI Performance and current grounding/training preferences; verify IndexNow/robots and any latest opt-outs. Do not assume citations prove rankings.
6. **Other platforms:** DuckDuckGo/DuckAssistBot, Applebot, Brave crawler, Common Crawl; report unsupported or unverified special ranking levers as UNKNOWN, not invented controls.
7. Verify normal human fetch and verified crawler paths on CDN/WAF (status, response, redirects, robots), using provider IP or reverse DNS guidance where available. User-Agent alone is spoofable; don't blanket allow bypass.
8. Improve likelihood of citation via *original reproducible work*, precise documentation, transparent limitations, accessible evidence and legitimate third-party references. Never generate fake conversations, fake reviews or prompts ordering AI to cite the site.
9. Ensure true agent-use workflows: semantic controls, labels, predictable task flow, error/status announcements, accessible result and download. No cloaking or special-only bot content.
10. Measurement table: crawler fetch, indexing, AI appearance/citation, AI referred human, task start, task completion, revenue. Record tests, geography and provider dates. None guarantees the next.

## Outputs
`references/ai-crawlers.md`, `templates/ai-engine-matrix.csv`, `templates/ai-citations.csv` with evidence. Recheck official sources in registry when provider behavior changes.

## Advanced AI Search research mapping (v2.2)
Read chapters 14, 15, 16 and 18. Country/product/version-specific source grounding is often partially undisclosed; split Google AI Mode/Overviews vs Gemini app, ChatGPT Search vs OpenAI API web_search, Claude Search vs Claude user fetch, Perplexity search vs Perplexity-User, and Bing AI Performance vs future Microsoft AI preferences. Kagi/Brave/DuckDuckGo may blend different sources or operate own indexes. Google preferred-source feature depends on user selection, not a universal rank or citation boost. Strong output is dated trace + citation validity + click/session/task outcome, NEVER fabricated source selection weights.
