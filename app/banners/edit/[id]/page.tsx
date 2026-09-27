"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { bannersAPI } from "@/lib/integration/banners";
import { bannerValidate } from "@/validations/banners";
import { BannerError } from "@/types/types";
import PageHeader from "@/components/admin/head/head";
import { getErrorMessage } from "@/lib/helpers/handlers";

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState({
    title: "",
    banner: "",
    status: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState<BannerError>({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(formData.banner || "");
  }, [imageFile, formData.banner]);

  const fetchBanner = async (id: string) => {
    if (!id) return;
    const startTime = Date.now();
    try {
      const response = await bannersAPI.getById(id);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        const data = response?.data?.banner || response?.banner || response?.data;
        if (data) {
          setFormData({
            title: data.title || "",
            banner: data.banner || "",
            status: data.status ?? true,
          });
          setImageFile(null);
          setPreviewUrl(data.banner || "");
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;
      setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchBanner(id);
    }, 300);
    return () => clearTimeout(delay);
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;
    setImageFile(file);
    setFormData({ ...formData, banner: "" });
    setErrors({ ...errors, banner: undefined });
  };

  const clearImage = () => {
    setImageFile(null);
    setFormData({ ...formData, banner: "" });
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async () => {
    if (!bannerValidate(formData.title, formData.banner, imageFile, setErrors))
      return;
    setLoading(true);
    const toastId = toast.loading("Updating...");
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("status", String(formData.status));
      if (imageFile) {
        payload.append("banner", imageFile);
      } else if (formData.banner) {
        payload.append("banner", formData.banner);
      }
      const response = await bannersAPI.update(id, payload);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        toast.success("Banner updated successfully", { id: toastId });
        router.push("/banners");
      } else {
        toast.error(response?.message || response?.data?.message || "Failed to update banner", { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PageHeader title="Banner" subtitle="Update banner details" />

      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-lg font-bold text-slate-800">Update Banner</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Banner Image
                </label>
                <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Banner preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500">
                        Upload an image file or paste an image URL
                      </p>
                      <label className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200">
                        Upload file
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                  {errors.banner && (
                    <p className="text-xs text-red-500 mt-2">{errors.banner}</p>
                  )}
                </div>
              </div>

              <div className="md:col-span-8 space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Banner Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (errors.title)
                        setErrors({ ...errors, title: undefined });
                    }}
                    placeholder="e.g. Spring Collection"
                    className={`mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white outline-none transition ${errors.title ? "border-red-500 bg-red-50" : "border-transparent focus:border-blue-500"}`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>
              </div>

              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Banner"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
