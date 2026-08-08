"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { orderAPI } from "@/lib/integration/orders";
import { getErrorMessage } from "@/lib/helpers/handlers";
import PageHeader from "@/components/admin/head/head";

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
    color: {
      _id: string;
      name: string;
    };
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

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await orderAPI.getOrder(orderId);
      if (res?.code === "OK") {
        const [ data ] = res.data;
        setOrder(data);
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-400">
        No order found
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#f6f7fb] min-h-screen">
      <div className="mb-6">
        <PageHeader title="Order Detail" subtitle={"#" + order.order_number} />
      </div>

      {/* TOP STATUS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* DELIVERY PROGRESS */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm lg:col-span-2">

          <p className="text-sm text-slate-500 mb-2">
            Be patient, package on delivery!
          </p>

          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Warehouse</span>
            <span>Delivery Address</span>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-slate-200 h-2 rounded-full">
            <div className="bg-orange-500 h-2 rounded-full w-[60%]" />
          </div>

          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>{order.shipping_address?.city}</span>
            <span>{order.shipping_address?.state}</span>
          </div>
        </div>

        {/* ETA */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-slate-400">Estimated Arrival</p>
          <p className="font-semibold text-lg mt-2">
            {new Date(
              new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
            ).toDateString()}
          </p>
        </div>

        {/* DELIVERY TIME */}
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-slate-400">Delivered in</p>
          <p className="font-semibold text-lg mt-2">
            5 Days
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TIMELINE */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h2 className="font-semibold mb-4">Timeline</h2>

            <div className="space-y-4 text-sm">

              <div>
                <p className="font-medium">
                  Your package is packed
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Shipment created
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Order placed
                </p>
              </div>

            </div>
          </div>

          {/* SHIPPING */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h2 className="font-semibold mb-4">Shipping</h2>

            <div className="text-sm text-slate-600 space-y-1">
              <p>{order.shipping_address?.name}</p>
              <p>{order.shipping_address?.phone}</p>
              <p>{order.shipping_address?.address_line1}</p>
              <p>{order.shipping_address?.address_line2}</p>
              <p>
                {order.shipping_address?.city},{" "}
                {order.shipping_address?.state}
              </p>
              <p>{order.shipping_address?.pincode}</p>
              <p>{order.shipping_address?.country}</p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h2 className="font-semibold mb-4">Payment</h2>

            <div className="text-sm text-slate-600 space-y-1">
              <p><b>Method:</b> {order.payment_method}</p>
              <p><b>Status:</b> {order.payment_status}</p>
              <p><b>Total:</b> ₹{order.total_amount}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (ITEMS) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <h2 className="font-semibold mb-4">
              Items ({order.items?.length}) / Total Amount: ₹{order.total_amount}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {order.items?.map((item: OrderItem) => {
                const size = item.size_id
                  ? item.product?.variants?.find(
                    (v) => v.size?._id === item.size_id
                  )?.size?.name
                  : null;
                return (
                  <div
                    key={item._id}
                    className="border rounded-xl p-4 flex gap-4 hover:shadow-sm transition"
                  >
                    {/* IMAGE */}
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-xs">
                      IMG
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {item.product?.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Color: {item.metadata?.color?.name}
                      </p>
                      {size && (
                        <p className="text-xs text-slate-500">
                          Size: {size}
                        </p>
                      )}
                      <p className="text-xs text-slate-500">
                        Qty: {item.quantity}
                      </p>
                      <div className="flex justify-between mt-2">
                        <p className="font-semibold">
                          ₹{item.price}
                        </p>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded capitalize">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}