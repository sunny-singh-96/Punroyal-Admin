"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Percent,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  SlidersHorizontal,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import toast from "react-hot-toast";
import Image from "next/image";
import { storageUtils } from "@/lib/storage";
import { influencerAPI, InfluencerSaleItem } from "@/lib/integration/influencer";
import { getErrorMessage } from "@/lib/helpers/handlers";
import Modal from "@/components/admin/shared/Modal";

interface SalesSummary {
  totalSalesCount?: number;
  totalUnitsSold?: number;
  totalRevenue?: number;
  totalCommission?: number;
  batchRevenue?: number;
  batchCommission?: number;
}

export default function InfluencerSalesPage() {
  // Date Filter State
  const defaultStart = "";
  const defaultEnd = "";

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [appliedStartDate, setAppliedStartDate] = useState(defaultStart);
  const [appliedEndDate, setAppliedEndDate] = useState(defaultEnd);
  const [activePreset, setActivePreset] = useState<string>("all_time");

  // Data & Pagination State
  const [sales, setSales] = useState<InfluencerSaleItem[]>([]);
  const [summary, setSummary] = useState<SalesSummary>({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modal State
  const [selectedSale, setSelectedSale] = useState<InfluencerSaleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Currency Formatter
  const formatINR = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num || 0);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setPage(1); // Reset to page 1 on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Sales from Backend API
  const fetchSales = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit,
      };

      if (appliedStartDate) params.startDate = appliedStartDate;
      if (appliedEndDate) params.endDate = appliedEndDate;
      if (debouncedSearch) params.search = debouncedSearch;

      const response: any = await influencerAPI.getSales(params);
      const resData = response?.data || response;

      if (response?.code === "OK" || resData?.code === "OK" || Array.isArray(resData)) {
        const rawSales: InfluencerSaleItem[] =
          (Array.isArray(response?.data) ? response.data : null) ||
          (Array.isArray(resData?.data) ? resData.data : null) ||
          (Array.isArray(resData) ? resData : null) ||
          resData?.sales ||
          [];

        setSales(rawSales);

        const total =
          response?.totalRecords ??
          resData?.totalRecords ??
          rawSales.length;
        setTotalRecords(total);

        const sumObj = response?.summary || resData?.summary || {};
        setSummary(sumObj);
      } else {
        toast.error(response?.message || resData?.message || "Failed to load sales data");
        setSales([]);
        setTotalRecords(0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      setSales([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, appliedStartDate, appliedEndDate, debouncedSearch]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Date Preset Handlers
  const handlePresetChange = (preset: string) => {
    setActivePreset(preset);
    const today = new Date();

    switch (preset) {
      case "today": {
        const d = format(today, "yyyy-MM-dd");
        setStartDate(d);
        setEndDate(d);
        setAppliedStartDate(d);
        setAppliedEndDate(d);
        break;
      }
      case "last_7_days": {
        const start = format(subDays(today, 6), "yyyy-MM-dd");
        const end = format(today, "yyyy-MM-dd");
        setStartDate(start);
        setEndDate(end);
        setAppliedStartDate(start);
        setAppliedEndDate(end);
        break;
      }
      case "this_month": {
        const start = format(startOfMonth(today), "yyyy-MM-dd");
        const end = format(today, "yyyy-MM-dd");
        setStartDate(start);
        setEndDate(end);
        setAppliedStartDate(start);
        setAppliedEndDate(end);
        break;
      }
      case "last_month": {
        const prevMonth = subMonths(today, 1);
        const start = format(startOfMonth(prevMonth), "yyyy-MM-dd");
        const end = format(endOfMonth(prevMonth), "yyyy-MM-dd");
        setStartDate(start);
        setEndDate(end);
        setAppliedStartDate(start);
        setAppliedEndDate(end);
        break;
      }
      case "all_time":
      default: {
        setStartDate("");
        setEndDate("");
        setAppliedStartDate("");
        setAppliedEndDate("");
        break;
      }
    }
    setPage(1);
  };

  const handleApplyCustomDates = () => {
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }
    setActivePreset("custom");
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setPage(1);
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setActivePreset("all_time");
    setSearchQuery("");
    setDebouncedSearch("");
    setPage(1);
  };

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <ShoppingCart className="w-7 h-7 text-blue-600" />
            Sales & Commissions
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Track all sales generated from your assigned products and monitor earned commissions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchSales()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>


          {/* Filters Bar: Search & Date Range */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by Order #, product name, or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Date Presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {[
                  { id: "all_time", label: "All Time" },
                  { id: "this_month", label: "This Month" },
                  { id: "last_month", label: "Last Month" },
                  { id: "last_7_days", label: "Last 7 Days" },
                  { id: "today", label: "Today" },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${activePreset === preset.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                      }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Pickers */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Calendar size={14} className="text-indigo-600" />
                <span>Custom Range:</span>
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-indigo-600"
              />
              <span className="text-xs text-slate-400 font-bold">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-indigo-600"
              />
              <button
                onClick={handleApplyCustomDates}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition"
              >
                Apply
              </button>
              {(appliedStartDate || appliedEndDate || debouncedSearch) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Sales Table Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-900">Sales Transactions</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {sales.length} of {totalRecords} total transactions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Rows per page:</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Table or Empty State */}
            {loading ? (
              <div className="p-16 text-center">
                <RefreshCw size={36} className="animate-spin text-indigo-600 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-600">Loading sales data...</p>
              </div>
            ) : sales.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={32} />
                </div>
                <h4 className="text-base font-bold text-slate-800">No Sales Records Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  {debouncedSearch || appliedStartDate || appliedEndDate
                    ? "No sales match your current search or date filters. Try adjusting them."
                    : "No sales have been attributed to your assigned products yet."}
                </p>
                {(debouncedSearch || appliedStartDate || appliedEndDate) && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Order #</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4 text-center">Qty</th>
                      <th className="py-3.5 px-4 text-right">Sale Amount</th>
                      <th className="py-3.5 px-4">Commission Rate</th>
                      <th className="py-3.5 px-4 text-right">Commission Earned</th>
                      <th className="py-3.5 px-4 text-center">Commission Status</th>
                      <th className="py-3.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {sales.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Order Number */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-indigo-600 hover:underline cursor-pointer"
                            onClick={() => {
                              setSelectedSale(item);
                              setIsModalOpen(true);
                            }}
                          >
                            {item.order_number}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                          {item.sale_date ? format(new Date(item.sale_date), "dd MMM yyyy, hh:mm a") : "—"}
                        </td>

                        {/* Product */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3 min-w-[200px] max-w-[280px]">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                              {item.product_image ? (
                                <Image
                                  src={item.product_image}
                                  alt={item.product_name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                  <Package size={18} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate" title={item.product_name}>
                                {item.product_name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                Unit: {formatINR(item.unit_price || 0)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-3.5 px-4 text-center font-bold">
                          {item.quantity}
                        </td>

                        {/* Sale Amount */}
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                          {formatINR(item.sale_amount || (item.unit_price * item.quantity))}
                        </td>

                        {/* Commission Rate */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            {item.commission_type === "flat"
                              ? `₹${item.commission_rate || 0} Flat`
                              : `${item.commission_rate || 0}%`}
                          </span>
                        </td>

                        {/* Commission Earned */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <span className="font-black text-emerald-600 text-sm">
                            {formatINR(item.commission || 0)}
                          </span>
                        </td>

                        {/* Commission Status */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${item.commission_status === "Earned"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : item.commission_status === "Cancelled"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                          >
                            {item.commission_status === "Earned" && <CheckCircle2 size={12} />}
                            {item.commission_status === "Cancelled" && <AlertCircle size={12} />}
                            {item.commission_status === "Pending" && <Clock size={12} />}
                            <span>{item.commission_status || "Earned"}</span>
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedSale(item);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="View Order Details"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalRecords > 0 && (
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
                <div className="text-xs text-slate-500">
                  Showing <span className="font-bold">{(page - 1) * limit + 1}</span> to{" "}
                  <span className="font-bold">{Math.min(page * limit, totalRecords)}</span> of{" "}
                  <span className="font-bold">{totalRecords}</span> entries
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page <= 1}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    title="Previous Page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg">
                    Page {page} of {totalPages}
                  </div>

                  <button
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={page >= totalPages}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    title="Next Page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedSale && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Order Details: ${selectedSale.order_number}`}
          type="custom"
        >
          <div className="space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap gap-2 items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order Number</span>
                <p className="text-base font-black text-slate-900">{selectedSale.order_number}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                  Status: {selectedSale.order_status || "Processing"}
                </span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200">
                  Payment: {selectedSale.payment_status || "Paid"}
                </span>
              </div>
            </div>

            {/* Product & Commission Breakdown */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Product & Commission</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                  {selectedSale.product_image ? (
                    <Image
                      src={selectedSale.product_image}
                      alt={selectedSale.product_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Package size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-slate-900 text-sm truncate">{selectedSale.product_name}</h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Unit Price: {formatINR(selectedSale.unit_price)} × {selectedSale.quantity} unit(s)
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    Total Sale: {formatINR(selectedSale.sale_amount)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Commission Type:</span>
                  <p className="font-bold text-slate-800 uppercase">{selectedSale.commission_type}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Commission Rate:</span>
                  <p className="font-bold text-slate-800">
                    {selectedSale.commission_type === "flat"
                      ? `₹${selectedSale.commission_rate} Flat`
                      : `${selectedSale.commission_rate}%`}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Commission Earned:</span>
                  <p className="font-black text-emerald-600 text-sm">{formatINR(selectedSale.commission)}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Customer Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-slate-400" />
                  <span className="font-bold text-slate-800">{selectedSale.customer?.name || "Customer"}</span>
                </div>
                {selectedSale.customer?.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-slate-600">{selectedSale.customer.email}</span>
                  </div>
                )}
                {selectedSale.customer?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    <span className="text-slate-600">{selectedSale.customer.phone}</span>
                  </div>
                )}
                {(selectedSale.customer?.city || selectedSale.customer?.state) && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-slate-600">
                      {[selectedSale.customer?.city, selectedSale.customer?.state].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
