"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, LogOut } from 'lucide-react';
import { logoutUser } from '@/lib/middleware/auth';

export default function InfluencerHeader({ setIsOpen }: { setIsOpen: (v: boolean) => void }) {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40 transition-all lg:hidden">
      {/* 1. Mobile Toggle & Logo */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Brand Logo */}
        <Link href="/influencer/dashboard" className="flex items-center gap-2.5">
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
      </div>
      
      {/* 2. Actions (Mobile Only) */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLogout} 
          className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
