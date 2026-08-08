"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { modelsValidate } from "@/validations/models";
import { modelsAPI } from "@/lib/integration/models";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { ModelsError } from "@/validations/models";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Influencers = {
  _id: string;
  name: string;
  status: boolean;
};

export default function ModelsPage() {
  const [data, setData] = useState<Influencers[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  const [errors, setErrors] = useState<ModelsError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchModels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await modelsAPI.getAll(lazyParams);
      if (response?.code === "OK" || response?.data) {
        setData(response.data?.data || []);
        setTotalRecords(response.data?.data?.length || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchModels();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchModels, reload]);

  // ✅ Create influencer
  const handleSave = async () => {
    if (!modelsValidate(formData.name, setErrors)) return;
    const toastId = toast.loading("Creating...");
    try {
      setLoading(true);
      const response = await modelsAPI.create({
        name: formData.name,
      });
      if (response?.data?.code === "OK" || response?.code === "OK") {
        setFormData({ name: "", status: true });
        setReload(!reload);
        toast.success(`Influencer created successfully!`, { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Influncers
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this influencer?");
    if (!isConfirmed) return;
    
    try {
      setLoading(true);
      const response = await modelsAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Influencer deleted successfully!");
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
      <PageHeader title="Influencers" subtitle="Manage Product Influencers" />

      {/* Form Card */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">
              Create Influencer
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-12 flex justify-center">
                {/* FORM */}
                <div className="w-full max-w-xl space-y-4">
                  {/* NAME INPUT */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Influencer Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Influencer A, Influencer B"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Influencer"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataGrid<Influencers>
            headers={[
              {
                key: "name",
                label: "Name",
                render: (row: Influencers) => (
                  <div className="font-semibold text-slate-700">{row.name}</div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Influencers) => (
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
                render: (row: Influencers) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
