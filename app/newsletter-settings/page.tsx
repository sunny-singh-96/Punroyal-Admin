"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Loader2, Mail, Save } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/head/head";
import { globalSettingsAPI } from "@/lib/integration/globalSettings";
import { getErrorMessage } from "@/lib/helpers/handlers";

const DEFAULT_TITLE = "Join our style circle & get 10% off your first order!";
const DEFAULT_SUBTITLE =
  "Stay in the loop with our Punroyal newsletter for the latest collections, exclusive offers & style tips.";

type NewsletterSettings = {
  newsletter_title?: string;
  newsletter_subtitle?: string;
};

function getSettings(response: {
  data?: { globalSettings?: NewsletterSettings; data?: { globalSettings?: NewsletterSettings } };
  globalSettings?: NewsletterSettings;
}): NewsletterSettings {
  return (
    response?.data?.globalSettings ??
    response?.globalSettings ??
    response?.data?.data?.globalSettings ??
    {}
  );
}

export default function NewsletterSettingsPage() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await globalSettingsAPI.adminGet();
      const settings = getSettings(response);
      setTitle(settings.newsletter_title || DEFAULT_TITLE);
      setSubtitle(settings.newsletter_subtitle || DEFAULT_SUBTITLE);
      return settings;
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to load newsletter settings");
      return null;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("newsletter_title", title.trim());
      formData.append("newsletter_subtitle", subtitle.trim());

      const response = await globalSettingsAPI.update(formData);
      if (response?.code !== "OK" && !response?.success && response?.status !== 200) {
        throw new Error(response?.message || "Failed to save newsletter settings");
      }

      const savedSettings = await loadSettings(false);
      if (!savedSettings) return;
      if (
        savedSettings?.newsletter_title !== title.trim() ||
        savedSettings?.newsletter_subtitle !== subtitle.trim()
      ) {
        toast.error(
          "The API did not return the saved newsletter text. Please check global-settings update support."
        );
        return;
      }

      toast.success("Newsletter signup text saved successfully");
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to save newsletter settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue-600" size={36} />
        <p className="text-sm font-medium text-slate-500">Loading newsletter settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
      <PageHeader
        title="Newsletter Signup Section"
        subtitle="Edit the title and supporting text displayed above the website newsletter form."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <form
          onSubmit={handleSave}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 p-6">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Signup content</h2>
              <p className="text-xs text-slate-500">Changes appear in the website newsletter section.</p>
            </div>
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="newsletter-title" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">
                Title
              </label>
              <input
                id="newsletter-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={160}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Join our style circle"
              />
            </div>

            <div>
              <label htmlFor="newsletter-subtitle" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">
                Subtitle
              </label>
              <textarea
                id="newsletter-subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                maxLength={320}
                rows={4}
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium leading-relaxed text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what subscribers will receive"
              />
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={saving || !title.trim() || !subtitle.trim()}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
                {saving ? "Saving..." : "Save Newsletter Text"}
              </button>
            </div>
          </div>
        </form>

        <section className="self-start overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-6">
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <Eye size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Live preview</h2>
              <p className="text-xs text-slate-500">Preview of the text customers will see.</p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="mb-3 text-2xl font-bold leading-tight text-slate-900">{title || DEFAULT_TITLE}</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">{subtitle || DEFAULT_SUBTITLE}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400">
                Your e-mail...
              </div>
              <div className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white">
                Get in touch
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
