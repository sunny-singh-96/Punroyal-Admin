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
    redirect_to: "",
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
            redirect_to: data.redirect_to || "",
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
    setFormData((prev) => ({ ...prev, banner: "" }));
    setErrors((prev) => ({ ...prev, banner: undefined }));
  };

  const clearImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, banner: "" }));
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async () => {
    if (!bannerValidate(formData.title, formData.banner, imageFile, setErrors, formData.redirect_to)) {
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Updating banner...");
    try {
      const payload = new FormData();
      payload.append("title", formData.title.trim() || "Banner Link");
      payload.append("redirect_to", formData.redirect_to.trim());
      payload.append("status", String(formData.status));
      if (imageFile) {
        payload.append("banner", imageFile);
      } else if (formData.banner) {
        payload.append("banner", formData.banner.trim());
      } else {
        // If image was cleared
        payload.append("banner", "");
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
      <PageHeader title="Banner" subtitle="Update banner details and link URL" />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Update Banner</h2>
            <button
              type="button"
              onClick={() => router.push('/banners')}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              ← Back to Banners
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Optional Banner Image */}
              <div className="md:col-span-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Banner Image <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-xs text-red-500 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition bg-slate-50/50">
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Banner preview"
                        className="w-full h-48 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-white/90 text-slate-700 hover:bg-red-500 hover:text-white p-1.5 rounded-full shadow transition"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 py-4">
                      <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-500">Image is optional. You can upload an image or paste a URL below.</p>
                      <label className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 shadow-sm transition">
                        Select File
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <div className="pt-2 border-t border-slate-200/60">
                        <input
                          type="text"
                          value={formData.banner}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, banner: e.target.value }));
                            setImageFile(null);
                          }}
                          placeholder="Or paste image URL"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                  {errors.banner && (
                    <p className="text-xs text-red-500 mt-2">{errors.banner}</p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="md:col-span-8 space-y-6">
                {/* Banner Title */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Banner Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (errors.title)
                        setErrors({ ...errors, title: undefined });
                    }}
                    placeholder="e.g. Wedding Festive Collection"
                    className={`mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white outline-none transition ${errors.title ? "border-red-500 bg-red-50" : "border-transparent focus:border-blue-500"}`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Banner Link URL (redirect_to) - Commented out from UI as requested
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Banner Link URL <span className="text-blue-600 font-semibold">(Editable Link)</span>
                  </label>
                  <input
                    value={formData.redirect_to}
                    onChange={(e) => {
                      setFormData({ ...formData, redirect_to: e.target.value });
                    }}
                    placeholder="e.g. /products or https://punroyal.com/collections/festive"
                    className="mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white outline-none border-transparent focus:border-blue-500 transition font-mono text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Enter the URL or internal path where the user will be directed upon clicking the banner.
                  </p>
                </div>
                */}

                {/* Banner Status */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Banner Status
                  </label>
                  <div className="mt-2 flex items-center gap-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-slate-700">
                        {formData.status ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => router.push('/banners')}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
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
