// src/api/attachmentApi.ts
import  apiClient  from '@api/apiClient';
import type {
  Attachment,
  AttachmentCreatePayload,
  AttachmentUpdatePayload,
  AttachmentListResponse,
} from '@api/types/attachment';

/**
 * Lấy danh sách attachment của 1 card
 */
export const fetchAttachments = async (
  cardId: number,
  limit = 50,
  offset = 0
): Promise<AttachmentListResponse> => {
  const response = await apiClient.get<AttachmentListResponse>(
    `/cards/${cardId}/attachments/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

/**
 * Upload hoặc đính kèm link vào card
 */
export const createAttachment = async (
  cardId: number,
  data: AttachmentCreatePayload
): Promise<Attachment> => {
  const formData = new FormData();

  if (data.file) formData.append('file', data.file);
  if (data.name) formData.append('name', data.name);
  if (data.url) formData.append('url', data.url);
  formData.append('attachment_type', data.attachment_type);

  const response = await apiClient.post<Attachment>(`/cards/${cardId}/attachments/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/**
 * Cập nhật attachment (đổi tên, đặt cover, ...)
 */
export const updateAttachment = async (
  attachmentId: number,
  data: AttachmentUpdatePayload
): Promise<Attachment> => {
  const response = await apiClient.patch<Attachment>(`/attachments/${attachmentId}/`, data);
  return response.data;
};

/**
 * Xóa attachment khỏi card
 */
export const deleteAttachment = async (attachmentId: number): Promise<void> => {
  await apiClient.delete(`/attachments/${attachmentId}/`);
};

/**
 * Tải file đính kèm
 * (Backend trả về FileResponse hoặc redirect nếu là link)
 */
export const downloadAttachment = async (attachmentId: number): Promise<Blob> => {
  const response = await apiClient.get(`/attachments/${attachmentId}/`, {
    responseType: 'blob',
  });
  return response.data;
};
