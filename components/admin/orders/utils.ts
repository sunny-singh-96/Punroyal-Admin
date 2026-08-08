import { Clock, CheckCircle2, Package, Truck, XCircle } from 'lucide-react';

export const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
  pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', icon: Package },
  shipped: { label: 'Shipped', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: XCircle },
  return_requested: { label: 'Return Requested', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100', icon: Clock },
  returned: { label: 'Returned', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100', icon: XCircle },
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
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['out_for_delivery', 'cancelled'],
    out_for_delivery: ['delivered', 'cancelled'],
    delivered: [],
    cancelled: [],
    return_requested: ['returned'],
    returned: [],
  };
  return allowed[current]?.includes(next) ?? false;
};