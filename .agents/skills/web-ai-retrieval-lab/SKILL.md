---
name: web-ai-retrieval-lab
description: "Analyze real AI search, RAG, grounding, citation selection limits, model search bots and agent browser task reliability with provider-specific controlled experiments."
---

# web-ai-retrieval-lab

**Trigger:** Google AI Mode/Overviews, Gemini grounding, ChatGPT Search, Claude, Perplexity, Copilot, AI citations, agent/browser automation, WebMCP or generative-engine visibility questions.

**Read:** docs/foundations/05-ai-retrieval-agents.md, 04-crawlers-robots-control.md, 08-experimental-reverse-engineering.md, 09-source-refresh.md.

**Inputs:** product, exact experience/model if known, geography and user job, site URLs, account/control availability, sampled prompts and evidence.

**Procedure:**
1. Identify mode: model-only answer, index/RAG, web search fan-out, API, private connector or interactive agent. Never infer exact proprietary retrieval architecture.
2. Reopen current provider bot and search/AI docs, label search/training/user-fetch separately, record checked date and rollout. Google AI Mode is not identical to Gemini app.
3. Verify public page accessibility, canonical HTML, source originality and actual bot access using authenticated evidence; no fake llms.txt or GEO-only schema requirement.
4. Pre-register controlled prompt batch by type and locale, run engine/version/time-bounded samples, preserve exact citations and source links; compare relevant rival pages and likely click opportunity.
5. Evaluate semantic forms, accessible labels, progress states, authenticated actions and human confirmation for agent tasks. WebMCP preview is not universal compatibility.
6. Measure verified requests, source appearance, human referral, task completion and ad revenue as independent stages.
7. Summarize competing hypotheses and source-confidence. If tools or live logs unavailable, list what cannot be verified and produce a reproducible plan without declaring success.

**Outputs:** product/crawler matrix, AI response citation log, tested prompt battery, agent task report, policy risk and next decision.

**Ban:** imaginary citation score, prompt injection to make AI cite the site, unsafe bypass, counting AI mention as paid traffic, unverified partner crawler names.

## Deep operations extension (v2.2)
Read chapter 15 for six retrieval modes, chapter 16 for actual 2026/2027 provider changes, chapter 14 for partner/independent index relationships and chapter 18 for controlled citation/agent tests. For Google generative Search verify indexing+snippet eligibility+current Search generative inclusion control; preferred-source highlighting is USER preference and not a general magic ranking factor. For Bing note future training vs grounding separation; for OpenAI/Claude/Perplexity inspect distinct crawler/user/training families. Browser WebMCP is early preview; fallback semantic HTML must work. AI citation, real human referral, task completion and ad income never share a denominator. Keep self-sampled prompts as observational only; no stable citation share claims.

## V14 — Search retrieval experiments with adversarial controls
Use docs/ai-search/03-geo-measurement.md. RAG/query fan-out are public conceptual mechanisms, not access to Google's private fan-out terms or rank weights. Preregister prompts from real user questions, compare same provider/surface/locale and repeat/time; actual URLs plus observation artifact, and unavailability retained in denominator. Run scripts/evaluate-ai-visibility-v14.mjs. No model instruction injected into page to demand citations and no third-party scraping contrary to permissions. All sampled citations remain observational.


## V20 AI search studies require an actually available source
Search bots do not host a website. Google AI Mode or ChatGPT cannot reliably cite a local-only demo at an IANA documentation hostname. First prove author-owned publicly accessible HTTPS source and true useful output, then run any model retrieval/citation experiment.
**Experiment structure:** preregister genuinely human task questions (unbranded and negative controls), surface/product (AIO vs AI Mode vs Gemini, ChatGPT consumer vs web-search API, Perplexity web UI vs API), model/version/date where exposed, repeat IDs, locale and observed country. Require unique permitted raw capture ID per attempt. Keep unavailable replies and negative recommendations in denominators. Count visible citation, neutral mention, positive recommendation and truly ordered first independently. Never infer an AI rank #1 from one synthetic panel.
Run npm run audit:recommendar-sources, npm run audit:recommendar-panel and npm run test:recommendar-holdouts. Inaccessible first-party current provider docs, owner Search Console and actual live responses remain UNKNOWN. See docs/recommendations/04-measurement-and-experiments.md and docs/quality/real-world-release-contract-v20.md.

**Case-specific negative control:** csv-lab.example.org is an IANA documentation-only fixture, not a live site. Any GEO study claiming that this URL appeared as a live, owned search result without an independently observed deployment must fail provenance review. Label NOT_DEPLOYED and separate local tool success from real provider source-selection experiments.
