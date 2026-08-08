"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { StatsCards } from "@/components/admin/stateCard/stateCard";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { inventoryAPI } from "@/lib/integration/inventory"; // ✅ your API
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { ProductInfoModal } from "@/components/admin/inventory/ProductInfoModal";
interface Product {
  _id: string;
  title: string;
  display_price: number;
  price: number;
  totalStock: number;
  product_type: string;
  status: boolean;
  model?: { name: string };
  materials?: { name: string }[];
  createdAt: string;
  category?: { title: string };
  colors?: {
    _id: string;
    color_name: string;
    color_hex: string;
  }[];
  variants?: {
    _id: string;
    stock: number;
    size?: { name: string };
    color?: { name: string };
  }[];
}

export default function InventoryCommandCenter() {
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [stockStatus, setStockStatus] = useState("");

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

  // ✅ FETCH INVENTORY
  const fetchInventory = useCallback(async () => {
    try {
      const response = await inventoryAPI.getAll({
        ...lazyParams,
        search: searchTerm,
        inventory_stock: stockStatus,
      });
      if (response?.code === "OK") {
        setData(response?.data || []);
        setTotalRecords(response?.totalRecords || 0);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [lazyParams, searchTerm, stockStatus]);

  const fetchInventoryStats = useCallback(async () => {
    try {
      const response = await inventoryAPI.getInventoryStats();
      if (response?.code === "OK") {
        setStats(
          response?.data || {
            totalProducts: 0,
            lowStock: 0,
            outOfStock: 0,
            totalStockValue: 0
          },
        );
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
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
          subtitle="Manage E-Commerce Inventory"
        />
      </div>

      {/* Stats */}
      <StatsCards items={statsCards} />

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* ✅ FIXED TOOLBAR (SEARCH LEFT, FILTER RIGHT) */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* LEFT - SEARCH */}
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

          {/* RIGHT - STOCK FILTER */}
          <select
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
            <option value="in">In Stock</option>
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
                  <span className="font-medium text-slate-800">
                    {row.title}
                  </span>
                  <span className="text-xs text-slate-400">
                    {row?.category?.title}
                  </span>
                </div>
              ),
            },
            {
              key: "display_price",
              label: "Price",
              render: (row) => (
                <span className="font-medium text-slate-700">
                  ₹{row.display_price}
                </span>
              ),
            },
            {
              key: "product_type",
              label: "Type",
              render: (row) => (
                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
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
                  label = "Out";
                } else if (row.totalStock <= 5) {
                  color = "bg-yellow-100 text-yellow-700";
                  label = "Low";
                }

                return (
                  <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
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
                  className={`px-2 py-1 text-xs rounded-full ${
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
                <span className="text-sm text-slate-500">
                  {new Date(row.createdAt).toLocaleDateString()}
                </span>
              ),
            },
            {
              key: "action",
              label: "Action",
              render: (row) => (
                <button
                  onClick={() => {
                    setSelectedProduct(row);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"
                >
                  View
                </button>
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
      />
    </div>
  );
}
