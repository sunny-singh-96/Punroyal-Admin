// lib/integration/products.ts - Product API integration
import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export const productsAPI = {
  // Create product
  async create(formData: any) {
    return await http.post(ENDPOINTS.PRODUCT.ADD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async update(productId: string, formData: any) {
    return await http.put(`${ENDPOINTS.PRODUCT.UPDATE}/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async get(productId: string) {
    return await http.get(`${ENDPOINTS.PRODUCT.VIEW}/${productId}/false/true`);
  },

  async getAll(filters: any) {
    return await http.post(ENDPOINTS.PRODUCT.LIST, filters);
  },

  async deleteColorGroup(type: string, productId: string, colorGroupId: string) {
    return await http.delete(`${ENDPOINTS.PRODUCT.DELETE_COLOR_GROUP}/${type}/${productId}/${colorGroupId}/null`);
  },

  async bulkUpdateStatus(productIds: string[], status: boolean) {
    return await http.post(ENDPOINTS.PRODUCT.BULK_UPDATE_STATUS, { productIds, status });
  },

  async delete(productId: string) {
    return await http.delete(`${ENDPOINTS.PRODUCT.DELETE}/${productId}`);
  },

  async bulkDelete(productIds: string[]) {
    return await http.post(ENDPOINTS.PRODUCT.BULK_DELETE, {  productIds });
  },

};
