"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  Megaphone,
  Tag,
  Percent,
  Receipt,
  RotateCw,
  Eye,
  EyeOff,
  Send,
  Server,
  ShieldCheck,
  Lock,
  Ruler,
  Sliders,
  Check,
  Search,
  Sparkles,
  HelpCircle,
  AlertCircle,
  RotateCcw,
  Ban
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { globalSettingsAPI } from "@/lib/integration/globalSettings";
import { couponsAPI } from "@/lib/integration/coupons";
import { useSettingsStore } from "@/store/settingsStore";
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

export interface SizeChartRow {
  size: string;
  bust: string;
  waist: string;
  hip: string;
  length: string;
}

const DEFAULT_SIZE_CHART_ROWS: SizeChartRow[] = [
  { size: "XS", bust: "34", waist: "30", hip: "36", length: "42" },
  { size: "S", bust: "36", waist: "32", hip: "38", length: "42" },
  { size: "M", bust: "38", waist: "34", hip: "40", length: "43" },
  { size: "L", bust: "40", waist: "36", hip: "42", length: "43" },
  { size: "XL", bust: "42", waist: "38", hip: "44", length: "44" },
  { size: "XXL", bust: "44", waist: "40", hip: "46", length: "44" },
  { size: "3XL", bust: "46", waist: "42", hip: "48", length: "45" },
];

interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from_email: string;
  from_name: string;
  is_active: boolean;
}

const DEFAULT_SMTP: SmtpSettings = {
  host: "",
  port: 587,
  secure: false,
  user: "",
  pass: "",
  from_email: "",
  from_name: "PUNROYAL",
  is_active: true,
};

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

const DEFAULT_INVOICE_TERMS = [
  "1. All items are authentic, hand-tailored luxury garments.",
  "2. All garment prices are inclusive of GST as per Govt. norms.",
  "3. Support email: care@punroyal.com | Mon - Sat 10am to 7pm."
];

type TabId =
  | "general"
  | "order_policy"
  | "invoice_pdf"
  | "branding"
  | "gst"
  | "sizechart"
  | "smtp"
  | "topbar"
  | "footer"
  | "social"
  | "cache";

interface TabItem {
  id: TabId;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

const TABS: TabItem[] = [
  {
    id: "general",
    name: "General",
    subtitle: "Store profile, contact information, address and copyright",
    icon: Sliders,
  },
  {
    id: "order_policy",
    name: "Return Policy",
    subtitle: "Customer return window duration and return policy controls",
    icon: RotateCcw,
    badge: "Policy",
  },
  {
    id: "invoice_pdf",
    name: "Invoice PDF & Terms",
    subtitle: "Custom Terms & Notes printed on customer PDF invoices",
    icon: FileText,
    badge: "Invoice",
  },
  {
    id: "branding",
    name: "Brand & Media",
    subtitle: "Header logo, footer logo, browser favicon, and newsletter banner",
    icon: ImageIcon,
  },
  {
    id: "gst",
    name: "Tax & GST Rules",
    subtitle: "Dynamic tax percentages for unstitched and readymade collections",
    icon: Percent,
    badge: "Dynamic",
  },
  {
    id: "sizechart",
    name: "Size Chart Guide",
    subtitle: "Measurement specifications table for readymade suits",
    icon: Ruler,
  },
  {
    id: "smtp",
    name: "Email Server (SMTP)",
    subtitle: "Outgoing mail credentials, sender identities, and live testing",
    icon: Mail,
  },
  {
    id: "topbar",
    name: "Topbar & Coupons",
    subtitle: "Announcement ticker messages and featured storefront coupon",
    icon: Megaphone,
  },
  {
    id: "footer",
    name: "Footer & Quick Links",
    subtitle: "Brand footer description and editable navigation links",
    icon: FileText,
  },
  {
    id: "social",
    name: "Social & WhatsApp",
    subtitle: "Social media profiles and customer floating WhatsApp widget",
    icon: Share2,
  },
  {
    id: "cache",
    name: "Website Cache",
    subtitle: "Redis memory cache synchronization and performance",
    icon: RotateCw,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [tabSearch, setTabSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  // Form fields
  const [headerLogo, setHeaderLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [newsletterImage, setNewsletterImage] = useState("");
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [newsletterSubtitle, setNewsletterSubtitle] = useState("");
  const [sizeChartTable, setSizeChartTable] = useState<SizeChartRow[]>(DEFAULT_SIZE_CHART_ROWS);
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

  // Order & Return Policy Settings
  const [returnWindowDays, setReturnWindowDays] = useState<number>(7);
  const [isReturnAllowed, setIsReturnAllowed] = useState<boolean>(true);
  const [cancellationCutoffStatus, setCancellationCutoffStatus] = useState<string>("ready_to_ship");
  const [isCancellationAllowed, setIsCancellationAllowed] = useState<boolean>(true);
  const [cancellationTimeLimitHours, setCancellationTimeLimitHours] = useState<number>(24);
  const [invoiceTerms, setInvoiceTerms] = useState<string[]>(DEFAULT_INVOICE_TERMS);
  const [couponHighlight, setCouponHighlight] = useState("");
  const [couponOptions, setCouponOptions] = useState<CouponOption[]>([]);
  const [gstRules, setGstRules] = useState<GstRule[]>(DEFAULT_GST_RULES);

  // SMTP Settings
  const [smtp, setSmtp] = useState<SmtpSettings>(DEFAULT_SMTP);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // File uploads and refs
  const formRef = useRef<HTMLFormElement>(null);
  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const footerLogoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const newsletterImageInputRef = useRef<HTMLInputElement>(null);

  const [headerLogoFile, setHeaderLogoFile] = useState<File | null>(null);
  const [footerLogoFile, setFooterLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [newsletterImageFile, setNewsletterImageFile] = useState<File | null>(null);

  // File previews
  const [headerLogoPreview, setHeaderLogoPreview] = useState("");
  const [footerLogoPreview, setFooterLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");
  const [newsletterImagePreview, setNewsletterImagePreview] = useState("");

  const addInvoiceTerm = useCallback(() => {
    setInvoiceTerms((prev) => {
      if (prev.length >= 6) return prev;
      return [...prev, `${prev.length + 1}. Customer support email: care@punroyal.com`];
    });
  }, []);

  const updateInvoiceTerm = useCallback((index: number, val: string) => {
    setInvoiceTerms((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }, []);

  const removeInvoiceTerm = useCallback((index: number) => {
    setInvoiceTerms((prev) => prev.filter((_, i) => i !== index));
  }, []);

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

  const fetchCoupons = useCallback(async () => {
    try {
      const res: any = await couponsAPI.getAll({ page: 1, limit: 200, search: "" });
      if (res?.code === "OK" && Array.isArray(res.data)) {
        setCouponOptions(
          res.data.map((c: CouponOption) => ({ _id: c._id, couponName: c.couponName }))
        );
      }
    } catch {
      // non-blocking
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
      useSettingsStore.getState().updateSettingsCache({
        headerLogo: data.header_logo || "",
        footerLogo: data.footer_logo || "",
        favicon: data.favicon || "",
      });
      if (data.newsletter_image !== undefined) setNewsletterImage(data.newsletter_image || "");
      if (data.newsletter_title !== undefined) setNewsletterTitle(data.newsletter_title || "");
      if (data.newsletter_subtitle !== undefined) setNewsletterSubtitle(data.newsletter_subtitle || "");
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
      if (data.return_window_days !== undefined) setReturnWindowDays(Number(data.return_window_days) || 7);
      if (data.is_return_allowed !== undefined) setIsReturnAllowed(Boolean(data.is_return_allowed));
      if (data.cancellation_cutoff_status !== undefined) setCancellationCutoffStatus(data.cancellation_cutoff_status || "ready_to_ship");
      if (data.is_cancellation_allowed !== undefined) setIsCancellationAllowed(Boolean(data.is_cancellation_allowed));
      if (data.cancellation_time_limit_hours !== undefined) setCancellationTimeLimitHours(Number(data.cancellation_time_limit_hours) || 24);
      if (Array.isArray(data.invoice_terms) && data.invoice_terms.length > 0) {
        setInvoiceTerms(data.invoice_terms);
      }

      const highlight = data.coupon_highlight;
      if (highlight && typeof highlight === "object" && highlight._id) {
        setCouponHighlight(highlight._id);
      } else if (typeof highlight === "string") {
        setCouponHighlight(highlight);
      } else {
        setCouponHighlight("");
      }

      if (Array.isArray(data.size_chart_table) && data.size_chart_table.length > 0) {
        setSizeChartTable(data.size_chart_table);
      }

      if (data.smtp) {
        setSmtp({
          host: data.smtp.host || "",
          port: Number(data.smtp.port) || 587,
          secure: Boolean(data.smtp.secure),
          user: data.smtp.user || "",
          pass: data.smtp.pass || "",
          from_email: data.smtp.from_email || "",
          from_name: data.smtp.from_name || "PUNROYAL",
          is_active: data.smtp.is_active !== undefined ? Boolean(data.smtp.is_active) : true,
        });
        if (data.smtp.user) {
          setTestEmail((prev) => prev || data.smtp.user);
        }
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
            if (
              found &&
              found.percentage !== undefined &&
              found.percentage !== null &&
              !isNaN(Number(found.percentage))
            ) {
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

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (file.type === "image/webp") {
        return resolve(file);
      }
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(file);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const baseName = file.name.replace(/\.[^/.]+$/, "");
            const webpFile = new File([blob], `${baseName}.webp`, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          0.88
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(file);
      };
      img.src = objectUrl;
    });
  };

  const handleNewsletterImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const webpFile = await convertToWebP(file);
        setNewsletterImageFile(webpFile);
        setNewsletterImagePreview(URL.createObjectURL(webpFile));
        toast.success(`Newsletter image converted to WebP (${(webpFile.size / 1024).toFixed(1)} KB)`);
      } catch {
        setNewsletterImageFile(file);
        setNewsletterImagePreview(URL.createObjectURL(file));
      }
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

  // Topbar messages management
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

  // Size chart management
  const updateSizeChartCell = (index: number, field: keyof SizeChartRow, value: string) => {
    setSizeChartTable((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSizeChartRow = () => {
    setSizeChartTable((prev) => [
      ...prev,
      { size: "", bust: "", waist: "", hip: "", length: "" },
    ]);
  };

  const removeSizeChartRow = (index: number) => {
    setSizeChartTable((prev) => prev.filter((_, i) => i !== index));
  };

  const resetSizeChartTable = () => {
    setSizeChartTable(DEFAULT_SIZE_CHART_ROWS);
    toast.success("Reset size chart to standard measurements");
  };

  // Test SMTP
  const handleTestSmtp = async () => {
    if (!smtp.host.trim() || !smtp.user.trim() || !smtp.pass.trim()) {
      toast.error("Please fill SMTP Host, User/Email, and Password first");
      return;
    }
    const target = testEmail.trim() || smtp.user.trim();
    if (!target) {
      toast.error("Please enter an email address to send the test email to");
      return;
    }
    try {
      setTestingSmtp(true);
      setSmtpTestResult(null);
      const res: any = await globalSettingsAPI.testSmtp({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        user: smtp.user,
        pass: smtp.pass,
        from_email: smtp.from_email || smtp.user,
        from_name: smtp.from_name || "PUNROYAL",
        test_email: target,
      });

      if (res?.code === "OK" || res?.success || res?.status === 200) {
        const msg = res?.data?.message || res?.message || `Test email delivered to ${target}!`;
        toast.success(msg);
        setSmtpTestResult({ success: true, message: msg });
      } else {
        const errMsg = res?.message || "SMTP test failed";
        toast.error(errMsg);
        setSmtpTestResult({ success: false, message: errMsg });
      }
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to connect to SMTP server";
      toast.error(errMsg);
      setSmtpTestResult({ success: false, message: errMsg });
    } finally {
      setTestingSmtp(false);
    }
  };

  // Handle Save
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
      formData.append("newsletter_title", newsletterTitle);
      formData.append("newsletter_subtitle", newsletterSubtitle);
      formData.append("size_chart_table", JSON.stringify(sizeChartTable));
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
      formData.append("return_window_days", String(returnWindowDays));
      formData.append("is_return_allowed", String(isReturnAllowed));
      formData.append("cancellation_cutoff_status", "pickup_scheduled");
      formData.append("is_cancellation_allowed", String(isCancellationAllowed));
      formData.append("cancellation_time_limit_hours", "0");
      formData.append("invoice_terms", JSON.stringify(invoiceTerms));
      formData.append("smtp", JSON.stringify(smtp));

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

  const filteredTabs = useMemo(() => {
    if (!tabSearch.trim()) return TABS;
    const q = tabSearch.toLowerCase();
    return TABS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
    );
  }, [tabSearch]);

  const activeTabMeta = useMemo(() => {
    return TABS.find((t) => t.id === activeTab) || TABS[0];
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={36} />
        <p className="text-slate-500 font-medium text-sm">Loading global settings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Global Settings"
          subtitle="Configure system-wide store branding, dynamic GST rules, SMTP server, and storefront content"
        />

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search settings tabs..."
            value={tabSearch}
            onChange={(e) => setTabSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main 2-Column Vertical Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: Vertical Tabs */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3 space-y-1 sticky top-6">
              <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
                Settings Menu
              </div>

              <div className="space-y-1">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left ${
                        isActive
                          ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-200/60"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl shrink-0 transition-colors ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="flex-1 truncate">{tab.name}</span>
                      {tab.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {filteredTabs.length === 0 && (
                  <p className="p-4 text-xs text-slate-400 text-center">No tabs found matching search</p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 px-2">
                <button
                  type="button"
                  onClick={handleClearCache}
                  disabled={clearingCache}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition shadow-xs disabled:opacity-50"
                >
                  <RotateCw size={13} className={clearingCache ? "animate-spin" : ""} />
                  {clearingCache ? "Clearing..." : "Quick Clear Cache"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT PANEL: Active Tab Card */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Card Header */}
              <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-xs">
                    {React.createElement(activeTabMeta.icon, { size: 20 })}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">{activeTabMeta.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{activeTabMeta.subtitle}</p>
                  </div>
                </div>

                {activeTab === "sizechart" && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetSizeChartTable}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition shadow-xs"
                    >
                      Reset Defaults
                    </button>
                    <button
                      type="button"
                      onClick={addSizeChartRow}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      <Plus size={13} /> Add Size Row
                    </button>
                  </div>
                )}

                {activeTab === "topbar" && (
                  <button
                    type="button"
                    onClick={addTopbarMessage}
                    className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <Plus size={13} /> Add Message
                  </button>
                )}

                {activeTab === "footer" && (
                  <button
                    type="button"
                    onClick={addFooterLink}
                    className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <Plus size={13} /> Add Link
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                {/* 1. GENERAL TAB */}
                {activeTab === "general" && (
                  <div className="divide-y divide-slate-100">
                    {/* Support Email */}
                    <div className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <Mail size={15} className="text-slate-400" /> Support Email
                        </label>
                        <p className="text-xs text-slate-400">Official contact email for store notifications and alerts</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. support@punroyal.com"
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Displayed in website footer and customer order confirmations</p>
                      </div>
                    </div>

                    {/* Support Phone */}
                    <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <Phone size={15} className="text-slate-400" /> Support Phone Number
                        </label>
                        <p className="text-xs text-slate-400">Customer helpline phone number</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 9816787333"
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Appears on topbar, footer, and powers fallback WhatsApp connect</p>
                      </div>
                    </div>

                    {/* Location / Address */}
                    <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <MapPin size={15} className="text-slate-400" /> Store Headquarters / City
                        </label>
                        <p className="text-xs text-slate-400">Physical address or city displayed publicly</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Jagraon, Punjab"
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Shown in footer and contact us page</p>
                      </div>
                    </div>

                    {/* Copyright Notice */}
                    <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 block">Copyright Notice</label>
                        <p className="text-xs text-slate-400">Legal copyright text displayed at the bottom of all pages</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="text"
                          value={copyright}
                          onChange={(e) => setCopyright(e.target.value)}
                          placeholder="e.g. Copyright 2025 PUNROYAL. All Rights Reserved."
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Year and company legal rights</p>
                      </div>
                    </div>

                    {/* Quick Cache Section */}
                    <div className="py-5 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <RotateCw size={15} className="text-amber-600" /> Storefront Cache Synchronization
                        </label>
                        <p className="text-xs text-slate-400">Purge server-side Redis cache if updates don&apos;t reflect immediately</p>
                      </div>
                      <div className="md:col-span-7 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={handleClearCache}
                          disabled={clearingCache}
                          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
                        >
                          <RotateCw size={14} className={clearingCache ? "animate-spin" : ""} />
                          {clearingCache ? "Clearing Website Cache..." : "Clear Website Cache Now"}
                        </button>
                        <span className="text-[11px] text-slate-400">Refreshes banners, categories &amp; product indexes</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1.5. RETURN POLICY TAB */}
                {activeTab === "order_policy" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-900 flex items-start gap-3">
                      <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">Customer Return Policy:</p>
                        <p className="text-indigo-800 leading-relaxed">
                          Configure customer return window duration and return rules.
                          These policies dynamically control the return buttons and duration across customer order details and account dashboards.
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {/* Allow Customer Returns */}
                      <div className="py-5 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 block">
                            Allow Customer Return Requests
                          </label>
                          <p className="text-xs text-slate-400">
                            Permit customers to request returns on delivered orders
                          </p>
                        </div>
                        <div className="md:col-span-7">
                          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isReturnAllowed}
                              onChange={(e) => setIsReturnAllowed(e.target.checked)}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                isReturnAllowed
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {isReturnAllowed && <Check size={14} className="stroke-[3]" />}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {isReturnAllowed
                                ? "Customer returns are enabled"
                                : "Customer returns are disabled store-wide"}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Return Window Duration (Days) */}
                      <div className="py-5 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            <RotateCcw size={15} className="text-emerald-600" /> Return Window Duration
                          </label>
                          <p className="text-xs text-slate-400">
                            Number of days after delivery during which a return request can be submitted
                          </p>
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {[1, 2, 3, 5, 7, 10, 14, 30].map((days) => (
                              <button
                                key={days}
                                type="button"
                                onClick={() => setReturnWindowDays(days)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                  returnWindowDays === days
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }`}
                              >
                                {days === 1 ? "24h (1 Day)" : `${days} Days`}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="relative w-40">
                              <input
                                type="number"
                                min={1}
                                max={90}
                                value={returnWindowDays}
                                onChange={(e) =>
                                  setReturnWindowDays(Math.max(1, Number(e.target.value) || 1))
                                }
                                className="w-full pl-3.5 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                                days
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                              = {returnWindowDays * 24} hours from delivery timestamp
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Once this period has passed after order delivery, the customer&apos;s Return button will automatically disable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1.6. INVOICE PDF & TERMS TAB */}
                {activeTab === "invoice_pdf" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                      <FileText size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">PDF Tax Invoice Terms &amp; Conditions Notes:</p>
                        <p className="text-amber-800 leading-relaxed">
                          Customize the Terms &amp; Notes printed at the bottom left of customer A4 PDF Tax Invoices.
                          Each line below corresponds to an editable bulleted note on the downloaded invoice.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {invoiceTerms.map((term, index) => (
                        <div key={index} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                            {index + 1}
                          </span>
                          <input
                            type="text"
                            value={term}
                            onChange={(e) => updateInvoiceTerm(index, e.target.value)}
                            placeholder={`Invoice Terms line ${index + 1}...`}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                          />
                          {invoiceTerms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeInvoiceTerm(index)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                              title="Delete line"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addInvoiceTerm}
                        disabled={invoiceTerms.length >= 6}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition shadow-2xs disabled:opacity-50 cursor-pointer"
                      >
                        <Plus size={15} /> Add Terms Line
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. BRAND & MEDIA TAB */}
                {activeTab === "branding" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Header Logo */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                              Header Logo
                            </label>
                            <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5 font-bold">
                              400 × 120 px
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">Main navigation bar brand logo</p>

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
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-xs">
                            <Upload size={13} className="text-blue-600" /> Upload Header Logo
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
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                              className="text-[11px] text-blue-600 hover:underline font-bold"
                            >
                              Same as Header
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">Displayed at the bottom of all storefront pages</p>

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
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-xs">
                            <Upload size={13} className="text-blue-600" /> Upload Footer Logo
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

                      {/* Browser Favicon */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                              Browser Favicon
                            </label>
                            <span className="text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-2 py-0.5 font-mono">
                              32×32 / 48×48
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">Browser tab &amp; bookmark icon</p>

                          <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-6 p-2 mb-3">
                            <div className="flex flex-col items-center gap-1">
                              <img
                                src={faviconPreview || favicon || "/punroyal-image/punroyal_logo.webp"}
                                alt="Favicon 32"
                                className="w-8 h-8 rounded object-contain shadow-xs border p-0.5"
                                onError={(e: any) => {
                                  e.target.src = "/punroyal-image/punroyal_logo.webp";
                                }}
                              />
                              <span className="text-[10px] text-slate-400 font-mono">32px</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <img
                                src={faviconPreview || favicon || "/punroyal-image/punroyal_logo.webp"}
                                alt="Favicon 48"
                                className="w-12 h-12 rounded object-contain shadow-xs border p-1"
                                onError={(e: any) => {
                                  e.target.src = "/punroyal-image/punroyal_logo.webp";
                                }}
                              />
                              <span className="text-[10px] text-slate-400 font-mono">48px</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-xs">
                            <Upload size={13} className="text-blue-600" /> Upload Favicon
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

                      {/* Newsletter Promotional Image */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                              Newsletter Popup Image
                            </label>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 font-bold">
                              Auto-WebP
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">Promotional image used in newsletter popup modal</p>

                          <div className="w-full h-24 bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                            {newsletterImagePreview || newsletterImage ? (
                              <img
                                src={newsletterImagePreview || newsletterImage}
                                alt="Newsletter Preview"
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium">No banner uploaded</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-xs">
                            <Upload size={13} className="text-blue-600" /> Upload Newsletter Banner
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/svg+xml"
                              onChange={handleNewsletterImageChange}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Or enter banner URL"
                            value={newsletterImage}
                            onChange={(e) => setNewsletterImage(e.target.value)}
                            className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Newsletter Heading & Subtitle Row */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4">
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                        Newsletter Popup Text &amp; Discount Offer
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Newsletter Popup Title
                          </label>
                          <input
                            type="text"
                            value={newsletterTitle}
                            onChange={(e) => setNewsletterTitle(e.target.value)}
                            placeholder="Join our style circle & get 10% off your first order!"
                            className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Newsletter Subtitle
                          </label>
                          <input
                            type="text"
                            value={newsletterSubtitle}
                            onChange={(e) => setNewsletterSubtitle(e.target.value)}
                            placeholder="Stay in the loop with our Punroyal newsletter..."
                            className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. GST & TAX CONFIGURATION TAB */}
                {activeTab === "gst" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                      <Receipt size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">Dynamic Tax Calculation Architecture:</p>
                        <p className="text-amber-800 leading-relaxed">
                          Product types and bracket conditions are fixed by business policy. As admin, you can configure the active GST tax percentage for each category.
                          These percentages dynamically drive tax calculations on all product pages, the cart drawer, and checkout totals without frontend duplication.
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {gstRules.map((rule) => {
                        const isUnstitched = rule.value === "any";
                        const isBelow2500 = rule.value === "below2500";
                        const isAbove2500 = rule.value === "above2500";

                        return (
                          <div
                            key={rule.value}
                            className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center"
                          >
                            <div className="md:col-span-6 space-y-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                    isUnstitched
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {rule.product_type}
                                </span>
                                <span className="text-sm font-bold text-slate-800">{rule.label}</span>
                              </div>
                              <p className="text-xs text-slate-400">
                                {isUnstitched && "Applies to all unstitched suits regardless of price"}
                                {isBelow2500 && "Applies to readymade items with unit price ≤ ₹2,500"}
                                {isAbove2500 && "Applies to readymade items with unit price > ₹2,500"}
                              </p>
                            </div>

                            <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-3">
                              <div className="relative w-40">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  value={rule.percentage}
                                  onChange={(e) =>
                                    handleGstPercentageChange(rule.value, parseFloat(e.target.value))
                                  }
                                  className="w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                  required
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                                  %
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 shrink-0">
                                Active: {rule.percentage}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. SIZE CHART GUIDE TAB */}
                {activeTab === "sizechart" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-3">
                      <Ruler size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">Interactive Readymade Size Guide:</p>
                        <p className="text-emerald-800 leading-relaxed">
                          Measurements are in inches. Changes made here dynamically update the &quot;Convert Size / Chart&quot; modal on all readymade product detail pages.
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">Size Name</th>
                            <th className="py-3 px-4">Bust / Chest (in)</th>
                            <th className="py-3 px-4">Waist (in)</th>
                            <th className="py-3 px-4">Hips (in)</th>
                            <th className="py-3 px-4">Length (in)</th>
                            <th className="py-3 px-4 text-center w-16">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sizeChartTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={row.size}
                                  onChange={(e) => updateSizeChartCell(idx, "size", e.target.value)}
                                  placeholder="e.g. M"
                                  className="w-full p-2 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={row.bust}
                                  onChange={(e) => updateSizeChartCell(idx, "bust", e.target.value)}
                                  placeholder="e.g. 38"
                                  className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={row.waist}
                                  onChange={(e) => updateSizeChartCell(idx, "waist", e.target.value)}
                                  placeholder="e.g. 34"
                                  className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={row.hip}
                                  onChange={(e) => updateSizeChartCell(idx, "hip", e.target.value)}
                                  placeholder="e.g. 40"
                                  className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={row.length}
                                  onChange={(e) => updateSizeChartCell(idx, "length", e.target.value)}
                                  placeholder="e.g. 43"
                                  className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="p-2.5 text-center">
                                <button
                                  type="button"
                                  onClick={() => removeSizeChartRow(idx)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                  title="Delete Size Row"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. SMTP & EMAIL SERVER TAB */}
                {activeTab === "smtp" && (
                  <div className="space-y-6">
                    <div className="divide-y divide-slate-100">
                      {/* Custom SMTP Toggle */}
                      <div className="py-4 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 block">
                            Custom SMTP Activation
                          </label>
                          <p className="text-xs text-slate-400">Enable custom outgoing mail server for inquiries and alerts</p>
                        </div>
                        <div className="md:col-span-7">
                          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={smtp.is_active}
                              onChange={(e) =>
                                setSmtp((prev) => ({ ...prev, is_active: e.target.checked }))
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                smtp.is_active
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {smtp.is_active && <Check size={14} className="stroke-[3]" />}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {smtp.is_active ? "Custom SMTP is Active" : "Custom SMTP is Disabled"}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* SMTP Host */}
                      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            <Server size={14} className="text-slate-400" /> SMTP Host / Server
                          </label>
                          <p className="text-xs text-slate-400">Mail server hostname or IP address</p>
                        </div>
                        <div className="md:col-span-7">
                          <input
                            type="text"
                            placeholder="e.g. smtp.gmail.com or smtp.hostinger.com"
                            value={smtp.host}
                            onChange={(e) => setSmtp((prev) => ({ ...prev, host: e.target.value }))}
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          />
                        </div>
                      </div>

                      {/* SMTP Port & Protocol */}
                      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-slate-400" /> Port &amp; Encryption
                          </label>
                          <p className="text-xs text-slate-400">Port 587 (TLS) or Port 465 (SSL)</p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="587"
                            value={smtp.port}
                            onChange={(e) => {
                              const val = Number(e.target.value) || 587;
                              setSmtp((prev) => ({
                                ...prev,
                                port: val,
                                secure: val === 465,
                              }));
                            }}
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          />
                          <select
                            value={smtp.secure ? "ssl" : "tls"}
                            onChange={(e) => {
                              const isSSL = e.target.value === "ssl";
                              setSmtp((prev) => ({
                                ...prev,
                                secure: isSSL,
                                port: isSSL ? 465 : prev.port === 465 ? 587 : prev.port,
                              }));
                            }}
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          >
                            <option value="tls">TLS / STARTTLS (Port 587)</option>
                            <option value="ssl">SSL (Port 465)</option>
                          </select>
                        </div>
                      </div>

                      {/* SMTP Username */}
                      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400" /> SMTP Username / Email
                          </label>
                          <p className="text-xs text-slate-400">Account login username or email</p>
                        </div>
                        <div className="md:col-span-7">
                          <input
                            type="text"
                            placeholder="e.g. orders@punroyal.com"
                            value={smtp.user}
                            onChange={(e) => setSmtp((prev) => ({ ...prev, user: e.target.value }))}
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          />
                        </div>
                      </div>

                      {/* SMTP Password */}
                      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center justify-between pr-4">
                            <span className="flex items-center gap-1.5">
                              <Lock size={14} className="text-slate-400" /> Password / App Password
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowSmtpPassword((s) => !s)}
                              className="text-[11px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                            >
                              {showSmtpPassword ? <EyeOff size={11} /> : <Eye size={11} />}
                              {showSmtpPassword ? "Hide" : "Show"}
                            </button>
                          </label>
                          <p className="text-xs text-slate-400">For Gmail, use a 16-character Google App Password</p>
                        </div>
                        <div className="md:col-span-7">
                          <input
                            type={showSmtpPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={smtp.pass}
                            onChange={(e) => setSmtp((prev) => ({ ...prev, pass: e.target.value }))}
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition font-mono"
                          />
                        </div>
                      </div>

                      {/* Sender Name & Email */}
                      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                        <div className="md:col-span-5 space-y-1">
                          <label className="text-sm font-semibold text-slate-800 block">Sender Name &amp; Email</label>
                          <p className="text-xs text-slate-400">Display name &amp; sender address seen in customer inboxes</p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="e.g. PUNROYAL"
                            value={smtp.from_name}
                            onChange={(e) =>
                              setSmtp((prev) => ({ ...prev, from_name: e.target.value }))
                            }
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          />
                          <input
                            type="email"
                            placeholder="Sender email (or leave blank)"
                            value={smtp.from_email}
                            onChange={(e) =>
                              setSmtp((prev) => ({ ...prev, from_email: e.target.value }))
                            }
                            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Test Email Box */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200/80 space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Send size={15} className="text-blue-600" /> Send Live SMTP Test Message
                        </h4>
                        <p className="text-xs text-slate-500">
                          Verify your SMTP connection immediately without creating a test order.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <input
                          type="email"
                          placeholder="Recipient email address (e.g. your-email@gmail.com)"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          className="flex-1 p-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          disabled={testingSmtp}
                          onClick={handleTestSmtp}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xs shrink-0"
                        >
                          {testingSmtp ? <Loader2 size={15} className="animate-spin" /> : <Send size={13} />}
                          <span>{testingSmtp ? "Testing..." : "Send Test Email"}</span>
                        </button>
                      </div>

                      {smtpTestResult && (
                        <div
                          className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                            smtpTestResult.success
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {smtpTestResult.success ? (
                            <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                          )}
                          <span>{smtpTestResult.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 6. TOPBAR & COUPONS TAB */}
                {activeTab === "topbar" && (
                  <div className="divide-y divide-slate-100">
                    {/* Featured Coupon Highlight */}
                    <div className="py-5 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <Tag size={15} className="text-indigo-600" /> Featured Store Coupon
                        </label>
                        <p className="text-xs text-slate-400">Choose a coupon to highlight on the homepage and cart drawer</p>
                      </div>
                      <div className="md:col-span-7">
                        <select
                          value={couponHighlight}
                          onChange={(e) => setCouponHighlight(e.target.value)}
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        >
                          <option value="">None — do not highlight a coupon</option>
                          {couponOptions.map((coupon) => (
                            <option key={coupon._id} value={coupon._id}>
                              {coupon.couponName}
                            </option>
                          ))}
                        </select>
                        {couponOptions.length === 0 && (
                          <p className="text-[11px] text-amber-700 mt-1">
                            No active coupons found. Create coupons in the Coupons module first.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Announcement Tickers */}
                    <div className="py-5 last:pb-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-slate-800 block">
                            Topbar Announcements Ticker
                          </label>
                          <p className="text-xs text-slate-400">
                            Short promo messages rotated in the topbar (max 55 characters per message)
                          </p>
                        </div>
                      </div>

                      {topbarMessages.length === 0 ? (
                        <div className="p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                          <p className="text-xs text-slate-500 mb-2">No topbar messages added yet.</p>
                          <button
                            type="button"
                            onClick={addTopbarMessage}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700"
                          >
                            + Add first topbar message
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {topbarMessages.map((message, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl"
                            >
                              <span className="text-xs font-black text-slate-400 w-6 text-center shrink-0">
                                {index + 1}
                              </span>
                              <div className="flex-1 relative flex items-center">
                                <input
                                  type="text"
                                  maxLength={55}
                                  value={message}
                                  onChange={(e) => updateTopbarMessage(index, e.target.value)}
                                  placeholder="e.g. Free shipping on all prepaid orders (Max 55 chars)"
                                  className="w-full p-2.5 pr-14 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span
                                  className={`absolute right-2.5 text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none ${
                                    message.length >= 50
                                      ? "text-amber-600 bg-amber-50 font-black"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {message.length}/55
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => moveTopbarMessageUp(index)}
                                  disabled={index === 0}
                                  title="Move Up"
                                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                  <ArrowUp size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveTopbarMessageDown(index)}
                                  disabled={index === topbarMessages.length - 1}
                                  title="Move Down"
                                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                  <ArrowDown size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeTopbarMessage(index)}
                                  title="Remove Message"
                                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. FOOTER & QUICK LINKS TAB */}
                {activeTab === "footer" && (
                  <div className="space-y-6">
                    {/* Footer Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 block">
                        Brand Footer About Text
                      </label>
                      <textarea
                        rows={4}
                        value={footerDescription}
                        onChange={(e) => setFooterDescription(e.target.value)}
                        placeholder="Enter brand description displayed below the footer logo..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
                      />
                      <p className="text-xs text-slate-400">
                        2-4 sentences explaining craftsmanship, quality, and heritage
                      </p>
                    </div>

                    {/* Footer Quick Links */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-slate-800 block">
                            Quick Links Navigation
                          </label>
                          <p className="text-xs text-slate-400">
                            Reorder, edit, or append links in the footer quick links column
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {footerLinks.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl"
                          >
                            <span className="text-xs font-black text-slate-400 w-6 text-center shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Link Title (e.g. About Us)"
                                value={item.name}
                                onChange={(e) => updateFooterLink(index, "name", e.target.value)}
                                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                              <input
                                type="text"
                                placeholder="URL (e.g. /about or /track-order)"
                                value={item.link}
                                onChange={(e) => updateFooterLink(index, "link", e.target.value)}
                                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-mono text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => moveLinkUp(index)}
                                disabled={index === 0}
                                title="Move Up"
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <ArrowUp size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveLinkDown(index)}
                                disabled={index === footerLinks.length - 1}
                                title="Move Down"
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <ArrowDown size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeFooterLink(index)}
                                title="Delete Link"
                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. SOCIAL MEDIA & WHATSAPP TAB */}
                {activeTab === "social" && (
                  <div className="divide-y divide-slate-100">
                    {/* WhatsApp */}
                    <div className="py-4 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          WhatsApp Floating Widget
                        </label>
                        <p className="text-xs text-slate-400">
                          Powers the floating green WhatsApp chat button on all customer pages
                        </p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="text"
                          value={socialLinks.whatsapp}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, whatsapp: e.target.value })
                          }
                          placeholder={phone ? `e.g. ${phone} or https://wa.me/...` : "+91 9816787333"}
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          If left blank, Support Phone ({phone || "+91 9816787333"}) is used automatically
                        </p>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 block">Instagram Profile URL</label>
                        <p className="text-xs text-slate-400">Official Instagram page link</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="url"
                          value={socialLinks.instagram}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, instagram: e.target.value })
                          }
                          placeholder="https://instagram.com/pun_royal1"
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 block">Facebook Page URL</label>
                        <p className="text-xs text-slate-400">Official Facebook page link</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="url"
                          value={socialLinks.facebook}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, facebook: e.target.value })
                          }
                          placeholder="https://facebook.com/..."
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 block">YouTube Channel URL</label>
                        <p className="text-xs text-slate-400">Official YouTube channel link</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="url"
                          value={socialLinks.youtube}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, youtube: e.target.value })
                          }
                          placeholder="https://youtube.com/@Pun_Royal"
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Twitter / X */}
                    <div className="py-4 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-sm font-semibold text-slate-800 block">Twitter / X URL</label>
                        <p className="text-xs text-slate-400">Official X/Twitter account</p>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          type="url"
                          value={socialLinks.twitter}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, twitter: e.target.value })
                          }
                          placeholder="https://x.com/..."
                          className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. CACHE & PERFORMANCE TAB */}
                {activeTab === "cache" && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                          <RotateCw size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Redis In-Memory Cache</h4>
                          <p className="text-xs text-slate-500">Fast storefront data caching engine</p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        To guarantee high throughput, the customer website caches product listings, collection pages, banners, occasion links, and global store settings in Redis.
                        Whenever you make critical catalog changes that you want to see reflected right away, use the button below to flush the store cache.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Purge Complete Website Cache</h4>
                        <p className="text-xs text-slate-500">Flushes all cache tags without restarting the server</p>
                      </div>

                      <button
                        type="button"
                        onClick={handleClearCache}
                        disabled={clearingCache}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
                      >
                        <RotateCw size={15} className={clearingCache ? "animate-spin" : ""} />
                        {clearingCache ? "Purging Cache..." : "Clear Website Cache Now"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STICKY SAVE ACTION BAR */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>Editing tab:</span>
            <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-lg">
              {activeTabMeta.name}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Global Settings
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
