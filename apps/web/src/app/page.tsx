import React from 'react';

export default function HomePage() {
  return (
    <main className="container">
      <header className="header">
        <div className="logo-badge">
          <div className="logo-icon">FP</div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>FlowPilot AI</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Multi-Tenant B2B Workspace
            </p>
          </div>
        </div>
        <div>
          <span className="badge badge-green">Milestone 1 — Skeletons Active</span>
        </div>
      </header>

      <section className="hero">
        <h1>B2B AI Workspace Engine</h1>
        <p>
          Asynchronous contract ingestion, grounded RAG citations, and immutable human-approval
          workflows backed by strict multi-tenant boundary isolation.
        </p>
      </section>

      <div className="grid">
        <div className="card">
          <div className="card-title">
            <h3>NestJS Modular Monolith</h3>
            <span className="badge">Port 4000</span>
          </div>
          <p>
            REST API running on NestJS with strict Zod validation, OpenAPI documentation, and
            PostgreSQL connectivity via Prisma.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="http://localhost:4000/api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Swagger Docs &rarr;
            </a>
            <a
              href="http://localhost:4000/health"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Health Check
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>PostgreSQL & pgvector</h3>
            <span className="badge badge-green">Port 5435</span>
          </div>
          <p>
            Local persistence container running PostgreSQL 16 with pgvector v0.8.7 extension for
            workspace-scoped vector embeddings and transactional outbox.
          </p>
          <div className="status-row">
            <span style={{ color: 'var(--text-secondary)' }}>Image</span>
            <code>pgvector/pgvector:pg16</code>
          </div>
          <div className="status-row">
            <span style={{ color: 'var(--text-secondary)' }}>Status</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Healthy</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Background Worker</h3>
            <span className="badge">Standalone Runner</span>
          </div>
          <p>
            Independent Node/TypeScript background runner handling at-least-once job processing,
            retry logic, and contract ingestion pipelines.
          </p>
          <div className="status-row">
            <span style={{ color: 'var(--text-secondary)' }}>Runtime</span>
            <span>Node.js LTS</span>
          </div>
          <div className="status-row">
            <span style={{ color: 'var(--text-secondary)' }}>Queue Target</span>
            <span>AWS SQS + DLQ (M2)</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="card-title">
          <h3>Architectural Constraints & Coding Standards</h3>
          <span className="badge">docs/coding-standards.md</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
              Tenant Isolation
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Mandatory <code>workspaceId</code> scoping on every query, model lookup, and write
              tool.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
              Human-in-the-Loop
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              AI agents propose actions; human approval required before any business state mutation.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
              KISS & SOLID
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Clean boundaries, provider-neutral model adapters, and zero premature microservices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
