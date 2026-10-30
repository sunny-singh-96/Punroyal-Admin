"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Save,
  Globe,
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Loader2,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Share2,
  ExternalLink,
  Megaphone,
  Tag,
  Percent,
  Receipt,
  RotateCw
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { globalSettingsAPI } from "@/lib/integration/globalSettings";
import { couponsAPI } from "@/lib/integration/coupons";
import { dashboardAPI } from "@/lib/integration/dashboard";

interface FooterLink {
  name: string;
  link: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  twitter: string;
}

interface CouponOption {
  _id: string;
  couponName: string;
}

export interface GstRule {
  product_type: "unstitched" | "readymade";
  value: "any" | "below2500" | "above2500";
  percentage: number;
  label: string;
}

const DEFAULT_GST_RULES: GstRule[] = [
  {
    product_type: "unstitched",
    value: "any",
    percentage: 5,
    label: "Unstitched (Any Price)",
  },
  {
    product_type: "readymade",
    value: "below2500",
    percentage: 5,
    label: "Readymade below ₹2,500",
  },
  {
    product_type: "readymade",
    value: "above2500",
    percentage: 18,
    label: "Readymade above ₹2,500",
  },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  const handleClearCache = async () => {
    if (clearingCache) return;
    setClearingCache(true);
    try {
      await dashboardAPI.clearWebsiteCache();
      toast.success("Website cache cleared successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to clear website cache");
    } finally {
      setClearingCache(false);
    }
  };


  // Form fields
  const [headerLogo, setHeaderLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [newsletterImage, setNewsletterImage] = useState("");
  const [footerDescription, setFooterDescription] = useState("");
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Terms & Conditions", link: "/terms-and-conditions" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Track Order", link: "/track-order" },
  ]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [copyright, setCopyright] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
    twitter: "",
  });
  const [topbarMessages, setTopbarMessages] = useState<string[]>([]);
  const [couponHighlight, setCouponHighlight] = useState("");
  const [couponOptions, setCouponOptions] = useState<CouponOption[]>([]);
  const [gstRules, setGstRules] = useState<GstRule[]>(DEFAULT_GST_RULES);

  // File uploads
  const [headerLogoFile, setHeaderLogoFile] = useState<File | null>(null);
  const [footerLogoFile, setFooterLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [newsletterImageFile, setNewsletterImageFile] = useState<File | null>(null);

  // File previews
  const [headerLogoPreview, setHeaderLogoPreview] = useState("");
  const [footerLogoPreview, setFooterLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");
  const [newsletterImagePreview, setNewsletterImagePreview] = useState("");

  const fetchCoupons = useCallback(async () => {
    try {
      const res: any = await couponsAPI.getAll({ page: 1, limit: 200, search: "" });
      if (res?.code === "OK" && Array.isArray(res.data)) {
        setCouponOptions(
          res.data.map((c: CouponOption) => ({ _id: c._id, couponName: c.couponName }))
        );
      }
    } catch {
      // non-blocking; dropdown stays empty
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await globalSettingsAPI.get();
      const data = res?.data?.globalSettings || res?.globalSettings || {};

      if (data.header_logo) setHeaderLogo(data.header_logo);
      if (data.footer_logo) setFooterLogo(data.footer_logo);
      if (data.favicon) setFavicon(data.favicon);
      if (data.newsletter_image !== undefined) setNewsletterImage(data.newsletter_image || "");
      if (data.footer_description) setFooterDescription(data.footer_description);
      if (Array.isArray(data.footer_links) && data.footer_links.length > 0) {
        setFooterLinks(data.footer_links);
      }
      if (data.email) setEmail(data.email);
      if (data.phone) setPhone(data.phone);
      if (data.location) setLocation(data.location);
      if (data.copyright) setCopyright(data.copyright);
      if (data.social_links) {
        setSocialLinks({
          facebook: data.social_links.facebook || "",
          instagram: data.social_links.instagram || "",
          youtube: data.social_links.youtube || "",
          whatsapp: data.social_links.whatsapp || "",
          twitter: data.social_links.twitter || "",
        });
      }
      if (Array.isArray(data.topbar_messages) && data.topbar_messages.length > 0) {
        setTopbarMessages(data.topbar_messages);
      } else if (data.topbar && String(data.topbar).trim()) {
        setTopbarMessages([String(data.topbar).trim()]);
      } else {
        setTopbarMessages([]);
      }
      const highlight = data.coupon_highlight;
      if (highlight && typeof highlight === "object" && highlight._id) {
        setCouponHighlight(highlight._id);
      } else if (typeof highlight === "string") {
        setCouponHighlight(highlight);
      } else {
        setCouponHighlight("");
      }

      if (Array.isArray(data.gst_rules) && data.gst_rules.length > 0) {
        setGstRules((prev) =>
          prev.map((fixed) => {
            const found = data.gst_rules.find((r: any) => {
              if (!r) return false;
              const pt = String(r.product_type || "").toLowerCase().trim();
              const val = String(r.value || "").toLowerCase().trim();
              const fixedPt = fixed.product_type.toLowerCase();
              const fixedVal = fixed.value.toLowerCase();
              const ptMatches =
                pt === fixedPt ||
                (fixedPt === "unstitched" && pt === "no_sizes") ||
                (fixedPt === "readymade" && pt === "sizes");
              return ptMatches && val === fixedVal;
            });
            if (found && found.percentage !== undefined && found.percentage !== null && !isNaN(Number(found.percentage))) {
              return { ...fixed, percentage: Number(found.percentage) };
            }
            return fixed;
          })
        );
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load global settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGstPercentageChange = (valueKey: string, newPercentage: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(newPercentage) ? 0 : newPercentage));
    setGstRules((prev) =>
      prev.map((rule) =>
        rule.value === valueKey ? { ...rule, percentage: clamped } : rule
      )
    );
  };

  useEffect(() => {
    fetchSettings();
    fetchCoupons();
  }, [fetchSettings, fetchCoupons]);

  // Handle file selections
  const handleHeaderLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderLogoFile(file);
      setHeaderLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFooterLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFooterLogoFile(file);
      setFooterLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleNewsletterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewsletterImageFile(file);
      setNewsletterImagePreview(URL.createObjectURL(file));
    }
  };

  // Footer links management
  const addFooterLink = () => {
    setFooterLinks([...footerLinks, { name: "", link: "/" }]);
  };

  const updateFooterLink = (index: number, field: "name" | "link", value: string) => {
    const updated = [...footerLinks];
    updated[index][field] = value;
    setFooterLinks(updated);
  };

  const removeFooterLink = (index: number) => {
    if (footerLinks.length <= 1) {
      toast.error("At least one footer link is recommended");
      return;
    }
    setFooterLinks(footerLinks.filter((_, i) => i !== index));
  };

  const moveLinkUp = (index: number) => {
    if (index === 0) return;
    const updated = [...footerLinks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setFooterLinks(updated);
  };

  const moveLinkDown = (index: number) => {
    if (index === footerLinks.length - 1) return;
    const updated = [...footerLinks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setFooterLinks(updated);
  };

  const addTopbarMessage = () => {
    setTopbarMessages([...topbarMessages, ""]);
  };

  const updateTopbarMessage = (index: number, value: string) => {
    const updated = [...topbarMessages];
    updated[index] = value;
    setTopbarMessages(updated);
  };

  const removeTopbarMessage = (index: number) => {
    setTopbarMessages(topbarMessages.filter((_, i) => i !== index));
  };

  const moveTopbarMessageUp = (index: number) => {
    if (index === 0) return;
    const updated = [...topbarMessages];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setTopbarMessages(updated);
  };

  const moveTopbarMessageDown = (index: number) => {
    if (index === topbarMessages.length - 1) return;
    const updated = [...topbarMessages];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setTopbarMessages(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();

      // Attached files
      if (headerLogoFile) formData.append("header_logo", headerLogoFile);
      if (footerLogoFile) formData.append("footer_logo", footerLogoFile);
      if (faviconFile) formData.append("favicon", faviconFile);
      if (newsletterImageFile) formData.append("newsletter_image", newsletterImageFile);

      // Text values
      formData.append("header_logo", headerLogo);
      formData.append("footer_logo", footerLogo);
      formData.append("favicon", favicon);
      formData.append("newsletter_image", newsletterImage);
      formData.append("footer_description", footerDescription);
      formData.append("footer_links", JSON.stringify(footerLinks));
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("copyright", copyright);
      formData.append("social_links", JSON.stringify(socialLinks));
      formData.append("topbar_messages", JSON.stringify(topbarMessages));
      formData.append("coupon_highlight", couponHighlight || "");
      formData.append("gst_rules", JSON.stringify(gstRules));

      const res: any = await globalSettingsAPI.update(formData);
      if (res?.code === "OK" || res?.success || res?.status === 200) {
        toast.success("Global settings saved successfully!");
        setHeaderLogoFile(null);
        setFooterLogoFile(null);
        setFaviconFile(null);
        setNewsletterImageFile(null);
        fetchSettings();
      } else {
        toast.error(res?.message || "Failed to update global settings");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving global settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={36} />
        <p className="text-slate-500 font-medium text-sm">Loading global settings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Global Store Settings"
        subtitle="Manage website logos, dynamic GST tax rules, store announcements, coupons, and footer details"
      />

      {/* Quick Navigation Anchor Bar */}
      <div className="flex flex-wrap items-center gap-2.5 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="text-xs font-bold text-slate-400 mr-1">Quick Jump:</span>
        <a
          href="#gst-settings"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition border border-amber-200 shadow-xs"
        >
          <Percent size={13} className="text-amber-600" /> GST Tax Rules (Configurable)
        </a>
        <a
          href="#branding-settings"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition border border-slate-200/70"
        >
          <ImageIcon size={13} /> Brand Identity &amp; Logos
        </a>
        <a
          href="#topbar-settings"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition border border-slate-200/70"
        >
          <Megaphone size={13} /> Topbar &amp; Coupons
        </a>
        <a
          href="#footer-settings"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition border border-slate-200/70"
        >
          <FileText size={13} /> Footer &amp; Social Links
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* BRANDING SECTION */}
        <div id="branding-settings" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-6">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <ImageIcon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Brand Identity & Logos</h2>
              <p className="text-xs text-slate-500">Header logo, footer logo, favicon, and newsletter image</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Header Logo */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Header Logo
                </label>
                <p className="text-xs text-slate-400 mb-3">Displayed in the main website navigation bar.</p>

                {/* Preview */}
                <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                  <img
                    src={headerLogoPreview || headerLogo || "/punroyal-image/punroyal_logo.webp"}
                    alt="Header Logo Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e: any) => {
                      e.target.src = "/punroyal-image/punroyal_logo.webp";
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-sm">
                  <Upload size={14} className="text-blue-600" /> Upload File
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleHeaderLogoChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Or enter image URL"
                  value={headerLogo}
                  onChange={(e) => setHeaderLogo(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer Logo */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                    Footer Logo
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterLogo(headerLogo);
                      setFooterLogoPreview(headerLogoPreview);
                      setFooterLogoFile(headerLogoFile);
                      toast.success("Copied Header Logo to Footer Logo");
                    }}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Same as Header
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">Displayed at the bottom of all website pages.</p>

                {/* Preview */}
                <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                  <img
                    src={footerLogoPreview || footerLogo || headerLogo || "/punroyal-image/punroyal_logo.webp"}
                    alt="Footer Logo Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e: any) => {
                      e.target.src = "/punroyal-image/punroyal_logo.webp";
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-sm">
                  <Upload size={14} className="text-blue-600" /> Upload File
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleFooterLogoChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Or enter image URL"
                  value={footerLogo}
                  onChange={(e) => setFooterLogo(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Favicon */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Browser Favicon
                </label>
                <p className="text-xs text-slate-400 mb-3">Displayed in browser tabs and bookmarks bar.</p>

                {/* Preview */}
                <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-4 p-2 mb-3">
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={faviconPreview || favicon || "/punroyal-image/punroyal_logo.webp"}
                      alt="Favicon Preview"
                      className="w-8 h-8 rounded object-contain shadow-xs border p-0.5"
                      onError={(e: any) => {
                        e.target.src = "/punroyal-image/punroyal_logo.webp";
                      }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">32x32</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={faviconPreview || favicon || "/punroyal-image/punroyal_logo.webp"}
                      alt="Favicon Preview"
                      className="w-12 h-12 rounded object-contain shadow-xs border p-1"
                      onError={(e: any) => {
                        e.target.src = "/punroyal-image/punroyal_logo.webp";
                      }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">48x48</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-sm">
                  <Upload size={14} className="text-blue-600" /> Upload File (.ico/.png/.webp)
                  <input
                    type="file"
                    accept="image/x-icon,image/png,image/webp,image/vnd.microsoft.icon,image/svg+xml"
                    onChange={handleFaviconChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Or enter favicon URL"
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Newsletter Image */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  <Mail size={14} className="inline mr-1 text-slate-400" /> Newsletter Image
                </label>
                <p className="text-xs text-slate-400 mb-3">Used in newsletter signup and promotional sections.</p>

                <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                  {newsletterImagePreview || newsletterImage ? (
                    <img
                      src={newsletterImagePreview || newsletterImage}
                      alt="Newsletter Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">No image uploaded</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-sm">
                  <Upload size={14} className="text-blue-600" /> Upload File
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleNewsletterImageChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Or enter image URL"
                  value={newsletterImage}
                  onChange={(e) => setNewsletterImage(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          </div>
        </div>

        {/* GST TAX CONFIGURATION SECTION (PLACED PROMINENTLY NEAR TOP) */}
        <div id="gst-settings" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-6">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Percent size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">GST Configuration (Tax Rules)</h2>
                <p className="text-xs text-slate-500">
                  Fixed product categories &amp; price rules. Only GST percentages are editable by admin.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 size={13} className="text-emerald-600" />
              Dynamic Tax Rules Active
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
              <Receipt size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Important Tax Policy Guidelines:</p>
                <p className="text-amber-800 leading-relaxed">
                  Product types and price criteria are fixed by business policy. Admins can configure only the GST percentages.
                  These percentages dynamically drive tax calculations on product pages, the cart drawer, and checkout totals without frontend duplication.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {gstRules.map((rule) => {
                const isUnstitched = rule.value === "any";
                const isBelow2500 = rule.value === "below2500";
                const isAbove2500 = rule.value === "above2500";

                return (
                  <div
                    key={rule.value}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                            isUnstitched
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {rule.product_type}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          value: {rule.value}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{rule.label}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {isUnstitched && "Applies to all unstitched suits regardless of price."}
                          {isBelow2500 && "Applies to readymade items with unit price ≤ ₹2,500."}
                          {isAbove2500 && "Applies to readymade items with unit price > ₹2,500."}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                          <span className="font-semibold text-slate-700">GST Rate (%)</span>
                          <span className="text-[11px] text-slate-400">
                            Default: {isAbove2500 ? "18%" : "5%"}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={0.1}
                            value={rule.percentage}
                            onChange={(e) =>
                              handleGstPercentageChange(rule.value, parseFloat(e.target.value))
                            }
                            className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-base font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-200/40">
                      <span>Condition: Fixed</span>
                      <span className="font-medium text-emerald-600">Active Rate: {rule.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TOPBAR & COUPON HIGHLIGHT */}
        <div id="topbar-settings" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-6">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Megaphone size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Topbar & Coupon Highlight</h2>
              <p className="text-xs text-slate-500">
                Announcement text for the store top bar and which coupon to feature
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                  Topbar Messages
                </label>
                <button
                  type="button"
                  onClick={addTopbarMessage}
                  className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                >
                  <Plus size={14} /> Add Message
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Short promo lines shown in the website top bar (one or more). Remove all to hide the top bar.
              </p>

              {topbarMessages.length === 0 ? (
                <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                  <p className="text-xs text-slate-500 mb-2">No top bar messages yet.</p>
                  <button
                    type="button"
                    onClick={addTopbarMessage}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Add your first message
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {topbarMessages.map((message, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl"
                    >
                      <span className="text-xs font-black text-slate-400 w-6 text-center shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => updateTopbarMessage(index, e.target.value)}
                        placeholder="e.g. Free shipping on orders above ₹999"
                        className="flex-1 p-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveTopbarMessageUp(index)}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTopbarMessageDown(index)}
                          disabled={index === topbarMessages.length - 1}
                          title="Move Down"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTopbarMessage(index)}
                          title="Remove Message"
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                <Tag size={14} className="inline mr-1 text-slate-400" /> Coupon Highlight
              </label>
              <select
                value={couponHighlight}
                onChange={(e) => setCouponHighlight(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None — do not highlight a coupon</option>
                {couponOptions.map((coupon) => (
                  <option key={coupon._id} value={coupon._id}>
                    {coupon.couponName}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Choose a coupon from your Coupons module to promote on the storefront.
              </p>
              {couponOptions.length === 0 && (
                <p className="text-[11px] text-amber-700 mt-1">
                  No coupons found. Create coupons under Coupons in the sidebar first.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER DESCRIPTION SECTION */}
        <div id="footer-settings" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-6">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Footer Description / About Text</h2>
              <p className="text-xs text-slate-500">The description paragraph displayed in the footer under the brand logo</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">
              Footer Description
            </label>
            <textarea
              rows={4}
              value={footerDescription}
              onChange={(e) => setFooterDescription(e.target.value)}
              placeholder="Enter company description shown in the footer..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
            <p className="text-xs text-slate-400">
              Recommended length: 2-4 sentences explaining your store, quality, and values.
            </p>
          </div>
        </div>

        {/* FOOTER LINKS SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <Globe size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Editable Footer Links</h2>
                <p className="text-xs text-slate-500">Add, remove, edit, or reorder the links shown in the Quick Links column</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addFooterLink}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-3">
              {footerLinks.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl hover:border-slate-300 transition-all"
                >
                  <span className="text-xs font-black text-slate-400 w-6 text-center">{index + 1}</span>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Link Title (e.g., About Us)"
                        value={item.name}
                        onChange={(e) => updateFooterLink(index, "name", e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="URL (e.g., /about or https://...)"
                        value={item.link}
                        onChange={(e) => updateFooterLink(index, "link", e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-mono text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveLinkUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveLinkDown(index)}
                      disabled={index === footerLinks.length - 1}
                      title="Move Down"
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFooterLink(index)}
                      title="Delete Link"
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT & SOCIAL DETAILS */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Share2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Contact Info & Social Links</h2>
              <p className="text-xs text-slate-500">Contact information and social profiles displayed across the footer</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  <Mail size={14} className="inline mr-1 text-slate-400" /> Support Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="support@punroyal.com"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  <Phone size={14} className="inline mr-1 text-slate-400" /> Support Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9816787333"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  <MapPin size={14} className="inline mr-1 text-slate-400" /> Location / Address
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Jagraon, Punjab"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  placeholder="Copyright 2025 PUNROYAL. All Rights Reserved."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  WhatsApp Number / Link <span className="text-slate-400 font-normal lowercase">(Store Floating Button)</span>
                </label>
                <input
                  type="text"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  placeholder={phone ? `e.g. ${phone} or https://wa.me/...` : "e.g. +91 9816787333 or 9816787333"}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Floating WhatsApp button on store will connect directly to this number. If empty, Support Phone ({phone || "+91 9816787333"}) is used.
                </p>
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        
        {/* WEBSITE CACHE & PERFORMANCE */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <RotateCw size={18} />
                </div>
                <h3 className="text-base font-bold text-slate-800">Website Cache & Synchronization</h3>
              </div>
              <p className="text-xs text-slate-500 max-w-xl">
                Clear all cached pages, banners, product collections, and occasions stored in Redis memory. Use this whenever changes are not reflecting immediately on the live frontend.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              disabled={clearingCache}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
            >
              <RotateCw size={16} className={clearingCache ? "animate-spin" : ""} />
              {clearingCache ? "Clearing Cache..." : "Clear Website Cache"}
            </button>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="sticky bottom-6 z-20 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Saving Settings...
              </>
            ) : (
              <>
                <Save size={18} /> Save Global Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}