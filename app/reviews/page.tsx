"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, X, Loader2, ChevronLeft, ChevronRight, Eye, Trash2, CheckCircle2, XCircle, Star, Edit3, MessageSquare
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/utils/api';
import Swal from 'sweetalert2';

interface Review {
  id: number;
  product_id: number;
  product_name: string;
  user_id: number;
  user_name: string;
  rating: number;
  review: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  verified_purchase: boolean;
  admin_reply: string | null;
  helpful_count: number;
  reported_count: number;
  created_at: string;
  updated_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminReply, setAdminReply] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editReviewText, setEditReviewText] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search: searchTerm,
        status: statusFilter,
        rating: ratingFilter
      });
      const res = await api.get(`/admin/reviews?${params}`);
      if (res.data.success) {
        setReviews(res.data.reviews);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        toast.error('Failed to load reviews');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading reviews');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, ratingFilter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const openModal = (review: Review) => {
    setSelectedReview(review);
    setAdminReply(review.admin_reply || '');
    setEditRating(review.rating);
    setEditReviewText(review.review);
    setEditTitle(review.title || '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
    setAdminReply('');
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await api.patch(`/admin/reviews/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Review ${status}`);
        fetchReviews();
      } else {
        toast.error(res.data.message || 'Failed to update status');
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const saveChanges = async () => {
    if (!selectedReview) return;
    setSubmitting(true);
    try {
      // First update status/reply
      const statusPayload: any = {};
      if (adminReply !== selectedReview.admin_reply) statusPayload.admin_reply = adminReply;
      if (selectedReview.status === 'pending' && editRating) statusPayload.status = 'approved'; // optional auto-approve on edit
      await api.patch(`/admin/reviews/${selectedReview.id}/status`, statusPayload);

      // Update review text/rating/title
      if (editRating !== selectedReview.rating || editReviewText !== selectedReview.review || editTitle !== (selectedReview.title || '')) {
        await api.put(`/admin/reviews/${selectedReview.id}`, {
          rating: editRating,
          review: editReviewText,
          title: editTitle
        });
      }
      toast.success('Review updated');
      closeModal();
      fetchReviews();
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = async (id: number) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    });
    if (result.isConfirmed) {
      try {
        const res = await api.delete(`/admin/reviews/${id}`);
        if (res.data.success) {
          toast.success('Review deleted');
          fetchReviews();
        } else {
          toast.error(res.data.message || 'Delete failed');
        }
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Pending</span>;
      case 'approved':
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">Approved</span>;
      case 'rejected':
        return <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-bold">Rejected</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Product Reviews
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage customer reviews and ratings</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by user or review text..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No reviews found</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Review</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviews.map(rev => (
                  <tr key={rev.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium">{rev.product_name}</td>
                    <td className="px-6 py-4 text-sm">{rev.user_name}</td>
                    <td className="px-6 py-4"><div className="flex gap-0.5">{renderStars(rev.rating)}</div></td>
                    <td className="px-6 py-4 max-w-xs truncate">{rev.review}</td>
                    <td className="px-6 py-4">{getStatusBadge(rev.status)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(rev.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openModal(rev)} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition">
                          <Eye size={18} />
                        </button>
                        {rev.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(rev.id, 'approved')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition">
                              <CheckCircle2 size={18} />
                            </button>
                            <button onClick={() => updateStatus(rev.id, 'rejected')} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 transition">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button onClick={() => deleteReview(rev.id)} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No reviews found</div>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} className="p-4 space-y-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{rev.product_name}</p>
                    <p className="text-xs text-slate-500">{rev.user_name}</p>
                  </div>
                  {getStatusBadge(rev.status)}
                </div>
                <div className="flex gap-0.5">{renderStars(rev.rating)}</div>
                <p className="text-sm text-slate-600 line-clamp-2">{rev.review}</p>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => openModal(rev)} className="p-2 bg-slate-100 rounded-lg text-slate-600"><Eye size={16} /></button>
                  {rev.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(rev.id, 'approved')} className="p-2 bg-slate-100 rounded-lg text-emerald-600"><CheckCircle2 size={16} /></button>
                      <button onClick={() => updateStatus(rev.id, 'rejected')} className="p-2 bg-slate-100 rounded-lg text-rose-600"><XCircle size={16} /></button>
                    </>
                  )}
                  <button onClick={() => deleteReview(rev.id)} className="p-2 bg-slate-100 rounded-lg text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex justify-between items-center">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm disabled:opacity-50">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {modalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Review Details</h3>
              <button onClick={closeModal} className="p-1 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Product</label><p>{selectedReview.product_name}</p></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">User</label><p>{selectedReview.user_name} {selectedReview.verified_purchase && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified Purchase</span>}</p></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Rating</label><div className="flex gap-1">{renderStars(editRating)}</div></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Review</label><textarea rows={3} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" value={editReviewText} onChange={(e) => setEditReviewText(e.target.value)} /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Admin Reply</label><textarea rows={3} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" value={adminReply} onChange={(e) => setAdminReply(e.target.value)} placeholder="Leave a public reply to this review..."></textarea></div>
              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition">Cancel</button>
                <button onClick={saveChanges} disabled={submitting} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}