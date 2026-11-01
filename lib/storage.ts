// lib/storage.ts - Centralized localStorage utilities with multi-session support for Admin and Influencer
export const storageUtils = {
  // Check if current route is an influencer route
  isInfluencerRoute: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/influencer');
  },

  // Token operations
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    if (storageUtils.isInfluencerRoute()) {
      return localStorage.getItem('influencer_token') || localStorage.getItem('token');
    }
    return localStorage.getItem('admin_token') || localStorage.getItem('token');
  },

  setToken: (token: string, role?: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
    if (role === 'influencer' || storageUtils.isInfluencerRoute()) {
      localStorage.setItem('influencer_token', token);
    } else {
      localStorage.setItem('admin_token', token);
    }
  },

  getAdminToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token') || localStorage.getItem('token');
  },

  setAdminToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_token', token);
    localStorage.setItem('token', token);
  },

  getInfluencerToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('influencer_token');
  },

  setInfluencerToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('influencer_token', token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    if (storageUtils.isInfluencerRoute()) {
      localStorage.removeItem('influencer_token');
    } else {
      localStorage.removeItem('admin_token');
    }
    localStorage.removeItem('token');
  },

  // User operations
  getUser: (): any => {
    if (typeof window === 'undefined') return null;
    try {
      if (storageUtils.isInfluencerRoute()) {
        const infUser = localStorage.getItem('influencer_user');
        if (infUser) return JSON.parse(infUser);
      }
      const adminUser = localStorage.getItem('admin_user');
      if (adminUser) return JSON.parse(adminUser);
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: any, role?: string): void => {
    if (typeof window === 'undefined') return;
    const str = JSON.stringify(user);
    localStorage.setItem('user', str);
    if (user?.role === 'influencer' || role === 'influencer' || storageUtils.isInfluencerRoute()) {
      localStorage.setItem('influencer_user', str);
    } else {
      localStorage.setItem('admin_user', str);
    }
  },

  getAdminUser: (): any => {
    if (typeof window === 'undefined') return null;
    try {
      const u = localStorage.getItem('admin_user') || localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setAdminUser: (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_user', JSON.stringify(user));
  },

  getInfluencerUser: (): any => {
    if (typeof window === 'undefined') return null;
    try {
      const u = localStorage.getItem('influencer_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setInfluencerUser: (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('influencer_user', JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    if (storageUtils.isInfluencerRoute()) {
      localStorage.removeItem('influencer_user');
    } else {
      localStorage.removeItem('admin_user');
    }
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
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('influencer_token');
    localStorage.removeItem('influencer_user');
    localStorage.removeItem('auth-storage');
  },

  clearInfluencer: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('influencer_token');
    localStorage.removeItem('influencer_user');
    // If current token was influencer, restore admin token if exists
    const adminToken = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    if (adminToken && adminUser) {
      localStorage.setItem('token', adminToken);
      localStorage.setItem('user', adminUser);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  clearAdmin: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    // If current token was admin, restore influencer if exists
    const infToken = localStorage.getItem('influencer_token');
    const infUser = localStorage.getItem('influencer_user');
    if (infToken && infUser) {
      localStorage.setItem('token', infToken);
      localStorage.setItem('user', infUser);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
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
