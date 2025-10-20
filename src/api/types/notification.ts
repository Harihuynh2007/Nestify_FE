
import type { User } from '@api/types/auth';


export interface NotificationTarget {
  model: string;       
  id: string;          
  string: string;      
}

/** Notification chính */
export interface Notification {
  id: number;
  type: string;                  
  priority: 'low' | 'medium' | 'high';
  verb: string;                  
  actor: number | null;
  actor_name?: string | null;
  recipient: number;
  target?: NotificationTarget | null;
  is_read: boolean;
  read_at?: string | null;
  action_url?: string | null;
  data?: Record<string, unknown>;
  created_at: string;
  title?: string;
  message?: string;
  cover_url?: string | null;
  is_mention?: boolean;
}

/** Bộ lọc khi truy vấn notification */
export interface NotificationFilter {
  status?: 'read' | 'unread';
  kind?: string; // ví dụ: 'mention', 'card_due_reminder'
}

/** Payload update trạng thái đọc */
export interface NotificationReadPayload {
  is_read: boolean;
}

/** Response đếm số lượng chưa đọc */
export interface UnreadCountResponse {
  unread: number;
}
