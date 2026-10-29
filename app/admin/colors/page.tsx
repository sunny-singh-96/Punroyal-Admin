"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Edit2, Trash2 } from "lucide-react";
import { confirmDelete } from "@/lib/sweetAlert";
import { colorsValidate } from "@/validations/colors";
import { colorsAPI } from "@/lib/integration/colors";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Modal from "@/components/admin/shared/Modal";
import { ColorsError } from "@/validations/colors";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Color = {
  _id: string;
  name: string;
  hex: string;
  status: boolean | string;
};

export default function ColorsPage() {
  const [data, setData] = useState<Color[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // Create Form State
  const [formData, setFormData] = useState({
    name: "",
    hex: "#000000",
    status: true,
  });
  const [errors, setErrors] = useState<ColorsError>({});

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    hex: "#000000",
    status: true,
  });
  const [editErrors, setEditErrors] = useState<ColorsError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchColors = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await colorsAPI.getAll(lazyParams);
      const resData = response?.data?.data || response?.data || response;
      const list = Array.isArray(resData?.data)
        ? resData.data
        : Array.isArray(resData)
        ? resData
        : Array.isArray(response?.data)
        ? response.data
        : [];
      const total = response?.totalRecords || response?.data?.totalRecords || resData?.totalRecords || list.length;
      if (response?.code === "OK" || response?.status === 200 || Array.isArray(list)) {
        setData(list);
        setTotalRecords(total);
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
      setActionLoading(true);
      const response: any = await colorsAPI.create({
        name: formData.name.trim(),
        hex: formData.hex,
        status: formData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setFormData({ name: "", hex: "#000000", status: true });
        setErrors({});
        setReload(!reload);
        toast.success(`Color created successfully!`, { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const handleOpenEdit = (color: Color) => {
    setEditingColor(color);
    setEditFormData({
      name: color.name || "",
      hex: color.hex || "#000000",
      status: color.status === true || color.status === "true",
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  // ✅ Update color
  const handleUpdate = async () => {
    if (!editingColor?._id) return;
    if (!colorsValidate(editFormData.name, editFormData.hex, setEditErrors)) return;
    const toastId = toast.loading("Updating color...");
    try {
      setActionLoading(true);
      const response: any = await colorsAPI.update(editingColor._id, {
        name: editFormData.name.trim(),
        hex: editFormData.hex,
        status: editFormData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setIsEditModalOpen(false);
        setEditingColor(null);
        setReload(!reload);
        toast.success("Color updated successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Delete color
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this color?");
    if (!isConfirmed) return;
    
    try {
      setLoading(true);
      const response: any = await colorsAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK" || response?.status === 200 || response?.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Color deleted successfully!");
        setReload((r) => !r);
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
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible mb-6">
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
                  disabled={actionLoading || loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {actionLoading ? "Creating..." : "Create Color"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DataGrid */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
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
                label: "Color Preview",
                render: (row: Color) => (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-slate-200 shadow-sm"
                      style={{ backgroundColor: row.hex }}
                    ></div>
                    <span className="text-xs font-mono text-slate-600">
                      {row.hex ? row.hex.toUpperCase() : "N/A"}
                    </span>
                  </div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Color) => {
                  const isActive = row.status === true || row.status === "true";
                  return (
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  );
                },
              },
              {
                key: "actions",
                label: "Actions",
                render: (row: Color) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(row)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Edit Color"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Delete Color"
                    >
                      <Trash2 size={13} /> Delete
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
            onSearch={(search) => setLazyParams((p) => ({ ...p, search, page: 1 }))}
          />
        </div>
      </div>

      {/* Edit Color Modal */}
      <Modal
        isOpen={isEditModalOpen}
        type="custom"
        title="Edit Color"
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingColor(null);
        }}
      >
        <div className="space-y-4 py-2">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Color Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Royal Blue"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {editErrors.name && (
              <p className="text-xs text-red-500 mt-1">{editErrors.name}</p>
            )}
          </div>

          {/* Color Picker & Hex */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Color Value (Hex) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={editFormData.hex}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, hex: e.target.value })
                }
                className="w-16 h-16 border border-slate-300 rounded-lg cursor-pointer"
              />
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  placeholder="#000000"
                  value={editFormData.hex}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, hex: e.target.value })
                  }
                  className="w-full px-4 py-2 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-500">
                  Pick using color selector or type hex code
                </span>
              </div>
            </div>
            {editErrors.hex && (
              <p className="text-xs text-red-500 mt-1">{editErrors.hex}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Status
            </label>
            <select
              value={editFormData.status ? "true" : "false"}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  status: e.target.value === "true",
                })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingColor(null);
              }}
              className="px-5 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={actionLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
