"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Calendar,
  Globe,
  Loader2,
  CheckCircle,
  X,
  Layers,
  FileText
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { cancellationAPI } from "@/lib/integration/pages";

interface CancellationSection {
  _id?: string;
  title: string;
  content: string;
}

export default function CancellationAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    pageTitle: "Cancellation Policy",
    subtitle: "Clear, transparent, and hassle-free cancellation and refund guidelines for your Punroyal orders.",
    introText: "",
    lastUpdated: new Date().toISOString().split("T")[0],
    metaTitle: "Cancellation Policy | Punroyal",
    metaDescription: "",
  });

  const [sections, setSections] = useState<CancellationSection[]>([]);

  // Section Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CancellationSection | null>(null);
  const [sectionForm, setSectionForm] = useState({ title: "", content: "" });
  const [sectionSaving, setSectionSaving] = useState(false);

  const fetchCancellationData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const res: any = await cancellationAPI.get();
      const data = res?.data?.cancellationPolicy || res?.cancellationPolicy || {};

      let formattedDate = new Date().toISOString().split("T")[0];
      if (data.lastUpdated) {
        formattedDate = new Date(data.lastUpdated).toISOString().split("T")[0];
      }

      setFormData({
        pageTitle: data.pageTitle || "Cancellation Policy",
        subtitle: data.subtitle || "",
        introText: data.introText || "",
        lastUpdated: formattedDate,
        metaTitle: data.metaTitle || "Cancellation Policy | Punroyal",
        metaDescription: data.metaDescription || "",
      });

      setSections(Array.isArray(data.sections) ? data.sections : []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load Cancellation Policy");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchCancellationData();
  }, [fetchCancellationData]);

  // Save General Page Details
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await cancellationAPI.update({
        ...formData,
      });
      toast.success("Cancellation Policy page details updated!");
      await fetchCancellationData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving cancellation policy");
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

  const openEditModal = (sec: CancellationSection) => {
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
        await cancellationAPI.updateSection(editingSection._id, sectionForm);
        toast.success("Section updated successfully!");
      } else {
        await cancellationAPI.addSection(sectionForm);
        toast.success("New section added!");
      }
      setIsModalOpen(false);
      await fetchCancellationData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to save section");
    } finally {
      setSectionSaving(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      await cancellationAPI.deleteSection(id);
      toast.success("Section deleted!");
      await fetchCancellationData(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
          <p className="text-sm font-semibold text-slate-500">Loading Cancellation Policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="Cancellation Policy"
        subtitle="Manage customer order cancellation rules, refund timelines, and legal conditions"
        rightContent={
          <button
            onClick={handleSavePage}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-amber-200 transition disabled:opacity-50 text-sm"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        }
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: PAGE CONTENT & SECTIONS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <RotateCcw className="text-amber-600" size={20} />
              <h2 className="font-bold text-slate-800">Page Header Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Page Title
                </label>
                <input
                  type="text"
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  placeholder="Cancellation Policy"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Clear, transparent, and hassle-free cancellation and refund guidelines for your Punroyal orders."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Introduction Text (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.introText}
                  onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                  placeholder="At Punroyal, we are committed to providing you with the finest luxury ethnic fashion..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Sections List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="text-amber-600" size={20} />
                <h2 className="font-bold text-slate-800">Cancellation Policy Sections ({sections.length})</h2>
              </div>
              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold rounded-lg text-xs transition"
              >
                <Plus size={16} /> Add Section
              </button>
            </div>

            {sections.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <FileText className="mx-auto mb-2 opacity-50" size={32} />
                <p className="text-sm font-semibold">No sections added yet.</p>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-3 text-xs font-bold text-amber-600 hover:underline"
                >
                  + Add the first section
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {sections.map((sec, index) => (
                  <div
                    key={sec._id || index}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition flex items-start justify-between gap-4 group"
                  >
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-sm text-slate-800 truncate">{sec.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 pl-7 whitespace-pre-line">
                        {sec.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(sec)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-white rounded-lg transition border border-transparent hover:border-slate-200"
                        title="Edit Section"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => sec._id && handleDeleteSection(sec._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition border border-transparent hover:border-slate-200"
                        title="Delete Section"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COL: METADATA & SETTINGS */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calendar className="text-amber-600" size={20} />
              <h2 className="font-bold text-slate-800">Effective Date</h2>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Last Updated Date
              </label>
              <input
                type="date"
                value={formData.lastUpdated}
                onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Globe className="text-amber-600" size={20} />
              <h2 className="font-bold text-slate-800">SEO & Metadata</h2>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="Cancellation Policy | Punroyal"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Read Punroyal cancellation policy for order cancellation timelines, refund processes, and support guidelines..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
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
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <RotateCcw size={18} />
                </div>
                <h3 className="font-bold text-lg text-slate-800">
                  {editingSection ? "Edit Cancellation Section" : "Add New Cancellation Section"}
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
                  placeholder="e.g. 1. Cancellation Window Prior to Dispatch"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5">Section Content *</label>
                <textarea
                  rows={8}
                  required
                  value={sectionForm.content}
                  onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                  placeholder="Detail the policies, timelines, refund windows, and conditions..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500 transition"
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
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
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
