// src/api/types/board.ts

import type { User } from '@api/types/auth';

/** Workspace cơ bản */
export interface Workspace {
  id: number;
  name: string;
  board_creation_policy?: 'owner' | 'admins' | 'members';
  can_create_board?: boolean;
  effective_role?: string | null;
  is_owner?: boolean;
}

/** Thành viên trong Board */
export interface BoardMember {
  id: number;
  user: User;
  role: 'admin' | 'editor' | 'viewer';
  joined_at?: string;
}

/** Thông tin liên kết mời vào Board */
export interface BoardInviteLink {
  token: string;
  role: 'member' | 'admin' | 'observer';
  created_at?: string;
  expires_at?: string | null;
  is_active?: boolean;
}

/** Board chính */
export interface Board {
  id: number;
  name: string;
  workspace: Workspace;
  created_by: User;
  owned_by: User;
  current_owner?: User;
  background?: string | null;
  visibility: 'private' | 'workspace' | 'public';
  is_closed: boolean;
  is_owner?: boolean;
  can_transfer_ownership?: boolean;
  created_at?: string;
}

/** Payload tạo Board */
export interface BoardCreatePayload {
  name: string;
  workspace_id: number;
  visibility?: 'private' | 'workspace' | 'public';
  background?: string | null;
}

/** Payload cập nhật Board */
export interface BoardUpdatePayload {
  name?: string;
  is_closed?: boolean;
  visibility?: 'private' | 'workspace' | 'public';
}

/** Response danh sách Board */
export type BoardListResponse = Board[];
