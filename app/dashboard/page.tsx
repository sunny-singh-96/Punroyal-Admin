"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { dashboardAPI } from "@/lib/integration/dashboard";
interface DashboardData {
  totalSales: number;
  totalOrders: number;
  totalReturns: number;
  totalVisitors?: number;
  salesTrend?: number;
  ordersTrend?: number;
  visitorsTrend?: number;
  revenueAnalytics: Array<{
    _id: string;
    revenue: number;
    orderCount: number;
  }>;
  monthlyTarget: {
    percentage: number;
    current: number;
    target: number;
  };
  topCategories: Array<{
    _id: string;
    categoryName: string;
    totalSales: number;
    orderCount: number;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dashboardAPI.getAll();
      if (response?.code === "OK") {
        // const mockData = {
        //   totalSales: 983410,
        //   totalOrders: 58375,
        //   totalReturns: 1250,
        //   revenueAnalytics: [
        //     { _id: '2026-05-12', revenue: 35000, orderCount: 85 },
        //     { _id: '2026-05-13', revenue: 42000, orderCount: 100 },
        //     { _id: '2026-05-14', revenue: 38000, orderCount: 95 },
        //     { _id: '2026-05-15', revenue: 51000, orderCount: 120 },
        //     { _id: '2026-05-16', revenue: 44000, orderCount: 110 },
        //     { _id: '2026-05-17', revenue: 45000, orderCount: 105 },
        //     { _id: '2026-05-18', revenue: 40000, orderCount: 98 },
        //   ],
        //   monthlyTarget: {
        //     percentage: 85,
        //     current: 983410,
        //     target: 1000000,
        //   },
        //   topCategories: [
        //     { _id: 'cat_1', categoryName: 'Electronics', totalSales: 250000, orderCount: 500 },
        //     { _id: 'cat_2', categoryName: 'Fashion', totalSales: 180000, orderCount: 400 },
        //     { _id: 'cat_3', categoryName: 'Home & Kitchen', totalSales: 150000, orderCount: 350 },
        //     { _id: 'cat_4', categoryName: 'Beauty & Personal Care', totalSales: 120000, orderCount: 300 },
        //   ],
        // };
        // setData(mockData);
        setData(response?.data?.data ?? []);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDashboardData();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchDashboardData]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!data) return null;

  const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, Super Admin</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Sales
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  ₹{(data?.totalSales || 0 / 1000).toFixed(0)}K
                </p>
                <div className={`flex items-center mt-2 ${(data?.salesTrend ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(data?.salesTrend ?? 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {(data?.salesTrend ?? 0) >= 0 ? '+' : ''}{(data?.salesTrend ?? 0).toFixed(2)}% vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {(data?.totalOrders || 0 / 1000).toFixed(1)}K
                </p>
                <div className={`flex items-center mt-2 ${(data?.ordersTrend ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(data?.ordersTrend ?? 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {(data?.ordersTrend ?? 0) >= 0 ? '+' : ''}{(data?.ordersTrend ?? 0).toFixed(2)}% vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Visitors */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Visitors
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{((data?.totalVisitors || 0) / 1000).toFixed(1)}K</p>
                <div className={`flex items-center mt-2 ${(data?.visitorsTrend ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(data?.visitorsTrend ?? 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {(data?.visitorsTrend ?? 0) >= 0 ? '+' : ''}{(data?.visitorsTrend ?? 0).toFixed(2)}% vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Returns */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Returns
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {(data?.totalReturns || 0 / 1000).toFixed(2)}K
                </p>
                <div className="flex items-center mt-2 text-slate-600">
                  <span className="text-sm font-medium">Status: Active</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Analytics - Full Width */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Revenue Analytics
                </h2>
                <p className="text-slate-500 text-sm">Last 7 days</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                Last 8 Days
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.revenueAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="_id"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#DBEAFE"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Target */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
              Monthly Target
            </h2>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-6">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray={`${(data?.monthlyTarget?.percentage || 0) * 2.83} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {(data?.monthlyTarget?.percentage || 0)}%
                    </p>
                    <p className="text-xs text-slate-500">Progress</p>
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <p className="text-sm text-slate-600">Great Progress!</p>
                <p className="text-xs text-slate-500 mt-2">
                  Our achievement increased by ₹500,000. Lets reach 100% next
                  month
                </p>
              </div>
              <div className="w-full mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Target:</span>
                  <span className="font-bold text-slate-900">
                    ₹{(data?.monthlyTarget?.target || 0 / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current:</span>
                  <span className="font-bold text-slate-900">
                    ₹{(data?.monthlyTarget?.current || 0 / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {data?.topCategories ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Categories */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Top Categories
              </h2>
              <div className="space-y-4">
                {data?.topCategories?.map((category, index) => (
                  <div key={category._id} className="flex items-center">
                    <div
                      className="w-2 h-10 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-slate-900">
                          {category.categoryName}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          ₹{(category.totalSales / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(category.totalSales / data.topCategories[0].totalSales) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {category.orderCount} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Pie Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Sales Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data?.topCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) =>
                      `${(entry.percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalSales"
                  >
                    {data?.topCategories?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
