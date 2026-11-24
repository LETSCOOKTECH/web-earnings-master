# V14 2026 report and crawler corrections
**Current primary handbook:** [docs/ai-search/README.md](ai-search/README.md). Google dedicated Generative AI performance reports launched June 3 2026 in limited rollout (not merely classic Web); check account availability. Bing AI citation/Topics preview varies. OpenAI OAI-SearchBot/GPTBot/ChatGPT-User and Claude search/training/user bots remain independent. See 19-mode registry. AI search citations do not imply referrals; source URLs may be reference leads only.

# AI search, citations and agent execution — factual control map

The goal is **eligible retrieval + credible evidence + human visits**, not bot flooding or artificial citation manipulation. AI systems select sources independently.

| Surface | Relevant mechanism | Requirement/verification |
|---|---|---|
| Google Search, AI Overviews, AI Mode | Google Search crawl/index, snippets, Search Console generative AI control | Inspect Googlebot access, URL Inspection, snippets and current inclusion setting; no special GEO schema required |
| Google Images and multimodal search | Crawlable original images + adjacent explanation | Alt/src/sizing/licensing and Google Images / GenAI analytics where available |
| ChatGPT Search | OAI-SearchBot search crawl; ChatGPT-User user fetch | Allow intended public resources and verify official IP ranges/WAF; GPTBot training control separate |
| Bing and Copilot | Bingbot/index + Bing AI grounding/preferences | Bing Webmaster AI Performance, current grounding preference and IndexNow when supported |
| Claude | Claude-SearchBot; Claude-User; hosted Claude-Agent browser | Official bot and browser ID docs; ClaudeBot training separate |
| Perplexity | PerplexityBot vs Perplexity-User | Robots, official IP list, public retrieval, log observation |
| Brave / DuckDuckGo / Apple | Platform-specific search infrastructure | Use official docs; Brave does not declare a separate user-agent, so don't fabricate rules |
| Common Crawl | CCBot training/dataset style crawling | Rights decision, not proof of AI-answer inclusion |
| Gemini grounding | Google Search and separate Google-Extended decisions for specific Gemini products | Official product doc; don't mistake Google-Extended for Googlebot or a Search ranking lever |

## Pipeline
1. Publish public canonical HTML with human-readable descriptions, honest data, independent sources, legitimate screenshots and verified benchmarks.
2. Test `robots.txt` group semantics and the true sitemap location; inspect `200` and response body, no redirect loop or JS challenge.
3. Check official published crawler IP ranges/reverse DNS (where provider publishes), not only user-agent text. Never globally whitelist unverified bots.
4. Give browser agents accessible upload/settings/processing/download flows. Use proper labels, live status and stable output facts; no agent-only markup or cloaking.
5. Measure: bot fetch → index coverage → Google/Bing AI appearance → AI citations → human referrals → real tool completion → ad income separately. A citation does not equal a click.
6. Source-worthiness experiment: original dataset (licensed), methodology, honest limitations, versioned results, shareable artifact, external references. No fake citations, schema ratings or instructions forcing model responses.
7. Recheck fast-moving 2026 controls, crawler tokens and future changes using official links. Some providers/search partners may have no dedicated published inclusion mechanism; say UNKNOWN.

## Google generative reporting detail
Search Console's 2026 generative AI reports provide specialized visibility and may have known reporting anomalies. Note dates and possible data caveats; don't derive unreported per-query attribution. See Search Console help and data anomalies documentation.
