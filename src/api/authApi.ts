// src/api/authApi.ts
import api from '@api/apiClient';
import TokenManager from '@api/tokenManager';
import type { AuthLoginPayload, AuthResponse, User, Profile, RegisterPayload } from '@api/types/auth';

const BASE_URL = '/auth';

/**
 * Đăng nhập người dùng
 */
export const login = async (data: AuthLoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(`${BASE_URL}/login/`, data);
  const { token, refresh, user } = response.data;
  TokenManager.setTokens({ token, refresh_token: refresh });
  return { token, refresh, user };
};

/**
 * Lấy thông tin người dùng hiện tại
 */
export const me = async (): Promise<User> => {
  const response = await api.get<User>(`${BASE_URL}/me/`);
  return response.data;
};

/**
 * Lấy thông tin hồ sơ
 */
export const fetchProfile = async (): Promise<Profile> => {
  const response = await api.get<Profile>(`${BASE_URL}/me/profile/`);
  return response.data;
};

/**
 * Cập nhật hồ sơ
 */
export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const response = await api.patch<Profile>(`${BASE_URL}/me/profile/`, data);
  return response.data;
};

/**
 * Đăng ký tài khoản mới
 */
export const register = async (data: RegisterPayload): Promise<User> => {
  const response = await api.post<User>(`${BASE_URL}/register/`, data);
  return response.data;
};

/**
 * Đăng xuất người dùng (clear token + API call)
 */
export const logout = async (): Promise<void> => {
  try {
    await api.post(`${BASE_URL}/logout/`);
  } catch {
    // no-op
  } finally {
    TokenManager.clear();
  }
};
