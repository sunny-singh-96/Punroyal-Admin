"use client";
import React, { useEffect } from "react";
import { AlertCircle, X, AlertTriangle } from "lucide-react";

interface ErrorAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  errors: string[];
}

export default function ErrorAlertModal({
  isOpen,
  onClose,
  title = "Please Fix The Following Errors",
  errors,
}: ErrorAlertModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !errors || errors.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-rose-100 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-rose-50/80 px-6 py-5 border-b border-rose-100 flex items-start gap-4">
          <div className="p-2.5 bg-rose-500 text-white rounded-2xl shadow-md shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-black text-rose-950 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-rose-700/90 mt-0.5">
              The product cannot be saved until all required fields are correctly completed.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-100 rounded-xl transition-all"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error Items List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2.5">
          {errors.map((err, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-xs sm:text-sm text-rose-900 font-medium"
            >
              <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{err}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all tracking-wide uppercase"
          >
            Got It, I'll Fix It
          </button>
        </div>
      </div>
    </div>
  );
}
