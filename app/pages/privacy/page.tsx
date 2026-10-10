"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  ShieldCheck,
  Calendar,
  Globe,
  Loader2,
  CheckCircle,
  X,
  Layers
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { privacyAPI } from "@/lib/integration/pages";

interface PrivacySection {
  _id?: string;
  title: string;
  content: string;
}

export default function PrivacyAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    pageTitle: "Privacy Policy",
    subtitle: "Your privacy is important to us. Learn how we collect, use, and protect your personal data.",
    introText: "",
    lastUpdated: new Date().toISOString().split("T")[0],
    metaTitle: "Privacy Policy | Punroyal",
    metaDescription: "",
  });

  const [sections, setSections] = useState<PrivacySection[]>([]);

  // Section Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<PrivacySection | null>(null);
  const [sectionForm, setSectionForm] = useState({ title: "", content: "" });
  const [sectionSaving, setSectionSaving] = useState(false);

  const fetchPrivacyData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const res: any = await privacyAPI.get();
      const data = res?.data?.privacyPolicy || res?.privacyPolicy || {};

      let formattedDate = new Date().toISOString().split("T")[0];
      if (data.lastUpdated) {
        formattedDate = new Date(data.lastUpdated).toISOString().split("T")[0];
      }

      setFormData({
        pageTitle: data.pageTitle || "Privacy Policy",
        subtitle: data.subtitle || "",
        introText: data.introText || "",
        lastUpdated: formattedDate,
        metaTitle: data.metaTitle || "Privacy Policy | Punroyal",
        metaDescription: data.metaDescription || "",
      });

      setSections(Array.isArray(data.sections) ? data.sections : []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load Privacy Policy");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchPrivacyData();
  }, [fetchPrivacyData]);

  // Save General Page Details
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await privacyAPI.update({
        ...formData,
      });
      toast.success("Privacy Policy page details updated!");
      await fetchPrivacyData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving privacy policy");
    } finally {
      setSaving(false);
    }
  };

  // Section Add / Edit
  const openAddModal = () => {
    setEditingSection(null);
    setSectionForm({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (sec: PrivacySection) => {
    setEditingSection(sec);
    setSectionForm({ title: sec.title, content: sec.content });
    setIsModalOpen(true);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionForm.title.trim()) {
      toast.error("Please enter a section title");
      return;
    }

    try {
      setSectionSaving(true);
      if (editingSection && editingSection._id) {
        await privacyAPI.updateSection(editingSection._id, sectionForm);
        toast.success("Section updated successfully!");
      } else {
        await privacyAPI.addSection(sectionForm);
        toast.success("New section added!");
      }
      setIsModalOpen(false);
      await fetchPrivacyData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to save section");
    } finally {
      setSectionSaving(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      await privacyAPI.deleteSection(id);
      toast.success("Section deleted!");
      await fetchPrivacyData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Loading Privacy Policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="Privacy Policy"
        subtitle="Manage user data policies, cookies, privacy disclosures, and security terms"
        rightContent={
          <button
            onClick={handleSavePage}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? "Saving..." : "Save Page Settings"}</span>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* PAGE SETTINGS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">General Information</h2>
              <p className="text-xs text-slate-400">Header title, last updated date, and introduction paragraph</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Page Title
              </label>
              <input
                type="text"
                value={formData.pageTitle}
                onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                placeholder="Privacy Policy"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-teal-600" /> Last Updated Date
              </label>
              <input
                type="date"
                value={formData.lastUpdated}
                onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Protecting your personal information and privacy is our paramount priority."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Introduction Text
              </label>
              <textarea
                rows={3}
                value={formData.introText}
                onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                placeholder="At Punroyal, we are dedicated to protecting your privacy and ensuring your personal information is collected, handled, and stored securely..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* CLAUSES / SECTIONS LIST */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Dynamic Privacy Policy Sections</h2>
              <p className="text-xs text-slate-400">
                Add sections like Information We Collect, How We Use Your Data, Payment Security, Cookies, Third-Party Sharing, etc.
              </p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition"
            >
              <Plus size={16} /> Add Privacy Section
            </button>
          </div>

          {sections.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Layers size={44} className="mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-slate-600">No privacy sections created yet</p>
              <p className="text-xs text-slate-400 mt-1">Add privacy clauses with custom headings and transparent policy terms</p>
              <button onClick={openAddModal} className="text-blue-600 font-bold text-sm mt-3 hover:underline">
                + Add First Section
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section, idx) => (
                <div
                  key={section._id || idx}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-800 text-base">{section.title}</h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(section)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition"
                        title="Edit Section"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => section._id && handleDeleteSection(section._id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-white rounded-lg transition"
                        title="Delete Section"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pl-11 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                placeholder="Privacy Policy | Punroyal"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Learn about Punroyal's privacy practices, data handling, and encryption for shopping royal ethnic wear..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION MODAL */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 w-screen h-screen">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="font-bold text-lg text-slate-800">
                  {editingSection ? "Edit Privacy Section" : "Add New Privacy Section"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5">Section Title *</label>
                <input
                  type="text"
                  required
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  placeholder="e.g. 1. Information We Collect When You Place an Order"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5">Section Content *</label>
                <textarea
                  rows={8}
                  required
                  value={sectionForm.content}
                  onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                  placeholder="Detail the policies, safeguards, and user rights regarding personal data..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sectionSaving}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sectionSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : editingSection ? (
                    "Update Section"
                  ) : (
                    "Add Section"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
