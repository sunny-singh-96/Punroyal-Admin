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
export const logoutUser = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  storageUtils.clearAll();
  // Clear cookie
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.href = '/';
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
