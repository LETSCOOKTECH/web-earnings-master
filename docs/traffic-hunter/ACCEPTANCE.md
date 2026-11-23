# Traffic Hunter acceptance and adversarial matrix

## Acceptance categories
- **Contract documentation**: repeatable inputs, evidence taxonomy, source-grounded channel playbook, explicit non-actions and scoring.
- **Automated local**: Node validator, positive/negative fixtures, real test command output, 47-skill routing registry passes.
- **External source provenance**: current platform pages opened and constraints re-evaluated per actual posting/account action; no runtime auto-posting.
- **Product outcome**: real validated tool output and privacy/UX; absent actual site access means UNKNOWN_EXTERNAL.
- **Channel outcome**: real publication/outreach/promotion authorized with dated external artifact, qualified visitors, completed tasks, supplier cost and confounders.
- **Publisher outcome**: actual account compliance, traffic quality, consent, genuine ad impressions/revenue with declared attribution. Never inferred from traffic projections.

## Independent negative cases (specification, not all live-executed)
1. Nonexistent or empty user job.
2. Inaccessible destination, private URL or example.invalid presented as live.
3. Landing page only simulates conversion.
4. Source policy unreviewed or stale.
5. Social rule and community mod conflict.
6. Paid-to-click source with extreme modeled score.
7. Bot/engagement farm described as cheap growth.
8. Fake reviews/recommendations, AI citations, follower purchases.
9. HN autopost or generated comment campaign.
10. Product Hunt upvote incentive.
11. LinkedIn bulk unsolicited DM bot.
12. Reddit spam/multiact counterfeit users.
13. Stack Overflow self-promotion with no self-contained answer.
14. Paid backlinks intended to manipulate Google ranking.
15. Scraped person/email database or private file exfiltration.
16. Undisclosed affiliate/sponsorship relationship.
17. Search console impressions treated as sessions.
18. Pinterest Pin clicks treated as outbound visits.
19. YouTube watch metrics treated as landing sessions.
20. ChatGPT citation treated as traffic revenue.
21. Crawler requests counted as human visits.
22. Direct traffic all attributed to AI.
23. UTMs inserted in internal links.
24. UTM carrying personal emails or file names.
25. UTM campaign label includes delimiters or credentials.
26. Missing legal/consent basis, event payload contains user files.
27. Paid channel with no authorized budget cap.
28. Negative or invalid numeric conversion counts.
29. 10 starts and 11 validated completions under one-attempt-per-start grain.
30. Divide by zero as favorable cost per task.
31. Model revenue confused with invoices actually paid.
32. Display ad CPM treated as publisher page RPM.
33. Missing baseline and false causal improvement.
34. Huge referral surge with zero task success.
35. Multi-venue same content automation.
36. Genuine user acquisition but output corrupted.
37. Historical policy claim assumed current without review.
38. Search referral mixed with newsletter source.
39. Multiple campaigns same slug overwrite attribution.
40. 'Guarantees #1 in Google' claim on a channel.
41. Unknown channel arbitrarily mapped to Google.
42. Unverifiable third-party KD/volume used as verified first-party number.
43. Attribution loss secretly reallocated to Direct/AI.
44. Cross-product circulation intended to inflate ad impressions.
45. Human traffic low quality and publisher warnings ignored.
46. Genuine permission and goal present but first-party outcome yet UNKNOWN.

## Executable tests
`node --test tests/traffic-hunter.test.mjs` tests a bounded subset of the above, and `npm test` runs it with the repository.
`npm run audit:traffic` evaluates the example manifest and intentionally leaves launch approval PENDING.
**PASS_LOCAL** does not imply any external channel posted or user reached.

## Merge gates
- All existing and new automated tests pass.
- No contradictions with source watcher, publisher policy, security or repo routing.
- Manifest remains conservative; UNKNOWN/blocked sources never return approved execution.
- Check external source URLs at action time for any consequential promotion.
- Release is a safe planning/verification skill, **not live growth work**.
