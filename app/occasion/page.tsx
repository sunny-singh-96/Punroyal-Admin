"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { categoriesAPI } from "@/lib/integration/categories";
import { occasionsAPI, OccasionPayload } from "@/lib/integration/occasions";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { Plus, Check, X, Edit2, Trash2, Layers, Search, Image as ImageIcon, UploadCloud } from "lucide-react";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [status, setStatus] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [lazyParams, setLazyParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  // Handle image preview
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

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
    setImageFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedCategoryIds([]);
    setStatus(true);
    fetchAssignedCategories(null);
  };

  const handleStartEdit = (occ: OccasionItem) => {
    setEditingId(occ._id);
    setTitle(occ.title || "");
    setImageFile(null);
    setPreviewUrl(occ.image || "");
    if (fileInputRef.current) fileInputRef.current.value = "";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter an occasion title (e.g. Winter, Summer, Wedding)");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating occasion..." : "Creating occasion...");

    try {
      const payload = new FormData();
      payload.append("title", title.trim());
      payload.append("status", String(status));

      if (imageFile) {
        payload.append("image", imageFile);
      } else if (previewUrl) {
        payload.append("image", previewUrl);
      } else {
        payload.append("image", "");
      }

      selectedCategoryIds.forEach((catId) => {
        payload.append("categories", catId);
      });
      if (selectedCategoryIds.length > 0) {
        payload.append("cat_id", selectedCategoryIds[0]);
      }

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
        subtitle="Manage seasonal, festive & cultural occasions with images and assign them to products"
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Create / Edit Occasion Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit Occasion" : "Create New Occasion"}
              </h2>
              <p className="text-xs font-normal text-slate-500 mt-0.5">
                Set occasion title (Required) and banner image (Optional). Products can be assigned to this occasion.
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Title and Status */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Occasion Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wedding, Summer, Festive, Reception, Party Wear"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 font-normal"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Status
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-normal text-slate-700 pt-1">
                    <input
                      type="checkbox"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-4 w-4"
                    />
                    <span>Active on store (Display to customers)</span>
                  </label>
                </div>

                {/* Optional Categories Selector (if user wants to link categories as well) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-700">
                      Link Categories <span className="text-slate-400 font-normal">(Optional - {selectedCategoryIds.length} selected)</span>
                    </label>
                    <span className="text-[11px] font-normal text-slate-400">
                      Click to toggle linked categories
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200/70">
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
                      <p className="text-xs font-normal text-slate-400 py-1">No categories available.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Image Upload (Optional) */}
              <div className="md:col-span-4">
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Occasion Image <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-slate-400 transition bg-slate-50 flex flex-col items-center justify-center min-h-[190px]">
                  {previewUrl ? (
                    <div className="relative w-full aspect-video max-h-40 rounded-xl overflow-hidden border border-slate-200 bg-white group">
                      <img
                        src={previewUrl}
                        alt="Occasion Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow transition"
                        title="Remove Image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer flex flex-col items-center py-4 w-full"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-200/70 text-slate-500 flex items-center justify-center mb-2">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-xs font-medium text-slate-700">Click to upload image</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Max 10MB)</p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 text-xs text-blue-600 hover:underline"
                    >
                      Change Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition shadow-xs flex items-center gap-2"
              >
                <span>{editingId ? "Save Changes" : "Create Occasion"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Configured Occasions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Configured Occasions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Occasions displayed on the store home page and product assignment dropdown
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search occasions..."
                  value={lazyParams.search}
                  onChange={(e) => setLazyParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-slate-900 font-normal bg-slate-50/60 focus:bg-white transition"
                />
                {lazyParams.search && (
                  <button
                    type="button"
                    onClick={() => setLazyParams((prev) => ({ ...prev, search: "", page: 1 }))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-2 rounded-xl shrink-0">
                Total: {totalRecords}
              </span>
            </div>
          </div>

          <DataGrid<OccasionItem>
            headers={[
              {
                key: "image",
                label: "Image",
                render: (row) => (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    {row.image ? (
                      <img
                        src={row.image}
                        alt={row.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <ImageIcon size={18} className="text-slate-400" />
                    )}
                  </div>
                ),
              },
              {
                key: "title",
                label: "Occasion",
                render: (row) => (
                  <div className="flex items-center gap-2.5 py-1">
                    <div>
                      <span className="font-medium text-slate-900 text-sm block">
                        {row.title || "Occasion"}
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                key: "categories",
                label: "Linked Categories",
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
                        <span className="text-xs text-slate-400 italic">None</span>
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
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
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
                      className="text-xs font-medium text-blue-600 hover:underline"
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
