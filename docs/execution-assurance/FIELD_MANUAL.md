# V10–V19 Field Manual — Evidence-driven Website Business Execution

This manual is a reusable decision system, **not** an assertion that search rankings, ad accounts, source ownership, or market fit have been observed. The agent must adapt depth to materiality. Current first-party policy and actual user/owner data supersede stored historical conclusions. Work only with authorized tools and rights.

## 1. Meaning of "push the limits"

High effort means **pursue the next highest-value falsifiable observation**, not browse endlessly or consume tokens. On each consequential task define:
1. A concrete outcome: real person's input -> useful correct output -> measurable success.
2. A specific decision: build, reject, fix, promote, launch or withdraw.
3. Minimum sufficient evidence for that decision, with original developer/provider material, genuine human need and a reproduction when applicable.
4. Counterhypotheses: why could demand, usability, security, distribution or economics fail even if evidence supports them?
5. Budget and stop limits for human hours, browser actions, LLM tokens, provider access, money and privacy exposure.
6. A separate verifier. If no independent actor exists, disclose self-review; a second persona of the same model is not an independent verifier.

Failure to find sources is not license to invent. Attempt the least expensive lawful alternative (official changelog, vendor issue tracker, permitted public source, direct browser verification, or opt-in human interview), record the error and retry count, then mark BLOCKED/UNKNOWN.

**Stop** after sufficient decision-grade evidence, a fatal disproof, diminishing information value, exhausted consent/resources, or terms/auth limits. Never trigger paid API calls, mass scraping, CAPTCHA bypass, ad interaction, unauthorized posting or deployment as an "effort" escalation.

## 2. Evidence source hierarchy

| Claim | Direct original evidence | Independent corroboration | Rejection example |
|---|---|---|---|
| Official crawler purpose | Current provider's own bot/control documentation, checked date, access and effective scope | Provider changelog, independently measured authorized server log and bot IP verification | User-agent string alone, article hash change, secondary SEO article |
| Browser or framework API | Versioned official API reference/source, release notes and target browser | Reproducible program and compatibility run on affected engines/devices | Generated code without execution, unreleased draft treated as stable |
| Human pain | Original complaint or consented interview with exact job, context and date | Separate originating groups, direct observation, counterexample | 20 syndicated copies of one thread, AI-written testimonial, unverified author labeled verified |
| Competitor weakness | Same-input legal use, actual output, error state, time, plan/region/device | Additional independent fixture trials and original issue/review | Screenshot-only feature omission, temporary outage as permanent flaw |
| Search demand | Same-filter Google Trends index, permitted licensed keyword models, real SERP and own property data where applicable | Human job frequency, adjacent query clusters, market substitutes | Relative Trends index asserted as absolute search volume |
| AI citation | Actual dated answer from named provider/surface with URL and prompt parameters | Repeat prompts, user referrals, provider analytics where authorized | robots.txt allowed interpreted as citation, a screenshot without source |
| Publisher approval | Original network account state and current rules for specific site/ad unit/region | Provider agreement and invoices | Generic checklist says eligible, keyword CPC implies page RPM |
| Profitability | Reconciled cash payments/revenue and actual provider bills over same period | Correct-task denominators, tax/returns/invalid-traffic adjustments | Modeled projections treated as received income |

Every claim must preserve: original URL or source ID, UTC observation, *what was actually read/ran*, account ownership/authorization, locale and device where material, provenance group, confidence basis, contrary observations, source version, test artifact and reviewer. Non-opened URLs have **lead** status, not original-body verification.

## 3. Reverification protocol: provider, developer, human

### Provider
- Open current official text, not merely a search snippet or cached headline.
- Separate publication date, announced/effective/rollout date, product, geography, account, format, and exceptions.
- Inspect conflicting official product/help/changelog pages; note unresolved conflict and avoid inferring globally applicable behavior.
- If blocked by 401, 403, 429, MFA, login or access control: record reason, use permitted alternate first-party documentation, request authorized manual export if needed, otherwise UNKNOWN.
- When changing bot access, ads, privacy, security or deployment policy, use the existing `require-action-time-sources` evidence gate **as well as** manual semantic review. Neither hash watches nor machine receipts establish meaning.

### Developer
- Record exact component/repository release version and linked original documentation, source commit, reproducible issue or minimal test.
- Reproduce on owned environment with fixed inputs, runtime versions, expected and actual output and failure logs.
- Test an unhappy path (timeout, invalid input, permission denied, race, low memory) and one competing explanation.
- A single unsolved GitHub issue proves a complaint was filed, not that a bug exists in every version. Do not claim a developer identity is verified without authorization and proof.

### Human
- Capture original task verbatim as a **short paraphrase** plus URL, post date, visible product version, context and non-sensitive observation; avoid unnecessary personal details.
- Deduplicate by originating conversation/person when truly known; otherwise use a conservative origin group. Do not equate pseudonymous account with verified real identity.
- Sample positive, negative and resolved cases; disconfirmation includes a currently adequate free alternative, old fixed bug, extremely rare job or inability to access a relevant audience.
- When deciding to spend significantly, conduct opt-in short interviews or a real completed-task pilot. Count consenting participants and observed task outcomes separately from online narratives.
- Human evidence cannot override license, safety or publisher compliance.

## 4. Opportunity and traffic hunter decision laboratory

**Discovery:** define exact job, 2–3 reasons idea might fail and sources that can cheaply disprove it. Investigate demand type (urgent/repeat/seasonal), geography, SERP ownership, incumbent substitutes, credible source independence, and human pain. Do not make a huge keyword matrix before checking whether the output is legally and technically possible.

**Validation:** same-input competitor experiments, a working output oracle, small experiment, source rights, localized search, and three revenue scenarios: pessimistic, base, stress. Separate impressions -> clicks -> qualified sessions -> starts -> correct completions -> revenue. Search zero-click behavior and AI answer surfaces can shrink obtainable traffic.

**Traffic:** choose two or three channels with users who need the specific outcome. Consider relevant communities, original datasets, integration partners, organic search, help/tutorial content, AI referrals, creator demonstrations, newsletters and controlled paid pilots. Obtain actual publishing permissions. Do not automate unsolicited engagement. Run a small instrumented experiment and inspect completion, not vanity clicks.

**Decision vocabulary:** `REJECT` for disproven premise or noncompliant dependency; `PIVOT` if user need exists but mechanism or distribution fails; `TEST_FIRST` when cheapest falsification is pending; `INSUFFICIENT_EVIDENCE` when legally accessible data is insufficient; `GO_FOR_MVP` only for a human-reviewed, bounded MVP candidate. A machine-completed manifest does not automatically grant GO.

## 5. Competitor laboratory — input oracle

For each competitor record: exact URL, task, plan/access, consent, device, browser version, locale, region, timestamp, test fixture hash, output, latency, steps, file quality and missing capability. Define objective expected output before running the product. Repeat under ordinary and edge conditions. Include a competing incumbent, built-in device capability and cheap alternative. Capture blocked access as `ACCESS_BLOCKED`, not functionality missing. Prefer improvement in correct user value over beating incumbents on imagined ranking signals. No unauthorized reverse engineering or license circumvention.

## 6. Production factory — minimal correct vertical slice

1. Test real job feasibility and choose architecture from measured capability: static HTML/browser, local WASM/worker, API/queue or hybrid. Preserve portability and privacy.
2. Implement deterministic transformation kernel and independent output oracle first; enforce format/size, cancellation, retries, mobile and low-memory behavior.
3. Separate UI, tool core, API, auth, storage, analytics, ads and configuration. Protect sensitive user files; do not send file contents to ad/analytics scripts.
4. Test unauthorized access and cross-tenant isolation, SSRF, malformed uploads, resource exhaustion, timeouts and idempotency where applicable. Follow current versioned official library/security guidance and appropriate OWASP ASVS controls.
5. Deliver complete user-visible loading, empty, error, success, offline, keyboard, and recovery states; ensure server-rendered/initial public HTML communicates actual value.
6. Stage and smoke-test real system: DNS/TLS, robots, canonical, logs, CSP, CDN caching, CI, security/dependency scan, performance budget, backups, rollback and incident owner.
7. Require authorizations for deploy, credentials, spending and public ad inventory. **PASS_LOCAL is not PRODUCTION_READY**. A million-user model is not load-test evidence.

## 7. Search and AI performance measurement

Use separate tables for crawled, indexed, ranked, featured-answer shown, AI-cited, human-referral, starts, correct completions and revenue. Attribute provider, date, geo, device, exact query/prompt surface and access method. Compare actual owner GSC/Bing/analytics and server logs when authorized, noting sampling/anonymization. For AI answer evaluation, record prompt sets, provider/model/surface, locale, sampled output, citation correctness and repeated variability. A source link or crawler permission is not evidence of placement. Resist claiming an undisclosed scoring formula from toy information retrieval experiments.

## 8. Retention and financial measurement

Use privacy-safe anonymous/cohort event grains with clearly defined denominators. Distinguish a one-time utility from a repeat product. Correct output and time saved precede retention optimization. Diagnose drop-off: sessions without starts, starts without correct outputs, failures specific to devices, and users for whom the task is naturally infrequent. For monetization reconcile actual money received, provider deductions, invalid-traffic adjustments, subscription receipts and operating bills over matching periods. Separate modeled ad RPM and billed revenue. Include server compute, storage, egress, moderation/support, software licenses, refunds, consent and abuse spikes. Never optimize for accidental ad clicks or obstruct core workflow.

## 9. Independent verification gates

A separate verifier should challenge the following before accepting a consequential task:
- **Provenance:** Was the original content actually opened? Is capture artifact inspectable? Is the author/group independent? Is data licensed or consented?
- **Correctness:** Can input/output and source claim be reproduced? What exact version/date/scope does the observation apply to?
- **Counterevidence:** What result would falsify the hypothesis? Was a plausible rival explanation tested?
- **Safety:** Are secrets, identity, privacy, third-party rights, publisher policy, unauthorized remote actions and cost caps respected?
- **Outcome:** Does evidence show the user-relevant outcome, or just a supporting prerequisite?
- **Clarity:** Are FAIL, BLOCKED, UNKNOWN, PASS_LOCAL and PASS_EXTERNAL states separately reported? Is self-review disclosed?
- **Release:** Does an accountable human approve high-impact actions with rollback?

Run `node scripts/route-execution-skills.mjs <STAGE>` for initial skill routing and `node scripts/check-execution-assurance.mjs --file <RECEIPT>` to validate a scoped receipt. The scripts inspect declared structure, not authenticity or semantic truth. Unit tests use deliberately synthetic evidence. Never change a production setting based on an artifact that only passes these scripts.

## 10. Adversarial benchmark suite — independent real tasks

For each quarterly/meaningful skill revision, run a versioned set containing at least these *classes* (not necessarily every case on every trivial task):
- Apparent high demand solely from relative Trends; low search but real job frequency.
- Ten reposted complaints from one originating thread; an old version's fixed bug.
- Conflicting current and cached first-party policy; future-effective rule mistaken for active.
- Source snippet with no opened original; restricted login, 429 or blocked provider page.
- Phantom rival feature failure from a screenshot; real same-input conversion invalid.
- Browser-only access claimed as logged-in tool execution; CAPTCHA/anti-bot circumvention request.
- Fake human interview, unverifiable developer identity, forged citation or no evidence artifact.
- Paid API request despite zero budget, unbounded browser actions, resource-exhaustion/SSRF probe.
- Working UI with broken output, unsupported low-end device, missing failure/rollback.
- 1M MAU mistaken for peak concurrent jobs; unknown vendor bill converted to zero.
- AI citation counted as Google clicks; ad CPC treated as publisher revenue; suspicious traffic celebrated.
- Automated public post, misleading ad experience, unreviewed privacy/consent and fake source-monitor hash inference.

Benchmarks must grade: correct verdict, source provenance, uncertainty and counterhypothesis, real executable artifact, stop-rule compliance, cost and false approval rate. Capture concrete failures and fix the narrowest affected skill or executable validator. If results cannot be independently reproduced, label evaluation *not run* and do not declare improvement.

## 11. Maintenance and acceptance

An internal skill release requires no orphan skills, scoped router acceptance, valid sample structure, negative tests, CI green, versioned changelog and manual review of critical ambiguities. A website business outcome separately requires actual property, user tests, traffic, invoices, policy/account state and an observed reporting period. Never merge skills on the assumption they directly produce Google or ChatGPT rankings or AdSense revenue. Preserve raw evidence in authorized private storage with redaction and retention limits; do not commit user data, credentials, private exports or logs to the shared repository.
