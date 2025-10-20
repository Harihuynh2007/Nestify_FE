// src/api/types/attachment.ts

import type { User } from '@api/types/auth';

/** Kiểu file đính kèm: upload file hoặc link */
export type AttachmentType = 'file' | 'link';

/** Attachment cơ bản */
export interface Attachment {
  id: number;
  name: string;
  attachment_type: AttachmentType;
  file?: string | null;
  file_url?: string | null;
  file_size?: number | null;
  file_size_human?: string | null;
  mime_type?: string | null;
  url?: string | null;
  uploaded_by: User;
  created_at: string;
  is_cover: boolean;
  is_image?: boolean;
}

/** Payload tạo mới attachment */
export interface AttachmentCreatePayload {
  attachment_type: AttachmentType;
  name?: string;
  file?: File;
  url?: string;
}

/** Payload cập nhật attachment */
export interface AttachmentUpdatePayload {
  name?: string;
  is_cover?: boolean;
}

/** Response phân trang khi lấy danh sách attachment */
export interface AttachmentListResponse {
  count: number;
  limit: number;
  offset: number;
  results: Attachment[];
}
