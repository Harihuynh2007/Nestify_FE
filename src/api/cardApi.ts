// src/api/cardApi.ts
import  apiClient  from '@api/apiClient';
import type {
  Card,
  CardCreatePayload,
  CardUpdatePayload,
  CardMovePayload,
  Label,
  Checklist,
  ChecklistItem,
  Comment,
  CardActivity,
  FullCardDetail,
} from '@api/types/card';

/**
 * Lấy danh sách card trong list
 */
export const fetchCards = async (listId: number): Promise<Card[]> => {
  const response = await apiClient.get<Card[]>(`/lists/${listId}/cards/`);
  return response.data;
};

/**
 * Tạo card mới trong list
 */
export const createCard = async (listId: number, data: CardCreatePayload): Promise<Card> => {
  const response = await apiClient.post<Card>(`/lists/${listId}/cards/`, data);
  return response.data;
};

/**
 * Lấy card chi tiết
 */
export const fetchCardDetail = async (cardId: number): Promise<FullCardDetail> => {
  const response = await apiClient.get<FullCardDetail>(`/cards/${cardId}/`);
  return response.data;
};

/**
 * Cập nhật card
 */
export const updateCard = async (cardId: number, data: CardUpdatePayload): Promise<Card> => {
  const response = await apiClient.patch<Card>(`/cards/${cardId}/`, data);
  return response.data;
};

/**
 * Xoá card
 */
export const deleteCard = async (cardId: number): Promise<void> => {
  await apiClient.delete(`/cards/${cardId}/`);
};

/**
 * Batch update card positions
 */
export const batchUpdateCards = async (updates: CardMovePayload[]): Promise<void> => {
  await apiClient.patch(`/cards/batch-update/`, updates);
};

/**
 * Lấy tất cả card inbox (list = null)
 */
export const fetchInboxCards = async (): Promise<Card[]> => {
  const response = await apiClient.get<Card[]>(`/inbox/`);
  return response.data;
};

/**
 * Tạo card trong inbox
 */
export const createInboxCard = async (data: CardCreatePayload): Promise<Card> => {
  const response = await apiClient.post<Card>(`/inbox/`, data);
  return response.data;
};

/* ==========================================================
   🔖 LABELS
========================================================== */
export const fetchLabels = async (boardId: number): Promise<Label[]> => {
  const response = await apiClient.get<Label[]>(`/boards/${boardId}/labels/`);
  return response.data;
};

export const createLabel = async (boardId: number, data: Omit<Label, 'id'>): Promise<Label> => {
  const response = await apiClient.post<Label>(`/boards/${boardId}/labels/`, data);
  return response.data;
};

export const updateLabel = async (labelId: number, data: Partial<Label>): Promise<Label> => {
  const response = await apiClient.patch<Label>(`/labels/${labelId}/`, data);
  return response.data;
};

export const deleteLabel = async (labelId: number): Promise<void> => {
  await apiClient.delete(`/labels/${labelId}/`);
};

/* ==========================================================
   📝 COMMENTS
========================================================== */
export const fetchComments = async (cardId: number): Promise<Comment[]> => {
  const response = await apiClient.get<Comment[]>(`/cards/${cardId}/comments/`);
  return response.data;
};

export const addComment = async (cardId: number, content: string): Promise<Comment> => {
  const response = await apiClient.post<Comment>(`/cards/${cardId}/comments/`, { content });
  return response.data;
};

export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
  const response = await apiClient.patch<Comment>(`/comments/${commentId}/`, { content });
  return response.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await apiClient.delete(`/comments/${commentId}/`);
};

/* ==========================================================
   ✅ CHECKLISTS
========================================================== */
export const fetchChecklists = async (cardId: number): Promise<Checklist[]> => {
  const response = await apiClient.get<Checklist[]>(`/cards/${cardId}/checklists/`);
  return response.data;
};

export const createChecklist = async (cardId: number, data: { title: string }): Promise<Checklist> => {
  const response = await apiClient.post<Checklist>(`/cards/${cardId}/checklists/`, data);
  return response.data;
};

export const updateChecklist = async (checklistId: number, data: Partial<Checklist>): Promise<Checklist> => {
  const response = await apiClient.patch<Checklist>(`/checklists/${checklistId}/`, data);
  return response.data;
};

export const deleteChecklist = async (checklistId: number): Promise<void> => {
  await apiClient.delete(`/checklists/${checklistId}/`);
};

/* ==========================================================
   🧩 CHECKLIST ITEMS
========================================================== */
export const createChecklistItem = async (
  checklistId: number,
  data: { text: string }
): Promise<ChecklistItem> => {
  const response = await apiClient.post<ChecklistItem>(`/checklists/${checklistId}/items/`, data);
  return response.data;
};

export const updateChecklistItem = async (
  itemId: number,
  data: Partial<ChecklistItem>
): Promise<ChecklistItem> => {
  const response = await apiClient.patch<ChecklistItem>(`/checklist-items/${itemId}/`, data);
  return response.data;
};

export const deleteChecklistItem = async (itemId: number): Promise<void> => {
  await apiClient.delete(`/checklist-items/${itemId}/`);
};

export const toggleChecklistItem = async (itemId: number, completed: boolean): Promise<ChecklistItem> => {
  const response = await apiClient.patch<ChecklistItem>(`/checklist-items/${itemId}/`, { completed });
  return response.data;
};

/* ==========================================================
   🕒 ACTIVITY / WATCHERS
========================================================== */
export const fetchCardActivities = async (cardId: number): Promise<CardActivity[]> => {
  const response = await apiClient.get<CardActivity[]>(`/cards/${cardId}/activities/`);
  return response.data;
};

export const toggleWatcher = async (
  cardId: number,
  action: 'add' | 'remove'
): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(`/cards/${cardId}/watchers/`, { action });
  return response.data;
};
