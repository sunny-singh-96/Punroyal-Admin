"use client";

import { categoriesAPI } from "@/lib/integration/categories";
import toast from "react-hot-toast";
import { categoryValidate } from "@/validations/categories";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CategoryError } from "@/types/types";
import PageHeader from "@/components/admin/head/head";
import { getErrorMessage } from "@/lib/helpers/handlers"

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    status: true,
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
          status: data.status ?? true,
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
    setPreviewUrl(formData.image || "");
  }, [imageFile, formData.image]);

  // ✅ Fetch category by ID (with delayed loader)
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

  // ✅ Update category
  const handleUpdate = async () => {
    if (!categoryValidate(formData.title, formData.image, imageFile, setErrors)) return;
    setLoading(true);
    const toastId = toast.loading("Updating...");
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("status", String(formData.status));
      if (imageFile) {
        payload.append("image", imageFile);
      } else {
        payload.append("image", formData.image);
      }
      const response = await categoriesAPI.update(id, payload);
      if (response?.code === "OK") {
        toast.success(`${formData.title} updated successfully`, { id: toastId });
        router.push("/categories");
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PageHeader
        title="Update Category"
        subtitle="Manage E-Commerce Categories"
      />

      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">
              Update Category
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* IMAGE */}
              <div className="md:col-span-4">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Category Image
                </label>
                <div className="mt-2 border-2 border-dashed rounded-xl p-4 text-center hover:border-blue-400 transition">  
                  {previewUrl ? (
                      <div className="relative">
                      <img src={previewUrl} alt="Banner preview" className="w-full h-48 object-cover rounded-lg" />
                      <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">✕</button>
                      </div>
                  ) : (
                      <div className="space-y-3">
                      <p className="text-sm text-slate-500">Upload an image file or paste an image URL</p>
                      <label className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200">
                          Upload file
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
                    className={`mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />

                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-12 flex justify-end pt-6 border-t">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50"
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
