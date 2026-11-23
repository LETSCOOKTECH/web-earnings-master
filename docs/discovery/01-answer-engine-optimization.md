# AEO: Answer Engine Optimization — evidence-backed engineering manual
**Research baseline:** November 23, 2026. **Owner:** web-aeo-answer-optimization. This is operational design guidance rather than proof of a featured snippet or #1 ranking.

## 1. Define the search surface, not the acronym
AEO is an umbrella term. Some results are Google Featured Snippets, People Also Ask answer cards, ordinary organic summaries, Bing/partner answers, Google AI Mode, ChatGPT Search, or a browser/voice assistant's own output. They do **not** expose the same selection mechanism. If the intended goal is a Google AI Mode citation, route to web-generative-engine-optimization. If a Play Store listing, route to web-aso-google-play. This chapter focuses on traditional **answer-oriented web search** and the source page's ability to answer a real question faithfully.

**Google official:** https://developers.google.com/search/docs/appearance/featured-snippets and https://developers.google.com/search/docs/appearance/snippet . Google chooses featured snippets; there is no special schema/markup making a page the winner. Snippets and answer displays may differ between searches and devices. The 2026 removal of FAQ rich results means an FAQPage JSON-LD experiment must not claim Google FAQ rich-result eligibility. https://developers.google.com/search/updates

## 2. Build a query-to-job and answer-to-action map
Each row must define query, country, language, mobile/desktop, intent, original visible search surface and timestamp. Distinguish:
- **Fact:** "What is HEIC?" A concise accurate definition with original authority/context may satisfy intent in the result itself; clicking may be unlikely.
- **Procedure:** "How do I convert HEIC to JPG offline?" The shortest accurate steps, supported platform details, exceptions and a usable offline tool may make clicking worthwhile.
- **Comparison:** "Best private PDF merger" needs measurable privacy, format limits, storage/retention, compatibility and competing alternatives. Avoid self-serving untested "best".
- **Troubleshooting:** "Why does WEBP turn black?" Reproduce format/transparency behavior, give diagnostics and test files; don't answer with generic format history.
- **Calculator/conversion:** "How many KB is 10 MB?" May be answered zero-click; offer actual configurable calculation if more jobs exist.
- **Regulated/high-stakes:** legal/financial/medical questions require appropriate professional sourcing and jurisdiction/date. Do not oversimplify nuance into fake certainty.
- **Action:** "Compress video below 25 MB" usually requires a functional converter, not only a blog answer.

Cluster semantically equivalent queries to one useful canonical page. Create a separate page only when the user task, output behavior, model/format compatibility, jurisdiction or genuine decision really differs. A keyword-density target is not a causal SEO model.

## 3. Answer-page acceptance contract
1. Public 200 page, stable URL, useful initially delivered HTML, canonical and no unexpected robots/noindex/nosnippet. Live indexing is external evidence.
2. Accurate descriptive title/H1, contextually scoped H2s; the page begins with the correct answer or real task entry, not repetitive filler.
3. Verifiable primary source or reproducible benchmark per important claim, original method/date, no invented authority/reviews/research.
4. Context sufficient for decisions: conditions, country, supported units/format, last checked and what the answer does *not* cover.
5. Distinguish tested product claims from marketing: "file never uploads" requires packet/log validation, "100% lossless" requires output oracle, "free unlimited" must match quotas.
6. Accessible native headings, lists, tables, links, control labels, error/status semantics and no overlay hiding the task.
7. Content genuinely helps without the snippet; no pages that intentionally withhold the answer or exist merely to attract a result card.
8. Accurate structured data only if Google supports a relevant rich-result type; Schema.org validation is not Google rich-result/feature selection.
9. Review page for content safety, spam/doorway policies, translated content quality and rights.
10. Verifier tests observed user task and answer correctness before release.

## 4. Sample answer passage (not guaranteed to be selected)
Query: "Can I resize JPEG without uploading it?" Page answer should say what its *implemented code actually does*, e.g. "For supported JPEG files, this tool resizes on your device; the file content is not uploaded during this operation." Provide network-interception test link and disclose analytics/error telemetry and failure fallback. The specific promise is NOT valid until network logs and file oracle demonstrate it.

For query "HEIC to JPG vs PNG" don't create two shallow FAQs with swapped title words if the genuine job is deciding how to preserve transparency and fidelity; the user benefits from precise comparison and format-specific tested samples.

## 5. Relevance versus selection
**Clearly supported:** Search works using crawl/index/ranking plus relevance and user experience; headings and visible content explain the topic; descriptive real links help discovery.
**Unknown:** Exact featured-snippet selection weight, proprietary answer model decision, passage boundaries, CTR sensitivity.
**False:** A special FAQPage schema or exact 40–60 word excerpt guarantees a featured snippet; all voice assistants use Google's featured-snippet source; more question-variant pages always help.

Google can extract snippets from content rather than the meta description; a valid <meta> and clear paragraph is not permission to claim selected answer control.

## 6. Evidence battery and outcomes
Collect 20–40 real questions spanning factual, procedural, decision and task intents, including synonyms and adversarial wording. For each capture:
- timestamp/market/device; observed result type, our URL/rank/featured snippet if actually seen; competing cited URL.
- source of answer claim, expected correct answer, whether on-page answer is faithful and current; content update version.
- user journey: impression -> actual click -> correct tool output -> return; distinguish zero-click information needs from actionable tasks.
- change events, Search updates and alternative explanations; don't attribute SEO movement to word count alone.

`node scripts/audit-answer-page.mjs --file templates/discovery/answer-page.example.json` checks a supplied observation manifest. It cannot query Google Search Console or create featured snippets. If actual indexed state is unavailable, output `UNKNOWN_LIVE`.

## 7. Cross-check and escalation
- Index failure -> web-technical-seo.
- Short answer inaccurate -> original research/quality repair first.
- AI citation absent -> web-generative-engine-optimization, provider-specific retrieval tests.
- No human clicks despite snippet -> inspect demand/zero-click intent; not necessarily a technical issue.
- Store app ranking -> ASO branch; web answers do not directly certify Play/App Store positioning.

**First-party references:** https://developers.google.com/search/docs/appearance/featured-snippets ; https://developers.google.com/search/docs/appearance/snippet ; https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; https://developers.google.com/search/docs/essentials/spam-policies ; https://developers.google.com/search/docs/appearance/ai-features . Reopen current original wording before material policy decisions.
