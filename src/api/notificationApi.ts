// src/api/notificationApi.ts
import  apiClient  from '@api/apiClient';
import type {
  Notification,
  NotificationFilter,
  NotificationReadPayload,
  UnreadCountResponse,
} from '@api/types/notification';

/**
 * Lấy danh sách notification
 * @param filters {status: 'read'|'unread', kind: 'mention'|...}
 */
export const fetchNotifications = async (
  filters?: NotificationFilter
): Promise<Notification[]> => {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.kind) params.append('kind', filters.kind);

  const response = await apiClient.get<Notification[]>(`/notifications/?${params.toString()}`);
  return response.data;
};

/**
 * Lấy chi tiết 1 notification
 */
export const fetchNotificationDetail = async (id: number): Promise<Notification> => {
  const response = await apiClient.get<Notification>(`/notifications/${id}/`);
  return response.data;
};

/**
 * Đánh dấu notification đã đọc / chưa đọc
 */
export const markNotificationRead = async (
  id: number,
  data: NotificationReadPayload
): Promise<Notification> => {
  const response = await apiClient.patch<Notification>(`/notifications/${id}/read/`, data);
  return response.data;
};

/**
 * Đếm số lượng notification chưa đọc
 */
export const fetchUnreadCount = async (): Promise<UnreadCountResponse> => {
  const response = await apiClient.get<UnreadCountResponse>(`/notifications/unread-count/`);
  return response.data;
};

/**
 * Đánh dấu toàn bộ notification đã đọc
 */
export const markAllAsRead = async (): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(`/notifications/mark-all-read/`);
  return response.data;
};
