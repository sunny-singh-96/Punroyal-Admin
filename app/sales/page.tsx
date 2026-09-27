"use client";

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from "date-fns";
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
  const [startDate, setStartDate] = useState(format(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [appliedStartDate, setAppliedStartDate] = useState(format(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd'));
  const [appliedEndDate, setAppliedEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

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
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [appliedStartDate, appliedEndDate]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSalesData();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchSalesData]);

  const handleClearFilters = () => {
    setStartDate(format(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd'));
    setEndDate(format(new Date(), 'yyyy-MM-dd'));
    setAppliedStartDate(format(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd'));
    setAppliedEndDate(format(new Date(), 'yyyy-MM-dd'));
  };

  const handleApplyDateRange = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      
      <div className="mb-6">
        <PageHeader title="Sales" subtitle="Monthly Sales Statistics" />
      </div>

      {/* Date Range Filter */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">From:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleApplyDateRange}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <DataGrid<MonthlySalesData>
          headers={[
            {
              key: "month",
              label: "Month",
              render: (row: MonthlySalesData) => (
                <div className="font-medium text-gray-900">{row.month}</div>
              ),
            },
            {
              key: "totalSales",
              label: "Total Sales",
              render: (row: MonthlySalesData) => (
                <div className="font-semibold text-indigo-600">
                  ₹{row.totalSales.toLocaleString('en-IN')}
                </div>
              ),
            },
            {
              key: "totalOrders",
              label: "Total Orders",
              render: (row: MonthlySalesData) => (
                <div className="text-gray-700">{row.totalOrders.toLocaleString()}</div>
              ),
            },
            {
              key: "averageOrderValue",
              label: "Average Order Value",
              render: (row: MonthlySalesData) => (
                <div className="text-gray-700">
                  ₹{row.averageOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
              ),
            },
            {
              key: "monthlyGrowth",
              label: "Monthly Growth",
              render: (row: MonthlySalesData) => (
                <div className={`font-medium ${row.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {row.monthlyGrowth >= 0 ? '+' : ''}{row.monthlyGrowth}%
                </div>
              ),
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