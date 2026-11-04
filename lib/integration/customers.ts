import { http } from "./http";

export interface CustomerItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomersResponse {
  code: string;
  message?: string;
  data: CustomerItem[];
  totalRecords: number;
  page: number;
  limit: number;
}

export const customersAPI = {
  getAll: async ({
    page = 1,
    limit = 20,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CustomersResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search && search.trim() ? { search: search.trim() } : {}),
    });
    return http.get<CustomersResponse>(`/auth/users?${params.toString()}`);
  },

  toggleActive: async (id: string) => {
    return http.patch(`/auth/users/${id}/toggle`, {});
  },
};
