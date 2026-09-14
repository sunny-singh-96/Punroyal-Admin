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
import { orderAPI } from "@/lib/integration/orders";
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
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, pending: 0, completed: 0, cancelled: 0, revenue: 0 });

  // Smart number formatter: show raw number if < 1000, otherwise show K
  const formatNum = (num: number, decimals = 0) => {
    if (num >= 1000) return `${(num / 1000).toFixed(decimals)}K`;
    return String(num);
  };

  const formatCurrency = (num: number) => {
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
    return `₹${num}`;
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [dashResponse, orderResponse] = await Promise.all([
        dashboardAPI.getAll(),
        orderAPI.getOrderStatus(),
      ]);

      if (dashResponse?.code === "OK") {
        setData(dashResponse?.data ?? null);
      }

      if (orderResponse?.code === "OK") {
        setOrderStats(orderResponse?.data || { totalOrders: 0, pending: 0, completed: 0, cancelled: 0, revenue: 0 });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <ShoppingCart className="w-12 h-12 text-slate-300 mb-3" />
        <h3 className="text-lg font-bold text-slate-700">Unable to load dashboard data</h3>
        <p className="text-slate-500 text-sm mt-1 mb-4">Please check connection or click retry</p>
        <button
          onClick={() => fetchDashboardData()}
          className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-xs hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

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
                  {formatCurrency(data?.totalSales || 0)}
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
                  {formatNum(orderStats.totalOrders || data?.totalOrders || 0)}
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

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {formatNum(orderStats.pending || 0)}
                </p>
                <div className="flex items-center mt-2 text-amber-600">
                  <span className="text-sm font-medium">Awaiting action</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Cancelled Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Cancelled Orders
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {formatNum(orderStats.cancelled || data?.totalReturns || 0)}
                </p>
                <div className="flex items-center mt-2 text-red-500">
                  <span className="text-sm font-medium">
                    {orderStats.completed ? `${orderStats.completed} completed` : "Status: Active"}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-red-500" />
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
              <AreaChart data={data.revenueAnalytics || []}>
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
                    {formatCurrency(data?.monthlyTarget?.target || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current:</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(data?.monthlyTarget?.current || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {data?.topCategories && data.topCategories.length > 0 ? (
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
                            width: `${(category.totalSales / (data.topCategories[0]?.totalSales || 1)) * 100}%`,
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
