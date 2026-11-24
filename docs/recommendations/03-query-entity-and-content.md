# 03 — Query-first information architecture, answer clarity and entity trust

## From human task to real page
Build a compact intent lattice, not hundreds of near-identical pages:
- **Discovery**: "what tool does X," symptom/format/problem, broad alternatives.
- **Decision**: "best free/offline/privacy-safe X for Y," direct pros/cons, tested outcomes.
- **Comparison**: "X versus Y for Z," honest feature and output evidence, cases where Y wins.
- **Implementation**: how-to, a small working demo, tested API snippet or screenshot.
- **Recovery**: unsupported input, known failures, troubleshooting and migration.
- **Post-use**: export, accuracy verification, reproducibility, support.
Each page should earn a distinct canonical and fulfill a genuinely distinct need. Do not generate combinatorial locale and "best X 2027 for ..." doorway URLs. Establish baseline query demand first.

### Content design for actual questions
1. Put the direct useful answer early **where readers expect it**, in ordinary semantic HTML; include conditions and outcome. Do not shorten every section into unnatural sentence fragments for an imaginary AI chunking coefficient.
2. Ground each factual/technical claim in first-hand tests and the relevant current source. Link original methodology, not paid blog-to-blog citation rings.
3. Use headings to distinguish the user's decision stages, concrete examples and *verifiable* comparative tables when actually measured. If a value varies, give bounds and what changes it.
4. Include honest alternative paths and "do not use this if" statements. Relevance is situational: claiming best for everyone is often contradicted by the customer's constraints.
5. Keep pricing, supported formats, version, release limits, privacy guarantees and support details current. A stale result can still be indexed and cited while giving a harmful recommendation.
6. Structured data represents visible truth and actual supported Google Search features (SoftwareApplication/FAQ/HowTo or Product only when compliant and appropriate). Schema.org vocabulary alone is NOT a Google AI recommendation boost; unsupported ratings/FAQ rich-result claims are forbidden. Google explicitly says no special generative schema or llms.txt is necessary.
7. Preserve accessible source, real anchors, correct canonical/noindex, URL fragments where useful, stable document title and a readable text description even if functionality is client side.
8. Provide honest photos/diagrams/benchmark artifacts for tasks with a visual component, verified alt text and accessible descriptions. Never copy someone else's visual benchmark as original.
9. Consider the privacy/safety cost of exposing examples: no real customer data, secrets, sensitive tokens or indexed private results.

### Product entity and canonical identity
Declare one public canonical product name and URL. Record owner/publisher, how to contact, exact tool name/versions, platform, support regions and pricing status consistently on the website, official profiles and verified directories. Correct errors in normal channels. Separate real third-party brand claims from a marketer's assertion. Avoid false "Google Verified", "ChatGPT Recommended" and "Perplexity #1" badges.

If your site operates in multiple languages, publish real adapted translations and successful task labels; validate grammar, examples, legal availability and hreflang reciprocal links where relevant. A page that merely auto-replaces keywords may not solve the localized job. Sample providers independently by country/locale and product/version.

### User-driven authority loop
User asks -> useful original free tool -> successful result -> support and publicly documented fixes -> legitimate recommendation/share from a real user -> independent corroboration -> more qualified discovery. Track completion, true return and support complaints. Demand and product experience create the *reason* independent people might link; it does not mechanically trigger a model's vote.

### Google Preferred Sources safely
For eligible publisher/news domains that appear in Google's source preferences tool, the reader can deliberately choose the publisher; Google documents optional official scripts or a deeplink to invite this choice. Domain or subdomain must be eligible. This may affect Top Stories and display preferred badge in AI Mode/Overviews when user-selected. Do not claim a generic utility is eligible, or that installing a widget makes it #1; don't silently opt users in. Check actual user UX, cookie/CMP and policy.

### When direct answers hurt rather than help
Some simple informational questions are answered without clicks. Offer distinctive task execution, an interactive sandbox, a downloadable verified artifact, up-to-date datasets, original measurements, practical personalization or support beyond generic definitions. Do not hide the answer to force clicks; preserve usefulness even when a user gets a short AI summary. The economic strategy must account for zero-click behavior and actual costs.

### Agent readiness (separate from source ranking)
Browser agents benefit from accessible native forms, predictable labels, stable results, clear errors, explicit consent and no deceptive downloads. Test agent task success as an independent endpoint, not a secret AI citation ranking flag. WebMCP/structured tool manifests are optional ecosystem-specific integrations, not universal Google or ChatGPT SEO requirements.
