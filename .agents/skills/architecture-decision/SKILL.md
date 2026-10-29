---
name: architecture-decision
description: Creates or reviews an Architecture Decision Record for significant FlowPilot tradeoffs such as SQS vs BullMQ, Prisma/pgvector choices or cloud deployment.
---

# Architecture decision
1. State real problem, constraints and measurable requirements.
2. Compare at least two reasonable choices including the simplest viable option.
3. Discuss operational overhead, vendor lock-in, security, costs, testing and maintainability.
4. Recommend a decision and document what would change that choice.
5. Produce an ADR in `docs/adr/ADR-NNNN-*.md` following `docs/adr/TEMPLATE.md` only with user approval.
6. Do not implement the choice until approved.
