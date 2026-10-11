"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LockKeyhole, Save } from "lucide-react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { influencerAPI } from "@/lib/integration/influencer";
import { useAuthStore } from "@/store/authStore";

export default function InfluencerSettingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && user.role !== "influencer") {
      router.replace("/dashboard");
    }
  }, [router, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("Choose a password different from your current password");
      return;
    }

    try {
      setSaving(true);
      const response: any = await influencerAPI.changePassword({
        currentPassword,
        newPassword,
      });
      if (response?.code && response.code !== "OK") {
        throw new Error(response.message || "Unable to change password");
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (user?.role !== "influencer") return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep your influencer account secure by updating your password.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <KeyRound size={21} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Change password</h2>
            <p className="text-sm text-slate-500">Enter your current password and choose a new one.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Current password</span>
            <span className="relative block">
              <LockKeyhole size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </span>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <span className="block text-xs text-slate-500">At least 6 characters</span>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Confirm new password</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {saving ? "Saving..." : "Update password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
