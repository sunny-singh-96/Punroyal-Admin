"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Calendar,
  Filter,
  RefreshCw,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Percent,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { logoutUser } from "@/lib/middleware/auth";
import { influencerAPI, InfluencerDashboardData, InfluencerSaleItem } from "@/lib/integration/influencer";
import { getErrorMessage } from "@/lib/helpers/handlers";
import Modal from "@/components/admin/shared/Modal";

export default function InfluencerDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Date Filter State
  const defaultStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const defaultEnd = format(new Date(), "yyyy-MM-dd");

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [appliedStartDate, setAppliedStartDate] = useState(defaultStart);
  const [appliedEndDate, setAppliedEndDate] = useState(defaultEnd);
  const [activePreset, setActivePreset] = useState<string>("this_month");

  // Data State
  const [stats, setStats] = useState<InfluencerDashboardData | null>(null);
  const [sales, setSales] = useState<InfluencerSaleItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Product View Modal State
  const [selectedProduct, setSelectedProduct] = useState<InfluencerSaleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Currency Formatter
  const formatINR = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num || 0);
  };

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await influencerAPI.getDashboardStats({
        startDate: appliedStartDate,
        endDate: appliedEndDate,
      });
      if (res?.code === "OK" || res?.data) {
        setStats(res.data || res);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [appliedStartDate, appliedEndDate]);

  // Fetch Sales Details
  const fetchSalesData = useCallback(async () => {
    try {
      setSalesLoading(true);
      const res = await influencerAPI.getSales({
        startDate: appliedStartDate,
        endDate: appliedEndDate,
        page,
        limit,
        search: searchQuery,
      });
      if (res?.code === "OK" || res?.data) {
        setSales(res.data?.data || res.data || []);
        setTotalRecords(res.data?.totalRecords || res.totalRecords || 0);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSalesLoading(false);
    }
  }, [appliedStartDate, appliedEndDate, page, limit, searchQuery]);

  useEffect(() => {
    fetchDashboardStats();
    fetchSalesData();
  }, [fetchDashboardStats, fetchSalesData]);

  // Handle Preset Clicks
  const handlePreset = (preset: string) => {
    setActivePreset(preset);
    const now = new Date();
    if (preset === "this_month") {
      const s = format(startOfMonth(now), "yyyy-MM-dd");
      const e = format(now, "yyyy-MM-dd");
      setStartDate(s);
      setEndDate(e);
      setAppliedStartDate(s);
      setAppliedEndDate(e);
    } else if (preset === "last_30_days") {
      const s = format(subDays(now, 30), "yyyy-MM-dd");
      const e = format(now, "yyyy-MM-dd");
      setStartDate(s);
      setEndDate(e);
      setAppliedStartDate(s);
      setAppliedEndDate(e);
    } else if (preset === "last_3_months") {
      const s = format(subMonths(now, 3), "yyyy-MM-dd");
      const e = format(now, "yyyy-MM-dd");
      setStartDate(s);
      setEndDate(e);
      setAppliedStartDate(s);
      setAppliedEndDate(e);
    } else if (preset === "all_time") {
      const s = "2024-01-01";
      const e = format(now, "yyyy-MM-dd");
      setStartDate(s);
      setEndDate(e);
      setAppliedStartDate(s);
      setAppliedEndDate(e);
    }
    setPage(1);
  };

  // Apply Custom Date Range
  const handleApplyFilter = () => {
    setActivePreset("custom");
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setPage(1);
    toast.success(`Filter applied: ${startDate} to ${endDate}`);
  };

  // Reset Filter
  const handleResetFilter = () => {
    handlePreset("this_month");
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
  };

  // Open Product Details Modal
  const handleProductClick = (item: InfluencerSaleItem) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* ======================================================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ======================================================= */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Punroyal
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
                  Influencer Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Creator & Affiliate Dashboard
              </p>
            </div>
          </div>

          {/* USER INFO & LOGOUT */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-slate-900">
                {user?.name || stats?.user?.name || "Influencer"}
              </span>
              <span className="text-xs text-slate-500">
                {user?.email || stats?.user?.email || ""}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================= */}
      {/* MAIN CONTAINER */}
      {/* ======================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* WELCOME BANNER & DATE RANGE BAR */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-purple-200 backdrop-blur-md mb-3">
                <Sparkles size={13} className="text-purple-300" />
                Performance Overview
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome back, {user?.name || "Influencer"}!
              </h1>
              <p className="text-purple-200 text-sm mt-1 max-w-xl">
                Track your product catalogue, sales performance, revenue, and earned commissions in real time.
              </p>
            </div>

            {/* QUICK STAT SUMMARY BADGE */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4 self-start lg:self-auto">
              <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center text-purple-300">
                <Percent size={24} />
              </div>
              <div>
                <p className="text-xs font-medium text-purple-200 uppercase tracking-wider">
                  Total Commission Earned
                </p>
                <p className="text-xl sm:text-2xl font-black text-white">
                  {formatINR(stats?.totalCommission || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* DATE RANGE FILTER COMPONENT */}
        {/* ======================================================= */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="text-indigo-600" size={20} />
              <h2 className="font-bold text-slate-900 text-base">Date Range Filter</h2>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                (Period: {appliedStartDate} to {appliedEndDate})
              </span>
            </div>

            {/* PRESET CHIPS */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: "this_month", label: "This Month" },
                { id: "last_30_days", label: "Last 30 Days" },
                { id: "last_3_months", label: "Last 3 Months" },
                { id: "all_time", label: "All Time" },
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePreset(preset.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePreset === preset.id
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* DATE PICKERS & ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setActivePreset("custom");
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                To Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setActivePreset("custom");
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2 flex items-end gap-2">
              <button
                onClick={handleApplyFilter}
                className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition shadow-md shadow-purple-600/20 active:scale-[0.98]"
              >
                <Filter size={16} />
                Apply Filter
              </button>
              <button
                onClick={handleResetFilter}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition"
              >
                <RefreshCw size={15} />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* STATS METRIC CARDS */}
        {/* ======================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. TOTAL PRODUCTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Products
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package size={20} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">
                {loading ? "..." : stats?.totalProducts || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              Assigned in your catalogue
            </p>
          </div>

          {/* 2. TOTAL REVENUE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">
                {loading ? "..." : formatINR(stats?.totalRevenue || 0)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Gross sales in period
            </p>
          </div>

          {/* 3. TOTAL SALES (COUNT) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Orders & Sales
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingCart size={20} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">
                {loading ? "..." : (stats?.totalOrders !== undefined ? stats.totalOrders : (stats?.totalSales || 0))}
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">
                ({loading ? "..." : stats?.totalSales || 0} units)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              Completed customer orders
            </p>
          </div>

          {/* 4. TOTAL COMMISSION */}
          <div className="bg-white p-6 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/50 to-white shadow-sm hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Your Commission
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-purple-500/20">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-purple-700">
                {loading ? "..." : formatINR(stats?.totalCommission || 0)}
              </span>
            </div>
            <p className="text-xs text-purple-600 mt-2 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-600 inline-block"></span>
              Earned commission in period
            </p>
          </div>
        </section>

        {/* ======================================================= */}
        {/* SALES DETAILS TABLE */}
        {/* ======================================================= */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* TABLE HEADER */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sales Breakdown & Commission History</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed record of each sale, customer information, and calculated commission.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* SEARCH INPUT */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 w-44 sm:w-60"
                />
              </div>

              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600">
                {totalRecords} Total Sales
              </span>
            </div>
          </div>

          {/* TABLE CONTENT */}
          <div className="overflow-x-auto">
            {salesLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-medium">Loading sales history...</p>
              </div>
            ) : sales.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingCart size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-700">No Sales in Selected Period</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  There are no sales recorded for your products between {appliedStartDate} and {appliedEndDate}.
                  Try selecting a broader date range.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Product Details</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Sale Date</th>
                    <th className="py-3.5 px-6 text-right">Sale Amount</th>
                    <th className="py-3.5 px-6 text-right">Commission</th>
                    <th className="py-3.5 px-6 text-center">Commission Status</th>
                    <th className="py-3.5 px-6 text-center">Order Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* PRODUCT (CLICKABLE LINK) */}
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => handleProductClick(item)}
                          className="flex items-center gap-3 text-left group/btn"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                            {item.product_image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Package size={18} />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover/btn:text-purple-600 group-hover/btn:underline transition-colors flex items-center gap-1">
                              {item.product_name}
                              <ExternalLink size={12} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-xs text-slate-500 block">
                              Order #{item.order_number} • Qty: {item.quantity}
                            </span>
                          </div>
                        </button>
                      </td>

                      {/* CUSTOMER DETAILS */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800 text-xs">
                          {item.customer.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.customer.city || item.customer.phone || item.customer.email || "Verified Buyer"}
                        </div>
                      </td>

                      {/* SALE DATE */}
                      <td className="py-4 px-6">
                        <div className="text-xs font-medium text-slate-700">
                          {item.sale_date ? format(new Date(item.sale_date), "dd MMM yyyy") : "N/A"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.sale_date ? format(new Date(item.sale_date), "hh:mm a") : ""}
                        </div>
                      </td>

                      {/* SALE AMOUNT */}
                      <td className="py-4 px-6 text-right">
                        <span className="font-bold text-slate-900 text-sm">
                          {formatINR(item.sale_amount)}
                        </span>
                        <span className="block text-[11px] text-slate-400">
                          {formatINR(item.unit_price)} × {item.quantity}
                        </span>
                      </td>

                      {/* COMMISSION */}
                      <td className="py-4 px-6 text-right">
                        <div className="font-extrabold text-purple-700 text-sm">
                          {formatINR(item.commission)}
                        </div>
                        <span className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                          item.commission_type === "percentage"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {item.commission_type === "percentage"
                            ? `${item.commission_rate}% Comm`
                            : `₹${item.commission_rate} Flat`}
                        </span>
                      </td>

                      {/* COMMISSION STATUS */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-full border uppercase tracking-wider ${
                          (item.commission_status || "Earned") === "Earned"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                            : (item.commission_status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200/70"
                              : "bg-rose-50 text-rose-700 border-rose-200/70")
                        }`}>
                          {item.commission_status || (item.payment_status === "paid" ? "Earned" : "Pending")}
                        </span>
                      </td>

                      {/* ORDER STATUS */}
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 uppercase tracking-wider">
                          {item.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Page {page} of {totalPages} ({totalRecords} items)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ======================================================= */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ======================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Product & Sale Details"
        type="custom"
      >
        {selectedProduct && (
          <div className="space-y-5">
            {/* PRODUCT HEADER */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {selectedProduct.product_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedProduct.product_image}
                    alt={selectedProduct.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package size={24} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-base truncate">
                  {selectedProduct.product_name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Product ID: {selectedProduct.product_id}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                    {selectedProduct.commission_type === "percentage"
                      ? `${selectedProduct.commission_rate}% Commission Rate`
                      : `₹${selectedProduct.commission_rate} Flat Rate`}
                  </span>
                </div>
              </div>
            </div>

            {/* FINANCIAL BREAKDOWN */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Unit Sale Price</span>
                <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                  {formatINR(selectedProduct.unit_price)}
                </span>
                <span className="text-[11px] text-slate-400">Qty: {selectedProduct.quantity}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-xs font-semibold text-purple-700 block">Earned Commission</span>
                <span className="text-lg font-extrabold text-purple-700 mt-0.5 block">
                  {formatINR(selectedProduct.commission)}
                </span>
                <span className="text-[11px] text-purple-600">
                  {selectedProduct.commission_type === "percentage"
                    ? `(${formatINR(selectedProduct.sale_amount)} × ${selectedProduct.commission_rate}%)`
                    : "Fixed Flat Reward"}
                </span>
              </div>
            </div>

            {/* CUSTOMER & ORDER DETAILS */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Order & Customer Information
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-slate-700">
                  <User size={14} className="text-slate-400" />
                  <span className="font-semibold">{selectedProduct.customer.name}</span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-slate-700">
                  <Clock size={14} className="text-slate-400" />
                  <span>{selectedProduct.sale_date ? format(new Date(selectedProduct.sale_date), "dd MMM yyyy, hh:mm a") : "N/A"}</span>
                </div>

                {selectedProduct.customer.phone && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-slate-700">
                    <Phone size={14} className="text-slate-400" />
                    <span>{selectedProduct.customer.phone}</span>
                  </div>
                )}

                {selectedProduct.customer.city && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-slate-700">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{selectedProduct.customer.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
