import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

interface SizeData {
  name: string;
  status?: boolean | string;
}

export const sizesAPI = {
  // Get all sizes
  async getAll(lazyParams: LazyParams) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'list',
      module: 'sizes',
      data: {
        page: lazyParams.page,
        limit: lazyParams.limit,
        search: lazyParams.search || '',
      }
    });
  },

  // Get single size
  async getOne(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'get',
      module: 'sizes',
      id
    });
  },

  // Create size
  async create(data: SizeData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'create',
      module: 'sizes',
      data: {
        name: data.name,
        status: data.status !== undefined ? (data.status === true || data.status === 'true' ? 'true' : 'false') : 'true',
      }
    });
  },

  // Update size
  async update(id: string, data: SizeData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'update',
      module: 'sizes',
      id,
      data: {
        name: data.name,
        status: data.status !== undefined ? (data.status === true || data.status === 'true' ? 'true' : 'false') : undefined,
      }
    });
  },

  // Delete size
  async delete(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'delete',
      module: 'sizes',
      id
    });
  },
};
