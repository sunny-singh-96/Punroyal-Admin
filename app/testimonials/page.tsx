"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Search, Quote, CheckCircle, XCircle, Star, Video } from "lucide-react";
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
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 15, search: "" });

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
            onClick={() => router.push("/testimonials/create")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition transform active:scale-95 cursor-pointer"
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
                onClick={() => router.push("/testimonials/create")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 cursor-pointer"
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
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
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
                            onClick={() => router.push(`/testimonials/edit/${item._id}`)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
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
    </div>
  );
}
