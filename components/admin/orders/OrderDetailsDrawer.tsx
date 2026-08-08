import React, { useState, useEffect } from 'react';
import { X, Truck, CreditCard, User, MapPin, Calendar, Clock, Package, Printer, RefreshCw, Loader2, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/utils/api';
import { ORDER_STATUS_CONFIG, formatDate, formatCurrency } from './utils';

interface OrderDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // basic order (from list)
  onStatusUpdate: (orderId: number, newStatus: string) => void;
  onCancel: (orderId: number) => void;
  onPrint: (order: any) => void;
  onOpenStatusModal: (order: any) => void; // new: to open status modal from parent
}

export default function OrderDetailsDrawer({
  isOpen,
  onClose,
  order,
  onStatusUpdate,
  onCancel,
  onPrint,
  onOpenStatusModal
}: OrderDetailsDrawerProps) {
  const [details, setDetails] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'shipping' | 'timeline'>('items');

  useEffect(() => {
    if (order && isOpen) {
      fetchDetails();
    }
  }, [order, isOpen]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/orders/${order.id}`);
      if (res.data.success) {
        setDetails(res.data.order);
      }
      const timelineRes = await api.get(`/admin/orders/${order.id}/timeline`);
      if (timelineRes.data.success) {
        setTimeline(timelineRes.data.timeline);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const statusConfig = ORDER_STATUS_CONFIG[order?.order_status] || ORDER_STATUS_CONFIG.pending;
  const StatusIcon = statusConfig.icon;

  // Use details for display if available, otherwise fallback to order
  const displayOrder = details || order;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600" size={32} />
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Order Header */}
            <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="text-xs text-slate-500">Order #{displayOrder.order_number || displayOrder.id}</div>
                <div className="text-2xl font-bold">{formatCurrency(displayOrder.total_amount)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color}`}>
                    <StatusIcon size={12} /> {statusConfig.label}
                  </div>
                  <span className="text-xs text-slate-400">Placed on {formatDate(displayOrder.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onPrint(displayOrder)}  // pass detailed order
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  <Printer size={16} /> Print Invoice
                </button>
                {!['cancelled', 'delivered'].includes(displayOrder.order_status) && (
                  <button
                    onClick={() => onOpenStatusModal(displayOrder)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Update Status
                  </button>
                )}
                {displayOrder.order_status === 'pending' && (
                  <button
                    onClick={() => onCancel(displayOrder.id)}
                    className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <CreditCard size={16} />
                <span className="text-xs font-semibold">Payment Method:</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium capitalize">{displayOrder.payment_method || 'COD'}</span>
                  {displayOrder.payment_status && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${displayOrder.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {displayOrder.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  )}
                </div>
                {displayOrder.payment_transaction && (
                  <div className="text-xs text-slate-400">Transaction ID: {displayOrder.payment_transaction}</div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-6">
                {(['items', 'shipping', 'timeline'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium transition-colors ${
                      activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab === 'items' ? 'Items' : tab === 'shipping' ? 'Shipping' : 'Timeline'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'items' && (
                <div className="space-y-4">
                  {displayOrder.items?.length > 0 ? (
                    displayOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-start border-b border-slate-100 pb-3">
                        <div>
                          <div className="font-medium">{item.product_name}</div>
                          <div className="text-sm text-slate-500">{item.variant_name} x {item.qty}</div>
                        </div>
                        <div className="text-right font-semibold">{formatCurrency(item.total_price)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500">No items found</div>
                  )}
                  <div className="pt-2 text-right">
                    <div className="text-sm text-slate-500">Subtotal: {formatCurrency(displayOrder.total_amount - (displayOrder.discount_amount || 0) - (displayOrder.shipping_amount || 0))}</div>
                    {displayOrder.discount_amount > 0 && <div className="text-sm text-slate-500">Discount: -{formatCurrency(displayOrder.discount_amount)}</div>}
                    {displayOrder.shipping_amount > 0 && <div className="text-sm text-slate-500">Shipping: {formatCurrency(displayOrder.shipping_amount)}</div>}
                    <div className="text-lg font-bold mt-1">Total: {formatCurrency(displayOrder.total_amount)}</div>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-500">Shipping Name</div>
                      <div>{displayOrder.shipping_name || '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500">Phone</div>
                      <div>{displayOrder.shipping_phone || '—'}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-500">Address</div>
                      <div>{displayOrder.shipping_address || '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500">City</div>
                      <div>{displayOrder.shipping_city || '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500">State</div>
                      <div>{displayOrder.shipping_state || '—'}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {timeline.length > 0 ? (
                    <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                      {timeline.map((event, idx) => {
                        const eventStatus = ORDER_STATUS_CONFIG[event.status];
                        const EventIcon = eventStatus?.icon || Clock;
                        return (
                          <div key={idx} className="relative">
                            <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-300" />
                            <div className="flex items-center gap-2 mb-1">
                              <EventIcon size={14} className={eventStatus?.color} />
                              <span className="text-sm font-medium">{eventStatus?.label || event.status}</span>
                            </div>
                            <div className="text-xs text-slate-500">{formatDate(event.created_at)}</div>
                            {event.note && <div className="text-sm text-slate-600 mt-1">{event.note}</div>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500">No timeline events</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}