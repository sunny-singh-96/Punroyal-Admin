"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Users,
  Award,
  BookOpen,
  Eye,
  Target,
  Sparkles,
  Search,
  X,
  Loader2,
  Globe,
  ImageIcon
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { aboutUsAPI } from "@/lib/integration/pages";

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  _id?: string;
  name: string;
  designation: string;
  bio: string;
  avatar: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export default function AboutUsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "stats" | "values" | "team" | "seo">("general");

  // Form State
  const [formData, setFormData] = useState({
    heroBadgeText: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    storyTitle: "",
    storyContent: "",
    storyImage: "",
    missionTitle: "",
    missionContent: "",
    visionTitle: "",
    visionContent: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [stats, setStats] = useState<StatItem[]>([]);
  const [values, setValues] = useState<ValueItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  // File uploads
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [storyImageFile, setStoryImageFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>("");
  const [storyPreview, setStoryPreview] = useState<string>("");

  // Team Member Modal State
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamMemberForm, setTeamMemberForm] = useState<TeamMember>({
    name: "",
    designation: "",
    bio: "",
    avatar: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });
  const [teamAvatarFile, setTeamAvatarFile] = useState<File | null>(null);
  const [teamAvatarPreview, setTeamAvatarPreview] = useState<string>("");
  const [teamSaving, setTeamSaving] = useState(false);

  // Fetch page data
  const fetchAboutUsData = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await aboutUsAPI.get();
      const data = res?.data?.aboutUs || res?.aboutUs || {};

      setFormData({
        heroBadgeText: data.heroBadgeText || "Our Story",
        heroTitle: data.heroTitle || "About Punroyal",
        heroSubtitle: data.heroSubtitle || "Punjab's Largest Ethnic Wear Collection",
        heroImage: data.heroImage || "",
        storyTitle: data.storyTitle || "Our Story",
        storyContent: data.storyContent || "",
        storyImage: data.storyImage || "",
        missionTitle: data.missionTitle || "Our Mission",
        missionContent: data.missionContent || "",
        visionTitle: data.visionTitle || "Our Vision",
        visionContent: data.visionContent || "",
        metaTitle: data.metaTitle || "About Us | Punroyal",
        metaDescription: data.metaDescription || "",
      });

      setStats(Array.isArray(data.stats) ? data.stats : []);
      setValues(Array.isArray(data.values) ? data.values : []);
      setTeam(Array.isArray(data.team) ? data.team : []);
      setHeroPreview(data.heroImage || "");
      setStoryPreview(data.storyImage || "");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to load About Us content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutUsData();
  }, [fetchAboutUsData]);

  // Handle Save Page Settings
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });
      data.append("stats", JSON.stringify(stats));
      data.append("values", JSON.stringify(values));

      if (heroImageFile) data.append("heroImage", heroImageFile);
      if (storyImageFile) data.append("storyImage", storyImageFile);

      const res: any = await aboutUsAPI.update(data);
      if (res?.code === "OK" || res?.success || res?.status === 200) {
        toast.success("About Us page updated successfully!");
        fetchAboutUsData();
      } else {
        toast.error(res?.message || "Failed to update page");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Error saving About Us page");
    } finally {
      setSaving(false);
    }
  };

  // Stat handlers
  const addStat = () => setStats([...stats, { label: "New Stat", value: "100+", icon: "star" }]);
  const updateStat = (index: number, field: keyof StatItem, val: string) => {
    const updated = [...stats];
    updated[index][field] = val;
    setStats(updated);
  };
  const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

  // Value handlers
  const addValue = () => setValues([...values, { title: "New Value", description: "Description here", icon: "check" }]);
  const updateValue = (index: number, field: keyof ValueItem, val: string) => {
    const updated = [...values];
    updated[index][field] = val;
    setValues(updated);
  };
  const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index));

  // Team Member modal handlers
  const openAddTeamModal = () => {
    setEditingMember(null);
    setTeamMemberForm({
      name: "",
      designation: "",
      bio: "",
      avatar: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    });
    setTeamAvatarFile(null);
    setTeamAvatarPreview("");
    setIsTeamModalOpen(true);
  };

  const openEditTeamModal = (member: TeamMember) => {
    setEditingMember(member);
    setTeamMemberForm({ ...member });
    setTeamAvatarFile(null);
    setTeamAvatarPreview(member.avatar || "");
    setIsTeamModalOpen(true);
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamMemberForm.name.trim()) {
      toast.error("Please provide member name");
      return;
    }
    try {
      setTeamSaving(true);
      const fd = new FormData();
      fd.append("name", teamMemberForm.name);
      fd.append("designation", teamMemberForm.designation);
      fd.append("bio", teamMemberForm.bio);
      fd.append("instagram", teamMemberForm.instagram);
      fd.append("linkedin", teamMemberForm.linkedin);
      fd.append("twitter", teamMemberForm.twitter);
      if (teamAvatarFile) {
        fd.append("avatar", teamAvatarFile);
      } else if (teamMemberForm.avatar) {
        fd.append("avatar", teamMemberForm.avatar);
      }

      if (editingMember && editingMember._id) {
        await aboutUsAPI.updateTeamMember(editingMember._id, fd);
        toast.success("Team member updated!");
      } else {
        await aboutUsAPI.addTeamMember(fd);
        toast.success("Team member added!");
      }

      setIsTeamModalOpen(false);
      fetchAboutUsData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to save team member");
    } finally {
      setTeamSaving(false);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await aboutUsAPI.deleteTeamMember(id);
      toast.success("Team member deleted!");
      fetchAboutUsData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete team member");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Loading About Us content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader
        title="About Us Page"
        subtitle="Manage all content, hero, story, stats, values, and team members dynamically"
        rightContent={
          <button
            onClick={handleSavePage}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-8">
          {[
            { id: "general", label: "Hero & Story", icon: BookOpen },
            { id: "stats", label: "Stats & Metrics", icon: Award },
            { id: "values", label: "Why Choose Us / Values", icon: Sparkles },
            { id: "team", label: "Team Members", icon: Users },
            { id: "seo", label: "SEO Meta Tags", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: General (Hero + Story + Mission & Vision) */}
        {activeTab === "general" && (
          <div className="space-y-8">
            {/* HERO SECTION */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Hero Section</h2>
                  <p className="text-xs text-slate-400">Controls the header banner and intro at the top of the page</p>
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
                    placeholder="e.g. Our Heritage"
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
                    placeholder="e.g. About Punroyal"
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
                    placeholder="e.g. Punjab's Largest Ethnic Wear Collection & Royal Heritage"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                    Hero Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                    {heroPreview ? (
                      <div className="w-36 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 relative group">
                        <img src={heroPreview} alt="Hero preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-36 h-24 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <ImageIcon size={28} />
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setHeroImageFile(file);
                            setHeroPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      <p className="text-xs text-slate-400 mt-2">Recommended: 1920x600 WebP, JPG or PNG (Max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STORY SECTION */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Our Story Section</h2>
                  <p className="text-xs text-slate-400">Company history, background story and narrative</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={formData.storyTitle}
                    onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                    placeholder="e.g. Crafted with Royal Elegance"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                    Story Content
                  </label>
                  <textarea
                    rows={6}
                    value={formData.storyContent}
                    onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
                    placeholder="Write the complete story of your brand, passion for craftsmanship, and heritage..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                    Story Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                    {storyPreview ? (
                      <div className="w-36 h-28 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                        <img src={storyPreview} alt="Story preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-36 h-28 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <ImageIcon size={28} />
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setStoryImageFile(file);
                            setStoryPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      <p className="text-xs text-slate-400 mt-2">Recommended: 800x600 high quality image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MISSION & VISION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100">
                  <Target size={20} className="text-indigo-600" />
                  <h3 className="font-bold text-slate-800">Our Mission</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.missionTitle}
                      onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Content</label>
                    <textarea
                      rows={4}
                      value={formData.missionContent}
                      onChange={(e) => setFormData({ ...formData, missionContent: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100">
                  <Eye size={20} className="text-teal-600" />
                  <h3 className="font-bold text-slate-800">Our Vision</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.visionTitle}
                      onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Content</label>
                    <textarea
                      rows={4}
                      value={formData.visionContent}
                      onChange={(e) => setFormData({ ...formData, visionContent: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Stats */}
        {activeTab === "stats" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Counters & Statistics</h2>
                <p className="text-xs text-slate-400">Showcase your milestones, customer count, and achievements</p>
              </div>
              <button
                type="button"
                onClick={addStat}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition"
              >
                <Plus size={16} /> Add Stat Counter
              </button>
            </div>

            {stats.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Award size={40} className="mx-auto mb-2 opacity-50" />
                <p className="font-semibold">No statistics added yet</p>
                <button onClick={addStat} className="text-blue-600 text-sm font-bold mt-2 hover:underline">
                  Add First Counter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                    <button
                      type="button"
                      onClick={() => removeStat(idx)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Value / Number</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(idx, "value", e.target.value)}
                        placeholder="e.g. 50,000+"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-lg font-black text-blue-600 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(idx, "label", e.target.value)}
                        placeholder="e.g. Happy Royal Customers"
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm font-medium mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Values / Why Choose Us */}
        {activeTab === "values" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Why Choose Us / Core Values</h2>
                <p className="text-xs text-slate-400">Highlight your craftsmanship, heritage, fast delivery, and premium quality</p>
              </div>
              <button
                type="button"
                onClick={addValue}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition"
              >
                <Plus size={16} /> Add Value Card
              </button>
            </div>

            {values.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Sparkles size={40} className="mx-auto mb-2 opacity-50" />
                <p className="font-semibold">No value items added</p>
                <button onClick={addValue} className="text-blue-600 text-sm font-bold mt-2 hover:underline">
                  Add First Value
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((val, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => removeValue(idx)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Card Title</label>
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) => updateValue(idx, "title", e.target.value)}
                        placeholder="e.g. 100% Authentic Heritage Fabrics"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={val.description}
                        onChange={(e) => updateValue(idx, "description", e.target.value)}
                        placeholder="Explain the unique value proposition..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Team Members */}
        {activeTab === "team" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Team Members & Leadership</h2>
                <p className="text-xs text-slate-400">Manage founders, designers, and artisans featured on the About Us page</p>
              </div>
              <button
                type="button"
                onClick={openAddTeamModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-100 transition"
              >
                <Plus size={16} /> Add Team Member
              </button>
            </div>

            {team.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Users size={44} className="mx-auto mb-3 opacity-40" />
                <p className="font-semibold text-slate-600">No team members added yet</p>
                <p className="text-xs text-slate-400 mt-1">Add key leadership or artisans to introduce the face behind the brand</p>
                <button onClick={openAddTeamModal} className="text-blue-600 font-bold text-sm mt-3 hover:underline">
                  + Add First Member
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                  <div
                    key={member._id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center relative group hover:shadow-md transition"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => openEditTeamModal(member)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => member._id && handleDeleteTeamMember(member._id)}
                        className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-white rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 mb-4">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Users size={32} />
                        </div>
                      )}
                    </div>

                    <h3 className="font-black text-slate-800 text-lg">{member.name}</h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">{member.designation}</p>
                    {member.bio && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{member.bio}</p>}

                    <div className="flex items-center gap-3 mt-4 text-slate-400">
                      {member.instagram && <span className="text-xs font-semibold text-slate-600">IG</span>}
                      {member.linkedin && <span className="text-xs font-semibold text-slate-600">IN</span>}
                      {member.twitter && <span className="text-xs font-semibold text-slate-600">X</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SEO */}
        {activeTab === "seo" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
              <Globe size={22} className="text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-slate-800">SEO Meta Tags</h2>
                <p className="text-xs text-slate-400">Optimize search engine visibility for the About Us page</p>
              </div>
            </div>

            <div className="space-y-6 max-w-3xl">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g. About Punroyal | Royal Heritage Ethnic Wear"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Meta Description
                </label>
                <textarea
                  rows={4}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Brief description that appears in Google search engine results..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TEAM MEMBER MODAL */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="p-6 space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 mb-2">
                  {teamAvatarPreview ? (
                    <img src={teamAvatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Users size={24} />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTeamAvatarFile(file);
                      setTeamAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={teamMemberForm.name}
                  onChange={(e) => setTeamMemberForm({ ...teamMemberForm, name: e.target.value })}
                  placeholder="e.g. Manpreet Singh"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Designation / Role</label>
                <input
                  type="text"
                  value={teamMemberForm.designation}
                  onChange={(e) => setTeamMemberForm({ ...teamMemberForm, designation: e.target.value })}
                  placeholder="e.g. Founder & Creative Director"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={teamMemberForm.bio}
                  onChange={(e) => setTeamMemberForm({ ...teamMemberForm, bio: e.target.value })}
                  placeholder="A brief sentence about background and craft..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={teamMemberForm.instagram}
                    onChange={(e) => setTeamMemberForm({ ...teamMemberForm, instagram: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={teamMemberForm.linkedin}
                    onChange={(e) => setTeamMemberForm({ ...teamMemberForm, linkedin: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Twitter URL</label>
                  <input
                    type="text"
                    value={teamMemberForm.twitter}
                    onChange={(e) => setTeamMemberForm({ ...teamMemberForm, twitter: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={teamSaving}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
                >
                  {teamSaving ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
