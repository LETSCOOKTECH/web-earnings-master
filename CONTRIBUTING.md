# Contributing to Web Earnings Master

This is a private LETSCOOKTECH research and engineering repository. Only authorized collaborators may contribute. Contributions should strengthen the reliability and usefulness of the library rather than increasing skill count for its own sake.

## Change protocol

1. Define the affected decision or workflow and explain why the current guidance is incomplete or outdated.
2. Read the specific active skill and any supporting reference; do not bulk-rewrite unrelated skills.
3. Reopen primary sources when information depends on current policies, software versions, country or platform behavior. Record URLs and verification date.
4. Clearly distinguish published requirements, official recommendations, third-party observations, hypotheses, and unresolved questions.
5. Include reproduction or audit steps and expected evidence for implementation changes.
6. Extend automated tests for technical rules; never claim that scripts can prove publisher approval or ranking.
7. Execute `npm test`; describe manual checks not yet performed.
8. Prefer a reviewed pull request, clear change summary, and no unrelated formatting churn.

## Skills format

Each active skill lives at `.agents/skills/<skill-name>/SKILL.md` with valid YAML frontmatter (`name` and `description`). Instructions should be actionable, scoped, evidence-responsive and link to the relevant supporting references. Never hard-code traffic numbers or provider requirements as eternal truth.

## Security and licensing

Do not commit tokens, private publisher or ad network account details, private search-console exports, user files or unpublished business secrets beyond the authorized repository scope. Third-party material requires proper licensing; links to primary references are preferred over copying extensive content. See `SECURITY.md` and `LICENSE`.
