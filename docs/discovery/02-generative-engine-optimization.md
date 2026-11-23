# GEO: Generative Engine Optimization — provider-by-provider retrieval and citation research
**As-of:** 2026-11-23. **Owner:** web-generative-engine-optimization. This is a falsifiable operational workflow, not reverse-engineered proprietary ranking weights.

## 1. Separate the engines and surfaces
| Provider/surface | Normal eligibility/access path | Disallowed inference |
|---|---|---|
| Google Search AI Overviews + AI Mode | Google Search index + snippet eligibility; Search generative AI property inclusion control; ordinary SEO/quality. AI Mode may use query fan-out. | Special llms.txt, WebMCP, root-level URL or FAQ markup directly boost citations. |
| Google Gemini app/API with grounding | Different product/control/API; establish exact retrieval/grounding mode. | Assume identical citations to AI Mode or same source inventory/metrics. |
| ChatGPT Search | OAI-SearchBot for automatic search discovery; user-triggered ChatGPT-User separate; GPTBot model-training access independent. | GPTBot allow = guaranteed ChatGPT search citations. |
| Perplexity | PerplexityBot search and Perplexity-User action path; published IPs and independent robots purpose. | Perplexity-User fetch = index inclusion or search answer click. |
| Claude Search | Claude-SearchBot search-related access, Claude-User user fetch and ClaudeBot model training separately. | All Anthropic bots share purpose or Google crawl rules. |
| Bing AI/Copilot | Bing search/grounding; Bing Webmaster Tools AI Performance preview including citations/intents/Topics Portfolio beta. | Bing "Citation Share" means Google AI impressions or website visits. |
| Browser agents | HTML semantics/accessibility, real interaction and optional experimental WebMCP surfaces. | Lighthouse agentic audit scores are Google Search ranking weights. |

Originals: https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.openai.com/api/docs/bots ; https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://docs.perplexity.ai/docs/resources/perplexity-crawlers ; https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ .

## 2. AI retrieval architecture from first principles
Not every generated answer executes live web search. Distinguish (A) model knowledge without retrieval, (B) Search index or partner index grounding, (C) multi-query retrieval/fan-out, (D) user-triggered URL fetch, (E) connected private source, (F) browser/computer agent executing tasks, (G) API tool result. Source opportunity and permission depend on which path is used. Query fan-out may produce related searches, but provider-selected queries, candidate sets and citation weights are undisclosed. A page can rank for a single head query yet not be cited; another may be cited without ranking first for that query.

### Live eligibility gate
- DNS/TLS and true public 200 page with meaningful raw HTML, canonical, no 401/403 or soft-404, no JS-only empty shell.
- robots/user-agent *per provider purpose* plus CDN/WAF access that verifies bot identity from documented IP/domain, not user-agent string alone.
- For Google AI Mode, index + snippet eligibility + inclusion/parent inheritance setting when authorized. Search Console inclusion rolled out worldwide as of **Aug 31, 2026**; default included and NO rank bonus. Distinguish from Google-Extended.
- For OpenAI, OAI-SearchBot and GPTBot robots controls independently; user action fetches may not observe normal automated-crawl logic.
- Avoid publishing sensitive data, cloaking or bypassing crawler exclusions in the name of GEO.
- Use current source docs; model-training controls, user-fetched access and assistant citation permission are not equivalent.

## 3. Genuine source-worthiness (hypothesis, not "GEO factor")
Invest where an AI answer can benefit from current evidence unavailable as generic model memory:
- original standard-compliant converter benchmarks with test fixture hashes, code versions, same input vs multiple rival outputs;
- transparent product constraint table (formats/codecs, limits, file sizes, locales, privacy, region, accessibility);
- documented experiment method and neutral results including failure cases;
- primary API/tool documentation, reproducible tasks, reference assets and versioned examples;
- legitimate references from independent communities because others actually use the tool (never synthetic citations or coordinated fake engagement).

Structure information so humans and retrieval systems can understand it without a gated upload. Put essential text and relevant internal links in real HTML; preserve tested downloadable outputs. Do not force every fact into synthetic 40-word chunks: Google explicitly discourages generative-AI-only rewriting and llms.txt tricks.

## 4. Citation study (provider-specific)
**Pre-register** target site + brand, engine/surface/version, country/locale/time, at least multiple query families and negative controls. For every prompt run save:
- prompt_id, exact prompt, exact time and engine, model and provider if disclosed;
- displayed inline supporting URL (including canonical final URL) separate from text-only mention, backend-observed retrieval and offsite references;
- sampled repeat ID and explicit permission or API source; don't claim "what the model searched" from a generated explanation;
- ground truth of product claim and factual accuracy; users can verify source;
- actual human referral separately from prompt sampling and account/site sessions;
- failed/search-disabled responses, refusal/unavailable, provider geo differences and prompt phrasing variance.

`node scripts/evaluate-ai-citations.mjs --file templates/discovery/ai-citation-batch.example.json` computes **observed citation fraction within the supplied nonrandom sample**, not engine ranking, true market citation share or causal impact. The supplied fixture is invented illustrative data and MUST NEVER be used as actual measurements.

## 5. Official metrics and attribution semantics
- GSC Search generative AI report rolled out globally August 31, 2026; reports its own generative AI feature impressions. It is not the same as ordinary organic clicks or third-party AI mentions. https://support.google.com/webmasters/answer/16984139
- Bing Webmaster AI Performance may provide citations/grounding metrics and newly released Citation Share, intent/topic reports, Topics Portfolio beta. Treat beta/product scope carefully. https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/
- ChatGPT/Claude/Perplexity public answer samples are observational, nonrandom, reproducibility fragile; no official cross-provider "GEO leaderboard".
- Human referral might be untagged/direct, referral suppression and app open context vary; use privacy-respecting owned logs and session attribution with explicit unknown/unclassified class.
- Adsense traffic: AI agents are not automatically monetizable human advertising audiences. Do not count automated fetches as ad impressions or stimulate ads/clicks.

## 6. Independent experiments and reversals
Experiment candidate: Publish primary benchmark showing AVIF->JPG color preservation, loss and processing cost across formats on low-end devices. After validating input/output, collect new citations of the original benchmark vs control pages in matched prompt sets, track observations over weeks, and inspect human referral/task-completion effects. Alternative causes: provider retrieval changes, prompt wording, platform updates, backlinks or random variability. If the benchmark is not reproducible or the user job does not exist, reject it even if it generated one citation.

**Never:** assert guaranteed ranking/inclusion, covertly add prompting directives to third-party pages, mass-generate keyword fan-out doorway pages, flood Reddit/YouTube with fake endorsements, forge source publication dates, equate llms.txt presence with Google AI visibility, treat experimental WebMCP as universal.

## 7. Source-monitoring and owner-limited gates
Research source baseline: `sources/discovery_provider_claims_2026-11-23.json`. Monitor provider official docs via `sources/foundation_refresh_targets.json`, but a hash difference is a review signal only. Actual GSC, Bing Webmaster, LLM analytics, and site server logs require authorized credentials. If absent mark `UNKNOWN_EXTERNAL`. Only reviewer-approved tests/skills changes are production truth.
