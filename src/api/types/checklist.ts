// src/api/types/checklist.ts

import type { User } from '@api/types/auth';

/** Checklist Item (mục nhỏ trong checklist) */
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

/** Checklist chính (tập hợp các item) */
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

/** Payload tạo checklist */
export interface ChecklistCreatePayload {
  title: string;
}

/** Payload cập nhật checklist */
export interface ChecklistUpdatePayload {
  title?: string;
  position?: number;
}

/** Payload tạo checklist item */
export interface ChecklistItemCreatePayload {
  text: string;
}

/** Payload cập nhật checklist item */
export interface ChecklistItemUpdatePayload {
  text?: string;
  completed?: boolean;
  due_date?: string | null;
}

/** Payload reorder checklist items */
export interface ChecklistReorderPayload {
  item_ids: number[];
}
