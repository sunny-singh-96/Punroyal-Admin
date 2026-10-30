import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

export interface CouponPayload {
  couponName: string;
  discountType?: 'flat' | 'percentage';
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  startDate?: string | null;
  expiryType: 'expiry_date' | 'no_expiry';
  expiryDate?: string | null;
  count: number;
  usageLimitPerUser?: number;
  status?: boolean;
}

export const couponsAPI = {
  async getAll(lazyParams: LazyParams) {
    let query = `page=${lazyParams.page}&limit=${lazyParams.limit}`;
    if (lazyParams?.search) {
      query += `&search=${encodeURIComponent(lazyParams.search)}`;
    }
    return http.get(`${ENDPOINTS.COUPON.LIST}?${query}`);
  },

  async getById(id: string) {
    return http.get(`${ENDPOINTS.COUPON.GET}/${id}`);
  },

  async create(data: CouponPayload) {
    return http.post(ENDPOINTS.COUPON.ADD, data);
  },

  async update(id: string, data: Partial<CouponPayload>) {
    return http.put(`${ENDPOINTS.COUPON.UPDATE}/${id}`, data);
  },

  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.COUPON.STATUS}/${id}`, { status });
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.COUPON.DELETE}/${id}`);
  },
};
