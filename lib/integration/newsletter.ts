import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterStats {
  total: number;
  subscribed: number;
  unsubscribed: number;
}

export interface NewsletterLazyParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export interface NewsletterListResponse {
  code: string;
  message: string;
  data: NewsletterSubscriber[];
  totalRecords: number;
  page: number;
  limit: number;
}

export interface NewsletterStatsResponse {
  code: string;
  message: string;
  data: NewsletterStats;
}

export const newsletterAPI = {
  async getAll(params: NewsletterLazyParams): Promise<NewsletterListResponse> {
    const queryParts: string[] = [
      `page=${params.page}`,
      `limit=${params.limit}`,
    ];
    if (params.search && params.search.trim()) {
      queryParts.push(`search=${encodeURIComponent(params.search.trim())}`);
    }
    if (params.status && params.status !== 'all') {
      queryParts.push(`status=${encodeURIComponent(params.status)}`);
    }
    const queryString = queryParts.join('&');
    return http.get(`${ENDPOINTS.NEWSLETTER.LIST}?${queryString}`);
  },

  async getStats(): Promise<NewsletterStatsResponse> {
    return http.get(ENDPOINTS.NEWSLETTER.STATS);
  },

  async toggleStatus(id: string): Promise<{ code: string; message: string; data: { subscriber: NewsletterSubscriber } }> {
    return http.patch(`${ENDPOINTS.NEWSLETTER.TOGGLE_STATUS}/${id}/toggle-status`, {});
  },

  async delete(id: string): Promise<{ code: string; message: string }> {
    return http.delete(`${ENDPOINTS.NEWSLETTER.DELETE}/${id}`);
  },
};
