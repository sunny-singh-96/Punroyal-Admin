"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { categoriesAPI } from "@/lib/integration/categories";
import { occasionsAPI, OccasionPayload } from "@/lib/integration/occasions";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { Plus, Check, X, Edit2, Trash2, Layers, AlertCircle } from "lucide-react";

interface CategoryItem {
  _id: string;
  title: string;
  image?: string;
  status?: boolean;
}

interface OccasionItem {
  _id: string;
  title: string;
  image?: string;
  categories: CategoryItem[];
  cat_id?: CategoryItem;
  status: boolean;
  createdAt?: string;
}

export default function OccasionPage() {
  const [data, setData] = useState<OccasionItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // All available categories
  const [allCategories, setAllCategories] = useState<CategoryItem[]>([]);
  // Map of categoryId -> occasionTitle (categories already assigned to other occasions)
  const [assignedMap, setAssignedMap] = useState<Record<string, string>>({});

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [status, setStatus] = useState(true);

  const [lazyParams, setLazyParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  // Fetch all categories for selector
  const fetchAllCategories = useCallback(async () => {
    try {
      const res = await categoriesAPI.getAll({ page: 1, limit: 100 });
      if (res?.code === "OK" && res.data) {
        setAllCategories(res.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  }, []);

  // Fetch assigned categories map
  const fetchAssignedCategories = useCallback(async (excludeId: string | null = null) => {
    try {
      const res = await occasionsAPI.getAssignedCategories(excludeId || undefined);
      if (res?.code === "OK" && res.data?.assigned) {
        setAssignedMap(res.data.assigned);
      }
    } catch (err) {
      console.error("Failed to load assigned categories map:", err);
    }
  }, []);

  // Fetch occasions list
  const fetchOccasions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await occasionsAPI.getAll(lazyParams);
      if (response?.code === "OK") {
        setData(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to fetch occasions");
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  useEffect(() => {
    fetchOccasions();
    fetchAssignedCategories(editingId);
  }, [fetchOccasions, fetchAssignedCategories, editingId]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSelectedCategoryIds([]);
    setStatus(true);
    fetchAssignedCategories(null);
  };

  const handleStartEdit = (occ: OccasionItem) => {
    setEditingId(occ._id);
    setTitle(occ.title || "");
    const ids = (occ.categories || []).map((c) => c._id || (c as any));
    if (ids.length === 0 && occ.cat_id) {
      ids.push(occ.cat_id._id || (occ.cat_id as any));
    }
    setSelectedCategoryIds(ids);
    setStatus(occ.status !== false);
    fetchAssignedCategories(occ._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleCategory = (catId: string) => {
    if (selectedCategoryIds.includes(catId)) {
      setSelectedCategoryIds((prev) => prev.filter((id) => id !== catId));
    } else {
      setSelectedCategoryIds((prev) => [...prev, catId]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter an occasion title (e.g. Winter, Summer, Wedding)");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      toast.error("Please select at least one category for this occasion");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating occasion..." : "Creating occasion...");

    try {
      const payload: OccasionPayload = {
        title: title.trim(),
        categories: selectedCategoryIds,
        cat_id: selectedCategoryIds[0],
        status,
      };

      if (editingId) {
        await occasionsAPI.update(editingId, payload);
        toast.success("Occasion updated successfully!", { id: toastId });
      } else {
        await occasionsAPI.create(payload);
        toast.success("Occasion created successfully!", { id: toastId });
      }

      resetForm();
      fetchOccasions();
      fetchAssignedCategories(null);
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to save occasion", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this occasion?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      const response = await occasionsAPI.delete(id);
      if (response?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Occasion deleted successfully");
        if (editingId === id) resetForm();
        fetchAssignedCategories(null);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to delete occasion");
    } finally {
      setLoading(false);
    }
  }, [editingId]);

  const handleToggleStatus = async (occ: OccasionItem) => {
    try {
      await occasionsAPI.update(occ._id, { status: !occ.status });
      setData((prev) =>
        prev.map((item) => (item._id === occ._id ? { ...item, status: !occ.status } : item))
      );
      toast.success(`Occasion ${!occ.status ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Occasions"
        subtitle="Curate occasions with multiple categories for seasonal & festive collections"
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Create / Edit Occasion Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-normal text-slate-900">
                {editingId ? "Edit Occasion" : "Create New Occasion"}
              </h2>
              <p className="text-xs font-normal text-slate-400 mt-0.5">
                Assign categories to this occasion. A category can only belong to one occasion at a time.
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-normal text-slate-500 hover:text-slate-800 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Occasion Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-normal text-slate-700 block mb-1">
                  Occasion Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Winter, Summer, Wedding, Festive"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 font-normal"
                />
              </div>

              <div>
                <label className="text-xs font-normal text-slate-700 block mb-1">
                  Status
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-normal text-slate-700">
                    <input
                      type="checkbox"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span>Active on store</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Category Selector with Exclusivity Rule */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-normal text-slate-700">
                  Select Categories <span className="text-red-500">*</span> ({selectedCategoryIds.length} selected)
                </label>
                <span className="text-[11px] font-normal text-slate-400">
                  Click to select/unselect categories for this occasion
                </span>
              </div>

              {/* Category Pills Grid */}
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                {allCategories.map((cat) => {
                  const isSelected = selectedCategoryIds.includes(cat._id);
                  const assignedToOther = assignedMap[cat._id];

                  if (assignedToOther && !isSelected) {
                    return (
                      <span
                        key={cat._id}
                        title={`Already assigned to "${assignedToOther}"`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-normal bg-slate-200/60 text-slate-400 border border-slate-200 cursor-not-allowed select-none"
                      >
                        <X size={12} className="text-slate-400" />
                        <span>{cat.title}</span>
                        <span className="text-[10px] text-slate-400 italic">({assignedToOther})</span>
                      </span>
                    );
                  }

                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => handleToggleCategory(cat._id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-normal border transition ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isSelected ? <Check size={13} /> : <Plus size={13} className="text-slate-400" />}
                      <span>{cat.title}</span>
                    </button>
                  );
                })}

                {allCategories.length === 0 && (
                  <p className="text-xs font-normal text-slate-400 py-2">No categories found.</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-normal text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-normal rounded-xl transition shadow-xs flex items-center gap-2"
              >
                <span>{editingId ? "Save Changes" : "Create Occasion"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Occasions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-normal text-slate-900">Configured Occasions</h2>
              <p className="text-xs font-normal text-slate-400 mt-0.5">
                Occasions currently visible in the navigation and on the store home page
              </p>
            </div>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Total: {totalRecords}
            </span>
          </div>

          <DataGrid<OccasionItem>
            headers={[
              {
                key: "title",
                label: "Occasion",
                render: (row) => (
                  <div className="flex items-center gap-2.5 py-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Layers size={16} />
                    </div>
                    <div>
                      <span className="font-normal text-slate-900 text-sm block">
                        {row.title || "Occasion"}
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                key: "categories",
                label: "Categories",
                render: (row) => {
                  const cats = row.categories && row.categories.length > 0
                    ? row.categories
                    : row.cat_id ? [row.cat_id] : [];
                  return (
                    <div className="flex flex-wrap gap-1.5 max-w-md py-1">
                      {cats.map((c, i) => (
                        <span
                          key={c._id || i}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-normal bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {c.title || "Category"}
                        </span>
                      ))}
                      {cats.length === 0 && (
                        <span className="text-xs text-slate-400 italic">No categories</span>
                      )}
                    </div>
                  );
                },
              },
              {
                key: "status",
                label: "Status",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-normal rounded-full border ${
                        row.status
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {row.status ? "Active" : "Inactive"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(row)}
                      className="text-xs font-normal text-blue-600 hover:underline"
                    >
                      {row.status ? "Turn Off" : "Turn On"}
                    </button>
                  </div>
                ),
              },
              {
                key: "_id",
                label: "Actions",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(row)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit Occasion"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(row._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Occasion"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ),
              },
            ]}
            rows={data}
            totalRecords={totalRecords}
            page={lazyParams.page}
            pageSize={lazyParams.limit}
            onPageChange={(page) => setLazyParams((prev) => ({ ...prev, page }))}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
