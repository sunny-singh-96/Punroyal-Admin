import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export const faqsAPI = {
  async getAll(lazyParams: LazyParams) {
    let query = `page=${lazyParams.page}&limit=${lazyParams.limit}`;
    if (lazyParams?.search) {
      query += `&search=${encodeURIComponent(lazyParams.search)}`;
    }
    if (lazyParams?.category) {
      query += `&category=${encodeURIComponent(lazyParams.category)}`;
    }
    return http.get(`${ENDPOINTS.FAQ.LIST}?${query}`);
  },

  async getById(id: string) {
    return http.get(`${ENDPOINTS.FAQ.GET}/${id}`);
  },

  async create(data: Record<string, any>) {
    return http.post(ENDPOINTS.FAQ.ADD, data);
  },

  async update(id: string, data: Record<string, any>) {
    return http.put(`${ENDPOINTS.FAQ.UPDATE}/${id}`, data);
  },

  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.FAQ.UPDATE}/${id}`, { status });
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.FAQ.DELETE}/${id}`);
  },
};
