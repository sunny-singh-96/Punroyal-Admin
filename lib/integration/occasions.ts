import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

export interface OccasionPayload {
  title: string;
  categories: string[];
  cat_id?: string;
  status?: boolean;
  image?: string;
  order?: number;
}

export const occasionsAPI = {
  // Get all occasions
  async getAll(lazyParams: LazyParams) {
    return http.get(`${ENDPOINTS.OCCASION.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}`);
  },

  // Get assigned categories map
  async getAssignedCategories(excludeId?: string) {
    const query = excludeId ? `?excludeId=${excludeId}` : '';
    return http.get(`${ENDPOINTS.OCCASION.ASSIGNED_CATEGORIES}${query}`);
  },

  // Create occasion
  async create(data: OccasionPayload) {
    return http.post(`${ENDPOINTS.OCCASION.ADD}`, data);
  },

  // Update occasion
  async update(id: string, data: Partial<OccasionPayload>) {
    return http.put(`${ENDPOINTS.OCCASION.UPDATE}/${id}`, data);
  },

  // Delete occasion
  async delete(id: string) {
    return http.delete(`${ENDPOINTS.OCCASION.DELETE}/${id}`);
  },
};
