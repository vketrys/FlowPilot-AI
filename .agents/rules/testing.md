---
trigger: model_decision
description: Apply when adding features, changing behavior, fixing bugs, creating worker jobs, implementing AI tools or reviewing pull requests.
---
# Verification expectations

- Use tests that exercise observable behavior, not private implementation details.
- Include success, validation failure, permission failure, cross-tenant isolation, retries and duplicate messages where relevant.
- Unit: pure domain calculations and approval state transitions.
- Integration: database membership scoping, idempotent writes, outbox and worker behaviors.
- E2E: upload -> processing -> grounded citation -> proposal -> approval -> one task -> audit.
- AI evals: retrieval hit@k, citation correctness, tool selection, argument validity, write approval compliance and cost/latency.
- Do not assert successful test execution until the corresponding command actually ran.
- If tests cannot run, say exactly why, and specify the command the human can run later.
