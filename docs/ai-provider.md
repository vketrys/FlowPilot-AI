# Gemini usage, cost and vendor independence

## Two different uses of Gemini

**Developer tooling:** Google AI Pro can provide higher model quotas in Antigravity. For personal accounts, the October 2026 successor to Gemini CLI is **Antigravity CLI (`agy`)**. Sign in with the Google account associated with the subscription. Check the actual `/usage` and `/credits` panels. Configure overages to **Never** while learning, unless you explicitly decide to pay for additional AI credits.

**Product feature:** FlowPilot itself invokes Gemini API for embeddings, structured generation, agent decisions and streaming. Google AI Pro subscription does **not** provide unlimited product/API calls. Google AI Studio API billing is separate (subject to its model-specific free tiers and usage pricing). Never bundle CLI login credentials into the application.

## Initial implementation plan
1. Define a narrow, testable TypeScript model adapter in `packages/ai` or the backend application. E.g. `generateStructured`, `embedText`, `streamResponse`, subject to actual feature requirements.
2. Begin with Gemini API via Google's maintained TypeScript SDK and server-side environment secrets. Confirm SDK/available model names from official docs at implementation time.
3. Implement model settings, token/time/tool ceilings, retries, redacted telemetry and usage reporting.
4. Keep agent tool execution / approval logic separate from provider adapter.
5. Write offline tests using a fake deterministic adapter. Live-model evals run manually with opt-in billing/budgets.
6. Track output quality by task, not model brand. A second provider can be added if it gives a measurable benefit.

## Billing controls
- Explicit default per-workspace AI budget; deny new requests when exceeded.
- Max context, max output, max tool calls, timeout and concurrency caps.
- Record model/version and token/cost estimates per request; reconcile with provider usage reports.
- Treat user-uploaded content as untrusted, redact logs, and do not expose model API keys in the web bundle.

## Before making the first API call
Confirm AI Studio API key, model availability, free tier eligibility, actual quotas and any data-handling conditions from the official current pricing/billing pages. Do not assume that subscription = API credits.
