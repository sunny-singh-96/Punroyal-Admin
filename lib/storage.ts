// lib/storage.ts - Centralized localStorage utilities
export const storageUtils = {
  // Token operations
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
  },

  // User operations
  getUser: (): any => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
  },

  // Auth storage
  removeAuthStorage: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth-storage');
  },

  // Clear all auth-related data
  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth-storage');
  },

  // Check if token exists
  hasToken: (): boolean => {
    return !!storageUtils.getToken();
  },

  // Check if user exists
  hasUser: (): boolean => {
    return !!storageUtils.getUser();
  },
};
