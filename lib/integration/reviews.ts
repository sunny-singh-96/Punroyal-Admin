// lib/integration/reviews.ts - Reviews API integration
import { http } from './http';

export const reviewsAPI = {
  // Get all reviews
  async getAll(params?: any) {
    const url = `/admin/reviews?${new URLSearchParams(params || {}).toString()}`;
    return http.get(url);
  },

  // Update review status
  async updateStatus(id: string | number, status: string) {
    return http.patch(`/admin/reviews/${id}/status`, { status });
  },

  // Update review
  async update(id: string | number, data: any) {
    return http.put(`/admin/reviews/${id}`, data);
  },

  // Delete review
  async delete(id: string | number) {
    return http.delete(`/admin/reviews/${id}`);
  },
};
