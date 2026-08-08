import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
}

interface MaterialData {
  name: string;
  status?: boolean;
}

export const materialsAPI = {
  // Get all materials
  async getAll(lazyParams: LazyParams) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'list',
      module: 'materials',
      data: {
        page: lazyParams.page,
        limit: lazyParams.limit,
      }
    });
  },

  // Get single material
  async getOne(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'get',
      module: 'materials',
      id
    });
  },

  // Create material
  async create(data: MaterialData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'create',
      module: 'materials',
      data: { name: data.name }
    });
  },

  // Delete material
  async delete(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'delete',
      module: 'materials',
      id
    });
  },
};
