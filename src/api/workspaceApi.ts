// src/api/workspaceApi.ts
import  apiClient  from '@api/apiClient';
import type {
  Workspace,
  WorkspaceCreatePayload,
  WorkspaceUpdatePayload,
  WorkspaceDetail,
  WorkspaceMember,
} from '@api/types/workspace';

/**
 * Lấy tất cả workspace mà user tham gia hoặc sở hữu
 */
export const fetchWorkspaces = async (): Promise<Workspace[]> => {
  const response = await apiClient.get<Workspace[]>(`/workspaces/`);
  return response.data;
};

/**
 * Tạo workspace mới
 */
export const createWorkspace = async (data: WorkspaceCreatePayload): Promise<Workspace> => {
  const response = await apiClient.post<Workspace>(`/workspaces/`, data);
  return response.data;
};

/**
 * Lấy danh sách board trong workspace
 */
export const fetchWorkspaceBoards = async (workspaceId: number): Promise<WorkspaceDetail> => {
  const response = await apiClient.get<WorkspaceDetail>(`/workspaces/${workspaceId}/boards/`);
  return response.data;
};

/**
 * Lấy chi tiết workspace
 */
export const fetchWorkspaceDetail = async (workspaceId: number): Promise<WorkspaceDetail> => {
  const response = await apiClient.get<WorkspaceDetail>(`/workspaces/${workspaceId}/`);
  return response.data;
};

/**
 * Cập nhật workspace (tên / chính sách tạo board)
 */
export const updateWorkspace = async (
  workspaceId: number,
  data: WorkspaceUpdatePayload
): Promise<Workspace> => {
  const response = await apiClient.patch<Workspace>(`/workspaces/${workspaceId}/`, data);
  return response.data;
};

/**
 * Xóa workspace
 */
export const deleteWorkspace = async (workspaceId: number): Promise<void> => {
  await apiClient.delete(`/workspaces/${workspaceId}/`);
};

/* ==========================================================
   👥 MEMBERS
========================================================== */

/**
 * Lấy danh sách thành viên trong workspace
 */
export const fetchWorkspaceMembers = async (workspaceId: number): Promise<WorkspaceMember[]> => {
  const response = await apiClient.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members/`);
  return response.data;
};

/**
 * Mời thành viên mới
 */
export const inviteWorkspaceMember = async (
  workspaceId: number,
  userId: number,
  role: 'admin' | 'member'
): Promise<WorkspaceMember> => {
  const response = await apiClient.post<WorkspaceMember>(`/workspaces/${workspaceId}/members/`, {
    user_id: userId,
    role,
  });
  return response.data;
};

/**
 * Cập nhật quyền của thành viên trong workspace
 */
export const updateWorkspaceMemberRole = async (
  workspaceId: number,
  userId: number,
  role: 'admin' | 'member'
): Promise<WorkspaceMember> => {
  const response = await apiClient.patch<WorkspaceMember>(`/workspaces/${workspaceId}/members/`, {
    user_id: userId,
    role,
  });
  return response.data;
};

/**
 * Xóa thành viên khỏi workspace
 */
export const removeWorkspaceMember = async (workspaceId: number, userId: number): Promise<void> => {
  await apiClient.delete(`/workspaces/${workspaceId}/members/`, { data: { user_id: userId } });
};
