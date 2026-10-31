"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Image as ImageIcon,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  Video,
  ShoppingCart,
  Zap,
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";

export default function AdminDocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const dimensionSpecs = [
    {
      module: "Main Banners",
      type: "Hero Slider / Promotional",
      dimensions: "1920 × 700 px",
      ratio: "16:6 Wide",
      maxSize: "Max 5 MB",
      format: "Auto-converted to WebP",
      notes: "Main desktop hero slider banner visible on the homepage",
    },
    {
      module: "Category Images",
      type: "Card & Thumbnail",
      dimensions: "800 × 800 px",
      ratio: "1:1 Square",
      maxSize: "Max 3 MB",
      format: "Auto-converted to WebP",
      notes: "Square thumbnail for category showcases and navigation cards",
    },
    {
      module: "Occasion Images",
      type: "Card & Thumbnail",
      dimensions: "800 × 800 px",
      ratio: "1:1 Square",
      maxSize: "Max 3 MB",
      format: "Auto-converted to WebP",
      notes: "Festival and occasion collection banners & cards",
    },
    {
      module: "Product Photos",
      type: "Catalog & Gallery",
      dimensions: "1080 × 1440 px",
      ratio: "3:4 Portrait",
      maxSize: "Max 5 MB",
      format: "JPEG, PNG, WebP",
      notes: "Main product showcase images with zoom and color variant support",
    },
    {
      module: "Product & Creator Reels",
      type: "Video Reel",
      dimensions: "720 × 1280 px",
      ratio: "9:16 Vertical",
      maxSize: "Max 10 MB",
      format: "MP4, WebM",
      notes: "Influencer styling reels and product in-motion videos",
    },
    {
      module: "Brand Logo (Header / Footer)",
      type: "Site Branding",
      dimensions: "250 × 80 px",
      ratio: "Transparent",
      maxSize: "Max 1 MB",
      format: "PNG, WebP, SVG",
      notes: "Main header navigation and footer branding logo",
    },
    {
      module: "Browser Favicon",
      type: "Browser Tab Icon",
      dimensions: "64 × 64 px",
      ratio: "1:1 Square",
      maxSize: "Max 512 KB",
      format: "PNG, ICO",
      notes: "Icon displayed in browser tab and mobile bookmarks",
    },
  ];

  const filteredSpecs = dimensionSpecs.filter(
    (item) =>
      item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dimensions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <PageHeader
          title="System Documentation & Admin Guide"
          subtitle="Official operational guidelines, data integrity rules, media upload specifications, and security policies"
        />
      </div>

      {/* Quick Search */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search rules, dimensions, validation specs, or media requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
          />
        </div>
      </div>

      {/* SECTION 1: DATA INTEGRITY & DELETE PROTECTION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              1. Reference Integrity & Delete Protection Rules
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Why Category, Occasion, Color, and Material cannot be deleted or set to inactive if products are assigned
            </p>
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-sm text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertTriangle size={18} className="shrink-0" />
            <span>Strict Foreign Reference Protection (Zero-Dangling Rule)</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-950/80">
            To prevent broken links, missing colors, unstitched fabric mismatches, and 404 filter errors on the customer-facing storefront, the system enforces a strict <strong>Reference Integrity Protection check</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Protected Entities */}
          <div className="border border-slate-200/80 rounded-xl p-4 space-y-2 bg-slate-50/40">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Lock size={14} className="text-blue-600" /> Protected Entities
            </h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li><strong>Category:</strong> Cannot be deleted or deactivated if assigned to any product.</li>
              <li><strong>Occasion:</strong> Protected against deactivation or deletion if linked to active collections.</li>
              <li><strong>Color:</strong> Cannot be deleted or deactivated if any variant uses this color.</li>
              <li><strong>Material (Fabric):</strong> Cannot be deleted or deactivated if assigned to any product.</li>
            </ul>
          </div>

          {/* How to Safely Remove */}
          <div className="border border-slate-200/80 rounded-xl p-4 space-y-2 bg-slate-50/40">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600" /> Safe Deletion Process
            </h3>
            <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside">
              <li>Navigate to <strong>Products &gt; All Products</strong>.</li>
              <li>Filter or search products assigned to that Category, Color, or Material.</li>
              <li>Reassign those products to another active record or delete the discontinued products.</li>
              <li>Once 0 products are assigned, you can safely delete or deactivate the record.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* SECTION 2: MEDIA UPLOAD & DIMENSION STANDARDS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ImageIcon size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              2. Image &amp; Video Dimension Specifications
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Exact recommended pixel dimensions, aspect ratios, and maximum upload file sizes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Usage / Location</th>
                <th className="py-3 px-4">Recommended Size</th>
                <th className="py-3 px-4">Aspect Ratio</th>
                <th className="py-3 px-4">Max File Size</th>
                <th className="py-3 px-4">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredSpecs.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.module}</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.type}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-600">{item.dimensions}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-500">{item.ratio}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {item.maxSize}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 text-[11px]">
                      {item.format}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: WEBP CONVERSION & PERFORMANCE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Zap size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              3. Automatic WebP Client-side Compression
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              High-speed in-browser conversion for Banners, Categories, and Occasions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Instant ~50ms Conversion
            </h4>
            <p className="text-slate-600 leading-relaxed">
              When an admin uploads a PNG or JPEG in Banners, Categories, or Occasions, the browser converts it directly to WebP before transmission.
            </p>
          </div>

          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> 70-85% Bandwidth Savings
            </h4>
            <p className="text-slate-600 leading-relaxed">
              WebP files provide lossless quality at a fraction of the weight, ensuring lightning-quick storefront loads on mobile and desktop.
            </p>
          </div>

          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Zero Server Load
            </h4>
            <p className="text-slate-600 leading-relaxed">
              All conversion runs on the client device using HTML5 canvas without consuming CPU on your production backend server.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: STOREFRONT CART & STOCK PROTECTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShoppingCart size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              4. Storefront Cart &amp; Inventory Protections
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Real-time stock limit checks, out-of-stock badges, and disabled quantity buttons
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> Real-time Plus Button Lock
            </h4>
            <p className="leading-relaxed">
              When a customer increments an item in the cart drawer up to its max inventory (e.g. 2 in stock), the plus (<strong>+</strong>) button automatically disables and dims (`opacity: 0.35`).
            </p>
            <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-danger-subtle text-danger border border-red-200">
              Max Limit Reached (X in stock)
            </div>
          </div>

          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> Instant Real-time Badge Sync
            </h4>
            <p className="leading-relaxed">
              Header cart icons and offcanvas counters update immediately upon adding or removing products without requiring any page reload or refresh.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: SECURITY & INFLUENCER MANAGEMENT */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Lock size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              5. Security Policies &amp; Influencer Access Controls
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Deactivation lockout, password reset guidelines, and credential management
            </p>
          </div>
        </div>

        <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
          <li>
            <strong>Deactivated Influencer Block:</strong> Influencers marked inactive are immediately barred from logging in with a SweetAlert support notice.
          </li>
          <li>
            <strong>One-click Credential Copy:</strong> When creating a new influencer, a popup immediately shows the generated username and password with a copy button.
          </li>
          <li>
            <strong>Admin Password Resets:</strong> Admins can reset influencer passwords directly without knowing old passwords, featuring eye toggles for password confirmation.
          </li>
        </ul>
      </div>
    </div>
  );
}

