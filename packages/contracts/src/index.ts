/**
 * Shared data contracts, DTOs, and multi-tenant security interfaces for FlowPilot AI.
 */

export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface WorkspaceScope {
  readonly workspaceId: string;
}

export interface TenantContext extends WorkspaceScope {
  readonly userId: string;
  readonly role: Role;
}

export interface BaseAuditEntity {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserSummaryDto {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface WorkspaceSummaryDto {
  id: string;
  name: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface WorkspaceMemberDto {
  id: string;
  workspaceId: string;
  userId: string;
  role: Role;
  joinedAt: Date | string;
  updatedAt: Date | string;
  user?: UserSummaryDto;
  workspace?: WorkspaceSummaryDto;
}
