import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  services: string[];
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStats {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
  closed: number;
}

export interface EnquiryLazyParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export interface EnquiryListResponse {
  code: string;
  message: string;
  data: EnquiryItem[];
  totalRecords: number;
  page: number;
  limit: number;
}

export interface EnquiryStatsResponse {
  code: string;
  message: string;
  data: EnquiryStats;
}

export const enquiryAPI = {
  async getAll(params: EnquiryLazyParams): Promise<EnquiryListResponse> {
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
    return http.get(`${ENDPOINTS.ENQUIRY.LIST}?${queryString}`);
  },

  async getStats(): Promise<EnquiryStatsResponse> {
    return http.get(ENDPOINTS.ENQUIRY.STATS);
  },

  async getById(id: string): Promise<{ code: string; message: string; data: EnquiryItem }> {
    return http.get(`${ENDPOINTS.ENQUIRY.GET}/${id}`);
  },

  async update(id: string, data: { status?: string; notes?: string }) {
    return http.patch(`${ENDPOINTS.ENQUIRY.UPDATE}/${id}`, data);
  },

  async delete(id: string) {
    return http.delete(`${ENDPOINTS.ENQUIRY.DELETE}/${id}`);
  },
};
