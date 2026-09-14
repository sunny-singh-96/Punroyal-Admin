import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface FreelancerAssignmentPayload {
  freelancer_id: string;
  product_id: string;
  commission_type: 'percentage' | 'flat';
  commission_rate: number;
  notes?: string;
}

export interface FreelancerQueryParams {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  search?: string;
  cat_id?: string;
  freelancerId?: string;
}

export const freelancerAPI = {
  // 1. Assign product to freelancer (Admin)
  async assign(payload: FreelancerAssignmentPayload) {
    return http.post(ENDPOINTS.FREELANCER.ASSIGN, payload);
  },

  // 2. List all assignments (Admin)
  async getAssignments(params?: { freelancer_id?: string; product_id?: string; page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.freelancer_id) query.append('freelancer_id', params.freelancer_id);
    if (params?.product_id) query.append('product_id', params.product_id);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));

    const qs = query.toString();
    const endpoint = qs ? `${ENDPOINTS.FREELANCER.ASSIGNMENTS}?${qs}` : ENDPOINTS.FREELANCER.ASSIGNMENTS;
    return http.get(endpoint);
  },

  // 3. Update assignment (Admin)
  async updateAssignment(id: string, data: Partial<FreelancerAssignmentPayload> & { status?: 'active' | 'inactive' }) {
    return http.put(`${ENDPOINTS.FREELANCER.ASSIGNMENT_BY_ID}/${id}`, data);
  },

  // 4. Delete assignment (Admin)
  async deleteAssignment(id: string) {
    return http.delete(`${ENDPOINTS.FREELANCER.ASSIGNMENT_BY_ID}/${id}`);
  },

  // 5. List available freelancers (Admin)
  async getFreelancers() {
    return http.get(ENDPOINTS.FREELANCER.LIST);
  },

  // 6. Get assigned products (Freelancer / Admin)
  async getAssignedProducts(params?: FreelancerQueryParams) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.search) query.append('search', params.search);
    if (params?.cat_id) query.append('cat_id', params.cat_id);
    if (params?.freelancerId) query.append('freelancerId', params.freelancerId);

    const qs = query.toString();
    const endpoint = qs ? `${ENDPOINTS.FREELANCER.PRODUCTS}?${qs}` : ENDPOINTS.FREELANCER.PRODUCTS;
    return http.get(endpoint);
  },

  // 7. Get single assigned product details (Freelancer)
  async getAssignedProduct(productId: string) {
    return http.get(`${ENDPOINTS.FREELANCER.PRODUCTS}/${productId}`);
  },

  // 8. Create assigned product (Freelancer)
  async createProduct(data: any) {
    return http.post(ENDPOINTS.FREELANCER.PRODUCTS, data);
  },

  // 9. Update assigned product (Freelancer)
  async updateProduct(productId: string, data: any) {
    return http.put(`${ENDPOINTS.FREELANCER.PRODUCTS}/${productId}`, data);
  },

  // 10. Delete assigned product (Freelancer)
  async deleteProduct(productId: string) {
    return http.delete(`${ENDPOINTS.FREELANCER.PRODUCTS}/${productId}`);
  },

  // 11. Calculate commission dynamically
  async calculateCommission(data: { product_id: string; price?: number; quantity?: number; freelancer_id?: string }) {
    return http.post(ENDPOINTS.FREELANCER.CALCULATE_COMMISSION, data);
  },

  // 12. Get completed orders with commission info (Freelancer)
  async getOrders(params?: FreelancerQueryParams) {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.search) query.append('search', params.search);
    if (params?.freelancerId) query.append('freelancerId', params.freelancerId);

    const qs = query.toString();
    const endpoint = qs ? `${ENDPOINTS.FREELANCER.ORDERS}?${qs}` : ENDPOINTS.FREELANCER.ORDERS;
    return http.get(endpoint);
  },

  // 13. Get payments / payouts history (Freelancer)
  async getPayments(params?: FreelancerQueryParams) {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.freelancerId) query.append('freelancerId', params.freelancerId);

    const qs = query.toString();
    const endpoint = qs ? `${ENDPOINTS.FREELANCER.PAYMENTS}?${qs}` : ENDPOINTS.FREELANCER.PAYMENTS;
    return http.get(endpoint);
  },

  // 14. Get dashboard statistics (Freelancer)
  async getDashboard(params?: FreelancerQueryParams) {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.freelancerId) query.append('freelancerId', params.freelancerId);

    const qs = query.toString();
    const endpoint = qs ? `${ENDPOINTS.FREELANCER.DASHBOARD}?${qs}` : ENDPOINTS.FREELANCER.DASHBOARD;
    return http.get(endpoint);
  },
};
