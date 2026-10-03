"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Quote, Star, Upload, ArrowLeft, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { testimonialsAPI } from "@/lib/integration/testimonials";
import { getErrorMessage } from "@/lib/helpers/handlers";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState({
    name: "",
    designation: "Verified Buyer",
    content: "",
    rating: 5,
    avatar: "",
    video_url: "",
    order: 0,
    status: true,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  // Fetch single testimonial
  useEffect(() => {
    if (!id) return;
    const fetchTestimonial = async () => {
      try {
        setFetching(true);
        const response = await testimonialsAPI.getById(id);
        const data = response?.data?.testimonial || response?.testimonial || response?.data;
        if (data) {
          setFormData({
            name: data.name || "",
            designation: data.designation || "Customer",
            content: data.content || "",
            rating: data.rating || 5,
            avatar: data.avatar || "",
            video_url: data.video_url || "",
            order: data.order || 0,
            status: data.status !== undefined ? data.status : true,
          });
          setPreviewUrl(data.avatar || "");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setFetching(false);
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    setAvatarFile(file);
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  const clearImage = () => {
    setAvatarFile(null);
    setFormData((prev) => ({ ...prev, avatar: "" }));
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Client name is required");
    if (!formData.content.trim()) return toast.error("Testimonial content is required");

    setLoading(true);
    const toastId = toast.loading("Updating testimonial...");
    try {
      let payload: FormData | Record<string, any>;

      if (avatarFile) {
        const fd = new FormData();
        fd.append("name", formData.name.trim());
        fd.append("designation", formData.designation.trim());
        fd.append("content", formData.content.trim());
        fd.append("rating", String(formData.rating));
        fd.append("video_url", formData.video_url.trim());
        fd.append("order", String(formData.order));
        fd.append("status", String(formData.status));
        fd.append("avatar", avatarFile);
        payload = fd;
      } else {
        payload = {
          name: formData.name.trim(),
          designation: formData.designation.trim(),
          content: formData.content.trim(),
          rating: formData.rating,
          avatar: formData.avatar.trim(),
          video_url: formData.video_url.trim(),
          order: formData.order,
          status: formData.status,
        };
      }

      const response = await testimonialsAPI.update(id, payload);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        toast.success("Testimonial updated successfully", { id: toastId });
        router.push("/testimonials");
      } else {
        toast.error(response?.message || response?.data?.message || "Failed to update testimonial", { id: toastId });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-16">
      <PageHeader
        title="Edit Testimonial"
        subtitle="Modify customer review or testimonial details"
      />

      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => router.push("/testimonials")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft size={16} /> Back to All Testimonials
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Quote size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Edit Testimonial Details</h2>
              <p className="text-xs text-slate-500">Update client review, rating or image</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* AVATAR / PHOTO UPLOAD (LEFT) */}
              <div className="md:col-span-4 space-y-3">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Client Avatar / Photo
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-purple-400 transition bg-slate-50/50">
                  {previewUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Avatar preview"
                        className="w-32 h-32 rounded-full object-cover shadow-md mx-auto border-2 border-white"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-0 right-0 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600 transition"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 py-2">
                      <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center mx-auto">
                        <Quote size={32} />
                      </div>
                      <p className="text-xs text-slate-500">
                        Upload customer profile image or enter image URL below
                      </p>
                      <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 shadow-xs transition">
                        <Upload size={14} /> Upload Image
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

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <input
                      type="text"
                      placeholder="Or paste image URL..."
                      value={formData.avatar}
                      onChange={(e) => {
                        setFormData({ ...formData, avatar: e.target.value });
                        if (!avatarFile) setPreviewUrl(e.target.value);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* FORM FIELDS (RIGHT) */}
              <div className="md:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Client Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaspreet Kaur"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-hidden transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Verified Buyer / Bride / Stylist"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-hidden transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Rating (1 - 5 Stars)
                    </label>
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star
                            size={22}
                            className={
                              star <= formData.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2">
                        {formData.rating} of 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-hidden transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Testimonial / Review Content <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write client testimonial text here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-hidden transition text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Video Review URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/... or video link"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-hidden transition text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="testimonial-edit-status"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded-md focus:ring-purple-500"
                  />
                  <label
                    htmlFor="testimonial-edit-status"
                    className="text-sm font-semibold text-slate-700 select-none cursor-pointer"
                  >
                    Active (Ready and enabled for store)
                  </label>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => router.push("/testimonials")}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Testimonial"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
