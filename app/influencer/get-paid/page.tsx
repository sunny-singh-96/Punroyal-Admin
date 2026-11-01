"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Wallet, UploadCloud, Save, QrCode, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { influencerAPI } from "@/lib/integration/influencer";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { resolveApiAssetUrl } from "@/lib/helpers/assetUrl";

export default function InfluencerGetPaidPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [savedUpiId, setSavedUpiId] = useState("");
  const [qrPreview, setQrPreview] = useState("");
  const [savedQrUrl, setSavedQrUrl] = useState("");
  const [qrFile, setQrFile] = useState<File | null>(null);

  const loadDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await influencerAPI.getPaymentDetails();
      const data = res?.data || res;
      const upi = data?.payment_upi_id || "";
      const qr = data?.payment_qr_code_url || "";
      setUpiId(upi);
      setSavedUpiId(upi);
      setSavedQrUrl(qr);
      setQrPreview(qr ? resolveApiAssetUrl(qr) : "");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const handleQrSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|jpg|png|webp)$/i.test(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("QR code scanner image must be 5MB or smaller");
      return;
    }
    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
  };

  const handleSavePaymentDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanUpi = upiId.trim();

    // 1. Validate UPI ID (Required)
    if (!cleanUpi) {
      toast.error("UPI ID is required!");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(cleanUpi)) {
      toast.error("Please enter a valid UPI ID (e.g. yourname@okhdfcbank)");
      return;
    }

    // 2. Validate Payment QR Code Scanner (Required)
    const hasExistingQr = Boolean(savedQrUrl && savedQrUrl.trim());
    if (!qrFile && !hasExistingQr) {
      toast.error("Payment QR code scanner image is required!");
      return;
    }

    try {
      setSaving(true);

      if (qrFile) {
        // Upload new QR code file and also include upi_id
        const fd = new FormData();
        fd.append("qr_code", qrFile);
        fd.append("upi_id", cleanUpi);
        const res: any = await influencerAPI.uploadPaymentQrCode(fd);
        const data = res?.data || res;
        const newQrUrl = data?.payment_qr_code_url || "";
        if (newQrUrl) {
          setSavedQrUrl(newQrUrl);
          setQrPreview(resolveApiAssetUrl(newQrUrl));
        }
        setQrFile(null);
      }

      // Always sync UPI ID to ensure consistency
      await influencerAPI.updatePaymentDetails({ upi_id: cleanUpi });
      setSavedUpiId(cleanUpi);

      toast.success("Payment details saved successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const hasQrImage = Boolean(qrPreview || savedQrUrl);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Wallet className="text-purple-600" size={26} />
          Payment Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Set up your payout details so admins can transfer your commission earnings. Both your UPI ID and Payment QR Scanner are required.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
          <RefreshCw className="animate-spin text-purple-600" size={24} />
          Loading payment details...
        </div>
      ) : (
        <form onSubmit={handleSavePaymentDetails} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <QrCode size={18} className="text-purple-600" />
                Payout Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Both fields marked with <span className="text-rose-500 font-bold">*</span> are required.
              </p>
            </div>

            {/* Field 1: UPI ID */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                UPI ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. username@okhdfcbank"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <p className="text-xs text-slate-400">
                Enter your Google Pay, PhonePe, Paytm, or BHIM UPI ID.
              </p>
            </div>

            {/* Field 2: QR Scanner Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Payment QR Scanner Image <span className="text-rose-500">*</span>
                </label>
                {hasQrImage && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 size={12} />
                    {qrFile ? "New file chosen" : "QR Saved"}
                  </span>
                )}
              </div>

              <label className="flex flex-col items-center justify-center w-full min-h-[140px] p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition">
                <UploadCloud className="text-slate-400 mb-2" size={32} />
                <span className="text-xs font-semibold text-slate-700">
                  {hasQrImage ? "Click to change / upload new QR Scanner image" : "Click to upload QR Scanner image (JPG, PNG, WebP)"}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">Maximum size allowed: 5MB</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleQrSelect}
                />
              </label>

              {/* QR Preview Box */}
              {qrPreview && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 mt-3">
                  <div className="relative w-24 h-24 rounded-lg border border-slate-300 overflow-hidden bg-white shrink-0 shadow-xs">
                    <Image
                      src={qrPreview}
                      alt="Payment QR Scanner"
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">
                      {qrFile ? qrFile.name : "Saved QR Scanner"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {qrFile
                        ? `${(qrFile.size / 1024).toFixed(1)} KB — Ready to save`
                        : "Currently active payment scanner on file"}
                    </p>
                    {qrFile && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pending Save
                      </span>
                    )}
                  </div>
                </div>
              )}

              {!hasQrImage && (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>A payment QR code scanner image is mandatory to receive commission payouts.</span>
                </div>
              )}
            </div>

            {/* Single Save Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving || (!upiId.trim() || (!qrFile && !savedQrUrl))}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {saving ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Saving Payment Details...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Payment Details
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
