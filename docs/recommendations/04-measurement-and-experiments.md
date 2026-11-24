# 04 — Genuine AI recommendation measurement and falsification

## What a number can and cannot mean
Provider model, retrieval index, consumer experience, geography, device, prompt history, model version, current sources, experiment mode, user personalization and answer presentation can all change the output. No single official global AI recommendation ranking exists. A self-typed "we are #1" count has zero evidentiary value without independently captured replies and realistic questions.

**Units:** a panel attempt = one preregistered provider-surface + locale + fixed question + fixed repeat. Every intended cell must occur, including UNAVAILABLE. Observed AI response = a captured answer with explicit product mode/version, time, reviewer and artifact. Outcome = an independently classified mention, visible citation, positive recommendation, explicit competitive first place, or a negative recommendation. Source click/session = first-party validated referral, NOT a citation. Conversion = real user task completion, NOT a visit or inferred ad RPM.

### Pre-registration protocol
- **Owner/team/date**: study_id and the preregistered timestamp before any results.
- **Audience**: target geography, legal availability, language, persona, task and device.
- **Panel source**: documented real human problems, interviews or first-party search-console cases. Mark whether a brand is already in the prompt; keep branded as a separate non-primary diagnostic.
- **Competitive set**: entity identities and real tested alternatives, no fabricated strawmen.
- **Provider and surface**: Google AIO vs AI Mode, ChatGPT consumer Search, Bing/Copilot, Perplexity, Claude, etc. A Google Overview is not guaranteed to trigger; record UNAVAILABLE when it does not. Do NOT use Google AI Mode as a substitute for AIO.
- **Replications and version**: fixed repeat IDs, dates, product versions, session conditions; compare within one provider and do not attribute independent sampling to the same model session.
- **Baseline and experiment**: freeze intervention, start/end windows, expected primary metric, diagnostic negatives and minimum relevance. Do not edit prompt panel after seeing responses.
- **Permitted collection**: human screenshots with timestamp/URL and permission or official/authorized API records. Avoid automated scraping of protected UIs and don't impersonate official crawler bots.
- **Annotator**: record exact visible answer excerpt, direct quote with product name, item sentiment, whether clearly ordered, any cited clickable URL. Independently audit a subset with a second human reviewer and adjudicate disagreements.
- **Controls**: competitor queries where our product is NOT the best option, old stale facts to catch unreliable praise, unbranded questions, no-answer/unavailable, alternative locales, unexpected personalized results.
- **Integrity**: store raw captures privately, hash and restrict access; avoid retaining sensitive prompts/user data. If source verification cannot be shown, classify as unverified.

### Operational instrument
Run: node scripts/evaluate-recommendar-v17.mjs --file templates/dominant-recommendar/SYNTHETIC-panel.json.
The committed file is demonstrably SYNTHETIC; clone the schema into a private real experiment only after obtaining authorized output. Use separately: node scripts/check-dominant-recommendar-v17.mjs.
The checker rejects missing cohorts, missing repeats, duplicate attempts, future timestamps, bogus first positions from an unordered list, fake competitor IDs, invented rank/earnings fields and citation host lookalikes. It verifies *operator data consistency*, not whether a screenshot is authentic or whether the model recommended your site. See actual CLI status STRUCTURAL_ONLY_EXTERNAL_UNVERIFIED.

### Formulas and interpretation
Let N = number of preregistered unbranded attempts for one provider+locale cohort (including UNAVAILABLE and negative outcomes). Positive recommendation rate = runs with explicit affirmative target recommendation / N. Visible citation rate = runs whose user-facing answer visibly links the owned host / N. Neutral mention without positive recommendation and background retrieval are not positive recommendations.

For an *explicitly ordered competitive subset* of at least two alternatives, first-place rate = runs with a POSITIVE target item in position 1 / number of responses with explicit ordered comparison. **Always report the original N and how many produced ranked comparisons.** First-place share CONDITIONAL ON a ranked comparison can be inflated if the provider rarely produces lists. Never divide by only favorable cases, and never infer "rank 1 in all AI search engines."

Wilson intervals for a preregistered non-random panel are descriptive only. They do not fix selection bias, correlated prompt repeats, temporal drift or missing languages. Use bootstrap/hierarchical or predeclared repeated-measures methods only when sample design supports them; report effect sizes with uncertainty, not unsupported p-value claims.

### External evidence ledger
- Google Search Console: authenticated property URL Inspection, generative AI impressions by page/country/device/date, dedicated Search/Discover reports, explicit owner generative setting. Worldwide report rollout noted Aug 31, 2026; still owner-specific actual visibility.
- Bing Webmaster Tools: authenticated citation pages, grounding queries/intents/topics, Topics Portfolio beta if visible. This is not automatically comparable with Google impressions.
- ChatGPT/Claude/Perplexity: permitted real captured user-facing answer and linked citations; no published vendor-provided universal first-place KPI.
- Web analytics: actual bot-filtered organic sessions, referrer attribution when possible, UTM tagging where legitimate, task-start/completion/error, actual retention and publisher ledger separately. Direct traffic and dark referrals must not be reattributed automatically.
- Commercial: consented user experiments, conversion and costs, AdSense policy/site approval independent of appearance in AI answers. Never auto-click ads or simulate users to raise metrics.

### What counts as improvement?
Set a baseline, attempt one change with documented rationale, hold out previously unseen human questions and comparable cohorts, collect follow-up results, compare with confidence and report external confounders (new model, indexes, UI mode, seasonality, competitor launches). Track human task outcomes and trust simultaneously; a citation-only lift that produces no useful work may not justify costs. Accept "no evidence of lift" when measured effect is not convincing.
