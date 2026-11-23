# 07 — Opportunity Decision Report — strict format

The owner needs a decision, not 100 pages of source snippets.

## Summary fields
- Idea, exact user job and observable input/output oracle.
- Target country/language/device, relevant alternatives.
- Decision: INSUFFICIENT_EVIDENCE, TEST_FIRST, PIVOT, REJECT, or GO_FOR_MVP candidate awaiting human signoff.
- Reason and strongest contrary evidence.
- Research period UTC; browser mode; account/permission state; max and spent credits, API units, cash, actions and minutes.
- Next **smallest reversible test** with success/failure condition.

## Six-pillar proof table
| Pillar | Directly witnessed evidence | Modeled/inferred | Unknown / disconfirming |
|---|---|---|---|
| Demand | authorized Trends chart + real filters / owner GSC | estimated keyword volume and trends | actual absolute query count |
| Human pain | distinct original reports/interviews or valid task events | biased online complaint sample | author human identity and prevalence |
| Competition | same-input output verification, current pricing | modeled visits/KD/referring domains | usability on all devices |
| Distribution | actual pilot response and referral tasks | expected SEO organic capture | future rank/click share |
| Feasibility | prototype output oracle, measured device and security tests | proposed architecture | untested edge cases |
| Economics | dated provider invoices/quotes, real verified revenue | assumed margins and RPM | publisher approval and scale |

## Evidence ledger
For each claim: id, original URL, publication/observed UTC, access (opened vs snippet), exact query/time/geo/device/term-vs-topic, capture mode, screenshot/CSV/hash if actually saved, observation vs model, unit, claim, independent origin, supports/contradicts, source terms and caveat. Never invent a path.

## Critical adversarial hypothesis
"What if all volume estimates are misleading, the competitor already fixed the pain, Reddit complaints are copied and Google AI answers the query without a click?" Analyze how this affects the decision, and what inexpensive evidence would disprove that pessimistic scenario.

## Worked hypothetical — 50 KB image compressor
This is not observed current market demand.
Job: a user needs a reliably accepted exact-size upload image, no surprise upload. Need current official form requirements, matching Trends comparison and optional Keyword Planner/Semrush scope, independent public user-problem contexts where allowed, at least two same-input competitor tests, low-end device true output, privacy/network review, cost budget and real users completing an authorized pilot. Do not infer website traffic from SEO keyword volume. Expected initial decision: TEST_FIRST.

## Report artifact set
`decision.md`, `evidence-ledger.json`, `source-receipts/` (redacted licensed data only), `trends-raw.csv` (if really downloaded), `serp-observations.csv`, `competitor-tasks.json`, `budget.json`, `pilot-plan.md`, `unresolved.md`.
Missing file or unavailable account is UNKNOWN, not pretend success. Do not claim human identity verification from public comment authorship.
