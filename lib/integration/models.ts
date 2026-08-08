import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
}

interface ModelData {
  name: string;
  status?: boolean;
}

export const modelsAPI = {
  // Get all models
  async getAll(lazyParams: LazyParams) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'list',
      module: 'models',
      data: {
        page: lazyParams.page,
        limit: lazyParams.limit,
      }
    });
  },

  // Get single model
  async getOne(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'get',
      module: 'models',
      id
    });
  },

  // Create model
  async create(data: ModelData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'create',
      module: 'models',
      data: { name: data.name }
    });
  },

  // Delete model
  async delete(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'delete',
      module: 'models',
      id
    });
  },
};
