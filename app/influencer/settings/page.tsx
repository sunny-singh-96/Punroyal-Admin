"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function InfluencerSettingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && user.role !== "influencer") {
      router.replace("/dashboard");
    }
  }, [router, user]);

  if (user?.role !== "influencer") return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          Account Security
        </p>
        <h1 className="mt-2 text-2xl font-black text-slate-900">Account Settings</h1>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4 border border-amber-100">
          <LockKeyhole size={28} />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-2">Password Managed by Administrator</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
          To ensure platform security and coordinated creator access, password updates and credential resets are managed directly by the Punroyal Administration.
        </p>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left max-w-md mx-auto flex items-start gap-3">
          <ShieldAlert size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600">
            If you need to change your password or update your login credentials, please request a password reset from your Punroyal Admin.
          </p>
        </div>
      </section>
    </div>
  );
}
