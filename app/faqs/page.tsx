"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Search, HelpCircle, CheckCircle, XCircle, X } from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { faqsAPI } from "@/lib/integration/faqs";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

interface Faq {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 15, search: "" });
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 0,
    status: true,
  });

  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {
        page: lazyParams.page,
        limit: lazyParams.limit,
        search: lazyParams.search,
      };
      if (categoryFilter !== "all") {
        params.category = categoryFilter;
      }
      const response = await faqsAPI.getAll(params);
      if (response?.code === "OK") {
        setFaqs(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams, categoryFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFaqs();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchFaqs]);

  // Derived category list for filter pills
  const categories = useMemo(() => {
    const list = Array.from(new Set(faqs.map((f) => f.category || "General").filter(Boolean)));
    return ["all", ...list];
  }, [faqs]);

  // Handle open modal for add / edit
  const handleOpenModal = (faq?: Faq) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "General",
        order: faq.order || 0,
        status: faq.status,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: "",
        answer: "",
        category: "General",
        order: faqs.length + 1,
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  // Submit create or edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      return toast.error("Question is required");
    }
    if (!formData.answer.trim()) {
      return toast.error("Answer is required");
    }

    try {
      setSaving(true);
      if (editingFaq) {
        await faqsAPI.update(editingFaq._id, formData);
        toast.success("FAQ updated successfully");
      } else {
        await faqsAPI.create(formData);
        toast.success("FAQ created successfully");
      }
      handleCloseModal();
      fetchFaqs();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await faqsAPI.updateStatus(id, !currentStatus);
      setFaqs((prev) =>
        prev.map((f) => (f._id === id ? { ...f, status: !currentStatus } : f))
      );
      toast.success(`FAQ ${!currentStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Delete FAQ
  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this FAQ?");
    if (!isConfirmed) return;

    try {
      await faqsAPI.delete(id);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      setTotalRecords((prev) => Math.max(0, prev - 1));
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const activeCount = useMemo(() => faqs.filter((f) => f.status).length, [faqs]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHeader
        title="Frequently Asked Questions (FAQs)"
        subtitle="Create, update, reorder and manage store FAQs"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              <HelpCircle size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Questions</p>
              <h3 className="text-2xl font-black text-slate-800">{totalRecords}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Active Questions</p>
              <h3 className="text-2xl font-black text-slate-800">{activeCount}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              #
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Categories</p>
              <h3 className="text-2xl font-black text-slate-800">{categories.length - 1}</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search FAQs by question or answer..."
                value={lazyParams.search}
                onChange={(e) => setLazyParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            {categories.length > 2 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.filter((c) => c !== "all").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition transform active:scale-95"
          >
            <Plus size={18} />
            <span>Add FAQ</span>
          </button>
        </div>

        {/* FAQs LIST TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading questions...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="py-20 text-center px-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No FAQs Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Start by adding your first FAQ question to help customers learn more about Punroyal.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700"
              >
                <Plus size={16} /> Add FAQ
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16 text-center">Order</th>
                    <th className="py-3.5 px-4 w-64">Question</th>
                    <th className="py-3.5 px-4">Answer</th>
                    <th className="py-3.5 px-4 w-32">Category</th>
                    <th className="py-3.5 px-4 w-28 text-center">Status</th>
                    <th className="py-3.5 px-4 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {faqs.map((faq) => (
                    <tr key={faq._id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        <span className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-slate-100 text-xs">
                          {faq.order}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {faq.question}
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-md">
                        <p className="line-clamp-2 leading-relaxed">{faq.answer}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {faq.category || "General"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(faq._id, faq.status)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                            faq.status
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          }`}
                        >
                          {faq.status ? (
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
                            onClick={() => handleOpenModal(faq)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
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
                {Math.min(lazyParams.page * lazyParams.limit, totalRecords)} of {totalRecords} questions
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide the question and its helpful answer
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
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do you offer custom sizing on bridal lehengas?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="General / Shipping / Sizing / Quality"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Answer *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write a clear, detailed answer to the customer's question..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="faq-status"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500"
                />
                <label htmlFor="faq-status" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">
                  Active (visible on website)
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
                  {saving ? "Saving..." : editingFaq ? "Save Changes" : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
