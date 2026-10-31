"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  X,
  LogOut,
  ChevronRight,
  Boxes,
  MessageSquare,
  Mail,
  HelpCircle,
  Quote,
  FileText,
  Settings,
  Tag,
  Star,
} from "lucide-react";
import { orderAPI } from "@/lib/integration/orders";
import { enquiryAPI } from "@/lib/integration/enquiry";
import { newsletterAPI } from "@/lib/integration/newsletter";
import { logoutUser } from "@/lib/middleware/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// ✅ MENU
const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Products",
    icon: Package,
    children: [
      { name: "Add Product", path: "/products/create" },
      { name: "All Products", path: "/products" },
    ],
  },
  {
    name: "Categories",
    icon: Layers,
    children: [
      { name: "Add Category", path: "/categories/create" },
      { name: "All Categories", path: "/categories" },
    ],
  },
  {
    name: "Banners",
    icon: Package,
    children: [
      { name: "Add Banner", path: "/banners/create" },
      { name: "All Banners", path: "/banners" },
    ],
  },
  {
    name: "Occasions",
    icon: LayoutDashboard,
    path: "/occasion"
  },
  {
    name: "Sales",
    icon: ShoppingCart,
    path: "/sales",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders",
    badgeKey: "pending" as const,
  },
  {
    name: "Enquiries",
    icon: MessageSquare,
    path: "/enquiries",
    badgeKey: "enquiries" as const,
  },
  {
    name: "Newsletters",
    icon: Mail,
    children: [
      { name: "Subscribers", path: "/newsletters" },
      { name: "Signup Section", path: "/newsletter-settings" },
    ],
  },
  {
    name: "FAQs",
    icon: HelpCircle,
    path: "/faqs",
  },
  {
    name: "Testimonials",
    icon: Quote,
    children: [
      { name: "Add Testimonial", path: "/testimonials/create" },
      { name: "All Testimonials", path: "/testimonials" },
    ],
  },
  {
    name: "Reviews",
    icon: Star,
    path: "/reviews",
  },
  {
    name: "Inventory",
    icon: Boxes,
    path: "/inventory",
  },
  {
    name: "Color",
    icon: Layers,
    children: [
      { name: "All Colors", path: "/admin/colors" },
    ],
  },
  {
    name: "Influencer",
    icon: Layers,
    children: [
      { name: "All Influencers", path: "/admin/influencers" },
    ],
  },
  {
    name: "Sizes",
    icon: Layers,
    children: [
      { name: "All Sizes", path: "/admin/sizes" },
    ],
  },
  {
    name: "Materials",
    icon: Layers,
    children: [
      { name: "All Materials", path: "/admin/materials" },
    ],
  },
  {
    name: "Pages & Content",
    icon: FileText,
    children: [
      { name: "About Us", path: "/pages/about-us" },
      { name: "Contact Us", path: "/pages/contact-us" },
      { name: "Terms & Conditions", path: "/pages/terms" },
      { name: "Privacy Policy", path: "/pages/privacy" },
    ],
  },
  {
    name: "Global Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    name: "Coupons",
    icon: Tag,
    path: "/coupons",
  },
  // {
  //   name: "Queries",
  //   icon: MessageSquare,
  //   path: "/contact",
  // },
  // {
  //   name: "Reviews",
  //   icon: Star,
  //   path: "/reviews",
  // },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingEnquiriesCount, setPendingEnquiriesCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // ✅ Fetch pending order and enquiry counts for badges
  const fetchBadgeData = useCallback(async () => {
    try {
      const [orderRes, enquiryRes, newsletterRes] = await Promise.allSettled([
        orderAPI.getOrderStatus(),
        enquiryAPI.getStats(),
        newsletterAPI.getStats(),
      ]);

      if (orderRes.status === 'fulfilled' && orderRes.value?.code === 'OK') {
        setPendingCount(orderRes.value?.data?.pending || 0);
      }
      if (enquiryRes.status === 'fulfilled' && enquiryRes.value?.code === 'OK') {
        setPendingEnquiriesCount(enquiryRes.value?.data?.pending || 0);
      }
      if (newsletterRes.status === 'fulfilled' && newsletterRes.value?.code === 'OK') {
        setSubscriberCount(newsletterRes.value?.data?.subscribed || 0);
      }
    } catch {
      // Silently fail — badge is non-critical
    }
  }, []);

  useEffect(() => {
    fetchBadgeData();
    const interval = setInterval(fetchBadgeData, 60000);
    return () => clearInterval(interval);
  }, [fetchBadgeData]);

  // ✅ Toggle submenu
  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  // ✅ Auto open active submenu
  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children?.some((child) =>
          pathname.startsWith(child.path)
        )
      ) {
        setOpenMenus((prev) =>
          prev.includes(item.name) ? prev : [...prev, item.name]
        );
      }
    });
  }, [pathname]);

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
        className={`fixed lg:sticky top-0 left-0 z-[110] h-screen w-72 bg-[#0d1527] border-r border-slate-800/80 
        transition-all duration-300 shadow-2xl lg:shadow-none text-slate-200
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 bg-[#090e1a]/90 backdrop-blur-xs">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber-400/80 shadow-md bg-slate-900 p-0.5">
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
                <span className="text-lg font-black text-white tracking-tight leading-none">
                  Pun<span className="text-amber-400">Royal</span>
                </span>
                <span className="text-[9px] font-extrabold text-amber-300 uppercase tracking-widest mt-1 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 w-fit">
                  Enterprise
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-1.5 custom-sidebar-scroll">
            {menuItems.map((item) => {
              const isOpen = openMenus.includes(item.name);

              const isParentActive =
                item.children &&
                item.children.some((child) =>
                  pathname.startsWith(child.path)
                );

              const isActive =
                pathname === item.path ||
                pathname.startsWith(`${item.path}/`);

              return (
                <div key={item.name}>
                  
                  {/* Parent (toggle only) */}
                  {item.children ? (
                    <div
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all
                      ${
                        isParentActive
                          ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.name}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.name === "Newsletters" && subscriberCount > 0 && (
                          <span className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 ${
                            isParentActive ? "bg-white text-indigo-700" : "bg-indigo-500 text-white"
                          }`}>
                            {subscriberCount > 999 ? "999+" : subscriberCount}
                          </span>
                        )}
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-600/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="flex-1">{item.name}</span>
                      {(item as any).badgeKey === "pending" && pendingCount > 0 && (
                        <span className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 ${
                          isActive
                            ? "bg-white text-red-600"
                            : "bg-red-500 text-white shadow-xs"
                        }`}>
                          {pendingCount > 99 ? "99+" : pendingCount}
                        </span>
                      )}
                      {(item as any).badgeKey === "enquiries" && pendingEnquiriesCount > 0 && (
                        <span className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 ${
                          isActive
                            ? "bg-white text-amber-700"
                            : "bg-amber-500 text-white shadow-xs"
                        }`}>
                          {pendingEnquiriesCount > 99 ? "99+" : pendingEnquiriesCount}
                        </span>
                      )}
                      {(item as any).badgeKey === "newsletters" && subscriberCount > 0 && (
                        <span className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 ${
                          isActive
                            ? "bg-white text-indigo-700"
                            : "bg-indigo-500 text-white"
                        }`}>
                          {subscriberCount > 999 ? "999+" : subscriberCount}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* SUBMENU */}
                  {item.children && (
                    <div
                      className={`ml-5 pl-2 border-l border-slate-800/90 overflow-hidden transition-all duration-300 space-y-0.5 ${
                        isOpen ? "max-h-40 mt-1" : "max-h-0"
                      }`}
                    >
                      {item.children.map((child) => {
                        const isChildActive =
                          pathname === child.path;

                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-xs transition-all ${
                              isChildActive
                                ? "bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-xs"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/40 font-medium"
                            }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-slate-800/80 bg-[#090e1a]/80 space-y-2">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition text-sm font-medium"
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