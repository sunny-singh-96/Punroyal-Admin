import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface AdminReviewItem {
  _id: string;
  product_id: string;
  product_name: string;
  user_id: string;
  customer_name: string;
  customer_email?: string;
  title: string;
  desc: string;
  stars: number;
  status: 'enabled' | 'disabled';
  createdAt: string;
  updatedAt?: string;
}

export interface AdminReviewsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: '' | 'enabled' | 'disabled';
}

export const reviewsAPI = {
  async getAll(params?: AdminReviewsQuery) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    const qs = query.toString();
    const endpoint = qs
      ? `${ENDPOINTS.REVIEW.ADMIN_LIST}?${qs}`
      : ENDPOINTS.REVIEW.ADMIN_LIST;
    return http.get(endpoint);
  },

  async getOne(reviewId: string) {
    return http.get(`${ENDPOINTS.REVIEW.ADMIN_GET}/${reviewId}`);
  },

  async setVisibility(reviewId: string, status: 'enabled' | 'disabled') {
    return http.patch(`${ENDPOINTS.REVIEW.ADMIN_VISIBILITY}/${reviewId}/visibility`, { status });
  },

  async delete(reviewId: string) {
    return http.delete(`${ENDPOINTS.REVIEW.ADMIN_DELETE}/${reviewId}`);
  },
};
