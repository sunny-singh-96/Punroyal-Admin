"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Wallet, UploadCloud, Trash2, Save, QrCode } from "lucide-react";
import { influencerAPI } from "@/lib/integration/influencer";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { resolveApiAssetUrl } from "@/lib/helpers/assetUrl";

export default function InfluencerGetPaidPage() {
  const [loading, setLoading] = useState(true);
  const [savingUpi, setSavingUpi] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);
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

  const handleSaveUpi = async () => {
    try {
      setSavingUpi(true);
      await influencerAPI.updatePaymentDetails({ upi_id: upiId.trim() });
      setSavedUpiId(upiId.trim());
      toast.success("UPI ID saved");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSavingUpi(false);
    }
  };

  const handleQrSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|jpg|png|webp)$/i.test(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("QR code image must be 5MB or smaller");
      return;
    }
    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
  };

  const handleUploadQr = async () => {
    if (!qrFile) {
      toast.error("Select a QR code image to upload");
      return;
    }
    try {
      setUploadingQr(true);
      const fd = new FormData();
      fd.append("qr_code", qrFile);
      const res: any = await influencerAPI.uploadPaymentQrCode(fd);
      const data = res?.data || res;
      const url = data?.payment_qr_code_url || "";
      setSavedQrUrl(url);
      setQrPreview(url ? resolveApiAssetUrl(url) : "");
      setQrFile(null);
      toast.success("QR code saved");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploadingQr(false);
    }
  };

  const handleRemoveQr = async () => {
    try {
      setUploadingQr(true);
      await influencerAPI.updatePaymentDetails({ remove_qr: true });
      setSavedQrUrl("");
      setQrPreview("");
      setQrFile(null);
      toast.success("QR code removed");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploadingQr(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Wallet className="text-purple-600" size={26} />
          Get Paid
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Add your UPI ID and/or payment QR code so admins can pay your commissions. Both fields are optional.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-500">Loading payment details...</div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider">UPI ID</h2>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveUpi}
                disabled={savingUpi || upiId.trim() === savedUpiId}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 disabled:opacity-50"
              >
                <Save size={16} />
                {savingUpi ? "Saving..." : "Save UPI ID"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <QrCode size={16} /> Payment QR Code
            </h2>

            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition">
              <UploadCloud className="text-slate-400 mb-2" size={28} />
              <span className="text-xs font-semibold text-slate-600">Click to upload QR image (JPG, PNG, WebP — max 5MB)</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleQrSelect} />
            </label>

            {qrPreview && (
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative w-32 h-32 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                  <Image src={qrPreview} alt="Payment QR" fill className="object-contain p-1" unoptimized />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleUploadQr}
                    disabled={!qrFile || uploadingQr}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 disabled:opacity-50"
                  >
                    {uploadingQr ? "Uploading..." : "Save QR Code"}
                  </button>
                  {savedQrUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveQr}
                      disabled={uploadingQr}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50"
                    >
                      <Trash2 size={16} /> Remove saved QR
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
