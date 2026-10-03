"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Save,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Globe,
  Share2,
  Loader2,
  CheckCircle2
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { contactUsAPI } from "@/lib/integration/pages";

export default function ContactUsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    heroBadgeText: "Get In Touch",
    heroTitle: "Contact Us",
    heroSubtitle: "We'd love to hear from you. Our customer care team is here to assist you.",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    workingHours: "Mon – Sat: 10am – 7pm IST",
    mapEmbedUrl: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      pinterest: "",
      whatsapp: "",
    },
    metaTitle: "Contact Us | Punroyal",
    metaDescription: "",
  });

  const fetchContactUsData = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await contactUsAPI.get();
      const data = res?.data?.contactUs || res?.contactUs || {};

      setFormData({
        heroBadgeText: data.heroBadgeText || "Get In Touch",
        heroTitle: data.heroTitle || "Contact Us",
        heroSubtitle: data.heroSubtitle || "We'd love to hear from you. Our customer care team is here to assist you.",
        address: data.address || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        workingHours: data.workingHours || "Mon – Sat: 10am – 7pm IST",
        mapEmbedUrl: data.mapEmbedUrl || "",
        socialLinks: {
          facebook: data.socialLinks?.facebook || "",
          instagram: data.socialLinks?.instagram || "",
          twitter: data.socialLinks?.twitter || "",
          youtube: data.socialLinks?.youtube || "",
          pinterest: data.socialLinks?.pinterest || "",
          whatsapp: data.socialLinks?.whatsapp || "",
        },
        metaTitle: data.metaTitle || "Contact Us | Punroyal",
        metaDescription: data.metaDescription || "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load Contact Us content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactUsData();
  }, [fetchContactUsData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res: any = await contactUsAPI.update(formData);
      if (res?.code === "OK" || res?.success || res?.status === 200) {
        toast.success("Contact Us information updated successfully!");
        fetchContactUsData();
      } else {
        toast.error(res?.message || "Failed to update Contact Us information");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving Contact Us");
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (network: string, val: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [network]: val,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Loading Contact Us settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="Contact Us Page"
        subtitle="Manage phone numbers, emails, addresses, operating hours, Google Map, and social links"
        rightContent={
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        }
      />

      <form onSubmit={handleSave} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* HERO HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Page Header / Hero Banner</h2>
              <p className="text-xs text-slate-400">Controls the hero text and title on the Contact Us page</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Badge Text
              </label>
              <input
                type="text"
                value={formData.heroBadgeText}
                onChange={(e) => setFormData({ ...formData, heroBadgeText: e.target.value })}
                placeholder="e.g. Get In Touch"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Hero Title
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="e.g. Contact Us"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Hero Subtitle
              </label>
              <textarea
                rows={2}
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                placeholder="e.g. Have a question about sizing, custom royal embroidery, or tracking an order? Reach out anytime."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Direct Contact Information</h2>
              <p className="text-xs text-slate-400">Communication channels displayed to customers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone size={14} className="text-blue-600" /> Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MessageCircle size={14} className="text-emerald-600" /> WhatsApp Support Number
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail size={14} className="text-amber-600" /> Support Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="care@punroyal.com"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock size={14} className="text-indigo-600" /> Working Hours / Business Schedule
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                placeholder="Mon – Sat: 10:00 AM – 7:00 PM IST"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-red-500" /> Physical Store / Registered Office Address
              </label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="865, Industrial Area A, R. K. Road, Near Cheema Chowk, Ludhiana, Punjab 141003, India"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* GOOGLE MAP EMBED */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Google Map Location</h2>
              <p className="text-xs text-slate-400">Embed Google Maps iframe URL to guide visitors to your boutique</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Google Map Embed URL (src attribute from Google Maps Embed)
              </label>
              <input
                type="text"
                value={formData.mapEmbedUrl}
                onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Tip: Go to Google Maps, search your location, click <b>Share</b> &gt; <b>Embed a map</b> &gt; Copy only the URL inside <code>src="..."</code>.
              </p>
            </div>

            {formData.mapEmbedUrl && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-64 w-full bg-slate-100">
                <iframe
                  src={formData.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Store Location"
                />
              </div>
            )}
          </div>
        </div>

        {/* SOCIAL MEDIA LINKS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <Share2 size={22} className="text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">Social Media Handles</h2>
              <p className="text-xs text-slate-400">Connect customers to your social communities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">Instagram</label>
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                placeholder="https://instagram.com/punroyal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">Facebook</label>
              <input
                type="text"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                placeholder="https://facebook.com/punroyal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">WhatsApp Link</label>
              <input
                type="text"
                value={formData.socialLinks.whatsapp}
                onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
                placeholder="https://wa.me/919876543210"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">YouTube</label>
              <input
                type="text"
                value={formData.socialLinks.youtube}
                onChange={(e) => handleSocialChange("youtube", e.target.value)}
                placeholder="https://youtube.com/@punroyal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">Pinterest</label>
              <input
                type="text"
                value={formData.socialLinks.pinterest}
                onChange={(e) => handleSocialChange("pinterest", e.target.value)}
                placeholder="https://pinterest.com/punroyal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 block">Twitter / X</label>
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                placeholder="https://x.com/punroyal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* SEO META */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <Globe size={22} className="text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">SEO Settings</h2>
              <p className="text-xs text-slate-400">Meta tags for Google indexing</p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="Contact Us | Punroyal"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Contact Punroyal customer care for orders, customizations, and general queries..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-200 transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? "Saving Changes..." : "Save Contact Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
