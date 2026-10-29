"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  Package,
  ArrowUpRight,
  Sliders,
  Eye,
} from "lucide-react";
import { StatsCards } from "@/components/admin/stateCard/stateCard";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { inventoryAPI } from "@/lib/integration/inventory";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { ProductInfoModal, Product } from "@/components/admin/inventory/ProductInfoModal";
import { useSearchParams } from "next/navigation";

export default function InventoryCommandCenter() {
  const searchParams = useSearchParams();
  const searchParam = searchParams?.get('search') || '';

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [stockStatus, setStockStatus] = useState("");

  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParam]);

  const [lazyParams, setLazyParams] = useState({
    page: 1,
    limit: 10,
  });

  const [data, setData] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalStockValue: 0
  });

  // FETCH INVENTORY
  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await inventoryAPI.getAll({
        ...lazyParams,
        search: searchTerm,
        inventory_stock: stockStatus,
      });
      const resData = response?.data || response;
      if (response?.code === "OK" || response?.status === 200 || Array.isArray(resData)) {
        const items = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(resData)
          ? resData
          : [];
        setData(items);
        setTotalRecords(response?.totalRecords ?? response?.data?.totalRecords ?? items.length);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [lazyParams, searchTerm, stockStatus]);

  const fetchInventoryStats = useCallback(async () => {
    try {
      const response: any = await inventoryAPI.getInventoryStats();
      const resData = response?.data || response;
      if (response?.code === "OK" || resData?.totalProducts !== undefined) {
        setStats(
          resData?.totalProducts !== undefined
            ? resData
            : {
                totalProducts: 0,
                lowStock: 0,
                outOfStock: 0,
                totalStockValue: 0,
              }
        );
      }
    } catch (error) {
      console.error("fetchInventoryStats error:", error);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchInventory();
      fetchInventoryStats();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchInventory, fetchInventoryStats]);

  const statsCards = [
    {
      label: "Total Products",
      value: String(stats.totalProducts),
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Low Stock",
      value: String(stats.lowStock),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Out of Stock",
      value: String(stats.outOfStock),
      icon: CheckCircle2,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Total Stock Value",
      value: `₹${stats.totalStockValue || 0}`,
      icon: ArrowUpRight,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <PageHeader
          title="Inventory Management"
          subtitle="Manage E-Commerce Inventory & Variant Stocks"
        />
      </div>

      {/* Stats */}
      <StatsCards items={statsCards} />

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* SEARCH */}
          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by product..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* STOCK FILTER */}
          <select
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="low">Low Stock (≤ 5 units)</option>
            <option value="out">Out of Stock (0 units)</option>
            <option value="in">In Stock (&gt; 5 units)</option>
          </select>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="p-4">
        <DataGrid<Product>
          headers={[
            {
              key: "title",
              label: "Product",
              render: (row) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">
                    {row.title}
                  </span>
                  <span className="text-xs text-slate-400">
                    {row?.category?.title || "Uncategorized"}
                  </span>
                </div>
              ),
            },
            {
              key: "display_price",
              label: "Price",
              render: (row) => (
                <span className="font-semibold text-slate-700">
                  ₹{row.display_price}
                </span>
              ),
            },
            {
              key: "product_type",
              label: "Type",
              render: (row) => (
                <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full">
                  {row.product_type === "sizes" ? "Variants" : "Simple"}
                </span>
              ),
            },
            {
              key: "totalStock",
              label: "Stock",
              render: (row) => {
                let color = "bg-green-100 text-green-700";
                let label = "In Stock";

                if (row.totalStock === 0) {
                  color = "bg-red-100 text-red-700";
                  label = "Out of Stock";
                } else if (row.totalStock <= 5) {
                  color = "bg-amber-100 text-amber-700";
                  label = "Low Stock";
                }

                return (
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${color}`}>
                    {label} ({row.totalStock})
                  </span>
                );
              },
            },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    row.status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {row.status ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              key: "createdAt",
              label: "Created",
              render: (row) => (
                <span className="text-xs text-slate-500">
                  {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
                </span>
              ),
            },
            {
              key: "action",
              label: "Actions",
              render: (row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(row);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                    title="Manage stock & variants"
                  >
                    <Sliders size={13} />
                    <span>Manage Stock</span>
                  </button>
                </div>
              ),
            },
          ]}
          loading={loading}
          rows={data}
          totalRecords={totalRecords}
          page={lazyParams.page}
          pageSize={lazyParams.limit}
          onPageChange={(page) => setLazyParams((p) => ({ ...p, page }))}
          searchEnable={false}
        />
      </div>

      <ProductInfoModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(updated) => {
          setData((prev) =>
            prev.map((item) =>
              item._id === updated._id
                ? {
                    ...item,
                    ...updated,
                    totalStock: updated.totalStock,
                    status: updated.status,
                    variants: updated.variants,
                  }
                : item
            )
          );
          fetchInventoryStats();
        }}
      />
    </div>
  );
}
