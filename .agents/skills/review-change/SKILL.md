---
name: review-change
description: Reviews code diffs for correctness, maintainability, test gaps and regressions. Use when a task or pull request is ready for review.
---

# Review change
1. Identify exact diff and relevant requirements; do not assume changed code is correct.
2. Review behavior, error paths, schema changes, idempotency, auth and tenant boundaries.
3. Inspect tests for meaningful coverage, especially race conditions and negative cases.
4. Distinguish blocking defects from suggestions; cite file names and line numbers when available.
5. Return findings in descending severity, then uncertain areas and missing tests. If no findings, state the scope reviewed and remaining uncertainty.
6. Review-only; do not edit files unless asked.
