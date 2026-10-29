---
name: plan-feature
description: Plans new features as explicit, reviewable implementation plans with architecture tradeoffs, changed files, acceptance criteria and tests. Use before implementing any nontrivial feature.
---

# Plan feature
1. Read `AGENTS.md`, `docs/product.md`, `docs/architecture.md` and relevant ADRs.
2. Explore existing files; distinguish existing code from proposed code.
3. Define user story, non-goals, prerequisites and permissions.
4. Write acceptance criteria in testable Given/When/Then form.
5. Propose minimal architecture, file paths, schema/API changes, failure cases and security invariants.
6. List proposed tests and exact available verification commands (do not invent commands).
7. Flag cost, deployment and migration impact.
8. Output **plan only**, with open decisions; do not modify files until approval.
