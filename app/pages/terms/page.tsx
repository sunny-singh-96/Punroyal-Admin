"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Calendar,
  Globe,
  Loader2,
  CheckCircle,
  X,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { termsAPI } from "@/lib/integration/pages";

interface TermSection {
  _id?: string;
  title: string;
  content: string;
}

export default function TermsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    pageTitle: "Terms & Conditions",
    subtitle: "Please read these terms and conditions carefully before using our platform",
    introText: "",
    lastUpdated: new Date().toISOString().split("T")[0],
    metaTitle: "Terms & Conditions | Punroyal",
    metaDescription: "",
  });

  const [sections, setSections] = useState<TermSection[]>([]);

  // Section Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<TermSection | null>(null);
  const [sectionForm, setSectionForm] = useState({ title: "", content: "" });
  const [sectionSaving, setSectionSaving] = useState(false);

  const fetchTermsData = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await termsAPI.get();
      const data = res?.data?.terms || res?.terms || {};

      let formattedDate = new Date().toISOString().split("T")[0];
      if (data.lastUpdated) {
        formattedDate = new Date(data.lastUpdated).toISOString().split("T")[0];
      }

      setFormData({
        pageTitle: data.pageTitle || "Terms & Conditions",
        subtitle: data.subtitle || "",
        introText: data.introText || "",
        lastUpdated: formattedDate,
        metaTitle: data.metaTitle || "Terms & Conditions | Punroyal",
        metaDescription: data.metaDescription || "",
      });

      setSections(Array.isArray(data.sections) ? data.sections : []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load Terms & Conditions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTermsData();
  }, [fetchTermsData]);

  // Save General Page Details
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res: any = await termsAPI.update({
        ...formData,
      });

      if (res?.code === "OK" || res?.success || res?.status === 200) {
        toast.success("Terms & Conditions page details updated!");
        fetchTermsData();
      } else {
        toast.error(res?.message || "Failed to update terms");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving terms");
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

  const openEditModal = (sec: TermSection) => {
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
        await termsAPI.updateSection(editingSection._id, sectionForm);
        toast.success("Section updated successfully!");
      } else {
        await termsAPI.addSection(sectionForm);
        toast.success("New section added!");
      }
      setIsModalOpen(false);
      fetchTermsData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to save section");
    } finally {
      setSectionSaving(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      await termsAPI.deleteSection(id);
      toast.success("Section deleted!");
      fetchTermsData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="Terms & Conditions"
        subtitle="Manage legal agreements, policies, disclaimers, and dynamic policy clauses"
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
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText size={20} />
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
                placeholder="Terms & Conditions"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" /> Last Updated Date
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
                placeholder="e.g. Please read these terms carefully before placing your order on Punroyal."
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
                placeholder="Welcome to Punroyal. By accessing our website, purchasing our luxury ethnic wear, or utilizing any of our services, you agree to comply with and be bound by the following terms..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* CLAUSES / SECTIONS LIST */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Dynamic Policy Clauses & Sections</h2>
              <p className="text-xs text-slate-400">
                Add clauses like Orders & Payments, Intellectual Property, Shipping, Returns, User Accounts, etc.
              </p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition"
            >
              <Plus size={16} /> Add Clause / Section
            </button>
          </div>

          {sections.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Layers size={44} className="mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-slate-600">No sections created yet</p>
              <p className="text-xs text-slate-400 mt-1">Add legal clauses with custom titles and detailed descriptions</p>
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
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
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
                placeholder="Terms & Conditions | Punroyal"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Read the terms and conditions of Punroyal, governing purchases, custom orders, returns, and digital services..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">
                {editingSection ? "Edit Clause / Section" : "Add New Clause / Section"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Section Title *</label>
                <input
                  type="text"
                  required
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  placeholder="e.g. 1. Order Acceptance and Pricing"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Section Content *</label>
                <textarea
                  rows={8}
                  required
                  value={sectionForm.content}
                  onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                  placeholder="Detail the terms, obligations, rights, and policies for this section..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
                >
                  {sectionSaving ? "Saving..." : editingSection ? "Update Section" : "Add Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
