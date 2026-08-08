import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export const dashboardAPI = {
  // Get Dashboard Stats
  async getAll() {
    return http.get(ENDPOINTS.DASHBOARD);
  },
};
