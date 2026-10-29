# Incremental roadmap

**Estimates are planning aids, not guaranteed durations.** Mark tasks complete only with evidence.

## M0 — Agent-first engineering foundation (now)
- [x] Agent rules, skills, reviewer roles, workflow and architectural docs scaffolded.
- [ ] Install and authenticate Antigravity CLI in the actual developer environment.
- [ ] Confirm project rules and skills are discovered.
- [x] Create Git repository, main branch, ignore list and review conventions.
- [x] Decide where to host source and how to run local PostgreSQL.
- [x] Approve architecture and narrow Milestone 1.

## M1 — Working foundation (no LLM)
- [x] pnpm/Turborepo workspace with `apps/web`, `apps/api`, `apps/worker`, `packages/database`, `packages/contracts`.
- [x] Next.js and NestJS start locally.
- [x] PostgreSQL + Prisma; repeatable migrations.
- [ ] OIDC login plus workspace membership and RBAC.
- [ ] Task CRUD with workspace authorization, OpenAPI contract and tests.
- [x] CI: format/lint/typecheck/test/build (real working scripts).
- [ ] Document local startup/teardown.

## M2 — Documents and queues
- [ ] Scoped presigned S3 uploads; local development storage strategy.
- [ ] Document/version states, outbox, SQS messages, worker retries and DLQ.
- [ ] Page-aware parsing of synthetic contracts; deduplicated chunks.
- [ ] Test crash/retry and cross-tenant isolation.

## M3 — RAG
- [ ] pgvector with workspace-scoped search and citations.
- [ ] Gemini API provider and budget guardrails.
- [ ] Synthetic evaluation dataset; retrieval/citation baselines.

## M4 — Agentic actions
- [ ] Structured read tools and bounded agent runs.
- [ ] Write proposals and explicit immutable approval flows.
- [ ] Race tests; malicious document/prompt injection fixtures.
- [ ] Audit trail and human-friendly agent activity UI.

## M5 — Cloud and portfolio polish
- [ ] Docker and AWS ECS/RDS/S3/SQS infrastructure with Terraform.
- [ ] GitHub Actions deployment gated by manual confirmation.
- [ ] OpenTelemetry and error dashboards; performance investigation.
- [ ] Public demo using synthetic data, brief walkthrough video, benchmark results and CV write-up.

## Definition of Done for any issue
Acceptance criteria met; negative/security tests; actual checks reported; docs updated as needed; reviewer findings addressed; small readable diff. If blocked, issue remains open with exact blocker.
