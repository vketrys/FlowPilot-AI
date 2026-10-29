# AI-assisted engineering workflow

## Basic loop
**Explore → Plan → Human approval → Implement → Verify → Independent review → Document.**

### Prepare the issue
Write one outcome and 3–8 testable acceptance criteria. Set explicit non-goals and sensitive actions needing approval.

### Plan, not code
Prompt:
> Read AGENTS.md, docs/roadmap.md and relevant source. Activate plan-feature. Map existing code and propose an implementation plan for M1: monorepo + Next.js/NestJS boot + PostgreSQL local development. List exact files, commands, tests, costs and open decisions. Do not modify anything.

### Implement small slice
Prompt after you approve the plan:
> Activate implement-feature. Implement only the approved first slice. Add working scripts and tests. Run the actual installed verification commands. Do not deploy or commit. Report real test results and changed files.

### Independent review
Prompt:
> Have the code-reviewer subagent inspect the diff independently. Then, if tenant/auth/AI tools changed, have security-reviewer inspect it. Do not edit code in the review step; summarize actionable findings.

### Merge preparation
- Read `git diff` and check files for credentials and unexpected changes.
- Document real command output or CI links; never fabricate evidence.
- Update ADRs for meaningful tradeoffs and close issue only when acceptance criteria pass.

## Example task prompt template
```text
Context: [relevant issue / documents]
Goal: [one behavioral outcome]
Scope: [target files/modules]
Non-goals: [do not touch]
Acceptance criteria:
- Given ..., when ..., then ...
Constraints:
- server-side workspace authorization
- error and duplicate handling
- no cloud writes or paid model usage without approval
Expected output:
- plan first
- implementation only after approval
- tests, commands, exact results and risks
```

## Review cadence
One task/branch at a time. Favor small vertical slices. Use model/reasoning escalation when deeper design review is genuinely needed. Keep credentials local and all demos synthetic.

## CLI commands to learn
`agy` to start; `/usage` for quotas; `/permissions` for approval policy; `/agents` for reviewer roles; `/plan` for plans; `/diff` for changes; `/credits` for billable AI credits; `/` to list available skill commands. Commands may vary by release; consult `docs/sources.md`.
