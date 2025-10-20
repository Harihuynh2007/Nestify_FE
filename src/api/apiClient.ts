// src/api/apiClient.ts
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig  } from 'axios';

import TokenManager from '@api/tokenManager';

const API_URL = import.meta.env.VITE_API_URL as string;


// ===========================================
// 🔹 Tạo axios instance
// ===========================================
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===========================================
// 🔹 Queue refresh token để tránh race condition
// ===========================================
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

// ===========================================
// 🔹 Request interceptor
// ===========================================
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = TokenManager.getAccessToken();
    if (token)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  Promise.reject
);

// ===========================================
// 🔹 Response interceptor (handle 401 refresh)
// ===========================================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        try {
          const newToken = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      isRefreshing = true;
      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token found');

        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const newToken = data.token || data.access;
        TokenManager.setAccessToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        TokenManager.clear();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
