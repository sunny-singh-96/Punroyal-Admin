"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { occasionsValidate } from "@/validations/occasion";
import { categoriesAPI } from "@/lib/integration/categories";
import AsyncSelect from "@/components/admin/select/select";
import { occasionsAPI } from "@/lib/integration/occasions";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Image from "next/image";
import { OccasionsError } from "@/types/types";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Occasion = {
  _id: string;
  cat_id: {
    image: string;
    title: string;
  };
  status: boolean;
};

export default function OccasionPage() {
  const [data, setData] = useState<Occasion[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    cat_id: "",
    status: true,
  });

  const [errors, setErrors] = useState<OccasionsError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchOccasions = useCallback(async () => {
    try {
      const response = await occasionsAPI.getAll(lazyParams);
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

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchOccasions();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchOccasions, reload]);

  // ✅ Create occasion
  const handleSave = async () => {
    if (!occasionsValidate(formData.cat_id, setErrors)) return;
    const toastId = toast.loading("Creating...");
    try {
      setLoading(true);
      const response = await occasionsAPI.create(formData);
      if (response?.data?.code === "OK") {
        setFormData({ cat_id: "", status: true });
        // const newOccasion = response.data.data;
        // setData((prev) => [newOccasion, ...prev]);
        setReload(true);
        toast.success(`Occasion created successfully!`, { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete occasion
  const handleDelete = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await occasionsAPI.delete(id);
      const isConfirmed = await confirmDelete("Delete this occasion?");
      if (!isConfirmed) return;
      if (response?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Sticky */}
      <PageHeader title="Occasion" subtitle="Manage E-Commerce Occasions" />

      {/* Form Card */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">
              Create Occasions
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-12 flex justify-center">
                {/* RIGHT SIDE - FORM */}
                <div className="w-full max-w-xl space-y-2">
                  {/* TITLE */}
                  <AsyncSelect
                    value={formData.cat_id}
                    onChange={(val) =>
                      setFormData({ ...formData, cat_id: val })
                    }
                    placeholder="Select Category"
                    limit={10}
                    fetchOptions={({ page, limit, search }) =>
                      categoriesAPI.getAll({ page, limit, search })
                    }
                    mapOption={(item) => ({
                      label: item.title,
                      value: item._id,
                    })}
                  />
                  {errors.cat_id && (
                    <p className="text-xs text-red-500 mt-1">{errors.cat_id}</p>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Occasion"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataGrid<Occasion>
            headers={[
              {
                key: "image",
                label: "Category",
                render: (row: Occasion) => (
                  <div className="flex items-center gap-3">
                    <Image
                      src={row?.cat_id?.image || "/no-image.png"}
                      alt={row?.cat_id?.title || "image"}
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
                render: (row: Occasion) => (
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{row?.cat_id?.title}</div>
                  </div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Occasion) => (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                key: "actions",
                label: "Actions",
                render: (row: Occasion) => (
                  <div className="flex items-center gap-2">
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
            searchEnable={false}
          />
        </div>
      </div>
    </div>
  );
}
