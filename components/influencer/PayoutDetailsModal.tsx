"use client";

import React from "react";
import Image from "next/image";
import Modal from "@/components/admin/shared/Modal";
import { resolveApiAssetUrl } from "@/lib/helpers/assetUrl";
import { FileText } from "lucide-react";

interface PayoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  payoutReceiptUrl?: string;
  payoutNotes?: string;
  payoutAt?: string | null;
}

export default function PayoutDetailsModal({
  isOpen,
  onClose,
  orderNumber,
  payoutReceiptUrl,
  payoutNotes,
  payoutAt,
}: PayoutDetailsModalProps) {
  const receiptSrc = resolveApiAssetUrl(payoutReceiptUrl);
  const hasReceipt = Boolean(receiptSrc);
  const hasNotes = Boolean(payoutNotes?.trim());

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={orderNumber ? `Payment Details — ${orderNumber}` : "Payment Details"}
      type="custom"
    >
      <div className="space-y-4">
        {payoutAt && (
          <p className="text-xs text-slate-500">
            Marked paid on{" "}
            <span className="font-semibold text-slate-700">
              {new Date(payoutAt).toLocaleString("en-IN")}
            </span>
          </p>
        )}

        {!hasReceipt && !hasNotes ? (
          <div className="py-8 text-center text-sm text-slate-500">
            This payment was recorded without a receipt or notes.
          </div>
        ) : (
          <>
            {hasReceipt && (
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2 border-b border-slate-200">
                  Payment Receipt
                </p>
                <div className="p-3 flex justify-center">
                  {payoutReceiptUrl?.toLowerCase().endsWith(".pdf") ? (
                    <a
                      href={receiptSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline"
                    >
                      <FileText size={16} /> View PDF receipt
                    </a>
                  ) : (
                    <div className="relative w-full max-w-md aspect-[4/3]">
                      <Image
                        src={receiptSrc}
                        alt="Payment receipt"
                        fill
                        className="object-contain rounded-lg"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasNotes && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Payment Notes
                </p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{payoutNotes}</p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
