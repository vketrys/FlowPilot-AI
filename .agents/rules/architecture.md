---
trigger: model_decision
description: Apply when designing modules, APIs, database schemas, queues, worker pipelines, migrations, cloud architecture or interfaces between components.
---
# Architecture constraints

Read `docs/architecture.md` and relevant ADRs before design changes.

- Prefer modular monolith for API and a separate background worker.
- Keep domain logic independent from Next.js, NestJS, Prisma and model provider SDKs where practical.
- Validate all API requests. Authorization belongs in server-side use cases.
- Model tenant membership and workspace scoping explicitly; defend against IDOR at every boundary.
- For asynchronous jobs, define event envelope, deduplication/idempotency key, retry vs permanent failures, DLQ, timeout and metrics.
- Use PostgreSQL transactions for related state changes; document any eventual consistency.
- Before adding Redis, Kafka, a new microservice, a vector database or Kubernetes, write the concrete requirement it solves and a cheaper alternative.
- Record major decisions in `docs/adr/`; state why alternatives were rejected and what would trigger revisiting them.
- Include schema evolution and rollback plans for risky migrations.
