import { ENDPOINTS } from '@/constants/endpoint';
import { http } from './http';

interface LazyParams {
  page: number;
  limit: number;
  inventory_stock: string;
  search: string;
};

export interface UpdateInventoryPayload {
  quantity?: number;
  variants?: Array<{
    _id?: string;
    variantId?: string;
    stock: number;
  }>;
  status?: boolean;
}

export const inventoryAPI = {
  // Get inventory list
  async getAll(params?: LazyParams) {
    const url = `${ENDPOINTS.INVENTORY.LIST}?page=${params?.page || 1}&limit=${params?.limit || 10}&inventory_stock=${params?.inventory_stock || ''}&search=${encodeURIComponent(params?.search || '')}`;
    return http.get(url);
  },

  // Get inventory status
  async getInventoryStats() {
    return http.get(ENDPOINTS.INVENTORY.STATS);
  },

  // Update product inventory and variant stock
  async updateStock(productId: string, data: UpdateInventoryPayload) {
    return http.put(`${ENDPOINTS.INVENTORY.UPDATE}/${productId}`, data);
  },
};
