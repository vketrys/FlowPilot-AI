---
name: security-audit
description: Audits FlowPilot code and agent workflows for cross-tenant access, prompt injection, tool misuse, authentication, secrets and approval bypasses. Use before merging security-sensitive features.
---

# Security audit
Threat-model the user, workspace, API, storage, embeddings, queues, external provider and AI tools.

Check:
- IDOR and tenant-scoped lookups;
- cached data/vector results and citations across workspaces;
- approval payload integrity, role changes, expiry, replay and idempotency;
- prompt injection by retrieved contract text;
- tool schemas and server-side permissions;
- upload MIME/content limits, malware scanning strategy, presigned URL scope;
- secret exposure, logs and least-privilege IAM;
- cost abuse, quotas, model loops and runaway queues.

Output concrete exploit paths, likely impact, evidence, fixes and targeted tests. No changes unless approved.
