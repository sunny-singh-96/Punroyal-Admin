"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/lib/middleware/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/influencer/dashboard",
  },
  {
    name: "My Products",
    icon: Package,
    path: "/influencer/products",
  },
  {
    name: "Sales",
    icon: ShoppingCart,
    path: "/influencer/sales",
  },
];

export default function InfluencerSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-[100] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-[110] h-screen w-72 bg-white border-r 
        transition-all duration-300 shadow-2xl lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b">
            <Link href="/influencer/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber-300/70 shadow-xs bg-slate-900 p-0.5">
                <Image
                  src="/punroyal-logo.png"
                  alt="Punroyal Logo"
                  width={38}
                  height={38}
                  className="w-full h-full object-cover rounded-full"
                  priority
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight leading-none">
                  Pun<span className="text-blue-600">Royal</span>
                </span>
                <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-widest mt-0.5">
                  Creator
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t space-y-2">
            <Link
              href="/influencer/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Settings size={18} /> Settings
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h3 className="font-bold text-lg">Logout?</h3>
            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowLogoutModal(false);
                  await logoutUser();
                }}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
