import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface AdminProfileData {
  name: string;
  email: string;
  username?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const profileAPI = {
  // Fetch current logged-in admin's profile
  async getProfile() {
    return http.get(ENDPOINTS.AUTH.GET_PROFILE);
  },

  // Update profile details (name, email, username, phone)
  async updateProfile(data: AdminProfileData) {
    return http.post(ENDPOINTS.AUTH.UPDATE_PROFILE, data);
  },

  // Change password with current password verification
  async changePassword(data: ChangePasswordData) {
    return http.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },
};

