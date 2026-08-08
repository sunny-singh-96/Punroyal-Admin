import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';
interface LazyParams {
  page: number;
  limit: number;
};

export const orderAPI = {
  // Get all orders
  async getAll(lazyParams: LazyParams, searchTerm: string, statusFilter: string, dateRange: { from: string; to: string }) {
    const query = new URLSearchParams({
      page: lazyParams.page.toString(),
      limit: lazyParams.limit.toString(),
      search: searchTerm,
      status: statusFilter,
      from: dateRange.from,
      to: dateRange.to
    }).toString();
    console.log("Query Params for Orders API:", query);
    return http.get(`${ENDPOINTS.ORDERS.LIST}?${query}`);
  },

  // Get order detail
  async getOrder(id: string) {
    return http.get(`${ENDPOINTS.ORDERS.VIEW}/${id}/true`);
  },

  // Get order status
  async getOrderStatus() {
    return http.get(ENDPOINTS.ORDERS.STATS);
  },
};
