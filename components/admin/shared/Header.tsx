"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  LogOut,
  Bell,
  Search,
  X,
  Package,
  ShoppingCart,
  Layers,
  TrendingUp,
  Tag,
  Image as ImageIcon,
  Mail,
  Newspaper,
  Calendar,
  Loader2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/middleware/auth';
import { productsAPI } from '@/lib/integration/products';
import { orderAPI } from '@/lib/integration/orders';

interface SearchResultProduct {
  _id: string;
  title: string;
  price?: number;
  display_price?: number;
  product_type?: string;
  media?: { url: string; isPrimary?: boolean }[];
}

interface SearchResultOrder {
  _id: string;
  order_number: string;
  total_amount?: number;
  status?: string;
  shipping_address?: { name?: string };
}

interface NavShortcut {
  title: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
}

const NAV_SHORTCUTS: NavShortcut[] = [
  { title: "Products List", href: "/products", icon: Package, category: "Products" },
  { title: "Add New Product", href: "/products/create", icon: Package, category: "Products" },
  { title: "Orders Management", href: "/orders", icon: ShoppingCart, category: "Orders" },
  { title: "Inventory Command Center", href: "/inventory", icon: Layers, category: "Inventory" },
  { title: "Monthly Sales Statistics", href: "/sales", icon: TrendingUp, category: "Sales" },
  { title: "Categories", href: "/categories", icon: Tag, category: "Catalog" },
  { title: "Banners", href: "/banners", icon: ImageIcon, category: "Marketing" },
  { title: "Customer Enquiries", href: "/enquiries", icon: Mail, category: "Support" },
  { title: "Newsletter Subscribers", href: "/newsletters", icon: Newspaper, category: "Marketing" },
  { title: "Occasions", href: "/occasion", icon: Calendar, category: "Catalog" },
];

export default function Header({ setIsOpen }: { setIsOpen: (v: boolean) => void }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<SearchResultProduct[]>([]);
  const [matchedOrders, setMatchedOrders] = useState<SearchResultOrder[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await logoutUser();
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpenSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter local page shortcuts
  const matchedShortcuts = searchQuery.trim()
    ? NAV_SHORTCUTS.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  // Live remote search with debounce
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setMatchedProducts([]);
      setMatchedOrders([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const [prodRes, orderRes] = await Promise.allSettled([
          productsAPI.getAll({ search: q, page: 1, limit: 4, isAdmin: "true" }),
          orderAPI.getAll({ page: 1, limit: 4 }, q, '', { from: '', to: '' }),
        ]);

        if (prodRes.status === 'fulfilled') {
          const raw = prodRes.value?.data || prodRes.value;
          const prods = raw?.data?.products || raw?.products || [];
          setMatchedProducts(prods.slice(0, 4));
        }

        if (orderRes.status === 'fulfilled') {
          const raw = orderRes.value?.data || orderRes.value;
          const orders = raw?.data || raw?.orders || [];
          setMatchedOrders(orders.slice(0, 4));
        }
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleExecuteSearch = (target?: string) => {
    const q = (target ?? searchQuery).trim();
    if (!q) return;

    setIsOpenSearch(false);
    setMobileSearchOpen(false);

    // If query starts with ORD or looks like order number / ID
    if (/^ord/i.test(q) || /^\d{5,}/.test(q)) {
      router.push(`/orders?search=${encodeURIComponent(q)}`);
    } else {
      router.push(`/products?search=${encodeURIComponent(q)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch();
    } else if (e.key === 'Escape') {
      setIsOpenSearch(false);
    }
  };

  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 transition-all">
      {/* 1. Mobile Toggle & Search */}
      <div className="flex items-center gap-3 sm:gap-6 flex-1">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          aria-label="Open Sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Mobile Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
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

        {/* Global Search Bar (Desktop) */}
        <div ref={dropdownRef} className="relative max-w-lg w-full hidden md:block">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
              size={18}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpenSearch(true);
              }}
              onFocus={() => setIsOpenSearch(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search orders, products, pages..."
              className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200/60 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setMatchedProducts([]);
                  setMatchedOrders([]);
                  inputRef.current?.focus();
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown */}
          {isOpenSearch && (searchQuery.trim().length > 0 || matchedShortcuts.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[460px] overflow-y-auto">
              
              {/* Header Status */}
              <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  {searching ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-blue-600" />
                      Searching...
                    </>
                  ) : (
                    <>Press Enter to search for &ldquo;{searchQuery}&rdquo;</>
                  )}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-400 font-mono">
                  ESC to close
                </span>
              </div>

              {/* Navigation Shortcuts */}
              {matchedShortcuts.length > 0 && (
                <div className="p-2 border-b border-slate-100">
                  <p className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Pages & Sections
                  </p>
                  <div className="space-y-0.5">
                    {matchedShortcuts.map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.href}
                          type="button"
                          onClick={() => {
                            setIsOpenSearch(false);
                            router.push(s.href);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-blue-50/80 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                              <Icon size={14} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">
                              {s.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {s.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {matchedProducts.length > 0 && (
                <div className="p-2 border-b border-slate-100">
                  <div className="flex items-center justify-between px-3 py-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Products ({matchedProducts.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => handleExecuteSearch()}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                    >
                      View all in Products <ArrowRight size={10} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {matchedProducts.map((p) => {
                      const primaryMedia = p.media?.find(m => m.isPrimary) || p.media?.[0];
                      const price = p.display_price || p.price || 0;
                      return (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => {
                            setIsOpenSearch(false);
                            router.push(`/products/edit/${p._id}`);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                              {primaryMedia?.url ? (
                                <img
                                  src={primaryMedia.url}
                                  alt={p.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package size={14} className="text-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                                {p.title}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                {p.product_type === 'sizes' ? 'Readymade' : 'Unstitched'}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-700 shrink-0 ml-2">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Orders Results */}
              {matchedOrders.length > 0 && (
                <div className="p-2 border-b border-slate-100">
                  <div className="flex items-center justify-between px-3 py-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Orders ({matchedOrders.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpenSearch(false);
                        router.push(`/orders?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                    >
                      View all in Orders <ArrowRight size={10} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {matchedOrders.map((o) => (
                      <button
                        key={o._id}
                        type="button"
                        onClick={() => {
                          setIsOpenSearch(false);
                          router.push(`/orders/view/${o._id}`);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ShoppingCart size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate font-mono group-hover:text-blue-600">
                              {o.order_number}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {o.shipping_address?.name || 'Customer'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <p className="text-xs font-bold text-indigo-600">
                            ₹{(o.total_amount || 0).toLocaleString('en-IN')}
                          </p>
                          <span className="text-[9px] uppercase font-bold text-slate-400">
                            {o.status || 'created'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No remote results footer */}
              {!searching && matchedProducts.length === 0 && matchedOrders.length === 0 && matchedShortcuts.length === 0 && (
                <div className="p-6 text-center text-slate-400">
                  <Search size={24} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">No instant results found</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Press <span className="font-bold text-slate-600">Enter</span> to run a full search in Products & Orders
                  </p>
                </div>
              )}

              {/* Quick Jump Action Bar */}
              <div className="p-2.5 bg-slate-50 flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenSearch(false);
                    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="flex-1 py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-slate-200 text-center transition-colors"
                >
                  Search in Products
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenSearch(false);
                    router.push(`/orders?search=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="flex-1 py-1.5 px-3 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-slate-200 text-center transition-colors"
                >
                  Search in Orders
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenSearch(false);
                    router.push(`/inventory?search=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-slate-200 text-center transition-colors"
                >
                  Inventory
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* 2. Admin Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setMobileSearchOpen((prev) => !prev)}
          className="md:hidden p-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          aria-label="Toggle Mobile Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => router.push('/orders')}
          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl relative transition-all group"
          title="View Orders / Notifications"
        >
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-10 w-[1px] bg-slate-100 mx-1 sm:mx-2 hidden sm:block"></div>

        {/* Profile Section */}
        <div className="text-right hidden sm:block border-l pl-4 ml-1">
          <p className="text-sm font-bold text-slate-800">Super Admin</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Premium Seller</p>
        </div>

        <button
          onClick={handleLogout}
          className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all ml-1 sm:ml-2"
          title="Logout Session"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-3 shadow-lg z-50 animate-in slide-in-from-top-2 duration-150">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search orders, products..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-semibold focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => handleExecuteSearch()}
              className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}