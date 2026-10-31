"use client";

import { categoriesAPI } from "@/lib/integration/categories";
import toast from "react-hot-toast";
import { categoryValidate } from "@/validations/categories";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CategoryError } from "@/types/types";
import PageHeader from "@/components/admin/head/head";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { showErrorAlert } from "@/lib/sweetAlert";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    status: true,
    order: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<CategoryError>({});

  const fetchCategory = async (id: string) => {
    if (!id) return;
    const startTime = Date.now();
    try {
      const response = await categoriesAPI.getById(id);
      if (response?.code === "OK") {
        const data = response?.data?.category;
        setFormData({
          title: data.title || "",
          image: data.image || "",
          status: data.status !== false,
          order: data.order ?? 1,
        });
        setImageFile(null);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;
      setTimeout(
        () => {
          setLoading(false);
        },
        remaining > 0 ? remaining : 0,
      );
    }
  };

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    if (formData.image) {
      try {
        setPreviewUrl(encodeURI(decodeURI(formData.image)));
      } catch (e) {
        setPreviewUrl(encodeURI(formData.image));
      }
    } else {
      setPreviewUrl("");
    }
  }, [imageFile, formData.image]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchCategory(id);
    }, 300);
    return () => clearTimeout(delay);
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;
    setImageFile(file);
    setFormData({ ...formData, image: "" });
    setErrors({ ...errors, image: undefined });
  };

  const clearImage = () => {
    setImageFile(null);
    setFormData({ ...formData, image: "" });
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async () => {
    if (!categoryValidate(formData.title, formData.image, imageFile, setErrors)) return;
    setLoading(true);
    const toastId = toast.loading("Updating category...");
    try {
      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("status", String(formData.status));
      payload.append("order", String(formData.order ?? 1));
      if (imageFile) {
        payload.append("image", imageFile);
      } else {
        payload.append("image", formData.image);
      }
      const response = await categoriesAPI.update(id, payload);
      if (response?.code === "OK") {
        toast.success(`${formData.title} updated successfully`, { id: toastId });
        router.push("/categories");
      } else {
        toast.error("Failed to update category", { id: toastId });
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      showErrorAlert("Cannot Update Category", msg);
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PageHeader
        title="Update Category"
        subtitle="Manage E-Commerce Categories (Active categories appear on customer site)"
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">
              Update Category
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* IMAGE */}
              <div className="md:col-span-4">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Category Image <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition">  
                  {previewUrl ? (
                    <div className="relative">
                      <img src={previewUrl} alt="Category preview" className="w-full h-48 object-cover rounded-lg" />
                      <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow text-slate-600 hover:text-red-600 cursor-pointer">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 py-4">
                      <div className="space-y-1">
      <p className="text-xs font-semibold text-slate-700">Upload Category Image</p>
      <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/80 rounded px-2 py-1 inline-block">
        Recommended: <strong>800 × 800 px (1:1 Square)</strong> • Max: 10MB • JPG, PNG, WEBP
      </p>
    </div>
                      <label className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 transition">
                        Select File
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                    </div>
                  )}
                  {errors.image && <p className="text-xs text-red-500 mt-2">{errors.image}</p>}
                </div>
              </div>

              {/* FORM */}
              <div className="md:col-span-8 space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Category Name *
                  </label>

                  <input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      });
                      if (errors.title) {
                        setErrors({
                          ...errors,
                          title: undefined,
                        });
                      }
                    }}
                    placeholder="e.g. Unstitched Suits"
                    className={`mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 ${
                      errors.title ? "border-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                  />

                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                {/* DISPLAY ORDER */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Display Order (1st, 2nd, 3rd, etc.)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value, 10) || 1,
                      });
                    }}
                    placeholder="1"
                    className="mt-2 w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition"
                  />
                  <p className="text-xs text-slate-400 mt-1">Lower numbers appear first on customer site navigation.</p>
                </div>

                {/* STATUS TOGGLE */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Category Status
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: !formData.status })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        formData.status ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                          formData.status ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm font-semibold text-slate-700">
                      {formData.status ? "Active (Displayed on store)" : "Inactive (Hidden)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => router.push("/categories")}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:opacity-50 transition shadow-xs cursor-pointer"
                >
                  {loading ? "Updating..." : "Update Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
