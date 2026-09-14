import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
}

interface ModelData {
  name: string;
  username?: string;
  password?: string;
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
      data: {
        name: data.name,
        username: data.username,
        password: data.password
      }
    });
  },

  // Update model
  async update(id: string, data: any) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'update',
      module: 'models',
      id,
      data
    });
  },

  // Upload video for influencer
  async uploadVideo(id: string, formData: FormData) {
    return http.post(`${ENDPOINTS.INFLUENCER.UPLOAD_VIDEO}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Create auth for model
  async createAuth(data: { name: string; username: string; password?: string }) {
    return http.post(ENDPOINTS.INFLUENCER.REGISTER, {
      name: data.name,
      email: `${data.username}@punroyal.com`,
      username: data.username,
      password: data.password || 'password123',
      role: 'influencer'
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

  // Reorder models
  async reorder(orders: { id: string; order: number }[]) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'reorder',
      module: 'models',
      data: {
        orders
      }
    });
  },
};
