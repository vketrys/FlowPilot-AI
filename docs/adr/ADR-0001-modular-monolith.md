# ADR-0001 — Modular monolith plus separate worker

- Status: accepted
- Date: 2026-10-10
- Owners: human project owner

## Context
FlowPilot needs auth, workspaces, documents, tasks, RAG and AI actions, but does not have scale evidence justifying distributed service boundaries. Document processing has distinct CPU/I/O characteristics.

## Options considered
1. **Microservices from day one**: independent deployments but unnecessary network, tracing, consistency and operational overhead.
2. **Single monolith with synchronous parsing**: least setup, but expensive parsing blocks user requests and scales poorly.
3. **Modular monolith plus separate worker**: simpler API boundaries with isolated async load.

## Proposed decision
Use NestJS modular monolith + background worker with SQS (or local equivalent for dev). Separate only what must scale or fail independently.

## Consequences
Explicit modules and event schemas; at-least-once processing, idempotency and outbox design are required. Do not provision cloud infrastructure before proof locally.

## Revisit when
Real traffic and operational constraints require independently deployed services.
