---
name: implement-feature
description: Implements an approved FlowPilot feature as a small tested slice, preserving tenant security and architectural boundaries. Use after the user approves a plan.
---

# Implement feature
1. Find the approved plan and explicitly state the slice to be implemented.
2. Check that file changes stay within agreed scope; do not rewrite unrelated code.
3. Implement API/domain first, then wiring, UI and tests as needed.
4. Validate authorization and workspace scoping for every tenant-owned operation.
5. Run repository commands that really exist: lint, typecheck, tests, build. Report actual results.
6. Re-read diff for secrets, breaking changes, unbounded agent loops and accidental destructive operations.
7. End with: files changed; behavior; checks run with pass/fail; caveats; follow-up.
8. Do not commit, deploy or enable paid infrastructure without approval.
