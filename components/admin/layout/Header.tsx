"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, UserCircle, LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
}

export default function Header({ setIsOpen }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 1. Close dropdown when clicking outside (Professional Touch)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Secure Logout Function
  const handleLogout = () => {
    localStorage.clear();
    // Use window.location for a hard refresh to clear all React states
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="px-6 h-16 flex items-center justify-between gap-4">

        {/* Left: Mobile Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="hidden md:flex items-center w-full max-w-sm relative group">
            <Search className="absolute left-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search orders or products..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 border rounded-2xl outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-xl relative transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 cursor-pointer group select-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Super Admin</p>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase opacity-80">Premium Seller</p>
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform duration-300">
                <UserCircle size={24} strokeWidth={2.5} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[24px] shadow-2xl shadow-slate-200/60 py-2.5 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account settings</p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <User size={18} /> My Profile
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <Settings size={18} /> Settings
                </button>

                <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-500 font-bold"
                >
                  <LogOut size={20} /> {/* Yahan agar 'Login' likha hai toh error aayega */}
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}