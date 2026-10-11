"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Wallet,
  Package,
  CheckCircle2,
  Clock,
  UploadCloud,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import Modal from "@/components/admin/shared/Modal";
import { influencerAPI, InfluencerSaleItem } from "@/lib/integration/influencer";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { resolveApiAssetUrl } from "@/lib/helpers/assetUrl";

export default function AdminInfluencerPaymentsPage() {
  const params = useParams();
  const router = useRouter();
  const modelId = String(params?.id || "");

  const [loading, setLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(false);
  const [influencerName, setInfluencerName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [showQrPreview, setShowQrPreview] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const [sales, setSales] = useState<InfluencerSaleItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [markPaidItem, setMarkPaidItem] = useState<InfluencerSaleItem | null>(null);
  const [paymentNotes, setPaymentNotes] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [markingPaid, setMarkingPaid] = useState(false);

  const formatINR = (num: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(num || 0);

  const loadPaymentDetails = useCallback(async () => {
    if (!modelId) return;
    try {
      const res: any = await influencerAPI.getPaymentDetails({ modelId });
      const data = res?.data || res;
      setInfluencerName(data?.influencer?.name || data?.model?.name || "Influencer");
      setUpiId(data?.payment_upi_id || "");
      setQrUrl(data?.payment_qr_code_url || "");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [modelId]);

  const loadSales = useCallback(async () => {
    if (!modelId) return;
    try {
      setSalesLoading(true);
      const res: any = await influencerAPI.getSales({
        modelId,
        page,
        limit,
        startDate: appliedStart || undefined,
        endDate: appliedEnd || undefined,
      });
      const raw: InfluencerSaleItem[] =
        (Array.isArray(res?.data) ? res.data : null) ||
        (Array.isArray(res?.data?.data) ? res.data.data : null) ||
        [];
      setSales(raw);
      setTotalRecords(res?.totalRecords ?? res?.data?.totalRecords ?? raw.length);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setSales([]);
    } finally {
      setSalesLoading(false);
    }
  }, [modelId, page, limit, appliedStart, appliedEnd]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadPaymentDetails();
      setLoading(false);
    })();
  }, [loadPaymentDetails]);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  const handleApplyDates = () => {
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    setPage(1);
  };

  const handleMarkPaid = async () => {
    if (!markPaidItem) return;
    try {
      setMarkingPaid(true);
      const fd = new FormData();
      fd.append("modelId", modelId);
      if (paymentNotes.trim()) fd.append("payment_notes", paymentNotes.trim());
      if (receiptFile) fd.append("payment_receipt", receiptFile);
      await influencerAPI.markOrderItemPaid(markPaidItem._id, fd);
      toast.success("Transaction marked as paid");
      setMarkPaidItem(null);
      setPaymentNotes("");
      setReceiptFile(null);
      await loadSales();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setMarkingPaid(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));
  const qrSrc = resolveApiAssetUrl(qrUrl);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title={`Payments — ${influencerName}`} />
      <div className="p-4 max-w-7xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => router.push("/admin/influencers")}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} /> Back to Influencers
        </button>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Wallet size={18} className="text-blue-600" /> Payment Details
            </h2>
            {!upiId && !qrUrl ? (
              <p className="text-sm text-slate-500 italic">
                This influencer has not added a UPI ID or QR code yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-6 items-start">
                {upiId && (
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 mb-1">UPI ID</p>
                    <p className="text-base font-bold text-slate-900 font-mono">{upiId}</p>
                  </div>
                )}
                {qrSrc && (
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 mb-1">QR Code</p>
                    <div
                      className="relative w-20 h-20 rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                      onMouseEnter={() => setShowQrPreview(true)}
                      onMouseLeave={() => setShowQrPreview(false)}
                    >
                      <Image src={qrSrc} alt="Payment QR" fill className="object-contain p-0.5" unoptimized />
                      {showQrPreview && (
                        <div className="fixed z-[300] pointer-events-none" style={{ marginTop: "-8rem", marginLeft: "5rem" }}>
                          <div className="relative w-56 h-56 rounded-xl border-2 border-blue-300 shadow-2xl bg-white p-2">
                            <Image src={qrSrc} alt="QR preview" fill className="object-contain" unoptimized />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-end gap-3 justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
              <p className="text-xs text-slate-500">Commission sales for this influencer</p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyDates}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setAppliedStart("");
                  setAppliedEnd("");
                  setPage(1);
                }}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
              >
                Reset
              </button>
              <button type="button" onClick={loadSales} className="p-2 border border-slate-200 rounded-lg" title="Refresh">
                <RefreshCw size={16} className={salesLoading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {salesLoading ? (
            <div className="py-16 text-center text-slate-500 text-sm">Loading transactions...</div>
          ) : sales.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">No transactions found for this period.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b text-[11px] font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4 text-right">Sale</th>
                    <th className="py-3 px-4 text-right">Commission</th>
                    <th className="py-3 px-4 text-center">Commission Status</th>
                    <th className="py-3 px-4 text-center">Payment Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-blue-600">{item.order_number}</td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {item.sale_date ? format(new Date(item.sale_date), "dd MMM yyyy, hh:mm a") : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 min-w-[160px]">
                          <div className="w-8 h-8 rounded bg-slate-100 border overflow-hidden relative shrink-0">
                            {item.product_image ? (
                              <Image src={item.product_image} alt="" fill className="object-cover" sizes="32px" />
                            ) : (
                              <Package size={14} className="m-auto text-slate-300" />
                            )}
                          </div>
                          <span className="font-semibold text-slate-800 truncate">{item.product_name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-bold">{formatINR(item.sale_amount)}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">{formatINR(item.commission)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.commission_status || "Earned"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.payout_status === "Paid" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <CheckCircle2 size={11} /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <Clock size={11} /> Unpaid
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {item.payout_status !== "Paid" && item.commission_status !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => {
                              setMarkPaidItem(item);
                              setPaymentNotes("");
                              setReceiptFile(null);
                            }}
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-[11px] font-bold hover:bg-green-700"
                          >
                            Mark as Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalRecords > limit && (
            <div className="p-4 border-t flex justify-between items-center text-xs text-slate-500">
              <span>
                Page {page} of {totalPages} ({totalRecords} entries)
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={Boolean(markPaidItem)}
        onClose={() => !markingPaid && setMarkPaidItem(null)}
        title={markPaidItem ? `Mark as Paid — ${markPaidItem.order_number}` : "Mark as Paid"}
        type="custom"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Commission: <strong className="text-emerald-600">{formatINR(markPaidItem?.commission || 0)}</strong>
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Payment Receipt (optional)</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50">
              <UploadCloud className="text-slate-400 mb-1" size={22} />
              <span className="text-[11px] text-slate-500">{receiptFile ? receiptFile.name : "Upload image or PDF (max 5MB)"}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="hidden"
                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Payment Notes (optional)</label>
            <textarea
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="UPI reference, bank transfer ID, etc."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setMarkPaidItem(null)}
              disabled={markingPaid}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleMarkPaid}
              disabled={markingPaid}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-50"
            >
              {markingPaid ? "Saving..." : "Confirm Paid"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
