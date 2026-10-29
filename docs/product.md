# Product brief

## Target user
Small and medium-sized teams managing internal documents and follow-up tasks. Synthetic company accounts are used in the demo.

## Core workflow
1. Owner creates workspace and invites teammate.
2. User uploads synthetic contract PDF.
3. API issues a scoped presigned S3 URL; completion triggers queued ingestion.
4. Worker extracts page-aware text, chunks, embeds and stores it, scoped by workspace.
5. User asks a question and receives a grounded answer with page-level citations.
6. User requests follow-up tasks; agent proposes actions but **does not execute writes**.
7. Authorized user reviews exact proposals and explicitly approves.
8. Backend revalidates permissions and uses idempotent execution + audit trail.

## MVP success criteria
- At least two isolated workspaces with authorization regression tests.
- One tested asynchronous document ingestion pipeline with retries and DLQ.
- Citations point to the correct document and page for representative fixtures.
- An unapproved agent write never changes business state.
- Approving a proposal twice creates at most one task.
- Observable execution and repeatable local run instructions.

## Not goals initially
No workflow drag-and-drop editor, payments, public real-user uploads, Kubernetes, Kafka, autonomous data deletion, 5 competing LLM frameworks, or custom foundation model training.

## Users and roles
OWNER: manage workspace and sensitive settings. ADMIN: manage members/documents. MEMBER: create tasks, use AI within permissions. VIEWER: read allowed content. Detailed policy will be specified and tested before implementation.
