import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

export const bannersAPI = {
  async getAll(lazyParams: LazyParams) {
    let search = "";
    if (lazyParams?.search) {
      search = `&search=${encodeURIComponent(lazyParams.search)}`;
    }
    return http.get(`${ENDPOINTS.BANNER.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
  },

  async getById(id: string) {
    return http.get(`${ENDPOINTS.BANNER.GET}/${id}`);
  },

  async create(data: FormData) {
    return http.post(`${ENDPOINTS.BANNER.ADD}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async update(id: string, data: FormData) {
    return http.put(`${ENDPOINTS.BANNER.UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.BANNER.UPDATE}/${id}`, { status });
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.BANNER.DELETE}/${id}`);
  },
};
