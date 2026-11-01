"use client";

import Swal from "sweetalert2";
import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { influencerLoginValidation } from "@/validations/adminLogin";
import { influencerAPI } from "@/lib/integration/influencer";
import { LoginErrors } from "@/types/types";

export default function InfluencerLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const identifierInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const redirectTo = searchParams.get("redirect") || "/influencer/dashboard";

  const handleInfluencerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!influencerLoginValidation(identifier, password, setErrors)) {
      if (!identifier.trim()) identifierInputRef.current?.focus();
      else if (!password) passwordInputRef.current?.focus();
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Signing into Creator Portal...");

    try {
      let cleanIdentifier = identifier.trim();
      if (cleanIdentifier.startsWith("@")) {
        cleanIdentifier = cleanIdentifier.substring(1).trim();
      }
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanIdentifier);
      const payload = isEmail
        ? { email: cleanIdentifier.toLowerCase(), password }
        : { username: cleanIdentifier, password };

      const response: any = await influencerAPI.login(payload);
      const token =
        response?.data?.token || response?.data?.data?.token || response?.token;
      const user =
        response?.data?.user || response?.data?.data?.user || response?.user;

      if (!token || !user) {
        const errorMsg =
          response?.message ||
          response?.data?.message ||
          "Invalid credentials or response from server";
        toast.error(errorMsg, { id: toastId });
        return;
      }

      setAuth(token, user);
      toast.success(
        response?.message ||
          response?.data?.message ||
          "Welcome back to your creator dashboard!",
        { id: toastId }
      );

      router.push(redirectTo);
      setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          (window.location.pathname === "/influencer/login" ||
            window.location.pathname === "/")
        ) {
          window.location.href = redirectTo;
        }
      }, 500);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Influencer login failed";
      if (
        errorMessage.toLowerCase().includes("blocked") ||
        errorMessage.toLowerCase().includes("inactive")
      ) {
        toast.dismiss(toastId);
        Swal.fire({
          icon: "error",
          title: "Account Blocked",
          html: `
            <p style="font-size:14px;color:#475569;">
              Your influencer account is currently inactive. Please contact the Punroyal store administration to reactivate your access.
            </p>
          `,
          confirmButtonColor: "#0f172a",
          confirmButtonText: "Understood",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg text-xs px-4 py-2 font-medium",
          },
        });
      } else {
        toast.error(errorMessage, { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 relative overflow-hidden">
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-400 via-yellow-500 to-amber-600"></div>

        {/* LOGO & HEADING */}
        <div className="text-center mb-6 pt-2">
          <div className="relative w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-slate-900 rounded-xl shadow-lg ring-4 ring-amber-400/20">
            <Image
              src="/logo.png"
              alt="Punroyal Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} className="text-amber-600" />
            Influencer Partner Portal
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Creator Sign In
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access assigned products, track referrals, and view your payouts
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleInfluencerLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                ref={identifierInputRef}
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setErrors((prev) => ({ ...prev, identifier: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition text-slate-900 text-sm font-medium ${
                  errors.identifier
                    ? "border-red-400 bg-red-50/40"
                    : "border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                }`}
                placeholder="creator or creator@punroyal.com"
                autoComplete="username"
                autoFocus
              />
            </div>
            {errors.identifier && (
              <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.identifier}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border outline-none transition text-slate-900 text-sm font-medium ${
                  errors.password
                    ? "border-red-400 bg-red-50/40"
                    : "border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-linear-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md disabled:opacity-60 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-amber-400" />
                <span>Enter Influencer Portal</span>
              </>
            )}
          </button>
        </form>

        {/* SWITCH TO ADMIN CONSOLE LINK */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            Administrator? Sign in to Admin Console <ArrowRight size={13} />
          </Link>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex justify-center items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Punroyal Creator Network</span>
        </div>
      </div>
    </div>
  );
}

