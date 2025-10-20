// src/api/types/auth.ts

/** Thông tin người dùng cơ bản */
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  avatar?: string | null;
}

/** Hồ sơ người dùng mở rộng */
export interface Profile {
  id: number;
  user: User;
  title?: string;
  bio?: string;
  phone?: string;
  location?: string;
  social_links?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

/** Payload gửi khi đăng nhập */
export interface AuthLoginPayload {
  username: string;
  password: string;
}

/** Response trả về sau khi đăng nhập */
export interface AuthResponse {
  token: string;
  refresh: string;
  user: User;
}

/** Payload đăng ký */
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
