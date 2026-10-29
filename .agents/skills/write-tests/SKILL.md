---
name: write-tests
description: Designs and adds meaningful unit, integration and E2E tests for FlowPilot features, especially authorization, queues and AI approvals. Use for test coverage requests or bug regressions.
---

# Write tests
1. Identify expected behavior and existing test framework first.
2. Build a test matrix: happy path, malformed input, unauthorized, cross-tenant, retries, duplicate messages, race conditions.
3. Prefer deterministic fixtures and synthetic documents; do not depend on live paid LLM calls in the default CI suite.
4. Mock only external boundaries, not the feature under test.
5. Where LLM quality matters, propose separate offline eval fixtures and an explicitly opt-in live evaluation job.
6. Run test commands only if installed; report what ran and what remains unverified.
