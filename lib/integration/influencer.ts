import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

export interface InfluencerLoginParams {
  email?: string;
  username?: string;
  password: string;
}

export interface InfluencerRegisterParams {
  name: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export interface InfluencerDateFilterParams {
  startDate?: string;
  endDate?: string;
  influencerId?: string;
}

export interface InfluencerSalesQueryParams extends InfluencerDateFilterParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface InfluencerSaleItem {
  _id: string;
  order_id: string;
  order_number: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  customer: {
    name: string;
    email: string;
    phone: string;
    city: string;
    state?: string;
  };
  sale_date: string;
  unit_price: number;
  quantity: number;
  sale_amount: number;
  commission_type: 'percentage' | 'flat';
  commission_rate: number;
  commission: number;
  commission_status?: string;
  order_status: string;
  payment_status: string;
}

export interface InfluencerDashboardData {
  user: {
    _id: string;
    name: string;
    email: string;
    username: string;
  };
  totalProducts: number;
  totalRevenue: number;
  totalSales: number;
  totalOrders?: number;
  totalCommission: number;
  salesChart: Array<{
    date: string;
    revenue: number;
    sales: number;
    commission: number;
  }>;
  filter: {
    startDate: string | null;
    endDate: string | null;
  };
}

export const influencerAPI = {
  // Influencer Login
  async login(data: InfluencerLoginParams) {
    return http.post(ENDPOINTS.INFLUENCER.LOGIN, data, {}, false);
  },

  // Influencer Register
  async register(data: InfluencerRegisterParams) {
    return http.post(ENDPOINTS.INFLUENCER.REGISTER, data, {}, false);
  },

  // Influencer Dashboard Stats
  async getDashboardStats(params?: InfluencerDateFilterParams) {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.influencerId) query.append('influencerId', params.influencerId);

    const queryString = query.toString();
    const endpoint = queryString
      ? `${ENDPOINTS.INFLUENCER.DASHBOARD}?${queryString}`
      : ENDPOINTS.INFLUENCER.DASHBOARD;

    return http.get(endpoint);
  },

  // Influencer Sales List
  async getSales(params?: InfluencerSalesQueryParams) {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.search) query.append('search', params.search);
    if (params?.influencerId) query.append('influencerId', params.influencerId);

    const queryString = query.toString();
    const endpoint = queryString
      ? `${ENDPOINTS.INFLUENCER.SALES}?${queryString}`
      : ENDPOINTS.INFLUENCER.SALES;

    return http.get(endpoint);
  },
};
