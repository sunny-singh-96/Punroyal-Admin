import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';
interface LazyParams {
  page: number;
  limit: number;
  search?: string;
};

export const categoriesAPI = {
  // Get all categories
  async getAll(lazyParams: LazyParams) {
    let search = "";
    if (lazyParams?.search){
      search = `&search=${lazyParams.search}`
    }
    return http.get(`${ENDPOINTS.CATEGORY.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
  },

  // Get category by ID
  async getById(id: string) {
    return http.get(`${ENDPOINTS.CATEGORY.GET}/${id}`);
  },

  // Create category
  async create(data: FormData) {
    return http.post(`${ENDPOINTS.CATEGORY.ADD}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update category
  async update(id: string, data: FormData) {
    return http.put(`${ENDPOINTS.CATEGORY.UPDATE}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update category status only
  async updateStatus(id: string, status: boolean) {
    return http.put(`${ENDPOINTS.CATEGORY.UPDATE}/${id}`, { status });
  },

  // Delete category
  async delete(id: string) {
    return http.delete(`${ENDPOINTS.CATEGORY.DELETE}/${id}`);
  },

  // Reorder categories
  async reorder(orders: Array<{ id: string; order: number }>) {
    return http.put(`${ENDPOINTS.CATEGORY.REORDER}`, { orders });
  },

  // Update single category order
  async updateOrder(id: string, order: number) {
    return http.put(`${ENDPOINTS.CATEGORY.UPDATE}/${id}`, { order });
  },
};
