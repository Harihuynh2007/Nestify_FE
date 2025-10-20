// src/api/boardApi.ts
import  apiClient  from "@api/apiClient";
import type {
  Board,
  BoardCreatePayload,
  BoardUpdatePayload,
  BoardListResponse,
  BoardInviteLink,
  BoardMember,
} from '@api/types/board';

/**
 * Lấy danh sách Board trong workspace
 */
export const fetchBoards = async (workspaceId: number): Promise<BoardListResponse> => {
  const response = await apiClient.get<BoardListResponse>(`/workspaces/${workspaceId}/boards/`);
  return response.data;
};

/**
 * Tạo Board mới trong workspace
 */
export const createBoard = async (
  workspaceId: number,
  data: BoardCreatePayload
): Promise<Board> => {
  const response = await apiClient.post<Board>(`/workspaces/${workspaceId}/boards/`, data);
  return response.data;
};

/**
 * Lấy chi tiết 1 board
 */
export const fetchBoardDetail = async (workspaceId: number, boardId: number): Promise<Board> => {
  const response = await apiClient.get<Board>(`/workspaces/${workspaceId}/boards/${boardId}/`);
  return response.data;
};

/**
 * Cập nhật board (ví dụ: đóng / mở)
 */
export const updateBoard = async (
  workspaceId: number,
  boardId: number,
  data: BoardUpdatePayload
): Promise<Board> => {
  const response = await apiClient.patch<Board>(`/workspaces/${workspaceId}/boards/${boardId}/`, data);
  return response.data;
};

/**
 * Xoá board
 */
export const deleteBoard = async (workspaceId: number, boardId: number): Promise<void> => {
  await apiClient.delete(`/workspaces/${workspaceId}/boards/${boardId}/`);
};

/**
 * Lấy danh sách board đã đóng
 */
export const fetchClosedBoards = async (): Promise<Board[]> => {
  const response = await apiClient.get<Board[]>(`/boards/closed/`);
  return response.data;
};

/**
 * Lấy danh sách thành viên của board
 */
export const fetchBoardMembers = async (boardId: number): Promise<BoardMember[]> => {
  const response = await apiClient.get<BoardMember[]>(`/boards/${boardId}/members/`);
  return response.data;
};

/**
 * Mời thành viên mới vào board
 */
export const addBoardMember = async (
  boardId: number,
  userId: number,
  role: 'admin' | 'editor' | 'viewer'
): Promise<BoardMember> => {
  const response = await apiClient.post<BoardMember>(`/boards/${boardId}/members/`, {
    user_id: userId,
    role,
  });
  return response.data;
};

/**
 * Cập nhật role của thành viên
 */
export const updateBoardMemberRole = async (
  boardId: number,
  userId: number,
  role: 'admin' | 'editor' | 'viewer'
): Promise<BoardMember> => {
  const response = await apiClient.patch<BoardMember>(`/boards/${boardId}/members/`, {
    user_id: userId,
    role,
  });
  return response.data;
};

/**
 * Xóa thành viên khỏi board
 */
export const removeBoardMember = async (boardId: number, userId: number): Promise<void> => {
  await apiClient.delete(`/boards/${boardId}/members/`, { data: { user_id: userId } });
};

/**
 * Lấy share link của board
 */
export const fetchBoardShareLink = async (boardId: number): Promise<BoardInviteLink | null> => {
  const response = await apiClient.get<{ has_active: boolean; token?: string; expires_at?: string }>(
    `/boards/${boardId}/share-link/`
  );
  if (!response.data.has_active) return null;

  return {
    token: response.data.token || '',
    role: 'member',
    is_active: true,
    expires_at: response.data.expires_at || null,
  };
};

/**
 * Tạo mới / cập nhật share link
 */
export const createShareLink = async (
  boardId: number,
  role: 'member' | 'admin' | 'observer' = 'member'
): Promise<BoardInviteLink> => {
  const response = await apiClient.post<BoardInviteLink>(`/boards/${boardId}/share-link/`, { role });
  return response.data;
};

/**
 * Xóa share link hiện tại
 */
export const deleteShareLink = async (boardId: number): Promise<void> => {
  await apiClient.delete(`/boards/${boardId}/share-link/`);
};

/**
 * Mời qua email
 */
export const inviteByEmail = async (
  boardId: number,
  email: string,
  role: 'member' | 'admin' | 'observer'
): Promise<{ email: string; token: string; invite_url: string }> => {
  const response = await apiClient.post(`/boards/${boardId}/invitations/`, { email, role });
  return response.data;
};
