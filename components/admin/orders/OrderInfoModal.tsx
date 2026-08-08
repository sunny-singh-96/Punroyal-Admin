"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: any;
};

export default function OrderInfoModal({ isOpen, onClose, order }: Props) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">

          {/* Shipping Address */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">
              Shipping Address
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
              <p><strong>{order.shipping_address?.name}</strong></p>
              <p>{order.shipping_address?.phone}</p>
              <p>{order.shipping_address?.address_line1}</p>
              <p>{order.shipping_address?.address_line2}</p>
              <p>
                {order.shipping_address?.city}, {order.shipping_address?.state}
              </p>
              <p>
                {order.shipping_address?.pincode}, {order.shipping_address?.country}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">
              Payment Details
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
              <p>
                <strong>Method:</strong> {order.payment_method}
              </p>
              <p>
                <strong>Status:</strong> {order.payment_status}
              </p>
              <p>
                <strong>Amount:</strong> ₹{(order.payment?.amount || 0) / 100}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}