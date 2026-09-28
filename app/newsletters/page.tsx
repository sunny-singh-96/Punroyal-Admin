"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Users,
  UserCheck,
  UserMinus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import DataGrid, { Header } from "@/components/admin/tables/dataGrid";
import PageHeader from "@/components/admin/head/head";
import { StatsCards } from "@/components/admin/stateCard/stateCard";
import {
  newsletterAPI,
  NewsletterSubscriber,
  NewsletterStats,
  NewsletterLazyParams,
} from "@/lib/integration/newsletter";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

export default function NewslettersPage() {
  const [data, setData] = useState<NewsletterSubscriber[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<NewsletterStats>({
    total: 0,
    subscribed: 0,
    unsubscribed: 0,
  });

  const [lazyParams, setLazyParams] = useState<NewsletterLazyParams>({
    page: 1,
    limit: 20,
    search: "",
    status: "all",
  });

  const [statusFilter, setStatusFilter] = useState("all");

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await newsletterAPI.getStats();
      if (res?.code === "OK" && res.data) {
        setStats(res.data);
      }
    } catch {
      // Silently fail — stats are non-critical
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchData = useCallback(
    async (params: NewsletterLazyParams) => {
      setLoading(true);
      try {
        const res = await newsletterAPI.getAll(params);
        if (res?.code === "OK") {
          setData(res.data || []);
          setTotalRecords(res.totalRecords || 0);
        }
      } catch (err) {
        toast.error(getErrorMessage(err) || "Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchData(lazyParams);
  }, [lazyParams, fetchData]);

  const handleSearch = useCallback((search: string) => {
    setLazyParams((prev) => {
      if (prev.search === search) return prev;
      return { ...prev, page: 1, search };
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setLazyParams((prev) => {
      if (prev.page === page) return prev;
      return { ...prev, page };
    });
  }, []);

  const handleStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
    setLazyParams((prev) => ({ ...prev, page: 1, status }));
  }, []);

  const formatDateSafe = (dateStr?: string, pattern = "dd MMM yyyy, hh:mm a") => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "—";
      return format(d, pattern);
    } catch {
      return "—";
    }
  };

  const handleDelete = async (subscriber: NewsletterSubscriber) => {
    const confirmed = await confirmDelete(`Remove ${subscriber.email} from the newsletter list?`);
    if (!confirmed) return;
    try {
      await newsletterAPI.delete(subscriber._id);
      fetchData(lazyParams);
      fetchStats();
    } catch (err) {
      toast.error(getErrorMessage(err) || "Failed to delete subscriber");
    }
  };

  const handleToggleStatus = async (subscriber: NewsletterSubscriber) => {
    try {
      const res = await newsletterAPI.toggleStatus(subscriber._id);
      if (res?.code === "OK") {
        const newStatus = res.data?.subscriber?.status;
        toast.success(`Status changed to ${newStatus}`);
        fetchData(lazyParams);
        fetchStats();
      }
    } catch (err) {
      toast.error(getErrorMessage(err) || "Failed to update status");
    }
  };

  const handleExportCSV = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = ["Email", "Status", "Subscribed On"];
    const rows = data.map((s) => [
      s.email,
      s.status,
      formatDateSafe(s.createdAt, "dd MMM yyyy"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
    subscribed: {
      label: "Subscribed",
      bg: "bg-emerald-50",
      color: "text-emerald-700",
      border: "border-emerald-200",
    },
    unsubscribed: {
      label: "Unsubscribed",
      bg: "bg-slate-100",
      color: "text-slate-600",
      border: "border-slate-200",
    },
  };

  const headers: Header<NewsletterSubscriber>[] = [
    {
      key: "email",
      label: "Email Address",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Mail size={14} className="text-blue-600" />
          </div>
          <span className="font-medium text-slate-800 text-sm">{row.email}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const cfg = STATUS_CONFIG[row.status] || STATUS_CONFIG.unsubscribed;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color} ${cfg.border}`}
          >
            {cfg.label}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Subscribed On",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-slate-500">
          {formatDateSafe(row.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleStatus(row)}
            title={row.status === "subscribed" ? "Unsubscribe" : "Re-subscribe"}
            className={`p-1.5 rounded-lg transition-colors ${
              row.status === "subscribed"
                ? "text-amber-600 hover:bg-amber-50"
                : "text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            {row.status === "subscribed" ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </button>
          <button
            onClick={() => handleDelete(row)}
            title="Delete subscriber"
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const statsCards = [
    {
      icon: Users,
      label: "Total Subscribers",
      value: statsLoading ? "—" : stats.total,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: UserCheck,
      label: "Active Subscriptions",
      value: statsLoading ? "—" : stats.subscribed,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: UserMinus,
      label: "Unsubscribed",
      value: statsLoading ? "—" : stats.unsubscribed,
      color: "text-slate-500",
      bg: "bg-slate-100",
    },
  ];

  const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Subscribed", value: "subscribed" },
    { label: "Unsubscribed", value: "unsubscribed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Newsletter Subscribers"
        subtitle="Manage and view all newsletter subscriptions"
        rightContent={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchData(lazyParams);
                fetchStats();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition text-sm font-medium shadow-sm"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold shadow-sm"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        }
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <StatsCards items={statsCards} />

        {/* Status Filter */}
        <div className="flex items-center gap-2 mb-4 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm w-fit">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleStatusFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                statusFilter === f.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Data Grid */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <DataGrid<NewsletterSubscriber>
            headers={headers}
            rows={data}
            totalRecords={totalRecords}
            page={lazyParams.page}
            pageSize={lazyParams.limit}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            loading={loading}
            searchEnable={true}
          />
        </div>
      </div>
    </div>
  );
}
