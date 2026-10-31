import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface LazyParams {
  page: number;
  limit: number;
  search?: string;
}

interface ModelData {
  name: string;
  username?: string;
  email?: string;
  password?: string;
  status?: boolean;
  role_label?: string;
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
        search: lazyParams.search || '',
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
        email: data.email,
        password: data.password,
        role_label: data.role_label,
        status: data.status,
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
  async uploadVideo(id: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void) {
    return http.post(`${ENDPOINTS.INFLUENCER.UPLOAD_VIDEO}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
      timeout: 300000,
    });
  },

  // Create auth for model
  async createAuth(data: { name: string; username: string; email?: string; password?: string }) {
    return http.post(ENDPOINTS.INFLUENCER.REGISTER, {
      name: data.name,
      email: (data.email || `${data.username}@punroyal.com`).toLowerCase().trim(),
      username: data.username,
      password: data.password || 'password123',
      role: 'influencer'
    });
  },

  // Change password for influencer (Admin only, old password not required)
  async changePassword(id: string, newPassword: string) {
    return http.post(ENDPOINTS.COMMON_HANDLER, {
      action: 'change-password',
      module: 'models',
      id,
      data: {
        newPassword,
      },
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
