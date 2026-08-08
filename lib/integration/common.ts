import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export const commonAPI = {
  // Get all common
  async getAll() {
    return http.post(ENDPOINTS.COMMON, { types: ["models","colors","materials","sizes"] });
  },
};
