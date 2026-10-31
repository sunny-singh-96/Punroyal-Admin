"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataGrid from "@/components/admin/tables/dataGrid";
import PageHeader from "@/components/admin/head/head";
import { categoriesAPI } from "@/lib/integration/categories";
import { ArrowUp, ArrowDown, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete, showErrorAlert } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Category = {
  _id: string;
  title: string;
  image: string;
  status: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

export default function CategoryLists() {
  const router = useRouter();
  const [data, setData] = useState<Category[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesAPI.getAll(lazyParams);
      if (response?.code === "OK") {
        setData(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchCategories();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchCategories]);

  const handleSearch = useCallback((search: string) => {
    setLazyParams((p) => ({ ...p, search, page: 1 }));
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this category?");
    if (!isConfirmed) return;

    try {
      const response = await categoriesAPI.delete(id);
      if (response?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      const msg = getErrorMessage(error) || "Failed to delete category";
      showErrorAlert("Cannot Delete Category", msg);
    }
  }, []);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    // Optimistic UI update
    setData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: nextStatus } : item))
    );
    setTogglingId(id);

    try {
      await categoriesAPI.updateStatus(id, nextStatus);
      toast.success(`Category ${nextStatus ? "activated (Live)" : "deactivated (Hidden)"}`);
      fetchCategories();
    } catch (error) {
      // Rollback on failure
      setData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: currentStatus } : item))
      );
      const msg = getErrorMessage(error) || "Failed to update category status";
      showErrorAlert("Cannot Deactivate Category", msg);
    } finally {
      setTogglingId(null);
    }
  }, [fetchCategories]);

  const handleMove = useCallback(async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[targetIndex];
    newData[targetIndex] = temp;

    const baseOrder = (lazyParams.page - 1) * lazyParams.limit;
    const reorderPayload = newData.map((cat, idx) => ({
      id: cat._id,
      order: baseOrder + idx + 1,
    }));

    const updatedData = newData.map((cat, idx) => ({
      ...cat,
      order: baseOrder + idx + 1,
    }));
    setData(updatedData);

    try {
      await categoriesAPI.reorder(reorderPayload);
      toast.success("Category order updated");
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update category order");
      fetchCategories();
    }
  }, [data, lazyParams, fetchCategories]);

  const handleUpdateOrderNumber = useCallback(async (id: string, newOrder: number) => {
    try {
      await categoriesAPI.updateOrder(id, newOrder);
      setData((prev) =>
        prev.map((c) => (c._id === id ? { ...c, order: newOrder } : c))
      );
      toast.success("Category order saved");
      fetchCategories();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update order");
    }
  }, [fetchCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Category" subtitle="Manage Categories (Active categories appear on store navigation & filters)" />

      <div className="p-4 md:p-6">
        <DataGrid<Category>
          headers={[
            {
              key: "order",
              label: "Display Order",
              render: (row: Category) => {
                const currentIndex = data.findIndex((c) => c._id === row._id);
                return (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(currentIndex, 'up')}
                        disabled={currentIndex === 0}
                        title="Move Up"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(currentIndex, 'down')}
                        disabled={currentIndex === data.length - 1}
                        title="Move Down"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                    <input
                      type="number"
                      defaultValue={row.order ?? currentIndex + 1}
                      key={`${row._id}-${row.order ?? currentIndex + 1}`}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val !== row.order) {
                          handleUpdateOrderNumber(row._id, val);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = parseInt((e.target as HTMLInputElement).value, 10);
                          if (!isNaN(val) && val !== row.order) {
                            handleUpdateOrderNumber(row._id, val);
                          }
                        }
                      }}
                      className="w-14 px-2 py-1 text-xs text-center border border-slate-300 rounded-md font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      title="Enter order number and press Enter or blur to save"
                    />
                  </div>
                );
              },
            },
            {
              key: "image",
              label: "Category",
              render: (row: Category) => (
                <div className="flex items-center gap-3">
                  {row.image ? (
                    <img
                      src={encodeURI(decodeURI(row.image))}
                      alt={row.title || "image"}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover w-14 h-14 border border-slate-200 bg-slate-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px] font-semibold">
                      No Image
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-slate-800 block text-sm">{row.title}</span>
                  </div>
                </div>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (row: Category) => (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={togglingId === row._id}
                    onClick={() => handleToggleStatus(row._id, row.status)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                      row.status ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                    title={row.status ? "Click to deactivate" : "Click to activate"}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                        row.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      row.status
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    {row.status ? "Active" : "Inactive"}
                  </span>
                </div>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (row: Category) => (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/categories/edit/${row._id}`}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Category"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(row._id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
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
          searchEnable={true}
          onSearch={handleSearch}
          rightContent={{
            text: "+ Create Category",
            onClick: () => router.push("/categories/create"),
          }}
        />
      </div>
    </div>
  );
}
