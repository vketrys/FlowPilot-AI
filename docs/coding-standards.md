# FlowPilot AI — Engineering & Coding Standards

This document defines the core software engineering standards, architecture patterns, and coding conventions for FlowPilot AI. These standards are binding for both human engineers and AI coding assistants.

---

## 1. Core Engineering Principles

### 1.1 KISS (Keep It Simple, Stupid)
* **Modular Monolith First:** Maintain a single cohesive backend (`apps/api`) with a separately scalable worker (`apps/worker`). Do not introduce microservices, Kubernetes, or service meshes without measurable scale and operational proof.
* **Avoid Speculative Abstractions:** Do not build frameworks for hypothetical future requirements. Implement the simplest solution that satisfies the current user story and acceptance criteria.
* **Explicit Over Magical:** Prefer explicit TypeScript types, dependency injection, and direct function calls over deep inheritance, magical reflection, or hidden lifecycle hooks.

### 1.2 DRY (Don't Repeat Yourself) with Pragmatism
* **Shared Foundations:** Place cross-cutting data contracts, DTO schemas, and workspace-scoped interfaces in `packages/contracts`. Place database models, migrations, and the Prisma client in `packages/database`.
* **The Rule of Three:** Avoid premature deduplication across different domain modules if their business rules might evolve independently. A small amount of code duplication is far better than the wrong abstraction.

---

## 2. SOLID Principles in NestJS & TypeScript

### 2.1 Single Responsibility Principle (SRP)
Each module, class, and function must have one reason to change:
* **Controllers (`*.controller.ts`):** Handle HTTP transport, route parameter extraction, DTO validation, HTTP status codes, and OpenAPI documentation. They must contain zero business logic.
* **Services / Use Cases (`*.service.ts`):** Encapsulate specific business rules, tenant permission checks, and domain orchestration.
* **Data Access (`packages/database`):** Encapsulate Prisma queries, transactions, and vector operations.
* **AI Tool Executors:** Each AI write or read tool is an isolated, single-purpose class with schema validation and approval gates.

### 2.2 Open/Closed Principle (OCP)
* Modules should be open for extension, but closed for modification.
* Define provider interfaces for external capabilities (e.g. `StorageService`, `ModelProvider`, `QueuePublisher`).
* Adding a new provider (e.g., adding a local file storage adapter alongside S3) must be done by implementing the interface, never by scattering `if/else` checks throughout business services.

### 2.3 Liskov Substitution Principle (LSP)
* Subtypes or implementation classes must be substitutable for their base types.
* Test doubles and offline mock adapters (such as `MockModelProvider`) must conform strictly to the production interface contract and error envelopes without introducing unexpected side effects.

### 2.4 Interface Segregation Principle (ISP)
* Clients should not be forced to depend on interfaces they do not use.
* Favor narrow, cohesive interfaces. For example, decouple `TextEmbeddingProvider` from `ChatCompletionProvider` rather than creating a bloated `AIEverythingProvider`.

### 2.5 Dependency Inversion Principle (DIP)
* High-level business logic must not depend on low-level implementation details or third-party SDKs directly.
* Use NestJS Dependency Injection with abstract classes or injection tokens to decouple domain services from external libraries (e.g. `@google/genai`, AWS SDK).

---

## 3. Multi-Tenant Security as a Mandatory Coding Standard

In FlowPilot AI, multi-tenancy is not an afterthought—it is a non-negotiable security invariant enforced at compile-time and runtime.

1. **Mandatory `workspaceId` Scoping:**
   * Every database query, vector search, file storage key, and queued message must be scoped to a verified `workspaceId`.
   * Never trust client-supplied `workspaceId` from HTTP headers, route parameters, or request bodies without verifying that the authenticated user holds valid, active membership in that workspace.
2. **Server-Side Authorization Boundary:**
   * The web UI (`apps/web`) is purely a rendering layer and has zero authority.
   * Authorization guards and role-based access control (RBAC) must execute in the API service layer and independently within AI tool executors.
3. **Untrusted Data Invariant:**
   * Uploaded documents, OCR text, prompt completions, retrieved embeddings, and external tool results are **untrusted data**.
   * Never execute natural language instructions embedded within contracts or customer documents.
   * AI output must pass strict schema validation (e.g. Zod schemas) before triggering any application action.
4. **Approval Lifecycle for Sensitive State Changes:**
   * AI write tools must adhere to the immutable approval lifecycle:
     $$\text{PROPOSED} \longrightarrow \text{PENDING\_APPROVAL} \longrightarrow \text{APPROVED / DENIED / EXPIRED} \longrightarrow \text{EXECUTED}$$
   * Re-validate permissions, arguments hash, and idempotency key immediately before execution.
   * Denied or expired proposals must never execute under any circumstances.

---

## 4. TypeScript & Code Quality Standards

* **Strict Type Safety:** All packages and apps must run with `strict: true`. The `any` type is strictly forbidden. Use `unknown` with runtime validation (Zod / type guards).
* **Explicit Return Types:** All public service methods, controller handlers, and exported package functions must define explicit return types.
* **Immutability:** Use `readonly` for class properties, DTO fields, and configuration objects whenever mutation is not explicitly required.
* **Error Handling & Normalization:**
  * Do not swallow errors. Re-throw domain-specific exceptions.
  * Standardize API error responses across all endpoints (RFC 7807 Problem Details or `{ error: { code, message, details, timestamp } }`).
  * Never leak internal stack traces, database schema details, or raw SQL queries to API clients.
* **Logging Hygiene:**
  * Use structured logging with contextual metadata (`workspaceId`, `traceId`, `userId`).
  * Redact sensitive information, secrets, API tokens, and customer document text from all logs.

---

## 5. Testing Standards

* **Test Observable Behavior:** Test public interfaces, HTTP endpoints, and domain outcomes rather than private implementation details.
* **Negative & Authorization Tests:** Every feature must include tests verifying that unauthorized users, missing memberships, or cross-tenant attempts fail closed (HTTP 401/403).
* **Idempotency & Concurrency:** Any message handler, outbox consumer, or approval execution must be tested for race conditions and duplicate message delivery.
* **No Simulated Test Claims:** An engineer or AI agent must never state that tests or checks passed unless the actual command ran and exited with code 0.
