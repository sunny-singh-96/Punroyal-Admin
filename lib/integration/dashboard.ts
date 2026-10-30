import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export const dashboardAPI = {
  // Get Dashboard Stats
  async getAll() {
    return http.get(ENDPOINTS.DASHBOARD);
  },

  // Clear Website & Redis Cache
  async clearWebsiteCache() {
    return http.post(ENDPOINTS.CLEAR_CACHE, {});
  },
};
