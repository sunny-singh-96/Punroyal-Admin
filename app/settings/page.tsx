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
  ExternalLink
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { globalSettingsAPI } from "@/lib/integration/globalSettings";

interface FooterLink {
  name: string;
  link: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [headerLogo, setHeaderLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [favicon, setFavicon] = useState("");
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
  });

  // File uploads
  const [headerLogoFile, setHeaderLogoFile] = useState<File | null>(null);
  const [footerLogoFile, setFooterLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // File previews
  const [headerLogoPreview, setHeaderLogoPreview] = useState("");
  const [footerLogoPreview, setFooterLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await globalSettingsAPI.get();
      const data = res?.data?.globalSettings || res?.globalSettings || {};

      if (data.header_logo) setHeaderLogo(data.header_logo);
      if (data.footer_logo) setFooterLogo(data.footer_logo);
      if (data.favicon) setFavicon(data.favicon);
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
        });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load global settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();

      // Attached files
      if (headerLogoFile) formData.append("header_logo", headerLogoFile);
      if (footerLogoFile) formData.append("footer_logo", footerLogoFile);
      if (faviconFile) formData.append("favicon", faviconFile);

      // Text values
      formData.append("header_logo", headerLogo);
      formData.append("footer_logo", footerLogo);
      formData.append("favicon", favicon);
      formData.append("footer_description", footerDescription);
      formData.append("footer_links", JSON.stringify(footerLinks));
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("copyright", copyright);
      formData.append("social_links", JSON.stringify(socialLinks));

      const res: any = await globalSettingsAPI.update(formData);
      if (res?.code === "OK" || res?.success || res?.status === 200) {
        toast.success("Global settings saved successfully!");
        setHeaderLogoFile(null);
        setFooterLogoFile(null);
        setFaviconFile(null);
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
        subtitle="Manage website logos, favicon, footer description, and footer navigation links"
      />

      <form onSubmit={handleSave} className="space-y-8">
        {/* BRANDING SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <ImageIcon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Brand Identity & Logos</h2>
              <p className="text-xs text-slate-500">Header logo, footer logo, and browser favicon</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </div>

        {/* FOOTER DESCRIPTION SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
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
                  WhatsApp Link / Phone
                </label>
                <input
                  type="text"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  placeholder="https://wa.me/+919816787333"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
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