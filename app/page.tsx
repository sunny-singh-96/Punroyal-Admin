"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Loader2,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import {
  adminLogin,
  influencerLoginValidation,
} from "@/validations/adminLogin";
import { ENDPOINTS } from "@/constants/endpoint";
import { http } from "@/lib/integration/http";
import { influencerAPI } from "@/lib/integration/influencer";
import { LoginErrors } from "@/types/types";

type UserRole = "admin" | "influencer";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setAuth } = useAuthStore();

  // Role Selection (Admin vs Influencer)
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState(""); // For influencer login (email or username)

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = searchParams.get("redirect");

  // Automatic redirect if already authenticated
  useEffect(() => {
    if (user && user?._id) {
      if (user.role === "influencer") {
        router.push(redirectTo || "/influencer/dashboard");
      } else if (user.role === "superadmin" || user.role === "admin") {
        router.push(redirectTo || "/dashboard");
      }
    }
  }, [user, redirectTo, router]);

  // Clear errors when switching roles or modes
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrors({});
  };

  // 1. Handle Admin Login
  const handleAdminLogin = async () => {
    if (!adminLogin(email, password, setErrors)) return;
    setLoading(true);
    const toastId = toast.loading("Verifying Admin credentials...");
    try {
      const response = await http.post(
        ENDPOINTS.LOGIN,
        { email: email.trim(), password },
        {},
        false
      );
      if (response?.message && !response?.data?.data?.token) {
        toast.error(response.message, { id: toastId });
        return;
      }
      if (response?.data?.data?.token && response?.data?.data?.user) {
        setAuth(response.data.data.token, response.data.data.user);
        toast.success(response?.data?.message || "Admin login successful!", { id: toastId });
        router.push(redirectTo || "/dashboard");
      } else {
        toast.error("Invalid response from server", { id: toastId });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Influencer Login
  const handleInfluencerLogin = async () => {
    if (!influencerLoginValidation(identifier, password, setErrors)) return;
    setLoading(true);
    const toastId = toast.loading("Logging in as Influencer...");
    try {
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier.trim(), password }
        : { username: identifier.trim(), password };

      const response = await influencerAPI.login(payload);
      if (response?.message && !response?.data?.data?.token) {
        toast.error(response.message, { id: toastId });
        return;
      }
      if (response?.data?.data?.token && response?.data?.data?.user) {
        setAuth(response.data.data.token, response.data.data.user);
        toast.success(response?.data?.message || "Welcome back to your dashboard!", { id: toastId });
        router.push(redirectTo || "/influencer/dashboard");
      } else {
        toast.error("Invalid response from server", { id: toastId });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Influencer login failed";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-100/80 transition-all duration-300">
        {/* LOGO & TITLE */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border-2 border-amber-300/70 shadow-xl shadow-amber-500/10 mb-3 overflow-hidden p-0.5">
            <Image
              src="/punroyal-logo.png"
              alt="Punroyal Logo"
              width={76}
              height={76}
              className="w-full h-full object-cover rounded-full"
              priority
              unoptimized
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Punroyal Portal
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Select your account type to proceed
          </p>
        </div>

        {/* ROLE SELECTION RADIO TABS */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Login As
          </label>
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
            {/* Admin Radio Button */}
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                selectedRole === "admin"
                  ? "bg-white text-indigo-700 shadow-md shadow-indigo-100 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Shield size={18} className={selectedRole === "admin" ? "text-indigo-600" : "text-slate-400"} />
              <span>Admin</span>
              {selectedRole === "admin" && (
                <CheckCircle2 size={15} className="text-indigo-600 ml-auto" />
              )}
            </button>

            {/* Influencer Radio Button */}
            <button
              type="button"
              onClick={() => handleRoleChange("influencer")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                selectedRole === "influencer"
                  ? "bg-white text-purple-700 shadow-md shadow-purple-100 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles size={18} className={selectedRole === "influencer" ? "text-purple-600" : "text-slate-400"} />
              <span>Influencer</span>
              {selectedRole === "influencer" && (
                <CheckCircle2 size={15} className="text-purple-600 ml-auto" />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* ADMIN FORM */}
        {/* ======================================================= */}
        {selectedRole === "admin" && (
          <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin(); }} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition text-slate-800 text-sm font-medium ${
                    errors.email
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10"
                  }`}
                  placeholder="admin@punroyal.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={13} /> {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 outline-none transition text-slate-800 text-sm font-medium ${
                    errors.password
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={13} /> {errors.password}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-indigo-800 transition shadow-lg shadow-indigo-600/25 active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying Admin...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Sign In as Admin
                </>
              )}
            </button>
          </form>
        )}

        {/* ======================================================= */}
        {/* INFLUENCER FORM (LOGIN ONLY) */}
        {/* ======================================================= */}
        {selectedRole === "influencer" && (
          <form onSubmit={(e) => { e.preventDefault(); handleInfluencerLogin(); }} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrors((prev) => ({ ...prev, identifier: undefined }));
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition text-slate-800 text-sm font-medium ${
                    errors.identifier
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10"
                  }`}
                  placeholder="e.g., john_doe or influencer@example.com"
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={13} /> {errors.identifier}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border-2 outline-none transition text-slate-800 text-sm font-medium ${
                    errors.password
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={13} /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition shadow-lg shadow-purple-600/25 active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing In...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Sign In as Influencer
                </>
              )}
            </button>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> Influencer accounts are created by admins. Contact your administrator to create your account.
              </p>
            </div>
          </form>
        )}

        {/* FOOTER */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center items-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Shield size={13} className="text-emerald-500" /> 256-Bit Encrypted
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Punroyal v1.0</span>
        </div>
      </div>
    </div>
  );
}