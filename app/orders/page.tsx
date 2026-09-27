"use client";

import { useState, useCallback, useEffect } from 'react';
import {
  Package, ArrowUpRight,
  CheckCircle2, Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { StatsCards } from '@/components/admin/stateCard/stateCard';
import { format } from "date-fns";
import { FiltersBar } from '@/components/admin/orders/FiltersBar';
import DataGrid from '@/components/admin/tables/dataGrid';
import { orderAPI } from '@/lib/integration/orders';
import { getErrorMessage } from '@/lib/helpers/handlers';
import OrderInfoModal from '@/components/admin/orders/OrderInfoModal';
import { useRouter, useSearchParams } from "next/navigation";
import PageHeader from '@/components/admin/head/head';
import { ORDER_STATUS_CONFIG } from '@/components/admin/orders/utils';

const PAYMENT_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  paid: { bg: 'bg-emerald-50', color: 'text-emerald-700' },
  unpaid: { bg: 'bg-red-50', color: 'text-red-600' },
  pending: { bg: 'bg-amber-50', color: 'text-amber-700' },
  refunded: { bg: 'bg-slate-100', color: 'text-slate-600' },
  failed: { bg: 'bg-red-50', color: 'text-red-600' },
};
interface Payment {
  amount: number;
  status: string;
}
interface OrderItem {
  _id: string;
  order_id: string;
  product_type: string;
  product_id: string;
  size_id: string;
  color_id: string;
  quantity: number;
  price: number;
  status: string;
  metadata: {
    color: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface ShippingAddress {
  name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
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
  items: OrderItem[];
  payment: Payment;
  htr_items: string[];
}

export default function AdminOrderMaster() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, pending: 0, completed: 0, revenue: 0 });
  const router = useRouter();
  // const [selectedOrder, setSelectedOrder] = useState<any>(null);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  // const [orderForStatus, setOrderForStatus] = useState<any>(null);
  const [redirectTo, setRedirectTo] = useState("");

  const initialParams = {
    page: 1,
    limit: 10
  };

  const searchParams = useSearchParams();
  const searchParam = searchParams?.get('search') || '';

  const [lazyParams, setLazyParams] = useState(initialParams);
  const [searchTerm, setSearchTerm] = useState(searchParam);

  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParam]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [data, setData] = useState<Order[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedOrderForInfo, setSelectedOrderForInfo] = useState<Order | null>(null);

  // const openStatusModal = (order: any) => {
  //   setOrderForStatus(order);
  //   setIsStatusModalOpen(true);
  // };

  const fetchOrders = useCallback(async () => {
    try {
      const response = await orderAPI.getAll(lazyParams, searchTerm, statusFilter, dateRange);
      if (response?.code === "OK") {
        setData(response?.data?.data || []);
        setTotalRecords(response?.data?.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams, searchTerm, statusFilter, dateRange]);

  const fetchOrderStats = useCallback(async () => {
    try {
      const response = await orderAPI.getOrderStatus();
      if (response?.code === "OK") {
        setStats(response?.data || { totalOrders: 0, pending: 0, completed: 0, revenue: 0 });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchOrders();
      fetchOrderStats();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchOrders, fetchOrderStats]);

  // ✅ Redirect after category
  useEffect(() => {
    if (redirectTo) if (redirectTo) router.push(redirectTo);
  }, [redirectTo, router]);

  // const handleStatusUpdate = async (orderId: number, newStatus: string) => {
  //   try {
  //     const res = await api.put(`/admin/orders/${orderId}/status`, { order_status: newStatus });
  //     if (res.data.success) {
  //       toast.success(`Order #${orderId} status updated to ${newStatus}`);
  //       fetchOrders();
  //       if (selectedOrder && selectedOrder.id === orderId) {
  //         setSelectedOrder({ ...selectedOrder, order_status: newStatus });
  //       }
  //       if (orderForStatus && orderForStatus.id === orderId) {
  //         setOrderForStatus({ ...orderForStatus, order_status: newStatus });
  //       }
  //     } else {
  //       toast.error(res.data.message || 'Update failed');
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //     toast.error(err.response?.data?.message || 'Update failed');
  //   }
  // };

  // const handleCancel = async (orderId: number) => {
  //   try {
  //     const res = await api.post(`/admin/orders/${orderId}/cancel`);
  //     if (res.data.success) {
  //       toast.success(`Order #${orderId} cancelled`);
  //       fetchOrders();
  //       if (selectedOrder && selectedOrder.id === orderId) {
  //         setSelectedOrder({ ...selectedOrder, order_status: 'cancelled' });
  //       }
  //     } else {
  //       toast.error(res.data.message || 'Cancel failed');
  //     }
  //   } catch (err: any) {
  //     toast.error(err.response?.data?.message || 'Cancel failed');
  //   }
  // };

  // const printInvoice = (order: any) => {
  //   const formatCurr = (amount: number) => {
  //     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  //   };
  //   const printWindow = window.open('', '_blank', 'width=900,height=800');
  //   if (printWindow) {
  //     printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Invoice #${order.order_number || order.id}</title>
  //         <style>
  //           * { margin: 0; padding: 0; box-sizing: border-box; }
  //           body {
  //             font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  //             background: #fff;
  //             padding: 2rem;
  //             color: #1e293b;
  //           }
  //           .invoice-container {
  //             max-width: 800px;
  //             margin: 0 auto;
  //             border: 1px solid #e2e8f0;
  //             border-radius: 20px;
  //             padding: 2rem;
  //             box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  //           }
  //           .header {
  //             display: flex;
  //             justify-content: space-between;
  //             margin-bottom: 2rem;
  //             border-bottom: 2px solid #e2e8f0;
  //             padding-bottom: 1rem;
  //           }
  //           .logo h1 {
  //             font-size: 1.8rem;
  //             font-weight: 800;
  //             background: linear-gradient(135deg, #3b82f6, #06b6d4);
  //             -webkit-background-clip: text;
  //             background-clip: text;
  //             color: transparent;
  //           }
  //           .invoice-title {
  //             text-align: right;
  //           }
  //           .invoice-title h2 {
  //             font-size: 1.5rem;
  //             font-weight: 600;
  //             color: #3b82f6;
  //           }
  //           .info-grid {
  //             display: flex;
  //             justify-content: space-between;
  //             margin-bottom: 2rem;
  //             background: #f8fafc;
  //             padding: 1rem;
  //             border-radius: 16px;
  //           }
  //           .info-block {
  //             flex: 1;
  //           }
  //           .info-block p {
  //             margin: 0.25rem 0;
  //             font-size: 0.85rem;
  //           }
  //           .info-block strong {
  //             color: #334155;
  //           }
  //           table {
  //             width: 100%;
  //             border-collapse: collapse;
  //             margin: 1.5rem 0;
  //           }
  //           th, td {
  //             border-bottom: 1px solid #e2e8f0;
  //             padding: 0.75rem;
  //             text-align: left;
  //           }
  //           th {
  //             background-color: #f1f5f9;
  //             font-weight: 600;
  //             color: #1e293b;
  //           }
  //           .totals {
  //             text-align: right;
  //             margin-top: 1rem;
  //             padding-top: 1rem;
  //             border-top: 1px solid #e2e8f0;
  //           }
  //           .totals p {
  //             margin: 0.25rem 0;
  //           }
  //           .footer {
  //             text-align: center;
  //             margin-top: 2rem;
  //             font-size: 0.75rem;
  //             color: #94a3b8;
  //             border-top: 1px solid #e2e8f0;
  //             padding-top: 1rem;
  //           }
  //           @media print {
  //             body { padding: 0; }
  //             .invoice-container { border: none; box-shadow: none; }
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="invoice-container">
  //           <div class="header">
  //             <div class="logo">
  //               <h1>Toddle and Care</h1>
  //               <p>Premium Kids Wear</p>
  //             </div>
  //             <div class="invoice-title">
  //               <h2>INVOICE</h2>
  //               <p>#${order.order_number || order.id}</p>
  //               <p>Date: ${new Date(order.created_at).toLocaleDateString('en-IN')}</p>
  //             </div>
  //           </div>

  //           <div class="info-grid">
  //             <div class="info-block">
  //               <p><strong>Bill To:</strong></p>
  //               <p>${order.shipping_name || order.user_name || 'Customer'}</p>
  //               <p>${order.shipping_phone || ''}</p>
  //               <p>${order.shipping_address || ''}</p>
  //               <p>${order.shipping_city ? order.shipping_city + ', ' : ''}${order.shipping_state || ''}</p>
  //             </div>
  //             <div class="info-block">
  //               <p><strong>Payment Details:</strong></p>
  //               <p>Method: ${order.payment_method?.toUpperCase() || 'COD'}</p>
  //               <p>Status: ${order.payment_status === 'paid' ? 'PAID' : 'PENDING'}</p>
  //               <p>Transaction: ${order.payment_transaction || '—'}</p>
  //             </div>
  //           </div>

  //           <table>
  //             <thead>
  //               <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
  //             </thead>
  //             <tbody>
  //               ${order.items?.map((item: any) => `
  //                 <tr><td>${item.product_name} (${item.variant_name})</td><td>${item.qty}</td><td>${formatCurr(item.price_at_time)}</td><td>${formatCurr(item.total_price)}</td></tr>
  //               `).join('') || '<tr><td colspan="4">No items found</td></tr>'}
  //             </tbody>
  //           </table>

  //           <div class="totals">
  //             <p>Subtotal: ${formatCurr(order.total_amount - (order.discount_amount || 0) - (order.shipping_amount || 0))}</p>
  //             ${order.discount_amount ? `<p>Discount: -${formatCurr(order.discount_amount)}</p>` : ''}
  //             ${order.shipping_amount ? `<p>Shipping: ${formatCurr(order.shipping_amount)}</p>` : ''}
  //             <p><strong>Total: ${formatCurr(order.total_amount)}</strong></p>
  //           </div>

  //           <div class="footer">
  //             <p>Thank you for shopping with Toddle and Care!</p>
  //             <p>For any queries, contact info@toddleandcare.com | +91-9915774845</p>
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //   `);
  //     printWindow.document.close();
  //     printWindow.print();
  //   }
  // };

  const statsCards = [
    { label: 'Total Orders', value: String(stats.totalOrders), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: String(stats.pending), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: String(stats.completed), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Revenue', value: isNaN(stats.revenue) ? '₹0' : stats.revenue, icon: ArrowUpRight, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      
      <div className="mb-6">
        <PageHeader title="Order" subtitle="Manage E-Commerce Orders" />
      </div>
      
      {/* Stats Cards */}
      <StatsCards items={statsCards} />

      {/* Filters & Actions - Fully Responsive with Clear All */}
      <FiltersBar
        onApply={(filters) => {
          const formatted = {
            search: filters.search,
            status: filters.status,
            dateRange: {
              from: filters.dateRange.from
                ? format(filters.dateRange.from, "yyyy-MM-dd")
                : "",
              to: filters.dateRange.to
                ? format(filters.dateRange.to, "yyyy-MM-dd")
                : "",
            },
          };
          setSearchTerm(formatted.search);
          setStatusFilter(formatted.status);
          setDateRange(formatted.dateRange);
          setLazyParams((p) => ({ ...p, page: 1 }));
        }}
        onClear={() => {
          setSearchTerm("");
          setStatusFilter("");
          setDateRange({ from: "", to: "" });
          setLazyParams((p) => ({ ...p, page: 1 }));
        }}
      />

      {/* Orders Table */}

      <div className="p-4">
        <DataGrid<Order>
          headers={[
            {
              key: "order_number",
              label: "Order Number",
              render: (row: Order) => (
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => {
                      setRedirectTo(`/orders/view/${row._id}`);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer hover:underline transition"
                  >
                    #{row?.order_number}
                  </div>
                </div>
              ),
            },
            {
              key: "total_items",
              label: "Total Items",
              render: (row: Order) => (
                <div className="flex items-center gap-3">
                  <div className="font-regular">{row?.htr_items?.length}</div>
                </div>
              ),
            },
            {
              key: "payment_method",
              label: "Payment Method",
              render: (row: Order) => (
                <div className="flex items-center gap-3">
                  <div className="font-regular">{row?.payment_method}</div>
                </div>
              ),
            },
            {
              key: "payment_status",
              label: "Payment Status",
              render: (row: Order) => {
                const ps = PAYMENT_STATUS_STYLES[row.payment_status?.toLowerCase()] || { bg: 'bg-slate-100', color: 'text-slate-600' };
                return (
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${ps.bg} ${ps.color}`}
                    >
                      {row.payment_status}
                    </span>
                  </div>
                );
              },
            },
            {
              key: "total_amount",
              label: "Total Amount",
              render: (row: Order) => (
                <div className="flex items-center gap-3">
                  <div className="font-regular">{row?.total_amount}</div>
                </div>
              ),
            },
            {
              key: "order_status",
              label: "Order Status",
              render: (row: Order) => {
                const statusKey = row.status?.toLowerCase();
                const cfg = ORDER_STATUS_CONFIG[statusKey];
                const bg = cfg?.bg || 'bg-slate-100';
                const color = cfg?.color || 'text-slate-600';
                const label = cfg?.label || row.status;
                return (
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${bg} ${color}`}
                  >
                    {label}
                  </span>
                );
              },
            },
            {
              key: "is_returned",
              label: "Is Returned",
              render: (row: Order) => (
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${row.is_returned
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {row.is_returned ? "Yes" : "No"}
                </span>
              ),
            },
            {
              key: "view",
              label: "View",
              render: (row: Order) => (
                <button
                  onClick={() => {
                    setSelectedOrderForInfo(row);
                    setIsInfoModalOpen(true);
                  }}
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"
                >
                  View
                </button>
              ),
            }
          ]}
          loading={loading}
          rows={data}
          totalRecords={totalRecords}
          page={lazyParams.page}
          pageSize={lazyParams.limit}
          onPageChange={(page) => setLazyParams((p) => ({ ...p, page }))}
          searchEnable={false}
        />
      </div>

      <OrderInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        order={selectedOrderForInfo}
      />

      {/* Modals & Drawers */}
      {/* <OrderDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
        onCancel={handleCancel}
        onPrint={printInvoice}
        onOpenStatusModal={openStatusModal}
      />

      <UpdateStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        currentStatus={orderForStatus?.order_status}
        orderId={orderForStatus?.id}
        onUpdate={(newStatus) => {
          if (orderForStatus) handleStatusUpdate(orderForStatus.id, newStatus);
          setIsStatusModalOpen(false);
        }}
      /> */}

    </div>
  );
}