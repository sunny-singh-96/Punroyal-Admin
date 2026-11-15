import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';
interface LazyParams {
  page: number;
  limit: number;
  cursor?: string;
  after_id?: string;
};

export const orderAPI = {
  // Get all orders
  async getAll(lazyParams: LazyParams, searchTerm: string, statusFilter: string, dateRange: { from: string; to: string }) {
    const queryObj: Record<string, string> = {
      page: lazyParams.page.toString(),
      limit: lazyParams.limit.toString(),
      search: searchTerm,
      status: statusFilter,
      from: dateRange.from,
      to: dateRange.to
    };
    if (lazyParams.cursor) queryObj.cursor = lazyParams.cursor;
    if (lazyParams.after_id) queryObj.after_id = lazyParams.after_id;
    const query = new URLSearchParams(queryObj).toString();
    console.log("Query Params for Orders API:", query);
    return http.get(`${ENDPOINTS.ORDERS.LIST}?${query}`);
  },

  // Get order detail
  async getOrder(id: string) {
    const cleanView = ENDPOINTS.ORDERS.VIEW.replace(/\/+$/, '');
    return http.get(`${cleanView}/${id}/true`);
  },

  // Get order status
  async getOrderStatus() {
    return http.get(ENDPOINTS.ORDERS.STATS);
  },

  // Update order status
  async updateStatus(orderId: string, status: string, notes?: string) {
    return http.patch(`/order/${orderId}/${status}`, { status, notes });
  },
};
