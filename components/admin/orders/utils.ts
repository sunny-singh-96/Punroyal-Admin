import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  XCircle,
  FileText,
  AlertTriangle,
  RotateCcw,
  CalendarClock,
  PackageCheck,
} from 'lucide-react';

export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string; icon: any }
> = {
  pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
  created: { label: 'Created', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', icon: Clock },
  new: { label: 'New', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: CheckCircle2 },
  invoiced: { label: 'Invoiced', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', icon: FileText },
  processing: { label: 'Processing', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: Package },
  ready_to_ship: { label: 'Ready to Ship', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', icon: PackageCheck },
  pickup_scheduled: { label: 'Pickup Scheduled', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CalendarClock },
  shipped: { label: 'Shipped', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: Truck },
  in_transit: { label: 'In Transit', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: XCircle },
  payment_failed: { label: 'Payment Failed', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
  return_requested: { label: 'Return Requested', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle },
  returned: { label: 'Returned', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', icon: RotateCcw },
  rto_initiated: { label: 'RTO Initiated', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: RotateCcw },
  rto_delivered: { label: 'RTO Delivered', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200', icon: CheckCircle2 },
};

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export const canTransition = (current: string, next: string): boolean => {
  const allowed: Record<string, string[]> = {
    pending: ['confirmed', 'processing', 'cancelled'],
    created: ['confirmed', 'processing', 'cancelled'],
    new: ['confirmed', 'invoiced', 'processing', 'cancelled'],
    confirmed: ['processing', 'invoiced', 'ready_to_ship', 'cancelled'],
    invoiced: ['ready_to_ship', 'pickup_scheduled', 'cancelled'],
    processing: ['ready_to_ship', 'pickup_scheduled', 'shipped', 'cancelled'],
    ready_to_ship: ['pickup_scheduled', 'shipped', 'cancelled'],
    pickup_scheduled: ['shipped', 'in_transit', 'cancelled'],
    shipped: ['in_transit', 'out_for_delivery', 'delivered', 'rto_initiated', 'cancelled'],
    in_transit: ['out_for_delivery', 'delivered', 'rto_initiated', 'cancelled'],
    out_for_delivery: ['delivered', 'rto_initiated', 'cancelled'],
    delivered: ['return_requested', 'returned'],
    cancelled: [],
    return_requested: ['returned', 'cancelled'],
    returned: [],
    payment_failed: ['pending', 'cancelled'],
    rto_initiated: ['rto_delivered', 'returned'],
    rto_delivered: ['returned'],
  };
  return allowed[current]?.includes(next) ?? false;
};