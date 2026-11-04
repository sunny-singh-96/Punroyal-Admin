"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Users, ToggleLeft, ToggleRight, Search, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { customersAPI, CustomerItem } from "@/lib/integration/customers";
import PageHeader from "@/components/admin/head/head";

export default function CustomersPage() {
  const [data, setData] = useState<CustomerItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await customersAPI.getAll({ page, limit, search });
      if (res?.code === "OK" || (res as any)?.success) {
        setData(res.data || []);
        setTotalRecords(res.totalRecords || 0);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchCustomers]);

  const handleToggle = async (customer: CustomerItem) => {
    try {
      setTogglingId(customer._id);
      const res: any = await customersAPI.toggleActive(customer._id);
      const newActive = res?.data?.isActive ?? !customer.isActive;
      setData((prev) =>
        prev.map((c) =>
          c._id === customer._id ? { ...c, isActive: newActive } : c
        )
      );
      toast.success(
        `${customer.name || customer.email} is now ${newActive ? "Active" : "Blocked"}`
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update user status");
    } finally {
      setTogglingId(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Customers"
        subtitle={`${totalRecords} Registered Customer${totalRecords !== 1 ? "s" : ""}`}
      />

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        <button
          onClick={fetchCustomers}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4 text-center">Account Status</th>
                <th className="px-6 py-4 text-right">Action / Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 w-6 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-40 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-28 bg-slate-100 rounded" /></td>
                    <td className="px-6 py-4 text-center"><div className="h-6 w-16 bg-slate-100 rounded-full mx-auto" /></td>
                    <td className="px-6 py-4 text-right"><div className="h-8 w-24 bg-slate-100 rounded-lg ml-auto" /></td>
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400">
                    <Users className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-base font-medium text-slate-600">No customers found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria</p>
                  </td>
                </tr>
              ) : (
                data.map((customer, idx) => (
                  <tr key={customer._id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                      {(page - 1) * limit + idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{customer.name || "—"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {customer.createdAt ? format(new Date(customer.createdAt), "dd MMM yyyy, hh:mm a") : "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {customer.isActive !== false ? (
                          <>
                            <ShieldCheck size={13} /> Active
                          </>
                        ) : (
                          <>
                            <ShieldAlert size={13} /> Blocked
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggle(customer)}
                        disabled={togglingId === customer._id}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition shadow-2xs disabled:opacity-50 ${
                          customer.isActive !== false
                            ? "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {customer.isActive !== false ? (
                          <>
                            <ToggleRight size={15} />
                            <span>{togglingId === customer._id ? "Updating..." : "Block User"}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={15} />
                            <span>{togglingId === customer._id ? "Updating..." : "Unblock"}</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Showing {(page - 1) * limit + 1}–{Math.min(page * limit, totalRecords)} of {totalRecords} customers
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-slate-700 font-bold bg-white border border-slate-200 rounded-lg">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
