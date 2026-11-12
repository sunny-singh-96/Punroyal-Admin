"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RotateCcw,
  AlertTriangle,
  CreditCard,
  User,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Info,
  Hash,
  Copy,
  Check,
  Loader2,
  FileText
} from "lucide-react";
import { toast } from "react-hot-toast";
import { orderAPI } from "@/lib/integration/orders";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { ORDER_STATUS_CONFIG } from "@/components/admin/orders/utils";

interface Payment {
  amount: number;
  status: string;
}

type Size = {
  _id: string;
  name: string;
};

type Variant = {
  size?: Size;
};

type Product = {
  title: string;
  variants?: Variant[];
  media?: { url: string; color_id?: string; isPrimary?: boolean }[];
};

interface OrderItem {
  _id: string;
  order_id: string;
  product?: Product;
  product_type: string;
  product_id: string;
  size_id: string;
  color_id: string;
  quantity: number;
  price: number;
  status: string;
  metadata: {
    color?: {
      _id?: string;
      name?: string;
    } | string;
    size?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ShippingAddress {
  name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Order {
  _id: string;
  order_number: string;
  user_id: string;
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_status: string;
  total_amount: number;
  status: string;
  is_returned: boolean;
  createdAt: string;
  updatedAt?: string;
  items: OrderItem[];
  payment: Payment;
  htr_items: string[];
  awb?: string;
  courier_name?: string;
  shipment_id?: string;
  awb_res?: any;
  metadata?: Record<string, any>;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [copiedAwb, setCopiedAwb] = useState(false);
  const [copiedOrderNo, setCopiedOrderNo] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res: any = await orderAPI.getOrder(orderId);
      if (res?.code === "OK" || res?.data) {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (data) {
          setOrder(data);
        } else if (res && !res.data && res.order_number) {
          setOrder(res);
        }
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const copyToClipboard = (text: string, type: 'awb' | 'order') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'awb') {
      setCopiedAwb(true);
      setTimeout(() => setCopiedAwb(false), 2000);
    } else {
      setCopiedOrderNo(true);
      setTimeout(() => setCopiedOrderNo(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-indigo-600" size={36} />
        <p className="text-slate-500 font-medium text-sm">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
        <Package size={48} className="text-slate-300" />
        <h2 className="text-lg font-bold text-slate-700">Order Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          We couldn&apos;t retrieve the order information. It may have been removed or the ID is incorrect.
        </p>
        <button
          onClick={() => router.push("/orders")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
        >
          <ArrowLeft size={14} /> Back to Orders
        </button>
      </div>
    );
  }

  // Resolved Logistics
  const awb =
    order.awb ||
    order.metadata?.shiprocket?.awb ||
    order.awb_res?.response?.data?.awb_code ||
    order.awb_res?.awb_code;

  const courier =
    order.courier_name ||
    order.metadata?.shiprocket?.courier_name ||
    order.awb_res?.response?.data?.courier_name ||
    order.awb_res?.courier_name;

  const shipmentId =
    order.shipment_id ||
    order.metadata?.shiprocket?.shipment_id ||
    order.awb_res?.response?.data?.shipment_id;

  const isCancelled = order.status?.toLowerCase() === "cancelled";
  const isDelivered = order.status?.toLowerCase() === "delivered";

  const isPickedUp = Boolean(
    order.metadata?.physically_picked_up ||
    ["shipped", "picked_up", "in_transit", "out_for_delivery", "delivered"].includes(order.status?.toLowerCase() || "")
  );

  const statusKey = order.status?.toLowerCase() || "created";
  const cfg = ORDER_STATUS_CONFIG[statusKey] || {
    label: order.status || "Unknown",
    bg: "bg-slate-100",
    color: "text-slate-700",
    border: "border-slate-200"
  };

  const paymentEntity = order.metadata?.payment_entity;
  const customerEmail = paymentEntity?.email || order.shipping_address?.email;
  const customerPhone = order.shipping_address?.phone || paymentEntity?.contact;
  const customerName = order.shipping_address?.name || paymentEntity?.notes?.user_name || "Customer";

  const baseSubtotal = order.metadata?.total_base_amount
    ? Number(order.metadata.total_base_amount)
    : order.items?.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0) || Number(order.total_amount) || 0;

  const gstAmount = order.metadata?.total_gst_amount || order.metadata?.gst_total || 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Bar with Back Button & Badges */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push("/orders")}
          className="w-fit flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition group cursor-pointer"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Orders
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Order #{order.order_number}
              </h1>
              <button
                onClick={() => copyToClipboard(order.order_number, 'order')}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                title="Copy Order Number"
              >
                {copiedOrderNo ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
              <Calendar size={13} className="text-slate-400" />
              Placed on {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </p>
          </div>

          {/* Status Badges Row (NO Update Status Dropdown) */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Fulfillment State Badge */}
            <span
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 shadow-2xs ${
                isCancelled
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : isPickedUp
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isCancelled ? "bg-rose-500" : isPickedUp ? "bg-blue-500" : "bg-emerald-500"
                }`}
              ></span>
              {isCancelled
                ? "Cancelled"
                : isPickedUp
                ? "Handed Over to Courier (Locked)"
                : "In Warehouse (Cancellable)"}
            </span>

            {/* Order Status Badge */}
            <span
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl capitalize border shadow-2xs ${cfg.bg} ${cfg.color} ${cfg.border}`}
            >
              Status: {cfg.label}
            </span>

            {/* Payment Status Badge */}
            <span
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize border shadow-2xs ${
                order.payment_status?.toLowerCase() === "paid"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : order.payment_status?.toLowerCase() === "refunded"
                  ? "bg-purple-50 text-purple-700 border-purple-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              Payment: {order.payment_status || "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* CANCELLATION NOTICE BANNER (When Cancelled) */}
      {isCancelled && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0 mt-0.5">
              <XCircle size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-rose-950">This Order Has Been Cancelled</h3>
              <p className="text-xs text-rose-800 leading-relaxed">
                <b>Reason:</b> {order.metadata?.cancel_reason || "Cancelled by customer"}{" "}
                {order.metadata?.cancelled_at && (
                  <span>
                    • <b>Date:</b>{" "}
                    {new Date(order.metadata.cancelled_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                )}
                {order.metadata?.cancelled_by && (
                  <span> • <b>By:</b> {order.metadata.cancelled_by}</span>
                )}
              </p>
              {order.metadata?.carrier_cancel?.body?.message && (
                <p className="text-[11px] text-rose-700 font-mono mt-1">
                  Carrier status: {order.metadata.carrier_cancel.body.message}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/80 border border-rose-200 text-xs font-bold text-rose-700 shadow-2xs">
              Refund: {order.payment_status === "refunded" ? "Completed" : "Source Initiated"}
            </span>
          </div>
        </div>
      )}

      {/* DELIVERED SUCCESS BANNER (When Delivered) */}
      {isDelivered && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-emerald-950">Order Delivered Successfully</h3>
            <p className="text-xs text-emerald-800">
              The package was delivered to the customer destination.
            </p>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT / MAIN COLUMN: Items & Payment Breakdown (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* ORDER ITEMS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Package size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Ordered Products</h2>
                  <p className="text-xs text-slate-400">
                    {order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"} in this shipment
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                Total ₹{order.total_amount}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {order.items?.map((item: OrderItem, idx: number) => {
                const sizeName =
                  item.metadata?.size ||
                  (item.size_id
                    ? item.product?.variants?.find((v) => v.size?._id === item.size_id)?.size?.name
                    : null);

                const colorName =
                  typeof item.metadata?.color === "object"
                    ? item.metadata.color?.name
                    : typeof item.metadata?.color === "string"
                    ? item.metadata.color
                    : (item as any)?.color_id?.name || null;

                const itemImg =
                  item.metadata?.image ||
                  (item.product as any)?.media?.find((m: any) => m.color_id === item.color_id)?.url ||
                  (item.product as any)?.media?.[0]?.url ||
                  null;

                const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);

                return (
                  <div key={item._id || idx} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-slate-50/50 transition">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {itemImg ? (
                        <img
                          src={itemImg}
                          alt={item.product?.title || "Product"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={28} className="text-slate-300" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                        {item.product?.title || "Product Item"}
                      </h4>

                      {/* Variant Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        {colorName && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Color: {colorName}
                          </span>
                        )}

                        {sizeName && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                            Size: {sizeName}
                          </span>
                        )}

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Qty: {item.quantity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">
                        Unit Price: ₹{item.price} each
                      </p>
                    </div>

                    {/* Price & Line Status */}
                    <div className="sm:text-right shrink-0 pt-2 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                      <div className="text-base font-extrabold text-slate-900">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 capitalize px-2 py-0.5 bg-slate-100 rounded-md mt-1">
                        {item.status || order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FINANCIAL BREAKDOWN & PAYMENT CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CreditCard size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Payment & Financial Summary</h3>
                <p className="text-xs text-slate-400">Transaction details and invoice breakdown</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Calculations */}
              <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Base Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{Number(baseSubtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Estimated GST:</span>
                  <span className="font-semibold text-slate-900">₹{Number(gstAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Shipping & Delivery:</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                  <span>Grand Total:</span>
                  <span className="text-base text-indigo-700">₹{order.total_amount}</span>
                </div>
              </div>

              {/* Gateway & Payment IDs */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-bold">Payment Method</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {order.payment_method || "RAZORPAY"}
                  </p>
                </div>

                {paymentEntity?.id && (
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-bold">Payment ID (Razorpay)</span>
                    <p className="font-mono text-indigo-600 font-bold mt-0.5 select-all">
                      {paymentEntity.id}
                    </p>
                  </div>
                )}

                {paymentEntity?.vpa && (
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-bold">UPI VPA</span>
                    <p className="font-medium text-slate-800 mt-0.5">
                      {paymentEntity.vpa}
                    </p>
                  </div>
                )}

                {paymentEntity?.acquirer_data?.rrn && (
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-bold">Bank RRN Number</span>
                    <p className="font-mono text-slate-700 mt-0.5">
                      {paymentEntity.acquirer_data.rrn}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-bold">Payment Status</span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-emerald-100 text-emerald-800">
                    {order.payment_status || "PAID"}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN: Customer, Shipping, Courier & Metadata (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* CUSTOMER CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                {customerName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{customerName}</h3>
                <p className="text-xs text-slate-400">Customer</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              {customerPhone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <a href={`tel:${customerPhone}`} className="hover:text-indigo-600 font-medium">
                    {customerPhone}
                  </a>
                </div>
              )}

              {customerEmail && (
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <a href={`mailto:${customerEmail}`} className="hover:text-indigo-600 font-medium truncate">
                    {customerEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* SHIPPING ADDRESS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-3">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <MapPin size={16} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Shipping Address</h3>
            </div>

            <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
              <p className="font-bold text-slate-900 text-sm">{order.shipping_address?.name}</p>
              {order.shipping_address?.phone && <p>Phone: {order.shipping_address.phone}</p>}
              <p>{order.shipping_address?.address_line1}</p>
              {order.shipping_address?.address_line2 && <p>{order.shipping_address.address_line2}</p>}
              <p className="font-semibold text-slate-800">
                {order.shipping_address?.city}, {order.shipping_address?.state} - {order.shipping_address?.pincode}
              </p>
              <p>{order.shipping_address?.country || "India"}</p>
            </div>
          </div>

          {/* COURIER & AWB LOGISTICS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Truck size={16} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Logistics & Tracking</h3>
                <p className="text-[11px] text-slate-400">Carrier dispatch details</p>
              </div>
            </div>

            {awb || courier ? (
              <div className="space-y-3">
                <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs space-y-2">
                  {courier && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Assigned Courier</span>
                      <p className="font-bold text-slate-800 text-sm">{courier}</p>
                    </div>
                  )}

                  {awb && (
                    <div className="pt-2 border-t border-indigo-100/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AWB Number</span>
                        <button
                          onClick={() => copyToClipboard(awb, 'awb')}
                          className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedAwb ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          {copiedAwb ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="font-mono text-indigo-700 font-bold text-sm tracking-wide mt-0.5 select-all">
                        {awb}
                      </p>
                    </div>
                  )}

                  {shipmentId && (
                    <div className="text-[11px] text-slate-500 pt-1">
                      Shipment ID: <span className="font-mono font-medium text-slate-700">{shipmentId}</span>
                    </div>
                  )}
                </div>

                {awb && (
                  <a
                    href={`https://punroyal.com/track-awb?awb=${encodeURIComponent(awb)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    Track Package on Storefront <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-4 px-2 text-slate-400 space-y-1">
                <Truck size={28} className="mx-auto text-slate-300" />
                <p className="text-xs font-medium text-slate-600">AWB Not Yet Generated</p>
                <p className="text-[11px]">Courier details will appear here once the shipment is processed.</p>
              </div>
            )}
          </div>

          {/* SYSTEM INFO & ORDER METADATA CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-2.5 text-xs text-slate-500">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info size={13} className="text-slate-400" /> Order Information
            </h4>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Checkout Type:</span>
              <span className="font-bold text-slate-800">{order.metadata?.is_buy_now ? "Buy Now (Direct)" : "Cart Checkout"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Currency:</span>
              <span className="font-semibold text-slate-700">INR (₹)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Order MongoDB ID:</span>
              <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">{order._id}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
