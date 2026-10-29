"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Edit2, Trash2 } from "lucide-react";
import { confirmDelete } from "@/lib/sweetAlert";
import { sizesValidate } from "@/validations/materials";
import { sizesAPI } from "@/lib/integration/sizes";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Modal from "@/components/admin/shared/Modal";
import { SizesError } from "@/validations/materials";
import { getErrorMessage } from "@/lib/helpers/handlers";

type Size = {
  _id: string;
  name: string;
  status: boolean | string;
};

export default function SizesPage() {
  const [data, setData] = useState<Size[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // Create Form State
  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });
  const [errors, setErrors] = useState<SizesError>({});

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState<Size | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    status: true,
  });
  const [editErrors, setEditErrors] = useState<SizesError>({});

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchSizes = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await sizesAPI.getAll(lazyParams);
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
      fetchSizes();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchSizes, reload]);

  // ✅ Create size
  const handleSave = async () => {
    if (!sizesValidate(formData.name, setErrors)) return;
    const toastId = toast.loading("Creating...");
    try {
      setActionLoading(true);
      const response: any = await sizesAPI.create({
        name: formData.name.trim(),
        status: formData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setFormData({ name: "", status: true });
        setErrors({});
        setReload(!reload);
        toast.success(`Size created successfully!`, { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const handleOpenEdit = (size: Size) => {
    setEditingSize(size);
    setEditFormData({
      name: size.name || "",
      status: size.status === true || size.status === "true",
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  // ✅ Update size
  const handleUpdate = async () => {
    if (!editingSize?._id) return;
    if (!sizesValidate(editFormData.name, setEditErrors)) return;
    const toastId = toast.loading("Updating size...");
    try {
      setActionLoading(true);
      const response: any = await sizesAPI.update(editingSize._id, {
        name: editFormData.name.trim(),
        status: editFormData.status,
      });
      if (response?.data?.code === "OK" || response?.code === "OK" || response?.status === 200 || response?._id || response?.data?._id) {
        setIsEditModalOpen(false);
        setEditingSize(null);
        setReload(!reload);
        toast.success("Size updated successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Delete size
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this size?");
    if (!isConfirmed) return;
    
    try {
      setLoading(true);
      const response: any = await sizesAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK" || response?.status === 200 || response?.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Size deleted successfully!");
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
      <PageHeader title="Sizes" subtitle="Manage Product Sizes" />

      {/* Form Card */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-visible mb-6">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">
              Create Size
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
                      Size Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., S, M, L, XL, 38, 40, Free Size"
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
                  {actionLoading ? "Creating..." : "Create Size"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DataGrid */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
          <DataGrid<Size>
            headers={[
              {
                key: "name",
                label: "Size Name",
                render: (row: Size) => (
                  <div className="font-semibold text-slate-700">{row.name}</div>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Size) => {
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
                render: (row: Size) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(row)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Edit Size"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition flex items-center gap-1.5 text-xs font-medium shadow-sm"
                      title="Delete Size"
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

      {/* Edit Size Modal */}
      <Modal
        isOpen={isEditModalOpen}
        type="custom"
        title="Edit Size"
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSize(null);
        }}
      >
        <div className="space-y-4 py-2">
          {/* Size Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Size Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. S, M, L, XL, 38, Free Size"
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
                setEditingSize(null);
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
