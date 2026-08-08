import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { baseURL } from '../constants/endpoint';
import { storageUtils } from '../lib/storage';

const api = axios.create({
  baseURL, withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = storageUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isPublicPage = ['/admin/login'].includes(window.location.pathname);
    console.log(`error===>`, error);
    // Only redirect to login on 401 if not already on a public page
    if (status === 401 && !url.includes('/auth/admin-login') && !isPublicPage) {
      const { logout } = useAuthStore.getState();
      logout();
      // Avoid redirect loop by not redirecting if already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;