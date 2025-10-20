// src/api/types/workspace.ts

import type { User } from '@api/types/auth';
import type { Board } from '@api/types/board';

/** Role trong workspace */
export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'guest';

/** Chính sách tạo board trong workspace */
export type BoardCreationPolicy = 'owner' | 'admins' | 'members';

/** Thành viên trong workspace */
export interface WorkspaceMember {
  id: number;
  user: User;
  role: WorkspaceRole;
  joined_at?: string;
}

/** Workspace cơ bản */
export interface Workspace {
  id: number;
  name: string;
  board_creation_policy?: BoardCreationPolicy;
  can_create_board?: boolean;
  effective_role?: WorkspaceRole | null;
  is_owner?: boolean;
}

/** Payload tạo workspace */
export interface WorkspaceCreatePayload {
  name: string;
  board_creation_policy?: BoardCreationPolicy;
}

/** Payload cập nhật workspace */
export interface WorkspaceUpdatePayload {
  name?: string;
  board_creation_policy?: BoardCreationPolicy;
}

/** Workspace chi tiết */
export interface WorkspaceDetail extends Workspace {
  boards?: Board[];
  members?: WorkspaceMember[];
}
