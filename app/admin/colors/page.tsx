"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { colorsValidate } from "@/validations/colors";
import { colorsAPI } from "@/lib/integration/colors";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { ColorsError } from "@/validations/colors";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Color = {
  _id: string;
  name: string;
  hex: string;
  status: boolean;
};

export default function ColorsPage() {
  const [data, setData] = useState<Color[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    hex: "#000000",
    status: true,
  });

  const [errors, setErrors] = useState<ColorsError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchColors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await colorsAPI.getAll(lazyParams);
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
      fetchColors();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchColors, reload]);

  // ✅ Create color
  const handleSave = async () => {
    if (!colorsValidate(formData.name, formData.hex, setErrors)) return;
    const toastId = toast.loading("Creating...");
    try {
      console.log(`formData===`,formData)
      setLoading(true);
      const response = await colorsAPI.create({
        name: formData.name,
        hex: formData.hex,
      });
      if (response?.data?.code === "OK" || response?.code === "OK") {
        setFormData({ name: "", hex: "#000000", status: true });
        setReload(!reload);
        toast.success(`Color created successfully!`, { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete color
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this color?");
    if (!isConfirmed) return;
    
    try {
      setLoading(true);
      const response = await colorsAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Color deleted successfully!");
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
      <PageHeader title="Colors" subtitle="Manage Product Colors" />

      {/* Form Card */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">
              Create Color
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
                      Color Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Red, Blue, Green"
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

                  {/* COLOR PICKER */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Select Color
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.hex}
                        onChange={(e) =>
                          setFormData({ ...formData, hex: e.target.value })
                        }
                        className="w-16 h-16 border border-slate-300 rounded-lg cursor-pointer"
                      />
                      <div className="flex flex-col gap-1">
                        <div
                          className="w-20 h-20 rounded-lg border-2 border-slate-200"
                          style={{ backgroundColor: formData.hex }}
                        ></div>
                        <span className="text-xs text-slate-600 font-mono">
                          {formData.hex.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {errors.hex && (
                      <p className="text-xs text-red-500 mt-1">{errors.hex}</p>
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
                  {loading ? "Creating..." : "Create Color"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataGrid<Color>
            headers={[
              {
                key: "name",
                label: "Name",
                render: (row: Color) => (
                  <div className="font-semibold text-slate-700">{row.name}</div>
                ),
              },
              {
                key: "color",
                label: "Color",
                render: (row: Color) => (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-slate-200"
                      style={{ backgroundColor: row.hex }}
                    ></div>
                    <span className="text-xs font-mono text-slate-600">
                      {row.name}
                    </span>
                  </div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Color) => (
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
                render: (row: Color) => (
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
