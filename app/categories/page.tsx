"use client";

import { useState, useEffect, useCallback } from "react";
import DataGrid from "@/components/admin/tables/dataGrid";
import PageHeader from "@/components/admin/head/head";
import { categoriesAPI } from "@/lib/integration/categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers"

type Category = {
  _id: string;
  title: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function CategoryLists() {
  const [data, setData] = useState<Category[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("");

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesAPI.getAll(lazyParams);
      if (response?.code === "OK") {
        setData(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  // ✅ Redirect after category
  useEffect(() => {
    if (redirectTo) if (redirectTo) router.push(redirectTo);
  }, [redirectTo, router]);

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
      setLoading(true);
      const response = await categoriesAPI.delete(id);
      if (response?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      await categoriesAPI.updateStatus(id, !currentStatus);
      setData((prev) => prev.map((item) => item._id === id ? { ...item, status: !currentStatus } : item));
      toast.success(`Category ${!currentStatus ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Category" subtitle="Manage Categories" />

      <div className="p-4">
        <DataGrid<Category>
          headers={[
            {
              key: "image",
              label: "Category",
              render: (row: Category) => (
                <div className="flex items-center gap-3">
                  <img
                    src={row.image || "/no-image.png"}
                    alt={row.title || "image"}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                </div>
              ),
            },
            {
              key: "title",
              label: "Title",
              render: (row: Category) => (
                <div className="flex items-center gap-3">
                  <div className="font-bold">{row.title}</div>
                </div>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (row: Category) => (
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      row.status
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {row.status ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(row._id, row.status)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                      row.status
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {row.status ? "Turn Off" : "Turn On"}
                  </button>
                </div>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (row: Category) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRedirectTo(`/categories/edit/${row._id}`);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(row._id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
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
            onClick: () => setRedirectTo("/categories/create"),
          }}
        />
      </div>
    </div>
  );
}
