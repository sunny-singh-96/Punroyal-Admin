import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface CodePayload {
  code: string;
  name: string;
  description?: string;
  length?: number;
  discountType?: 'flat' | 'percentage';
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  status?: boolean;
  expiryDate?: string | null;
}

export interface LazyCodeParams {
  page: number;
  limit: number;
  search?: string;
  status?: string | boolean;
}

export const codesAPI = {
  async generate(length: number = 8, prefix: string = '') {
    return http.post(ENDPOINTS.CODES.GENERATE, { length, prefix });
  },

  async getAll(lazyParams: LazyCodeParams) {
    let query = `page=${lazyParams.page}&limit=${lazyParams.limit}`;
    if (lazyParams?.search) {
      query += `&search=${encodeURIComponent(lazyParams.search)}`;
    }
    if (lazyParams?.status !== undefined && lazyParams?.status !== '') {
      query += `&status=${encodeURIComponent(String(lazyParams.status))}`;
    }
    return http.get(`${ENDPOINTS.CODES.LIST}?${query}`);
  },

  async getById(id: string) {
    return http.get(`${ENDPOINTS.CODES.GET}/${id}`);
  },

  async create(data: CodePayload) {
    return http.post(ENDPOINTS.CODES.ADD, data);
  },

  async update(id: string, data: Partial<CodePayload>) {
    return http.put(`${ENDPOINTS.CODES.UPDATE}/${id}`, data);
  },

  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.CODES.STATUS}/${id}`, { status });
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.CODES.DELETE}/${id}`);
  },

  async validate(code: string, subtotal: number = 0) {
    return http.post(ENDPOINTS.CODES.VALIDATE, { code, subtotal });
  },
};

