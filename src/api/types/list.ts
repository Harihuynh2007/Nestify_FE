// src/api/types/list.ts

/** Danh sách (List) chứa các card */
export interface List {
  id: number;
  name: string;
  board: number;
  background?: string | null;
  visibility?: 'private' | 'workspace' | 'public';
  position: number;
  created_at?: string;
  updated_at?: string;
}

/** Payload tạo list mới */
export interface ListCreatePayload {
  name: string;
  background?: string | null;
  visibility?: 'private' | 'workspace' | 'public';
}

/** Payload cập nhật list */
export interface ListUpdatePayload {
  name?: string;
  background?: string | null;
  visibility?: 'private' | 'workspace' | 'public';
  position?: number;
}
