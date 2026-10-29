"use client";

import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { inventoryAPI } from "@/lib/integration/inventory";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { CheckCircle2, AlertCircle, Save, X, Plus, Minus, Package } from "lucide-react";

export type ProductVariantItem = {
  _id: string;
  stock: number;
  size?: { _id?: string; name: string };
  color?: { _id?: string; name: string; hex?: string };
};

export type Product = {
  _id: string;
  title: string;
  price: number;
  totalStock: number;
  product_type: string;
  quantity?: number;
  status: boolean;
  model?: { name: string };
  materials?: { name: string }[];
  colors?: {
    _id: string;
    color_name: string;
    color_hex: string;
  }[];
  variants?: ProductVariantItem[];
};

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updatedProduct: any) => void;
};

export const ProductInfoModal = ({
  product,
  isOpen,
  onClose,
  onSuccess,
}: ProductModalProps) => {
  const [status, setStatus] = useState<boolean>(true);
  const [simpleStock, setSimpleStock] = useState<number>(0);
  const [variantStocks, setVariantStocks] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setStatus(Boolean(product.status));
      setSimpleStock(Math.max(0, Number(product.quantity ?? product.totalStock ?? 0)));

      const initialVariants: Record<string, number> = {};
      (product.variants || []).forEach((v) => {
        initialVariants[v._id] = Math.max(0, Number(v.stock ?? 0));
      });
      setVariantStocks(initialVariants);
    }
  }, [product]);

  const computedTotalStock = useMemo(() => {
    if (!product) return 0;
    if (product.product_type === "sizes") {
      return Object.values(variantStocks).reduce((sum, val) => sum + (Number(val) || 0), 0);
    }
    return Math.max(0, Number(simpleStock) || 0);
  }, [product, variantStocks, simpleStock]);

  if (!isOpen || !product) return null;

  const materials = product.materials || [];
  const colors = product.colors || [];
  const variants = product.variants || [];
  const isVariantType = product.product_type === "sizes";

  const handleSimpleStockChange = (val: number) => {
    setSimpleStock(Math.max(0, Math.floor(val)));
  };

  const handleVariantStockChange = (variantId: string, val: number) => {
    setVariantStocks((prev) => ({
      ...prev,
      [variantId]: Math.max(0, Math.floor(val)),
    }));
  };

  const handleSave = async () => {
    if (computedTotalStock < 0) {
      toast.error("Stock quantity cannot be negative");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("Saving inventory updates...");

    try {
      const payload: any = {
        status,
      };

      if (isVariantType) {
        payload.variants = Object.entries(variantStocks).map(([varId, stockVal]) => ({
          _id: varId,
          stock: Math.max(0, Number(stockVal) || 0),
        }));
      } else {
        payload.quantity = Math.max(0, Number(simpleStock) || 0);
      }

      const res: any = await inventoryAPI.updateStock(product._id, payload);

      toast.success("Inventory updated successfully", { id: toastId });

      const updatedProduct = {
        ...product,
        status,
        quantity: isVariantType ? product.quantity : simpleStock,
        totalStock: computedTotalStock,
        variants: variants.map((v) => ({
          ...v,
          stock: variantStocks[v._id] !== undefined ? variantStocks[v._id] : v.stock,
        })),
      };

      if (onSuccess) {
        onSuccess(updatedProduct);
      }

      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update inventory", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Package size={18} />
              </span>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                Manage Inventory
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-md truncate">
              {product.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl mb-6 text-xs">
          <div>
            <p className="text-slate-500 font-medium">Price</p>
            <p className="font-bold text-slate-800 text-sm mt-0.5">₹{product.price}</p>
          </div>

          <div>
            <p className="text-slate-500 font-medium">Product Type</p>
            <p className="font-bold text-slate-800 capitalize text-sm mt-0.5">
              {isVariantType ? "Variants (Sizes)" : "Simple / Unstitched"}
            </p>
          </div>

          <div>
            <p className="text-slate-500 font-medium">Total Stock</p>
            <p className="font-bold text-blue-600 text-sm mt-0.5">
              {computedTotalStock} units
            </p>
          </div>

          <div>
            <p className="text-slate-500 font-medium">Stock Status</p>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mt-0.5 ${
                computedTotalStock === 0
                  ? "bg-rose-100 text-rose-700"
                  : computedTotalStock <= 5
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {computedTotalStock === 0 ? "Out of Stock" : computedTotalStock <= 5 ? "Low Stock" : "In Stock"}
            </span>
          </div>
        </div>

        {/* Product Status Toggle */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Product Availability</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {status ? "Product is active and visible on store" : "Product is hidden (Draft)"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus(!status)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              status ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                status ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Stock Management Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              {isVariantType ? "Variant Inventory Breakdown" : "Stock Quantity"}
            </h3>
            <span className="text-xs text-slate-400">Values cannot be negative</span>
          </div>

          {/* If Simple Product: Single Stock Input */}
          {!isVariantType && (
            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                Available Stock Quantity
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  value={simpleStock}
                  onChange={(e) => handleSimpleStockChange(parseInt(e.target.value, 10) || 0)}
                  className="w-36 px-4 py-2.5 rounded-xl border border-slate-300 text-center text-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSimpleStockChange(simpleStock - 5)}
                    className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                  >
                    -5
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimpleStockChange(simpleStock - 1)}
                    className="p-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                    title="-1"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimpleStockChange(simpleStock + 1)}
                    className="p-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                    title="+1"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimpleStockChange(simpleStock + 5)}
                    className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                  >
                    +5
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimpleStockChange(simpleStock + 20)}
                    className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                  >
                    +20
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* If Variant Product: Variants Table */}
          {isVariantType && variants.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Color</th>
                    <th className="py-3 px-4 text-center w-40">Stock Quantity</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {variants.map((v) => {
                    const currentVal = variantStocks[v._id] !== undefined ? variantStocks[v._id] : v.stock;
                    return (
                      <tr key={v._id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {v.size?.name || "Standard"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {v.color?.hex && (
                              <span
                                className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-2xs"
                                style={{ backgroundColor: v.color.hex }}
                              />
                            )}
                            <span className="text-slate-700 font-medium">
                              {v.color?.name || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleVariantStockChange(v._id, currentVal - 1)}
                              disabled={currentVal <= 0}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition"
                            >
                              <Minus size={13} />
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={currentVal}
                              onChange={(e) =>
                                handleVariantStockChange(v._id, parseInt(e.target.value, 10) || 0)
                              }
                              className="w-16 px-2 py-1 text-center font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleVariantStockChange(v._id, currentVal + 1)}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              currentVal === 0
                                ? "bg-rose-100 text-rose-700"
                                : currentVal <= 5
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {currentVal === 0 ? "Out" : currentVal <= 5 ? "Low" : "In Stock"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Save size={15} />
            <span>{saving ? "Saving Changes..." : "Save Stock Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
