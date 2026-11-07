// lib/middleware/auth.ts - Centralized auth token middleware
import { storageUtils } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

/**
 * Validate token exists and is valid
 * @returns boolean
 */
export const validateToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  return storageUtils.hasToken();
};

/**
 * Get token safely
 * @returns token or null
 */
export const getAuthToken = (): string | null => {
  return storageUtils.getToken();
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  return validateToken() && storageUtils.hasUser();
};

/**
 * Logout user - centralized logout
 */
export const logoutUser = async (targetRole?: 'admin' | 'influencer'): Promise<void> => {
  if (typeof window === 'undefined') return;

  const path = window.location.pathname;
  const isInfluencer =
    targetRole === 'influencer' ||
    (targetRole === undefined && path.startsWith('/influencer'));

  if (isInfluencer) {
    try {
      storageUtils.clearInfluencer();
    } catch (e) {
      console.error('Storage clear influencer error:', e);
    }

    // Clear influencer cookies
    document.cookie = 'influencer-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
    document.cookie = 'influencer-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';

    // If an admin token exists, restore it as the primary cookie
    const adminToken = storageUtils.getAdminToken();
    if (adminToken) {
      document.cookie = `auth-token=${adminToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      document.cookie = `token=${adminToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    } else {
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
    }

    window.location.replace('/influencer/login');
    return;
  }

  // Admin Logout
  try {
    storageUtils.clearAdmin();
    storageUtils.removeAuthStorage();
    useAuthStore.setState({ user: null, token: null, isLoading: false });
  } catch (e) {
    console.error('Storage clear admin error:', e);
  }

  document.cookie = 'admin-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
  document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';

  // If an influencer token exists, preserve it as cookie
  const infToken = storageUtils.getInfluencerToken();
  if (infToken) {
    document.cookie = `auth-token=${infToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    document.cookie = `token=${infToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } else {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
  }

  window.location.replace('/');
};

/**
 * Redirect to login if not authenticated
 */
export const redirectIfNotAuth = (): void => {
  if (typeof window === 'undefined') return;
  
  if (!validateToken()) {
    storageUtils.clearAll();
    window.location.href = '/';
  }
};

/**
 * Hook for protecting pages - redirects if not authenticated
 */
export const useAuthProtection = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!validateToken() || !user) {
      logoutUser();
      return;
    }

    setIsProtected(true);
  }, [isLoading, user, router]);

  return { isProtected, isLoading };
};

/**
 * Check token validity with server
 */
export const verifyTokenWithServer = async (): Promise<boolean> => {
  const token = getAuthToken();
  
  if (!token) {
    logoutUser();
    return false;
  }

  try {
    // Token validation will happen automatically in http.get
    // If token is invalid, handleAuthError will be called
    return true;
  } catch (error) {
    logoutUser();
    return false;
  }
};

/**
 * Middleware for public routes only (no token needed)
 */
export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes = ['/'];
  return publicRoutes.includes(pathname);
};

/**
 * Ensure token is present for all requests
 * Used in integration layer to prevent unauthorized access
 */
export const ensureTokenExists = (): void => {
  if (!validateToken()) {
    logoutUser();
    throw new Error('No authentication token');
  }
};
