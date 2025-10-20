// src/api/types/card.ts

import type { User } from '@api/types/auth';

/** Nhãn (Label) của thẻ */
export interface Label {
  id: number;
  name: string;
  color: string;
}

/** Thành viên gán trong thẻ */
export interface CardMember {
  id: number;
  user: User;
  assigned_by: User;
  assigned_at?: string;
  role: string;
  is_active: boolean;
}

/** Checklist Item */
export interface ChecklistItem {
  id: number;
  checklist: number;
  text: string;
  completed: boolean;
  position: number;
  due_date?: string | null;
  assigned_to?: number | null;
  created_at?: string;
  updated_at?: string;
  completed_at?: string | null;
  completed_by?: User | null;
}

/** Checklist */
export interface Checklist {
  id: number;
  card: number;
  title: string;
  position: number;
  created_at?: string;
  updated_at?: string;
  created_by?: User;
  items?: ChecklistItem[];
  completion_percentage?: number;
}

/** Comment trong card */
export interface Comment {
  id: number;
  card: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
}

/** Hoạt động (Activity) của card */
export interface CardActivity {
  id: number;
  user: User;
  activity_type: string;
  description: string;
  target_user?: User;
  created_at: string;
}

/** Card chính */
export interface Card {
  id: number;
  name: string;
  description?: string;
  status?: string;
  background?: string | null;
  visibility?: 'private' | 'workspace' | 'public';
  list?: number | null;
  position: number;
  completed: boolean;
  start_date?: string | null;
  due_date?: string | null;
  due_reminder_offset?: number | null;
  due_reminder_at?: string | null;
  recurrence?: 'never' | 'daily' | 'weekly' | 'monthly';
  created_at?: string;
  created_by?: User;
  labels?: Label[];
  members?: User[];
}

/** Payload tạo card */
export interface CardCreatePayload {
  name: string;
  list?: number | null;
  description?: string;
  due_date?: string | null;
  start_date?: string | null;
  due_reminder_offset?: number | null;
  recurrence?: 'never' | 'daily' | 'weekly' | 'monthly';
}

/** Payload cập nhật card */
export interface CardUpdatePayload extends Partial<CardCreatePayload> {
  completed?: boolean;
}

/** Payload reorder / di chuyển card */
export interface CardMovePayload {
  id: number;
  list: number | null;
  position: number;
}

/** Response card chi tiết (gồm các phần mở rộng) */
export interface FullCardDetail extends Card {
  checklists?: Checklist[];
  comments?: Comment[];
  activities?: CardActivity[];
  members_roles?: CardMember[];
}
