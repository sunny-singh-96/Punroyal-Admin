"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, Hash, Box, DollarSign, Tag } from 'lucide-react';
import { Input } from '@/components/admin/shared/Input';

export default function VariantMatrix({ selectedColors, selectedSizes }: any) {
  const [variants, setVariants] = useState<any[]>([]);

  // Automatic Matrix Generation Logic
  useEffect(() => {
    const newVariants: any[] = [];
    selectedColors.forEach((color: any) => {
      selectedSizes.forEach((size: any) => {
        newVariants.push({
          id: `${color}-${size}`,
          color,
          size,
          sku: `${color.substring(0, 3).toUpperCase()}-${size}-${Math.floor(1000 + Math.random() * 9000)}`,
          price: "",
          stock: "",
        });
      });
    });
    setVariants(newVariants);
  }, [selectedColors, selectedSizes]);

  if (variants.length === 0) return null;

  return (
    <div className="mt-8 space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Hash size={20} className="text-blue-600" /> Inventory Matrix
        </h3>
        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
          {variants.length} Combinations Generated
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Variant</th>
              <th className="px-4 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">SKU Code</th>
              <th className="px-4 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Price Offset</th>
              <th className="px-4 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Stock Qty</th>
              <th className="px-4 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {variants.map((v, idx) => (
              <tr key={v.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: v.color.toLowerCase() }}></span>
                    <span className="text-sm font-bold text-slate-700">{v.color} / {v.size}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <input 
                    type="text" 
                    defaultValue={v.sku}
                    className="w-full bg-transparent border-b border-transparent focus:border-blue-400 outline-none text-sm font-mono text-slate-600 p-1"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="relative flex items-center">
                    <DollarSign size={14} className="absolute left-0 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="Same as base"
                      className="w-24 pl-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-sm p-1"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="relative flex items-center">
                    <Box size={14} className="absolute left-0 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-20 pl-5 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-sm p-1"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}