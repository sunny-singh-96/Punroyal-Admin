"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, UserCircle, LogOut, Bell, Search, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/middleware/auth';

export default function Header({ setIsOpen }: { setIsOpen: (v: boolean) => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
      
      {/* 1. Mobile Toggle & Search */}
      <div className="flex items-center gap-4 sm:gap-6 flex-1">
        <button 
          onClick={() => setIsOpen(true)} 
          className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 lg:hidden">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-amber-300/70 shadow-xs bg-slate-900 p-0.5">
            <Image
              src="/punroyal-logo.png"
              alt="Punroyal Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-full"
              priority
              unoptimized
            />
          </div>
          <span className="text-base font-black text-slate-900 tracking-tight leading-none">
            Pun<span className="text-blue-600">Royal</span>
          </span>
        </Link>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search orders, products, customers..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all text-sm font-bold"
          />
        </div>
      </div>

      {/* 2. Admin Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl relative transition-all group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        {/* <button 
              onClick={() => router.push('/admin/settings')}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            >
              <Settings size={20} />
            </button>
        */}

        <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

        {/* Profile Section */}
         <div className="text-right hidden sm:block border-l pl-4 ml-2">
          <p className="text-sm font-bold text-slate-800">Super Admin</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Premium Seller</p>
          
        </div>

        <button 
          onClick={handleLogout} 
          className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all ml-2"
          title="Logout Session"
        >
          <LogOut size={20} />
        </button>

        {/* <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 p-2 px-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={18} />
          <span className="hidden md:block">Logout</span>
        </button> */}
      </div>
    </header>
  );
}