"use client";
import React, { useState } from 'react';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';

export default function TopBar() {
  const [notifications, setNotifications] = useState(3); // Demo count

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[90] px-8 flex items-center justify-between">
      
      {/* 1. Global Search */}
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search Orders, SKUs or Customers..." 
          className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all text-sm font-medium"
        />
      </div>

      {/* 2. Actions Area */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
              {notifications}
            </span>
          )}
        </button>

        <div className="h-8 w-[1px] bg-slate-100" />

        {/* Admin Profile Quick View */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-slate-900 leading-none">Kulwinder Singh</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter mt-1">Super Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
            KS
          </div>
        </div>
      </div>
    </header>
  );
}