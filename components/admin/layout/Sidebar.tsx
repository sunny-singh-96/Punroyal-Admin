"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Users,
  Settings,
  X,
  Package, // ✅ better icon for orders
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { orderAPI } from "@/lib/integration/orders";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Categories", icon: Layers, href: "/admin/categories" },
  { name: "Products", icon: ShoppingBag, href: "/admin/products" },
  { name: "Orders", icon: Package, href: "/admin/orders", badgeKey: "pending" as const }, // ✅ badge
  { name: "Customers", icon: Users, href: "/admin/customers" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending order count for badge
  const fetchBadgeData = useCallback(async () => {
    try {
      const response = await orderAPI.getOrderStatus();
      if (response?.code === "OK") {
        setPendingCount(response?.data?.pending || 0);
      }
    } catch {
      // Silently fail — badge is non-critical
    }
  }, []);

  useEffect(() => {
    fetchBadgeData();
    // Refresh badge every 60 seconds
    const interval = setInterval(fetchBadgeData, 60000);
    return () => clearInterval(interval);
  }, [fetchBadgeData]);

  // ✅ better active check
  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const getBadgeCount = (item: typeof menuItems[number]) => {
    if (item.badgeKey === "pending") return pendingCount;
    return 0;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      
      {/* HEADER */}
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">
          Punroyal
        </h2>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          const badge = getBadgeCount(item);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)} // ✅ auto close mobile
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-white"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              <span className="font-medium flex-1">{item.name}</span>
              {badge > 0 && (
                <span className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 ${
                  isActive
                    ? "bg-white text-blue-600"
                    : "bg-red-500 text-white"
                }`}>
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100">
        <Link
          href="/admin/settings"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}