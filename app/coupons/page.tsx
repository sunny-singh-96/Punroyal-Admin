"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Search, Tag, X } from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { couponsAPI, type CouponPayload } from "@/lib/integration/coupons";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";
import {
  couponValidate,
  type CouponFormData,
  type CouponFormErrors,
} from "@/validations/coupons";

interface Coupon {
  _id: string;
  couponName: string;
  expiryType: "expiry_date" | "no_expiry";
  expiryDate?: string | null;
  count: number;
  usedCount?: number;
  razorpayCouponId?: string | null;
  razorpaySyncStatus?: string;
  createdAt: string;
  updatedAt: string;
}

const defaultForm: CouponFormData = {
  couponName: "",
  expiryType: "no_expiry",
  expiryDate: "",
  count: 1,
};

function formatExpiry(coupon: Coupon) {
  if (coupon.expiryType === "no_expiry") return "No expiry";
  if (!coupon.expiryDate) return "—";
  return new Date(coupon.expiryDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function syncStatusLabel(status?: string, offerId?: string | null) {
  switch (status) {
    case "synced":
      return {
        text: offerId ? `Linked ${offerId}` : "Linked",
        className: "bg-emerald-50 text-emerald-700",
      };
    case "pending":
      return {
        text: "Awaiting Razorpay Offer",
        className: "bg-amber-50 text-amber-800",
      };
    case "failed":
      return { text: "Razorpay sync failed", className: "bg-rose-50 text-rose-700" };
    default:
      return { text: "Not linked", className: "bg-slate-100 text-slate-600" };
  }
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 15, search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<CouponFormData>(defaultForm);
  const [errors, setErrors] = useState<CouponFormErrors>({});

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await couponsAPI.getAll(lazyParams);
      if (response?.code === "OK") {
        setCoupons(response.data || []);
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
      fetchCoupons();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchCoupons]);

  const handleOpenModal = (coupon?: Coupon) => {
    setErrors({});
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        couponName: coupon.couponName,
        expiryType: coupon.expiryType,
        expiryDate: coupon.expiryDate
          ? new Date(coupon.expiryDate).toISOString().slice(0, 10)
          : "",
        count: coupon.count,
      });
    } else {
      setEditingCoupon(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
    setErrors({});
  };

  const buildPayload = (): CouponPayload => {
    const payload: CouponPayload = {
      couponName: formData.couponName.trim().toUpperCase(),
      expiryType: formData.expiryType,
      count: Number(formData.count),
    };
    if (formData.expiryType === "expiry_date" && formData.expiryDate) {
      payload.expiryDate = new Date(formData.expiryDate).toISOString();
    }
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponValidate(formData, setErrors, !!editingCoupon)) {
      toast.error("Please fix the validation errors");
      return;
    }

    const payload = buildPayload();
    try {
      setSaving(true);
      let response;
      if (editingCoupon) {
        response = await couponsAPI.update(editingCoupon._id, payload);
        toast.success("Coupon updated successfully");
      } else {
        response = await couponsAPI.create(payload);
        toast.success("Coupon created successfully");
      }
      const saved = response?.data?.coupon;
      if (saved?.razorpaySyncStatus === "pending") {
        toast(
          saved?.razorpaySyncError ||
            "Coupon saved. Create a matching Offer in Razorpay Dashboard, then save again to link.",
          { duration: 6000 }
        );
      } else if (saved?.razorpaySyncStatus === "failed") {
        toast("Coupon saved locally, but Razorpay sync failed.", { duration: 5000 });
      }
      handleCloseModal();
      fetchCoupons();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this coupon?");
    if (!isConfirmed) return;

    try {
      await couponsAPI.delete(id);
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      setTotalRecords((prev) => Math.max(0, prev - 1));
      toast.success("Coupon deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHeader
        title="Coupons"
        subtitle="Create and manage discount coupons with usage limits and expiry"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by coupon name..."
              value={lazyParams.search}
              onChange={(e) =>
                setLazyParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition transform active:scale-95"
          >
            <Plus size={18} />
            <span>Add Coupon</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading coupons...</p>
            </div>
          ) : coupons.length === 0 ? (
            <div className="py-20 text-center px-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Coupons Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Create your first coupon to offer discounts at checkout.
              </p>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700"
              >
                <Plus size={16} /> Add Coupon
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Coupon Name</th>
                    <th className="py-3.5 px-4 w-36">Expiry</th>
                    <th className="py-3.5 px-4 w-28 text-center">Count</th>
                    <th className="py-3.5 px-4 w-40">Razorpay</th>
                    <th className="py-3.5 px-4 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {coupons.map((coupon) => {
                    const sync = syncStatusLabel(coupon.razorpaySyncStatus, coupon.razorpayCouponId);
                    return (
                      <tr key={coupon._id} className="hover:bg-slate-50/60 transition group">
                        <td className="py-4 px-4 font-semibold text-slate-800 font-mono">
                          {coupon.couponName}
                        </td>
                        <td className="py-4 px-4 text-slate-600">{formatExpiry(coupon)}</td>
                        <td className="py-4 px-4 text-center font-medium text-slate-700">
                          {coupon.usedCount ?? 0} / {coupon.count}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${sync.className}`}
                            title={coupon.razorpayCouponId || undefined}
                          >
                            {sync.text}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(coupon)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(coupon._id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalRecords > lazyParams.limit && (
            <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>
                Showing {(lazyParams.page - 1) * lazyParams.limit + 1} to{" "}
                {Math.min(lazyParams.page * lazyParams.limit, totalRecords)} of {totalRecords}{" "}
                coupons
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={lazyParams.page === 1}
                  onClick={() => setLazyParams((p) => ({ ...p, page: p.page - 1 }))}
                  className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
                  </h3>
                  <p className="text-xs text-slate-500">Coupon code, expiry, and redemption limit</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Coupon Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={formData.couponName}
                  onChange={(e) =>
                    setFormData({ ...formData, couponName: e.target.value.toUpperCase() })
                  }
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                    errors.couponName ? "border-rose-400" : "border-slate-200"
                  }`}
                />
                {errors.couponName && (
                  <p className="text-xs text-rose-600 mt-1">{errors.couponName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Expiry Type *
                </label>
                <select
                  value={formData.expiryType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiryType: e.target.value as CouponFormData["expiryType"],
                      expiryDate: e.target.value === "no_expiry" ? "" : formData.expiryDate,
                    })
                  }
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryType ? "border-rose-400" : "border-slate-200"
                  }`}
                >
                  <option value="no_expiry">No Expiry</option>
                  <option value="expiry_date">Expiry Date</option>
                </select>
                {errors.expiryType && (
                  <p className="text-xs text-rose-600 mt-1">{errors.expiryType}</p>
                )}
              </div>

              {formData.expiryType === "expiry_date" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                      errors.expiryDate ? "border-rose-400" : "border-slate-200"
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-xs text-rose-600 mt-1">{errors.expiryDate}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Count (max redemptions) *
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.count}
                  onChange={(e) =>
                    setFormData({ ...formData, count: Number(e.target.value) || 0 })
                  }
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                    errors.count ? "border-rose-400" : "border-slate-200"
                  }`}
                />
                {errors.count && <p className="text-xs text-rose-600 mt-1">{errors.count}</p>}
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
                  {saving ? "Saving..." : editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
