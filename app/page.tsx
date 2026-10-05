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

  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = searchParams.get("redirect");

  useEffect(() => {
    if (user && user?._id) {
      if (user.role === "influencer") {
        router.push(redirectTo || "/influencer/dashboard");
      } else if (user.role === "superadmin" || user.role === "admin") {
        router.push(redirectTo || "/dashboard");
      }
    }
  }, [user, redirectTo, router]);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrors({});
  };

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
    <div className="h-screen w-screen overflow-hidden bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm">
        {/* LOGO & TITLE: Flex layout, compact */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
            <Image
              src="/punroyal-logo.png"
              alt="Punroyal Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-xl"
              priority
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-lg font-normal text-slate-900 tracking-tight leading-none">
              Punroyal Portal
            </h1>
            <p className="text-xs font-normal text-slate-400 mt-1">
              Sign in to manage your account
            </p>
          </div>
        </div>

        {/* ROLE SELECTION TABS */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-normal transition ${
              selectedRole === "admin"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Shield size={14} className={selectedRole === "admin" ? "text-blue-600" : "text-slate-400"} />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("influencer")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-normal transition ${
              selectedRole === "influencer"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles size={14} className={selectedRole === "influencer" ? "text-purple-600" : "text-slate-400"} />
            <span>Influencer</span>
          </button>
        </div>

        {/* ADMIN FORM */}
        {selectedRole === "admin" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdminLogin();
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-normal text-slate-600 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border outline-none transition text-slate-800 text-xs font-normal ${
                    errors.email
                      ? "border-red-400 bg-red-50/40"
                      : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  }`}
                  placeholder="admin@punroyal.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[11px] font-normal mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-normal text-slate-600 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full pl-9 pr-9 py-2 rounded-lg border outline-none transition text-slate-800 text-xs font-normal ${
                    errors.password
                      ? "border-red-400 bg-red-50/40"
                      : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[11px] font-normal mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-normal text-xs flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-60 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield size={14} />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* INFLUENCER FORM */}
        {selectedRole === "influencer" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInfluencerLogin();
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-normal text-slate-600 block mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrors((prev) => ({ ...prev, identifier: undefined }));
                  }}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border outline-none transition text-slate-800 text-xs font-normal ${
                    errors.identifier
                      ? "border-red-400 bg-red-50/40"
                      : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  }`}
                  placeholder="e.g. username or email"
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-[11px] font-normal mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.identifier}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-normal text-slate-600 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full pl-9 pr-9 py-2 rounded-lg border outline-none transition text-slate-800 text-xs font-normal ${
                    errors.password
                      ? "border-red-400 bg-red-50/40"
                      : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[11px] font-normal mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-normal text-xs flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-60 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Sign In as Influencer</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* FOOTER */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center items-center gap-3 text-[11px] font-normal text-slate-400">
          <span className="flex items-center gap-1">
            <Shield size={12} className="text-emerald-500" /> Secure Login
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Punroyal Admin</span>
        </div>
      </div>
    </div>
  );
}