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
  discountType?: "flat" | "percentage";
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  startDate?: string | null;
  expiryType: "expiry_date" | "no_expiry";
  expiryDate?: string | null;
  count: number;
  usedCount?: number;
  usageLimitPerUser?: number;
  status?: boolean;
  razorpayCouponId?: string | null;
  razorpaySyncStatus?: string;
  createdAt: string;
  updatedAt: string;
}

const defaultForm: CouponFormData = {
  couponName: "",
  discountType: "percentage",
  discountValue: 10,
  minOrderAmount: 0,
  maxDiscount: 0,
  startDate: new Date().toISOString().slice(0, 10),
  expiryType: "no_expiry",
  expiryDate: "",
  count: 100,
  usageLimitPerUser: 1,
  status: true,
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

function formatDiscount(coupon: Coupon) {
  const type = coupon.discountType || "percentage";
  const val = coupon.discountValue ?? 0;
  if (type === "flat") {
    return `₹${val.toLocaleString()} Flat`;
  }
  return `${val}% Off${coupon.maxDiscount ? ` (Max ₹${coupon.maxDiscount})` : ""}`;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
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
        discountType: coupon.discountType || "percentage",
        discountValue: coupon.discountValue ?? 0,
        minOrderAmount: coupon.minOrderAmount ?? 0,
        maxDiscount: coupon.maxDiscount ?? 0,
        startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().slice(0, 10) : "",
        expiryType: coupon.expiryType,
        expiryDate: coupon.expiryDate
          ? new Date(coupon.expiryDate).toISOString().slice(0, 10)
          : "",
        count: coupon.count ?? 100,
        usageLimitPerUser: coupon.usageLimitPerUser ?? 1,
        status: coupon.status !== false,
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        ...defaultForm,
        startDate: new Date().toISOString().slice(0, 10),
      });
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
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue) || 0,
      minOrderAmount: Number(formData.minOrderAmount) || 0,
      maxDiscount: Number(formData.maxDiscount) || 0,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      expiryType: formData.expiryType,
      count: Number(formData.count) || 100,
      usageLimitPerUser: Number(formData.usageLimitPerUser) || 1,
      status: formData.status,
    };
    if (formData.expiryType === "expiry_date" && formData.expiryDate) {
      const d = new Date(formData.expiryDate);
      d.setHours(23, 59, 59, 999);
      payload.expiryDate = d.toISOString();
    } else {
      payload.expiryDate = null;
    }
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponValidate(formData, setErrors, !!editingCoupon)) {
      toast.error("Please resolve the validation errors");
      return;
    }

    const payload = buildPayload();
    try {
      setSaving(true);
      if (editingCoupon) {
        await couponsAPI.update(editingCoupon._id, payload);
        toast.success("Coupon updated successfully");
      } else {
        await couponsAPI.create(payload);
        toast.success("Coupon created successfully");
      }
      handleCloseModal();
      fetchCoupons();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setCoupons((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: nextStatus } : c))
    );
    setTogglingId(id);

    try {
      await couponsAPI.updateStatus(id, nextStatus);
      toast.success(`Coupon ${nextStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      setCoupons((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: currentStatus } : c))
      );
      toast.error(getErrorMessage(error) || "Failed to update status");
    } finally {
      setTogglingId(null);
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
        subtitle="Manage discount coupons, redemption rules, and customer limits"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by coupon code..."
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
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition transform active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            <span>Add Coupon</span>
          </button>
        </div>

        {/* Coupons Table */}
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
                Create promotional coupons with percentage or flat discounts for checkout.
              </p>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 cursor-pointer"
              >
                <Plus size={16} /> Add Coupon
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Coupon Code</th>
                    <th className="py-3.5 px-4">Discount</th>
                    <th className="py-3.5 px-4">Min Order</th>
                    <th className="py-3.5 px-4">Validity</th>
                    <th className="py-3.5 px-4 text-center">Redemptions</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {coupons.map((coupon) => {
                    const isLive = coupon.status !== false;
                    return (
                      <tr key={coupon._id} className="hover:bg-slate-50/60 transition group">
                        {/* Coupon Code */}
                        <td className="py-4 px-4 font-semibold text-slate-800">
                          <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-md text-slate-800 border border-slate-200 text-xs font-bold">
                            {coupon.couponName}
                          </span>
                        </td>

                        {/* Discount */}
                        <td className="py-4 px-4 font-semibold text-emerald-600">
                          {formatDiscount(coupon)}
                        </td>

                        {/* Min Order */}
                        <td className="py-4 px-4 text-slate-600">
                          {coupon.minOrderAmount && coupon.minOrderAmount > 0 ? (
                            <span>₹{coupon.minOrderAmount.toLocaleString()}</span>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </td>

                        {/* Validity */}
                        <td className="py-4 px-4 text-slate-600 text-xs">
                          {formatExpiry(coupon)}
                        </td>

                        {/* Usage & Per-User Limit */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-medium text-slate-700">
                            {coupon.usedCount ?? 0} / {coupon.count}
                          </span>
                          <span className="block text-[11px] text-slate-400">
                            ({coupon.usageLimitPerUser ?? 1} per user)
                          </span>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            disabled={togglingId === coupon._id}
                            onClick={() => handleToggleStatus(coupon._id, isLive)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                              isLive ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                            title={isLive ? "Active - Click to Deactivate" : "Inactive - Click to Activate"}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                                isLive ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                          <span className="block text-[10px] font-bold text-slate-500 mt-0.5">
                            {isLive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(coupon)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                              title="Edit Coupon"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(coupon._id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              title="Delete Coupon"
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
                  className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={lazyParams.page * lazyParams.limit >= totalRecords}
                  onClick={() => setLazyParams((p) => ({ ...p, page: p.page + 1 }))}
                  className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
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
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                  </h3>
                  <p className="text-xs text-slate-500">Configure discount type, limits, and validity</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto grow">
              {/* Row 1: Code and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. FESTIVE20"
                    value={formData.couponName}
                    onChange={(e) =>
                      setFormData({ ...formData, couponName: e.target.value.toUpperCase() })
                    }
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                      errors.couponName ? "border-rose-400" : "border-slate-200"
                    }`}
                  />
                  {errors.couponName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.couponName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Status
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: !formData.status })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        formData.status ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                          formData.status ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm font-semibold text-slate-700">
                      {formData.status ? "Active (Can be applied)" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Discount Type and Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Discount Type *
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountType: e.target.value as "flat" | "percentage",
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="percentage">Percentage Discount (%)</option>
                    <option value="flat">Flat Discount Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {formData.discountType === "percentage" ? "Discount Percentage (%) *" : "Flat Discount (₹) *"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={formData.discountType === "percentage" ? 100 : undefined}
                    step="0.01"
                    placeholder={formData.discountType === "percentage" ? "15" : "200"}
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })
                    }
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                      errors.discountValue ? "border-rose-400" : "border-slate-200"
                    }`}
                  />
                  {errors.discountValue && (
                    <p className="text-xs text-rose-600 mt-1">{errors.discountValue}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Minimum Order & Max Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Minimum Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = No minimum"
                    value={formData.minOrderAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Order subtotal required to use coupon</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Maximum Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = No maximum cap"
                    value={formData.maxDiscount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxDiscount: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Max discount limit for percentage coupon</p>
                </div>
              </div>

              {/* Row 4: Start Date & Expiry Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="no_expiry">No Expiry (Always valid)</option>
                    <option value="expiry_date">Expiry Date</option>
                  </select>
                </div>
              </div>

              {/* Expiry Date (if expiry_date) */}
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

              {/* Row 5: Total Limit & Per Customer Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Total Redemption Limit *
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Usage Limit Per Customer *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.usageLimitPerUser}
                    onChange={(e) =>
                      setFormData({ ...formData, usageLimitPerUser: Number(e.target.value) || 1 })
                    }
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                      errors.usageLimitPerUser ? "border-rose-400" : "border-slate-200"
                    }`}
                  />
                  {errors.usageLimitPerUser && (
                    <p className="text-xs text-rose-600 mt-1">{errors.usageLimitPerUser}</p>
                  )}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition disabled:opacity-50 cursor-pointer"
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
