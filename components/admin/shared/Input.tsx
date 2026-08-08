"use client";
import React from 'react';

export const Input = ({ label, ...props }: any) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all text-sm placeholder:text-slate-400"
      />
    </div>
  );
};

export default Input;