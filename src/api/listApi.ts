// src/api/listApi.ts
import  apiClient  from '@api/apiClient';
import type { List, ListCreatePayload, ListUpdatePayload } from '@api/types/list';

/**
 * 🔹 Lấy danh sách list trong 1 board
 */
export const fetchLists = async (boardId: number): Promise<List[]> => {
  const response = await apiClient.get<List[]>(`/boards/${boardId}/lists/`);
  return response.data;
};

/**
 * 🔹 Tạo list mới trong board
 */
export const createList = async (boardId: number, data: ListCreatePayload): Promise<List> => {
  const response = await apiClient.post<List>(`/boards/${boardId}/lists/`, data);
  return response.data;
};

/**
 * 🔹 Cập nhật thông tin list
 */
export const updateList = async (listId: number, data: ListUpdatePayload): Promise<List> => {
  const response = await apiClient.patch<List>(`/lists/${listId}/`, data);
  return response.data;
};

/**
 * 🔹 Xoá list khỏi board
 */
export const deleteList = async (listId: number): Promise<void> => {
  await apiClient.delete(`/lists/${listId}/`);
};
