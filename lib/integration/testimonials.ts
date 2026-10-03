import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

export const testimonialsAPI = {
  async getAll(lazyParams: LazyParams) {
    let search = '';
    if (lazyParams?.search) {
      search = `&search=${encodeURIComponent(lazyParams.search)}`;
    }
    return http.get(`${ENDPOINTS.TESTIMONIAL.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
  },

  async getById(id: string) {
    return http.get(`${ENDPOINTS.TESTIMONIAL.GET}/${id}`);
  },

  async create(data: FormData | Record<string, any>) {
    if (data instanceof FormData) {
      return http.post(ENDPOINTS.TESTIMONIAL.ADD, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return http.post(ENDPOINTS.TESTIMONIAL.ADD, data);
  },

  async update(id: string, data: FormData | Record<string, any>) {
    if (data instanceof FormData) {
      return http.put(`${ENDPOINTS.TESTIMONIAL.UPDATE}/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return http.put(`${ENDPOINTS.TESTIMONIAL.UPDATE}/${id}`, data);
  },

  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.TESTIMONIAL.UPDATE}/${id}`, { status });
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.TESTIMONIAL.DELETE}/${id}`);
  },
};
