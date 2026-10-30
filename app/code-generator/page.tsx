"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Sparkles,
  Copy,
  Check,
  Edit2,
  Trash2,
  Search,
  RefreshCw,
  Plus,
  X,
  KeyRound,
  Percent,
  Coins,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { codesAPI, type CodePayload } from "@/lib/integration/codes";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

interface RandomCodeItem {
  _id: string;
  code: string;
  name: string;
  description?: string;
  length: number;
  discountType?: "flat" | "percentage";
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount?: number;
  status: boolean;
  expiryDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

const PRESET_LENGTHS = [6, 8, 10, 12];

export default function CodeGeneratorPage() {
  // Generator State
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLength, setSelectedLength] = useState(8);
  const [customPrefix, setCustomPrefix] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "flat">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(0);
  const [usageLimit, setUsageLimit] = useState<number>(100);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Table State
  const [codes, setCodes] = useState<RandomCodeItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 15, search: "" });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<RandomCodeItem | null>(null);
  const [editFormData, setEditFormData] = useState<CodePayload>({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 0,
    maxDiscount: 0,
    usageLimit: 100,
    status: true,
  });

  // Generate random code handler
  const handleGenerate = async (len = selectedLength, prefix = customPrefix) => {
    try {
      setGenerating(true);
      const res = await codesAPI.generate(len, prefix);
      if (res?.code === "OK" && res.data?.code) {
        setCode(res.data.code);
        toast.success(`Generated ${res.data.code.length}-character unique code!`);
      } else {
        // Fallback generator client-side
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const cleanPrefix = (prefix || "").trim().toUpperCase();
        const randLen = Math.max(2, len - cleanPrefix.length);
        let randStr = cleanPrefix;
        for (let i = 0; i < randLen; i++) {
          randStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(randStr.slice(0, len));
        toast.success(`Generated ${len}-character code!`);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to generate code");
    } finally {
      setGenerating(false);
    }
  };

  // Generate an initial code on mount
  useEffect(() => {
    handleGenerate(8);
  }, []);

  // Fetch codes list
  const fetchCodes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await codesAPI.getAll(lazyParams);
      if (res?.code === "OK") {
        setCodes(res.data || []);
        setTotalRecords(res.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to load codes");
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCodes();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchCodes]);

  // Save new code
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    const cleanName = name.trim();

    if (!cleanCode) {
      toast.error("Please enter or generate a code");
      return;
    }
    if (!cleanName) {
      toast.error("Please enter a name / label to identify this code");
      return;
    }

    try {
      setSaving(true);
      const payload: CodePayload = {
        code: cleanCode,
        name: cleanName,
        description: description.trim(),
        length: cleanCode.length,
        discountType,
        discountValue: Number(discountValue) || 0,
        minOrderAmount: Number(minOrderAmount) || 0,
        usageLimit: Number(usageLimit) || 100,
        status: isActive,
      };

      const res = await codesAPI.create(payload);
      if (res?.code === "OK") {
        toast.success(`Code '${cleanCode}' saved successfully!`);
        setName("");
        setDescription("");
        // Generate a new code for next creation
        handleGenerate(selectedLength);
        fetchCodes();
      } else {
        throw new Error(res?.message || "Failed to save code");
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to save code");
    } finally {
      setSaving(false);
    }
  };

  // Copy code to clipboard
  const handleCopy = (codeText: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedId(id);
      toast.success(`Copied '${codeText}' to clipboard!`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Status toggle
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    // Optimistic UI update
    setCodes((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: nextStatus } : c))
    );
    setTogglingId(id);

    try {
      await codesAPI.updateStatus(id, nextStatus);
      toast.success(`Code ${nextStatus ? "activated" : "deactivated"}`);
      fetchCodes();
    } catch (error) {
      // Rollback
      setCodes((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: currentStatus } : c))
      );
      toast.error(getErrorMessage(error) || "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  // Delete code
  const handleDelete = async (id: string, codeName: string) => {
    const isConfirmed = await confirmDelete(`Delete code '${codeName}'? This action cannot be undone.`);
    if (!isConfirmed) return;

    try {
      await codesAPI.delete(id);
      setCodes((prev) => prev.filter((c) => c._id !== id));
      setTotalRecords((prev) => Math.max(0, prev - 1));
      toast.success("Code deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to delete code");
    }
  };

  // Open edit modal
  const handleOpenEdit = (item: RandomCodeItem) => {
    setEditingCode(item);
    setEditFormData({
      code: item.code,
      name: item.name,
      description: item.description || "",
      discountType: item.discountType || "percentage",
      discountValue: item.discountValue ?? 10,
      minOrderAmount: item.minOrderAmount ?? 0,
      maxDiscount: item.maxDiscount ?? 0,
      usageLimit: item.usageLimit ?? 100,
      status: item.status !== false,
    });
    setIsEditModalOpen(true);
  };

  // Save edit update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCode) return;

    const cleanCode = (editFormData.code || "").trim().toUpperCase();
    const cleanName = (editFormData.name || "").trim();

    if (!cleanCode) {
      toast.error("Code cannot be empty");
      return;
    }
    if (!cleanName) {
      toast.error("Name / label is required");
      return;
    }

    try {
      setSaving(true);
      const res = await codesAPI.update(editingCode._id, {
        ...editFormData,
        code: cleanCode,
        name: cleanName,
      });

      if (res?.code === "OK") {
        toast.success("Code updated successfully");
        setIsEditModalOpen(false);
        setEditingCode(null);
        fetchCodes();
      } else {
        throw new Error(res?.message || "Failed to update code");
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update code");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHeader
        title="Random Code Generator"
        subtitle="Generate unique alphanumeric codes, save custom promo/referral codes, and manage active codes for frontend customer checkout."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* ── TOP: Generator & Creator Card ─────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900/40 p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Code Generator Studio</h2>
                  <p className="text-xs text-slate-300">
                    Generate unique alphanumeric codes of customizable length or enter your own custom code.
                  </p>
                </div>
              </div>

              {/* Length Pills */}
              <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
                <span className="text-slate-400 px-2 font-medium">Length:</span>
                {PRESET_LENGTHS.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => {
                      setSelectedLength(len);
                      handleGenerate(len, customPrefix);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      selectedLength === len
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                    }`}
                  >
                    {len} chars
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Code Preview & Input */}
              <div className="lg:col-span-6 space-y-2">
                <label className="block text-sm font-semibold text-slate-800">
                  Generated / Custom Code <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="E.g. PUNROYAL2026 or click Generate"
                    className="w-full pl-11 pr-28 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl text-lg font-mono font-bold tracking-wider text-slate-900 transition-all uppercase placeholder:normal-case placeholder:font-normal placeholder:text-sm placeholder:text-slate-400"
                    required
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleGenerate(selectedLength, customPrefix)}
                      disabled={generating}
                      title="Generate new unique random code"
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
                      <span>{generating ? "..." : "Generate"}</span>
                    </button>
                    {code && (
                      <button
                        type="button"
                        onClick={() => handleCopy(code, "preview")}
                        title="Copy code"
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-all"
                      >
                        {copiedId === "preview" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span>Current length: <strong className="text-slate-700">{code.length}</strong> characters.</span>
                  <span>Alphanumeric, guaranteed collision-free.</span>
                </p>
              </div>

              {/* Name / Label */}
              <div className="lg:col-span-6 space-y-2">
                <label className="block text-sm font-semibold text-slate-800">
                  Name / Label <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Diwali Flash Sale, Influencer Samayra, VIP Welcome"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                  required
                />
                <p className="text-xs text-slate-500">
                  Human-readable identifier for tracking this campaign or promotional code.
                </p>
              </div>
            </div>

            {/* Optional Prefix & Advanced Parameters Accordion / Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
              {/* Custom Prefix */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Optional Prefix
                </label>
                <input
                  type="text"
                  value={customPrefix}
                  onChange={(e) => setCustomPrefix(e.target.value.toUpperCase())}
                  placeholder="e.g. PUN, VIP"
                  className="w-full px-3 py-2 text-xs font-mono uppercase bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white"
                />
              </div>

              {/* Discount Type & Value */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Discount Offer
                </label>
                <div className="flex gap-1.5">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percentage" | "flat")}
                    className="w-24 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 font-semibold"
                  >
                    <option value="percentage">% Off</option>
                    <option value="flat">₹ Flat</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 font-bold"
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Min Order & Usage Limit */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Min Order Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={minOrderAmount}
                  onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                  placeholder="0 (No minimum)"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Usage Limit (Redemptions)
                </label>
                <input
                  type="number"
                  min="1"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  placeholder="100"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500"
                />
              </div>
            </div>

            {/* Description & Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
                <span className="text-xs font-semibold text-slate-700">
                  {isActive ? "Active (Usable on Frontend Checkout)" : "Inactive (Draft)"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setDescription("");
                    handleGenerate(selectedLength);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 text-amber-400" />
                  )}
                  <span>{saving ? "Saving to Database..." : "Save Code to Database"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ── BOTTOM: Saved Codes Data Table ────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>All Saved Codes</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                  {totalRecords} Total
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved codes are validated in real-time during customer checkout on the website.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={lazyParams.search}
                onChange={(e) =>
                  setLazyParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                }
                placeholder="Search code or label..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Name / Label</th>
                  <th className="py-3.5 px-4">Discount</th>
                  <th className="py-3.5 px-4">Min Order</th>
                  <th className="py-3.5 px-4">Redemptions</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-500" />
                      Loading saved codes...
                    </td>
                  </tr>
                ) : codes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500">
                      <KeyRound className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700">No codes found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Use the generator above to create and save your first code.
                      </p>
                    </td>
                  </tr>
                ) : (
                  codes.map((item) => {
                    const isLive = item.status !== false;
                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Code + 1-Click Copy */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 tracking-wider">
                              {item.code}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.code, item._id)}
                              title="Copy code to clipboard"
                              className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-800 transition-colors"
                            >
                              {copiedId === item._id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                            {item.length || item.code.length} chars
                          </span>
                        </td>

                        {/* Name / Label */}
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{item.name}</p>
                          {item.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
                          )}
                        </td>

                        {/* Discount */}
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {item.discountType === "flat" ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                              ₹{item.discountValue} Flat
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                              {item.discountValue}% Off
                            </span>
                          )}
                        </td>

                        {/* Min Order */}
                        <td className="py-3.5 px-4 text-slate-600">
                          {item.minOrderAmount ? `₹${item.minOrderAmount}` : "None"}
                        </td>

                        {/* Redemptions */}
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="font-medium">{item.usedCount || 0}</span> / {item.usageLimit || 100}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(item._id, isLive)}
                            disabled={togglingId === item._id}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                              isLive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isLive ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                            />
                            <span>{isLive ? "Active" : "Inactive"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              title="Edit Code"
                              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id, item.code)}
                              title="Delete Code"
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalRecords > lazyParams.limit && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing {(lazyParams.page - 1) * lazyParams.limit + 1} to{" "}
                {Math.min(lazyParams.page * lazyParams.limit, totalRecords)} of {totalRecords}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={lazyParams.page === 1}
                  onClick={() =>
                    setLazyParams((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
                  }
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg font-medium transition-all"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={lazyParams.page * lazyParams.limit >= totalRecords}
                  onClick={() =>
                    setLazyParams((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg font-medium transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── EDIT CODE MODAL ────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit Code Details</h3>
                <p className="text-xs text-slate-500">Update code, label name, or discount limits.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.code}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))
                  }
                  className="w-full px-3 py-2 text-sm font-mono font-bold uppercase bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name / Label <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Discount Offer
                  </label>
                  <div className="flex gap-1">
                    <select
                      value={editFormData.discountType}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          discountType: e.target.value as "percentage" | "flat",
                        }))
                      }
                      className="w-20 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                    >
                      <option value="percentage">% Off</option>
                      <option value="flat">₹ Flat</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      value={editFormData.discountValue}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          discountValue: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editFormData.minOrderAmount}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        minOrderAmount: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editFormData.usageLimit}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        usageLimit: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editFormData.status ? "true" : "false"}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, status: e.target.value === "true" }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  >
                    <option value="true">Active (Usable on Site)</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Update Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

