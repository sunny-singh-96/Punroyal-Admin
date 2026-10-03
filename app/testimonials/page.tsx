"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Search, Quote, CheckCircle, XCircle, X, Star, Upload, Video } from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { testimonialsAPI } from "@/lib/integration/testimonials";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  content: string;
  rating: number;
  avatar: string;
  video_url?: string;
  order: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 15, search: "" });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "Customer",
    content: "",
    rating: 5,
    avatar: "",
    video_url: "",
    order: 0,
    status: true,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAll(lazyParams);
      if (response?.code === "OK") {
        setTestimonials(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTestimonials();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchTestimonials]);

  const handleOpenModal = (item?: Testimonial) => {
    setAvatarFile(null);
    if (item) {
      setEditingTestimonial(item);
      setFormData({
        name: item.name,
        designation: item.designation || "Customer",
        content: item.content,
        rating: item.rating || 5,
        avatar: item.avatar || "",
        video_url: item.video_url || "",
        order: item.order || 0,
        status: item.status,
      });
      setAvatarPreview(item.avatar || "");
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        designation: "Verified Buyer",
        content: "",
        rating: 5,
        avatar: "",
        video_url: "",
        order: testimonials.length + 1,
        status: true,
      });
      setAvatarPreview("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Client name is required");
    if (!formData.content.trim()) return toast.error("Testimonial content is required");

    try {
      setSaving(true);
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

      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial._id, payload);
        toast.success("Testimonial updated successfully");
      } else {
        await testimonialsAPI.create(payload);
        toast.success("Testimonial added successfully");
      }

      handleCloseModal();
      fetchTestimonials();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await testimonialsAPI.updateStatus(id, !currentStatus);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: !currentStatus } : t))
      );
      toast.success(`Testimonial ${!currentStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this testimonial?");
    if (!isConfirmed) return;

    try {
      await testimonialsAPI.delete(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      setTotalRecords((prev) => Math.max(0, prev - 1));
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const activeCount = useMemo(() => testimonials.filter((t) => t.status).length, [testimonials]);
  const avgRating = useMemo(() => {
    if (testimonials.length === 0) return "5.0";
    const sum = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0);
    return (sum / testimonials.length).toFixed(1);
  }, [testimonials]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHeader
        title="Testimonials & Reviews"
        subtitle="Manage customer feedback, ratings, and testimonials for the store"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
              <Quote size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Reviews</p>
              <h3 className="text-2xl font-black text-slate-800">{totalRecords}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Active Testimonials</p>
              <h3 className="text-2xl font-black text-slate-800">{activeCount}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold text-xl">
              <Star size={24} className="fill-amber-400" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Average Rating</p>
              <h3 className="text-2xl font-black text-slate-800">{avgRating} / 5</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by client name, designation or review..."
              value={lazyParams.search}
              onChange={(e) => setLazyParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition transform active:scale-95"
          >
            <Plus size={18} />
            <span>Add Testimonial</span>
          </button>
        </div>

        {/* TESTIMONIALS LIST TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-20 text-center px-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Testimonials Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Add happy customer reviews, bridal testimonials, and ratings to build credibility.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700"
              >
                <Plus size={16} /> Add Testimonial
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-14 text-center">Order</th>
                    <th className="py-3.5 px-4 w-72">Client</th>
                    <th className="py-3.5 px-4 w-32">Rating</th>
                    <th className="py-3.5 px-4">Testimonial</th>
                    <th className="py-3.5 px-4 w-28 text-center">Status</th>
                    <th className="py-3.5 px-4 w-28 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {testimonials.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        <span className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-slate-100 text-xs">
                          {item.order}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm bg-blue-50 text-blue-600">
                                {item.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
                            <p className="text-xs text-slate-500 truncate">{item.designation || "Customer"}</p>
                            {item.video_url && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold mt-0.5">
                                <Video size={11} /> Video Review
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-md">
                        <p className="line-clamp-2 leading-relaxed italic">&ldquo;{item.content}&rdquo;</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(item._id, item.status)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                            item.status
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          }`}
                        >
                          {item.status ? (
                            <>
                              <CheckCircle size={13} /> Active
                            </>
                          ) : (
                            <>
                              <XCircle size={13} /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION */}
          {totalRecords > lazyParams.limit && (
            <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>
                Showing {(lazyParams.page - 1) * lazyParams.limit + 1} to{" "}
                {Math.min(lazyParams.page * lazyParams.limit, totalRecords)} of {totalRecords} testimonials
              </span>
              <div className="flex gap-2">
                <button
                  disabled={lazyParams.page === 1}
                  onClick={() => setLazyParams((p) => ({ ...p, page: p.page - 1 }))}
                  className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={lazyParams.page * lazyParams.limit >= totalRecords}
                  onClick={() => setLazyParams((p) => ({ ...p, page: p.page + 1 }))}
                  className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <Quote size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in client details and their feedback
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* AVATAR UPLOAD */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Client Avatar / Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0 relative">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Quote size={24} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                      >
                        <Upload size={14} /> Upload Photo
                      </button>
                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setAvatarFile(null);
                            setAvatarPreview("");
                            setFormData((p) => ({ ...p, avatar: "" }));
                          }}
                          className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or enter image URL..."
                      value={formData.avatar}
                      onChange={(e) => {
                        setFormData({ ...formData, avatar: e.target.value });
                        if (!avatarFile) setAvatarPreview(e.target.value);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* CLIENT NAME & DESIGNATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Kaur"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bride / Verified Buyer / Fashion Blogger"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* RATING & ORDER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
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
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* TESTIMONIAL CONTENT */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Testimonial / Review Content *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share the customer's experience with Punroyal..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
                />
              </div>

              {/* VIDEO URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Video Review URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://youtube.com/... or video link"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* STATUS CHECKBOX */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="testimonial-status"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500"
                />
                <label htmlFor="testimonial-status" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">
                  Active (saved in database, ready for display)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingTestimonial ? "Save Changes" : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
