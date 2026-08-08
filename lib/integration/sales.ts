import { http } from './http';
import { ENDPOINTS } from '@/constants/endpoint';

interface MonthlySalesParams {
  startDate: string;
  endDate: string;
}

interface MonthlySalesData {
  month: string;
  totalSales: number;
  averageOrderValue: number;
  totalOrders: number;
  monthlyGrowth: number;
  year: number;
  monthNumber: number;
}

export const salesAPI = {
  // Get monthly sales stats
  async getMonthlySales(params: MonthlySalesParams) {
    return http.post(ENDPOINTS.SALES.MONTHLY_STATS, params);
  },
};
