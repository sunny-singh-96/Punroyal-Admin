import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

interface MaterialData {
  name: string;
  status?: boolean | string;
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
        search: lazyParams.search || '',
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
      data: {
        name: data.name,
        status: data.status !== undefined ? (data.status === true || data.status === 'true' ? 'true' : 'false') : 'true',
      }
    });
  },

  // Update material
  async update(id: string, data: MaterialData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'update',
      module: 'materials',
      id,
      data: {
        name: data.name,
        status: data.status !== undefined ? (data.status === true || data.status === 'true' ? 'true' : 'false') : undefined,
      }
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
