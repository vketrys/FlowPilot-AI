/**
 * Shared data contracts and types for FlowPilot AI.
 */

export interface WorkspaceScope {
  workspaceId: string;
}

export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface BaseAuditEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
