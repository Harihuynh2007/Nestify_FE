// src/api/checklistApi.ts
import  apiClient  from '@api/apiClient';
import type {
  Checklist,
  ChecklistCreatePayload,
  ChecklistUpdatePayload,
  ChecklistItem,
  ChecklistItemCreatePayload,
  ChecklistItemUpdatePayload,
  ChecklistReorderPayload,
} from '@api/types/checklist';

/**
 * 🔹 Lấy danh sách checklist của 1 card
 */
export const fetchChecklists = async (cardId: number): Promise<Checklist[]> => {
  const response = await apiClient.get<Checklist[]>(`/cards/${cardId}/checklists/`);
  return response.data;
};

/**
 * 🔹 Tạo checklist mới trong card
 */
export const createChecklist = async (
  cardId: number,
  data: ChecklistCreatePayload
): Promise<Checklist> => {
  const response = await apiClient.post<Checklist>(`/cards/${cardId}/checklists/`, data);
  return response.data;
};

/**
 * 🔹 Cập nhật checklist
 */
export const updateChecklist = async (
  checklistId: number,
  data: ChecklistUpdatePayload
): Promise<Checklist> => {
  const response = await apiClient.patch<Checklist>(`/checklists/${checklistId}/`, data);
  return response.data;
};

/**
 * 🔹 Xóa checklist
 */
export const deleteChecklist = async (checklistId: number): Promise<void> => {
  await apiClient.delete(`/checklists/${checklistId}/`);
};

/* ==========================================================
   ✅ CHECKLIST ITEMS
========================================================== */

/**
 * 🔹 Tạo item mới trong checklist
 */
export const createChecklistItem = async (
  checklistId: number,
  data: ChecklistItemCreatePayload
): Promise<ChecklistItem> => {
  const response = await apiClient.post<ChecklistItem>(`/checklists/${checklistId}/items/`, data);
  return response.data;
};

/**
 * 🔹 Cập nhật checklist item
 */
export const updateChecklistItem = async (
  itemId: number,
  data: ChecklistItemUpdatePayload
): Promise<ChecklistItem> => {
  const response = await apiClient.patch<ChecklistItem>(`/checklist-items/${itemId}/`, data);
  return response.data;
};

/**
 * 🔹 Xóa checklist item
 */
export const deleteChecklistItem = async (itemId: number): Promise<void> => {
  await apiClient.delete(`/checklist-items/${itemId}/`);
};

/**
 * 🔹 Toggle trạng thái hoàn thành của item
 */
export const toggleChecklistItem = async (
  itemId: number,
  completed: boolean
): Promise<ChecklistItem> => {
  const response = await apiClient.patch<ChecklistItem>(`/checklist-items/${itemId}/`, { completed });
  return response.data;
};

/**
 * 🔹 Sắp xếp lại thứ tự các item trong checklist
 */
export const reorderChecklistItems = async (
  checklistId: number,
  payload: ChecklistReorderPayload
): Promise<{ detail: string }> => {
  const response = await apiClient.patch<{ detail: string }>(
    `/checklists/${checklistId}/reorder-items/`,
    payload
  );
  return response.data;
};
