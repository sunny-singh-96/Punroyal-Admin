import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';
interface LazyParams {
  page: number;
  limit: number;
};

export const occasionsAPI = {
  // Get all occasions
  async getAll(lazyParams: LazyParams) {
    return http.get(`${ENDPOINTS.OCCASION.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}`);
  },

  // Create occasions
  async create(data: { cat_id: string; status: boolean }) {
    return http.post(`${ENDPOINTS.OCCASION.ADD}`, data);
  },

  // Delete occasions
  async delete(id: string) {
    return http.delete(`${ENDPOINTS.OCCASION.DELETE}/${id}`);
  },
};
