# Threat model & security checklist

## Assets / trust boundaries
User identity, workspace membership, private documents, embeddings, model inputs, queued events, AI tool arguments, approval records, S3 objects, API credentials, audit events.

## Principal attack paths
1. User from workspace A requests item from workspace B (IDOR).
2. Vector/keyword retrieval returns content belonging to another workspace.
3. Malicious PDF contains prompt injection asking assistant to export secrets or create/delete tasks.
4. Approved action is replayed or modified between approval and execution.
5. Worker retries duplicate transaction/action.
6. Presigned URL grants broader storage access than intended.
7. LLM prompts/logs leak credentials or customer documents.
8. LLM/tool loops generate unbounded API costs.

## Minimum pre-release proof
- Integration tests for workspace isolation across all resources and AI tool paths.
- Negative tests: denied/expired/tampered approval never executes.
- Idempotency race test creates only one task.
- Synthetic injection fixture cannot cause unauthorized write.
- Upload file size/type validation; expiration on presigned URL.
- Secrets are never committed; no real sensitive data in sample fixtures.
- Review AWS IAM and API billing limits with a human before deployment.
