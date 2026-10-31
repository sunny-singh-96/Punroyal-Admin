"use client";

import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { format, subMonths, startOfYear } from "date-fns";
import { TrendingUp, ShoppingBag, CreditCard, Calendar, RefreshCw } from "lucide-react";
import DataGrid from '@/components/admin/tables/dataGrid';
import { salesAPI } from '@/lib/integration/sales';
import { getErrorMessage } from '@/lib/helpers/handlers';
import PageHeader from '@/components/admin/head/head';

interface MonthlySalesData {
  month: string;
  totalSales: number;
  averageOrderValue: number;
  totalOrders: number;
  monthlyGrowth: number;
  year: number;
  monthNumber: number;
}

export default function AdminSalesMaster() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MonthlySalesData[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const defaultStart = format(startOfYear(new Date()), 'yyyy-MM-dd');
  const defaultEnd = format(new Date(), 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [appliedStartDate, setAppliedStartDate] = useState(defaultStart);
  const [appliedEndDate, setAppliedEndDate] = useState(defaultEnd);

  const fetchSalesData = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await salesAPI.getMonthlySales({
        startDate: appliedStartDate,
        endDate: appliedEndDate,
      });
      const resData = response?.data?.data || response?.data || response;
      const list = Array.isArray(resData?.data)
        ? resData.data
        : Array.isArray(resData)
        ? resData
        : Array.isArray(response?.data)
        ? response.data
        : [];
      const total = response?.data?.totalRecords || resData?.totalRecords || list.length;
      if (response?.code === "OK" || response?.status === 200 || Array.isArray(list)) {
        setData(list);
        setTotalRecords(total);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to load sales data");
    } finally {
      setLoading(false);
    }
  }, [appliedStartDate, appliedEndDate]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSalesData();
    }, 200);
    return () => clearTimeout(delay);
  }, [fetchSalesData]);

  const handleClearFilters = () => {
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    setAppliedStartDate(defaultStart);
    setAppliedEndDate(defaultEnd);
    toast.success("Filters reset to Year-to-Date");
  };

  const handleApplyDateRange = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both From and To dates");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("From Date cannot be later than To Date");
      return;
    }
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    toast.success("Filtering sales data...");
  };

  const handleQuickPreset = (type: 'this_month' | 'last_3_months' | 'this_year' | 'all_time') => {
    const now = new Date();
    let s = defaultStart;
    let e = format(now, 'yyyy-MM-dd');

    if (type === 'this_month') {
      s = format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd');
    } else if (type === 'last_3_months') {
      s = format(subMonths(now, 2), 'yyyy-MM-01');
    } else if (type === 'this_year') {
      s = format(startOfYear(now), 'yyyy-MM-dd');
    } else if (type === 'all_time') {
      s = '2024-01-01';
    }

    setStartDate(s);
    setEndDate(e);
    setAppliedStartDate(s);
    setAppliedEndDate(e);
    toast.success(`Applied preset: ${type.replace(/_/g, ' ').toUpperCase()}`);
  };

  // Overall Statistics computed from filtered data
  const summary = useMemo(() => {
    const totalRevenue = data.reduce((sum, item) => sum + (Number(item.totalSales) || 0), 0);
    const totalOrders = data.reduce((sum, item) => sum + (Number(item.totalOrders) || 0), 0);
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const activeMonths = data.filter((item) => Number(item.totalSales) > 0).length;

    return { totalRevenue, totalOrders, aov, activeMonths };
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-6">
      
      {/* Page Header */}
      <div>
        <PageHeader title="Sales Analytics" subtitle="Track monthly sales performance, revenue trends, and order statistics" />
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtered Revenue</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{summary.totalRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">{summary.activeMonths} active month(s) with sales</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{summary.totalOrders.toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Confirmed successful orders</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ShoppingBag size={22} />
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Order Value</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{summary.aov.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Revenue per customer order</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CreditCard size={22} />
          </div>
        </div>

        {/* Selected Period */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reporting Period</p>
            <h3 className="text-sm font-bold text-slate-800 mt-1.5">{appliedStartDate}</h3>
            <p className="text-xs text-slate-500 font-medium">to {appliedEndDate}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Date Range Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Inputs */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">From:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/50"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">To:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyDateRange}
                disabled={loading}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition active:scale-95 disabled:opacity-50"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                disabled={loading}
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-xs transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Quick Preset Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick:</span>
            <button
              type="button"
              onClick={() => handleQuickPreset('this_month')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('last_3_months')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              Last 3 Months
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('this_year')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              Year to Date
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('all_time')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              All Time
            </button>
          </div>

        </div>
      </div>

      {/* Sales Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <DataGrid<MonthlySalesData>
          headers={[
            {
              key: "month",
              label: "Month & Year",
              render: (row: MonthlySalesData) => (
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {row.month}
                </div>
              ),
            },
            {
              key: "totalSales",
              label: "Total Sales Revenue",
              render: (row: MonthlySalesData) => (
                <div className="font-bold text-indigo-600 text-sm">
                  ₹{Number(row.totalSales || 0).toLocaleString('en-IN')}
                </div>
              ),
            },
            {
              key: "totalOrders",
              label: "Total Orders",
              render: (row: MonthlySalesData) => (
                <div className="text-slate-800 font-semibold text-sm">
                  {row.totalOrders.toLocaleString('en-IN')} orders
                </div>
              ),
            },
            {
              key: "averageOrderValue",
              label: "Average Order Value",
              render: (row: MonthlySalesData) => (
                <div className="text-slate-700 font-medium text-sm">
                  ₹{Number(row.averageOrderValue || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
              ),
            },
            {
              key: "monthlyGrowth",
              label: "Monthly Growth",
              render: (row: MonthlySalesData) => {
                const growth = Number(row.monthlyGrowth || 0);
                const isPositive = growth >= 0;
                return (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                    isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {isPositive ? '+' : ''}{growth}%
                  </span>
                );
              },
            },
          ]}
          loading={loading}
          rows={data}
          totalRecords={totalRecords}
          page={1}
          pageSize={data.length || 10}
          onPageChange={() => {}}
          searchEnable={false}
        />
      </div>
    </div>
  );
}
