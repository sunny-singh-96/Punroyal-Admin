// lib/integration/http.ts - Centralized HTTP methods
import api from '@/utils/api';
import { storageUtils } from '@/lib/storage';
import { ensureTokenExists, logoutUser } from '@/lib/middleware/auth';
import { toast } from 'react-hot-toast';
import { baseURL } from '@/constants/endpoint';

const handleAuthError = async () => {
  await logoutUser();
};

const concatUrl = (endpoint: string) => {
  if (endpoint.startsWith('https://') || endpoint.startsWith('http://')) {
    return endpoint;
  }
  return baseURL.concat(endpoint);
}

export const http = {
  // GET request
  async get<T = any>(endpoint: string, config?: any): Promise<T> {
    try {
      ensureTokenExists();

      const response = await api.get(concatUrl(endpoint), config);
      return response.data;
    } catch (error: any) {

      if (error.response?.status === 401 || error.response?.status === 403) {
        await handleAuthError();
      }

      throw error;
    }
  },

  // POST request
  async post<T = any>(endpoint: string, data?: any, config?: any, requireAuth: boolean = true): Promise<T> {
    try {
      if (requireAuth) {
        ensureTokenExists();
      }

      const response = await api.post(concatUrl(endpoint), data, config);
      return response as unknown as T;
    } catch (error: any) {
      if (!requireAuth) {
        return error.response?.data || { message: 'Request failed' };
      }

      // if (error.response?.status === 401 || error.response?.status === 403) {
      //   await handleAuthError();
      // }
      
      throw error;
    }
  },

  // PUT request
  async put<T = any>(endpoint: string, data?: any, config?: any): Promise<T> {
    try {
      ensureTokenExists();

      const response = await api.put(concatUrl(endpoint), data, config);
      return response.data;
    } catch (error: any) {

      if (error.response?.status === 401 || error.response?.status === 403) {
        await handleAuthError();
      }

      throw error;
    }
  },

  // PATCH request
  async patch<T = any>(endpoint: string, data?: any, config?: any): Promise<T> {
    try {
      ensureTokenExists();

      const response = await api.patch(concatUrl(endpoint), data, config);
      return response.data;
    } catch (error: any) {

      if (error.response?.status === 401 || error.response?.status === 403) {
        await handleAuthError();
      }

      throw error;
    }
  },

  // DELETE request
  async delete<T = any>(endpoint: string, config?: any): Promise<T> {
    try {
      ensureTokenExists();

      const response = await api.delete(concatUrl(endpoint), config);
      return response.data;
    } catch (error: any) {

      if (error.response?.status === 401 || error.response?.status === 403) {
        await handleAuthError();
      }

      throw error;
    }
  },

  // Fetch request (for fetch API)
  async fetchJson<T = any>(url: string, options?: RequestInit): Promise<T> {
    try {
      ensureTokenExists();

      const token = storageUtils.getToken();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        await handleAuthError();
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      const message = error.message || 'Request failed';
      throw error;
    }
  },
};
