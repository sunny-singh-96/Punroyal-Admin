"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Edit2, Trash2 } from "lucide-react";
import { confirmDelete, showErrorAlert } from "@/lib/sweetAlert";
import { materialsValidate } from "@/validations/sizes";
import { materialsAPI } from "@/lib/integration/materials";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Modal from "@/components/admin/shared/Modal";
import { MaterialsError } from "@/validations/sizes";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Material = {
  _id: string;
  name: string;
  status: boolean | string;
};

export default function MaterialsPage() {
  const [data, setData] = useState<Material[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // Create Form State
  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });
  const [errors, setErrors] = useState<MaterialsError>({});

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    status: true,
  });
  const [editErrors, setEditErrors] = useState<MaterialsError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchMaterials = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await materialsAPI.getAll(lazyParams);
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
      const msg = getErrorMessage(error);
      showErrorAlert("Cannot Delete Material", msg);
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMaterials();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchMaterials, reload]);

  // ✅ Create material
  const handleSave = async () => {
    if (!materialsValidate(formData.name, setErrors)) return;
    const toastId = toast.loading("Creating...");
    try {
      setActionLoading(true);
      const response: any = await materialsAPI.create({
        name: formData.name.trim(),
        status: formData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setFormData({ name: "", status: true });
        setErrors({});
        setReload(!reload);
        toast.success(`Material created successfully!`, { id: toastId });
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      showErrorAlert("Cannot Update Material", msg);
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const handleOpenEdit = (material: Material) => {
    setEditingMaterial(material);
    setEditFormData({
      name: material.name || "",
      status: material.status === true || material.status === "true",
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  // ✅ Update material
  const handleUpdate = async () => {
    if (!editingMaterial?._id) return;
    if (!materialsValidate(editFormData.name, setEditErrors)) return;
    const toastId = toast.loading("Updating material...");
    try {
      setActionLoading(true);
      const response: any = await materialsAPI.update(editingMaterial._id, {
        name: editFormData.name.trim(),
        status: editFormData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setIsEditModalOpen(false);
        setEditingMaterial(null);
        setReload(!reload);
        toast.success("Material updated successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  
  // Quick status toggle
  const handleToggleStatus = async (material: Material) => {
    const currentActive = material.status === true || material.status === "true";
    const nextStatus = !currentActive;
    setData((prev) =>
      prev.map((item) => (item._id === material._id ? { ...item, status: nextStatus } : item))
    );
    try {
      await materialsAPI.update(material._id, {
        name: material.name,
        status: nextStatus,
      });
      toast.success(`Material ${nextStatus ? "activated" : "deactivated"}`);
      setReload((r) => !r);
    } catch (error) {
      setData((prev) =>
        prev.map((item) => (item._id === material._id ? { ...item, status: currentActive } : item))
      );
      const msg = getErrorMessage(error) || "Failed to update material status";
      showErrorAlert("Cannot Deactivate Material", msg);
    }
  };

  // ✅ Delete material
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this material?");
    if (!isConfirmed) return;
    
    try {
      setLoading(true);
      const response: any = await materialsAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK" || response?.status === 200 || response?.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Material deleted successfully!");
        setReload((r) => !r);
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      showErrorAlert("Cannot Delete Material", msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Sticky */}
      <PageHeader title="Materials" subtitle="Manage Product Materials" />

      {/* Form Card */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible mb-6">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">
              Create Material
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
                      Material Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Cotton, Silk, Georgette, Velvet"
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
                  disabled={actionLoading || loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {actionLoading ? "Creating..." : "Create Material"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DataGrid */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
          <DataGrid<Material>
            headers={[
              {
                key: "name",
                label: "Material Name",
                render: (row: Material) => (
                  <div className="font-semibold text-slate-700">{row.name}</div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Material) => {
                  const isActive = row.status === true || row.status === "true";
                  return (
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(row)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer shadow-xs border ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                      title="Click to toggle Active / Inactive"
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {isActive ? "Active" : "Inactive"}
                    </button>
                  );
                },
              },
              {
                key: "actions",
                label: "Actions",
                render: (row: Material) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(row)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Edit Material"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Delete Material"
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

      {/* Edit Material Modal */}
      <Modal
        isOpen={isEditModalOpen}
        type="custom"
        title="Edit Material"
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMaterial(null);
        }}
      >
        <div className="space-y-4 py-2">
          {/* Material Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Material Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Pure Silk, Organza, Cotton"
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
                setEditingMaterial(null);
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
