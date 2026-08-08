import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
}

interface ColorData {
  name: string;
  hex: string;
  status?: boolean;
}

export const colorsAPI = {
  // Get all colors
  async getAll(lazyParams: LazyParams) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'list',
      module: 'colors',
      data: {
        page: lazyParams.page,
        limit: lazyParams.limit,
      }
    });
  },

  // Get single color
  async getOne(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'get',
      module: 'colors',
      id
    });
  },

  // Create color
  async create(data: ColorData) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'create',
      module: 'colors',
      data: { name: data.name, hex: data.hex }
    });
  },

  // Delete color
  async delete(id: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'delete',
      module: 'colors',
      id
    });
  },
};
