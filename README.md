# FlowPilot AI — Antigravity-first Engineering Starter

**Status:** planning / agent tooling scaffold. This repository intentionally does **not** claim that application code, tests, infrastructure, or deployments exist yet.

**Goal:** build a portfolio-grade, multi-tenant AI workspace using Next.js, NestJS, PostgreSQL/pgvector, S3, SQS, AWS, RAG, approval-gated AI tools, audit trail, evaluations and observability.

## Quick start

1. Install **Antigravity CLI (`agy`)**, not legacy Gemini CLI, for personal Google AI Pro sign-in. On Windows PowerShell: `irm https://antigravity.google/cli/install.ps1 | iex` (inspect the official installation page/script before execution). On Linux/macOS: follow https://www.antigravity.google/docs/cli/install/.
2. Open this folder in your editor and initialize Git: `git init`.
3. Launch `agy` from the repo root and sign in with the Google account that owns Google AI Pro. Confirm `/usage` and `/permissions`.
4. Ask the agent: `Read AGENTS.md and docs/roadmap.md. Do not modify files. Explain the product scope, working agreements, and the smallest first implementation task.`
5. Run the skill `/plan-feature` or ask to activate `plan-feature` to plan **Milestone 1** before any implementation.
6. Review and approve the plan yourself. Only then ask to use `implement-feature`. Verify tests/builds locally and review diffs before committing.

## Source of truth

| Concern | File |
|---|---|
| Agent always-on guardrails | `AGENTS.md` |
| Architecture / security / testing rules | `.agents/rules/*.md` |
| Repeatable work procedures | `.agents/skills/*/SKILL.md` |
| Narrow, read-only reviewers | `.agents/agents/*.md` |
| Product scope and boundaries | `docs/product.md` |
| Target architecture and decisions | `docs/architecture.md`, `docs/adr/` |
| Milestones and acceptance criteria | `docs/roadmap.md` |
| Day-to-day agent workflow | `docs/development-workflow.md` |
| Model costs & independent provider design | `docs/ai-provider.md` |
| External reference links | `docs/sources.md` |

## Skills / prompts

`/plan-feature`, `/implement-feature`, `/review-change`, `/security-audit`, `/update-docs`, `/write-tests`, `/architecture-decision`.

Custom skills are stored at `.agents/skills/<name>/SKILL.md`. Exact interactive behavior can change by CLI release; type `/` to see available commands. Skills may also activate automatically.

## Developer commands

No `pnpm` scripts are installed **yet**. As part of Milestone 1, implement and document the actual `lint`, `typecheck`, `test`, `build`, `dev`, and `db:migrate` commands. Agents must **not** claim these commands passed until the project really contains and executes them.

## Existing plan

The prior comprehensive conceptual plan is copied into `docs/reference/flowpilot_ai_portfolio_plan.md`. It is reference material, not a binding description of what has been built.

## Privacy & cost

Do not commit credentials, user-uploaded private documents, or production data. Do not enable automatic cloud provisioning, model overages, external integrations, or destructive SQL without explicit approval.
