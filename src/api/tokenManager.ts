// src/api/tokenManager.ts

export interface StoredTokens {
  token: string | null;
  refresh_token: string | null;
}

/**
 * TokenManager
 * --------------------------
 * - Lưu & truy xuất access / refresh token.
 * - Đồng bộ giữa tab bằng storage event.
 * - Cho phép clear an toàn khi logout.
 */
class TokenManager {
  private static ACCESS_KEY = 'token';
  private static REFRESH_KEY = 'refresh_token';

  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.ACCESS_KEY);
    } catch {
      return null;
    }
  }

  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_KEY);
    } catch {
      return null;
    }
  }

  static setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_KEY, token);
    // Broadcast thay đổi token cho các tab khác
    window.dispatchEvent(new CustomEvent('token-changed', { detail: { token } }));
  }

  static setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  static setTokens({ token, refresh_token }: StoredTokens): void {
    if (token) this.setAccessToken(token);
    if (refresh_token) this.setRefreshToken(refresh_token);
  }

  static clear(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    window.dispatchEvent(new CustomEvent('token-cleared'));
  }

  /**
   * Dùng cho các tab khác khi nhận event token update.
   * Giúp đồng bộ trạng thái đăng nhập cross-tab.
   */
  static onTokenChange(callback: (token: string | null) => void): void {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ token?: string }>;
      if (custom.detail?.token) callback(custom.detail.token);
    };
    window.addEventListener('token-changed', handler);
  }

  static onTokenClear(callback: () => void): void {
    window.addEventListener('token-cleared', callback);
  }
}

export default TokenManager;
