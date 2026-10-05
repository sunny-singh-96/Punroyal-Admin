"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Layers,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { dashboardAPI } from "@/lib/integration/dashboard";

interface LatestOrder {
  _id: string;
  order_number: string;
  user_id?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  shipping_address?: {
    name?: string;
    phone?: string;
    city?: string;
    state?: string;
  };
  payment_method?: string;
  payment_status?: string;
  total_amount: number;
  status: string;
  createdAt: string;
}

interface OrderChartItem {
  name: string;
  count: number;
  color: string;
}

interface OrderStats {
  totalOrders: number;
  delivered: number;
  cancelled: number;
  pending: number;
}

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalCancelledOrders: number;
  totalPendingOrders: number;
  totalDeliveredOrders: number;
  orderStats: OrderStats;
  orderChart: OrderChartItem[];
  latestOrders: LatestOrder[];
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  confirmed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  processing: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  created: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
  shipped: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  in_transit: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  out_for_delivery: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  cancelled: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  payment_failed: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  returned: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dashboardAPI.getAll();
      if (response?.code === "OK" && response.data) {
        setData(response.data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDateSafe = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "—";
      return format(d, "dd MMM yyyy, hh:mm a");
    } catch {
      return "—";
    }
  };

  const formatCurrency = (num?: number) => {
    const val = Number(num) || 0;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-normal text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  const totalProducts = data?.totalProducts ?? 0;
  const totalCategories = data?.totalCategories ?? 0;
  const totalOrders = data?.totalOrders ?? (data?.orderStats?.totalOrders ?? 0);
  const totalCancelledOrders = data?.totalCancelledOrders ?? (data?.orderStats?.cancelled ?? 0);
  const totalPendingOrders = data?.totalPendingOrders ?? (data?.orderStats?.pending ?? 0);
  const totalDeliveredOrders = data?.totalDeliveredOrders ?? (data?.orderStats?.delivered ?? 0);

  // Exactly 3 states in the chart: Order Delivered, Order Pending, Order Cancelled
  const chartData = [
    { name: "Order Delivered", count: totalDeliveredOrders, color: "#10B981" },
    { name: "Order Pending", count: totalPendingOrders, color: "#F59E0B" },
    { name: "Order Cancelled", count: totalCancelledOrders, color: "#EF4444" },
  ];

  const chartHasData = chartData.some((item) => item.count > 0);
  const latestOrders = data?.latestOrders || [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Store performance metrics, order statistics, and recent customer activity
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-normal rounded-xl transition shadow-xs disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Total Products */}
        <Link
          href="/products"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package size={22} />
            </div>
            <span className="text-[11px] font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Catalog
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-normal uppercase tracking-wider text-slate-400">
              Total Products
            </p>
            <p className="text-2xl font-normal text-slate-900 mt-1">
              {totalProducts.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* 2. Total Categories */}
        <Link
          href="/categories"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers size={22} />
            </div>
            <span className="text-[11px] font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Categories
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-normal uppercase tracking-wider text-slate-400">
              Total Categories
            </p>
            <p className="text-2xl font-normal text-slate-900 mt-1">
              {totalCategories.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* 3. Total Orders */}
        <Link
          href="/orders"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag size={22} />
            </div>
            <span className="text-[11px] font-normal text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
              Orders
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-normal uppercase tracking-wider text-slate-400">
              Total Orders
            </p>
            <p className="text-2xl font-normal text-slate-900 mt-1">
              {totalOrders.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* 4. Total Cancelled Orders */}
        <Link
          href="/orders"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <XCircle size={22} />
            </div>
            <span className="text-[11px] font-normal text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Cancelled
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-normal uppercase tracking-wider text-slate-400">
              Total Cancelled Orders
            </p>
            <p className="text-2xl font-normal text-slate-900 mt-1">
              {totalCancelledOrders.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* 5. Total Pending Orders */}
        <Link
          href="/orders"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock size={22} />
            </div>
            <span className="text-[11px] font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-normal uppercase tracking-wider text-slate-400">
              Total Pending Orders
            </p>
            <p className="text-2xl font-normal text-slate-900 mt-1">
              {totalPendingOrders.toLocaleString()}
            </p>
          </div>
        </Link>
      </div>

      {/* Single Orders Chart (Order Delivered, Order Pending, Order Cancelled) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-lg font-normal text-slate-900 flex items-center gap-2">
              <ShoppingBag size={20} className="text-blue-600" />
              <span>Orders Status Chart</span>
            </h2>
            <p className="text-xs font-normal text-slate-500 mt-0.5">
              Live breakdown of Delivered, Pending, and Cancelled orders
            </p>
          </div>
          <div className="text-xs font-normal text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
            Total Orders: <span className="font-normal text-slate-900">{totalOrders}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          {/* Chart Graphic */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[280px]">
            {chartHasData ? (
              <div className="relative w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.filter((d) => d.count > 0)}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {chartData.filter((d) => d.count > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any) => [
                        `${value} orders (${((Number(value) / (totalOrders || 1)) * 100).toFixed(1)}%)`,
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Total */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-normal text-slate-800">
                    {totalOrders}
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <ShoppingBag size={36} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-normal text-slate-600">No order data yet</p>
                <p className="text-xs font-normal text-slate-400 mt-1">Orders will appear here once placed</p>
              </div>
            )}
          </div>

          {/* 3 Status Cards (Delivered, Pending, Cancelled) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* 1. Order Delivered */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-normal text-emerald-800">Order Delivered</p>
                  <p className="text-xl font-normal text-emerald-950 mt-0.5">
                    {totalDeliveredOrders}
                  </p>
                </div>
              </div>
              <span className="text-xs font-normal text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200">
                {totalOrders > 0
                  ? `${Math.round((totalDeliveredOrders / totalOrders) * 100)}%`
                  : "0%"}
              </span>
            </div>

            {/* 2. Order Pending */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-normal text-amber-800">Order Pending</p>
                  <p className="text-xl font-normal text-amber-950 mt-0.5">
                    {totalPendingOrders}
                  </p>
                </div>
              </div>
              <span className="text-xs font-normal text-amber-700 bg-white px-2.5 py-1 rounded-md border border-amber-200">
                {totalOrders > 0
                  ? `${Math.round((totalPendingOrders / totalOrders) * 100)}%`
                  : "0%"}
              </span>
            </div>

            {/* 3. Order Cancelled */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <XCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-normal text-rose-800">Order Cancelled</p>
                  <p className="text-xl font-normal text-rose-950 mt-0.5">
                    {totalCancelledOrders}
                  </p>
                </div>
              </div>
              <span className="text-xs font-normal text-rose-700 bg-white px-2.5 py-1 rounded-md border border-rose-200">
                {totalOrders > 0
                  ? `${Math.round((totalCancelledOrders / totalOrders) * 100)}%`
                  : "0%"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Latest Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-normal text-slate-900">5 Latest Orders</h2>
            <p className="text-xs font-normal text-slate-500 mt-0.5">
              Most recent customer orders placed on the store
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-normal text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View All Orders</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-normal tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-normal">Order Number</th>
                <th className="px-6 py-3.5 font-normal">Customer</th>
                <th className="px-6 py-3.5 font-normal">Amount</th>
                <th className="px-6 py-3.5 font-normal">Status</th>
                <th className="px-6 py-3.5 font-normal">Placed On</th>
                <th className="px-6 py-3.5 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {latestOrders.length > 0 ? (
                latestOrders.map((order) => {
                  const statusKey = (order.status || "created").toLowerCase();
                  const badgeStyle = STATUS_COLORS[statusKey] || {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    border: "border-slate-200",
                  };
                  const customerName =
                    order.shipping_address?.name ||
                    order.user_id?.name ||
                    "Customer";
                  const customerContact =
                    order.shipping_address?.phone ||
                    order.user_id?.phone ||
                    order.user_id?.email ||
                    "";

                  return (
                    <tr key={order._id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-normal text-slate-900">
                        {order.order_number || `#${order._id.slice(-6)}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-normal text-slate-800">{customerName}</div>
                        {customerContact && (
                          <div className="text-xs text-slate-400 mt-0.5">{customerContact}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-normal text-slate-900">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-normal border capitalize ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                        >
                          {order.status ? order.status.replace(/_/g, " ") : "created"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-normal text-slate-500">
                        {formatDateSafe(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/orders/view/${order._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-normal rounded-lg transition"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <ShoppingBag size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-normal text-slate-600">No orders found</p>
                    <p className="text-xs font-normal text-slate-400 mt-1">
                      New orders will be displayed here automatically
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
