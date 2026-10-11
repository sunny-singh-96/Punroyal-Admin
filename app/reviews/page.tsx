"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Eye, Trash2, Star, Search, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import Modal from "@/components/admin/shared/Modal";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { reviewsAPI, AdminReviewItem } from "@/lib/integration/reviews";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"" | "enabled" | "disabled">("");
  const [selectedReview, setSelectedReview] = useState<AdminReviewItem | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await reviewsAPI.getAll({
        page,
        limit,
        search: debouncedSearch,
        status: visibilityFilter,
      });
      const list =
        (Array.isArray(res?.data) ? res.data : null) ||
        (Array.isArray(res?.data?.data) ? res.data.data : null) ||
        [];
      setReviews(list);
      setTotalRecords(res?.totalRecords ?? res?.data?.totalRecords ?? list.length);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, visibilityFilter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const toggleVisibility = async (review: AdminReviewItem) => {
    const nextStatus = review.status === "enabled" ? "disabled" : "enabled";
    try {
      setTogglingId(review._id);
      await reviewsAPI.setVisibility(review._id, nextStatus);
      toast.success(nextStatus === "enabled" ? "Review is now visible on product page" : "Review hidden from product page");
      fetchReviews();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (review: AdminReviewItem) => {
    const ok = await confirmDelete("Permanently delete this review? This cannot be undone.");
    if (!ok) return;
    try {
      await reviewsAPI.delete(review._id);
      toast.success("Review deleted");
      fetchReviews();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
      />
    ));

  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Product Reviews" />
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <p className="text-sm text-slate-500 -mt-2">
          Manage customer reviews. Hidden reviews stay in the database but do not appear on the storefront.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search product, customer, or review text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={visibilityFilter}
            onChange={(e) => {
              setVisibilityFilter(e.target.value as "" | "enabled" | "disabled");
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white"
          >
            <option value="">All visibility</option>
            <option value="enabled">Visible on product page</option>
            <option value="disabled">Hidden</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 flex justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">No reviews found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Review</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-center">Visibility</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reviews.map((rev) => (
                    <tr key={rev._id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800">{rev.customer_name}</p>
                        {rev.customer_email && (
                          <p className="text-xs text-slate-400 truncate max-w-[160px]">{rev.customer_email}</p>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700 max-w-[180px] truncate" title={rev.product_name}>
                        {rev.product_name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-0.5">{renderStars(rev.stars)}</div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-medium text-slate-800 truncate">{rev.title}</p>
                        <p className="text-xs text-slate-500 truncate">{rev.desc}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap text-xs">
                        {rev.createdAt ? format(new Date(rev.createdAt), "dd MMM yyyy, hh:mm a") : "—"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          disabled={togglingId === rev._id}
                          onClick={() => toggleVisibility(rev)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rev.status === "enabled" ? "bg-emerald-500" : "bg-slate-300"
                          } disabled:opacity-50`}
                          title={rev.status === "enabled" ? "Visible on product page" : "Hidden from product page"}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              rev.status === "enabled" ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <p className="text-[10px] font-bold mt-1 uppercase tracking-wide text-slate-500">
                          {rev.status === "enabled" ? "Visible" : "Hidden"}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReview(rev)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(rev)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200"
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

          {totalRecords > limit && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Page {page} of {totalPages} ({totalRecords} reviews)
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 border rounded-lg disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedReview && (
        <Modal
          isOpen={Boolean(selectedReview)}
          onClose={() => setSelectedReview(null)}
          title="Review Details"
          type="custom"
        >
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Customer</p>
              <p className="font-semibold text-slate-900">{selectedReview.customer_name}</p>
              {selectedReview.customer_email && (
                <p className="text-slate-500">{selectedReview.customer_email}</p>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Product</p>
              <p className="font-semibold text-slate-900">{selectedReview.product_name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Rating</p>
              <div className="flex gap-0.5 mt-1">{renderStars(selectedReview.stars)}</div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Title</p>
              <p className="font-medium text-slate-800">{selectedReview.title}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Review</p>
              <p className="text-slate-700 whitespace-pre-wrap">{selectedReview.desc}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Visibility</p>
              <p className="font-medium">
                {selectedReview.status === "enabled" ? "Visible on product page" : "Hidden from product page"}
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
