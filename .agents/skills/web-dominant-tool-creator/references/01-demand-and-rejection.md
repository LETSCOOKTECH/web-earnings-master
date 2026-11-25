# Opportunity research — demand does not equal modeled traffic

**Trigger:** choosing, refusing or revising a web-tool business hypothesis. Read at Stage B. Never grant automatic market proof from a JSON ledger.

## Correct metrics and sources
Google Trends (https://trends.google.com/trends/) is a sampled, relative interest index, not absolute visits. Google Ads Keyword Planner (https://ads.google.com/home/tools/keyword-planner/) has advertising data, not organic ranking probability. Semrush/Ahrefs search volume and traffic estimates are modeled by their own data providers; record region, units, paid plan, retrieval time, result provenance and methodology. Search Console owner data (https://support.google.com/webmasters/answer/7576553) is property-specific historical impressions/clicks, not the market for a new domain. Do not label Reddit search-result snippets as original firsthand user research; read authentic discussions, distinguish duplicates/promotions from independent complaints, comply with platform ToS and community rules.

## Research sequence
1. Phrase precise human task: "validate 500 JSONL records without uploading" instead of generic "AI developer tools."
2. Record problem frequency and cost of failure from original user interviews where possible. Real user frustration can be urgent but rare; don't confuse intensity with volume.
3. Collect dated intent variants (unbranded, high-intent and novice questions), language/geo, and search ecosystem. Record trend signal and absolute estimate separately, with units.
4. Inspect two or more real competing substitutes on identical original tasks with independently specified correct outputs and negative cases. Capture actual version, output file/checksum, time on stated device, pricing and limitations. Where competitor wins, keep evidence.
5. Evaluate users' acquisition paths: query already solved by a Google calculator? incumbent with 10 years' trust? regulated content? unique functionality hard to copy? privacy differentiation? distribution permission?
6. Estimate scenarios with real costs: p95 CDN, compute, storage, egress, vendor APIs, moderation, support; gross revenue estimates are unproven until actual RPM and qualified visits.
7. Gate: **REJECT** when substitutes already meet needs and no differentiated job/distribution exists. **HOLD** when user proof or legal/account authorization unavailable. **PROTOTYPE_TEST** is a bounded experiment, not market acceptance.

## Artifacts
- market-evidence.json with original URLs, consent-sensitive raw receipt IDs, dates, exact metrics and mode;
- competitor-matrix.md with same task, different outputs and counterexamples;
- user-job.md and independent input/output fixtures;
- distribution-experiment.md and kill criteria;
- decision.md documenting uncertainty, owner review, next cheapest falsifying experiment.

## CLI with negative controls
The V22 opportunity evaluator rejects fake reference domains for real evidence, duplicate artifact IDs, missing competitors, unsupported "guaranteed #1" claims and unstructured types. The bundled synthetic example returns **SYNTHETIC_NOT_MARKET_PROVEN** even when it passes structural schema checks. A valid real-looking JSON remains EXTERNAL_EVIDENCE_UNAUTHENTICATED; it is not market proof.

## Known unknowns
There is no one source for all searches, AI answers or global demand. Search engines may answer user queries directly, causing zero-click demand. An identical user job can convert differently by country, device and business model. Record negative evidence without smoothing it away.
