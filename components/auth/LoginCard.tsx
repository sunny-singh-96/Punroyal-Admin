"use client";

import Swal from "sweetalert2";
import React, { useState, useEffect, useRef, Suspense } from "react";
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
import { storageUtils } from "@/lib/storage";
import {
  adminLogin,
  influencerLoginValidation,
} from "@/validations/adminLogin";
import { ENDPOINTS } from "@/constants/endpoint";
import { http } from "@/lib/integration/http";
import { influencerAPI } from "@/lib/integration/influencer";
import { LoginErrors } from "@/types/types";

type UserRole = "admin" | "influencer";
const ADMIN_EMAIL_PLACEHOLDER = "admin@gmail.com";
const DEMO_USER_EMAIL = "user@gmail.com";

interface LoginCardProps {
  initialRole?: UserRole;
}

function LoginCardContent({ initialRole = "admin" }: LoginCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  const roleParam = searchParams.get("role") as UserRole | null;
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    roleParam === "influencer" || roleParam === "admin" ? roleParam : initialRole
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const identifierInputRef = useRef<HTMLInputElement>(null);
  const influencerPasswordInputRef = useRef<HTMLInputElement>(null);

  const redirectTo = searchParams.get("redirect");

  // Route-aware auto redirect: Admin checks admin session, Influencer checks influencer session
  useEffect(() => {
    if (initialRole === "influencer" || selectedRole === "influencer") {
      const infUser = storageUtils.getInfluencerUser();
      const infToken = storageUtils.getInfluencerToken();
      if (infUser && infToken && infUser.role === "influencer") {
        router.push(redirectTo || "/influencer/dashboard");
      }
    } else {
      const adminUser = storageUtils.getAdminUser();
      const adminToken = storageUtils.getAdminToken();
      if (adminUser && adminToken && (adminUser.role === "superadmin" || adminUser.role === "admin")) {
        router.push(redirectTo || "/dashboard");
      }
    }
  }, [redirectTo, router, initialRole, selectedRole]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDemoUser = window.localStorage.getItem("punroyal_demo_user_email");
      if (!storedDemoUser) {
        window.localStorage.setItem("punroyal_demo_user_email", DEMO_USER_EMAIL);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedRole === "admin") {
      emailInputRef.current?.focus();
    } else {
      identifierInputRef.current?.focus();
    }
  }, [selectedRole]);

  // Tab change also updates URL to /influencer/login or / without reloading
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrors({});
    setPassword("");

    const targetUrl = role === "influencer" ? "/influencer/login" : "/";
    if (typeof window !== "undefined" && window.location.pathname !== targetUrl) {
      window.history.replaceState(null, "", targetUrl);
    }
  };

  const handleAdminLogin = async () => {
    if (!adminLogin(email, password, setErrors)) {
      if (!email.trim()) emailInputRef.current?.focus();
      else if (!password) passwordInputRef.current?.focus();
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Verifying Admin credentials...");
    try {
      const cleanInput = email.trim();
      const payload = {
        email: cleanInput.toLowerCase(),
        username: cleanInput,
        identifier: cleanInput,
        password,
      };

      const response: any = await http.post(
        ENDPOINTS.LOGIN,
        payload,
        {},
        false
      );

      const token = response?.data?.token || response?.data?.data?.token || response?.token;
      const loggedUser = response?.data?.user || response?.data?.data?.user || response?.user;

      if (!token || !loggedUser) {
        const errorMsg =
          response?.message ||
          response?.data?.message ||
          "Invalid credentials or response from server";
        toast.error(errorMsg, { id: toastId });
        return;
      }

      setAuth(token, loggedUser);
      storageUtils.setAdminToken(token);
      storageUtils.setAdminUser(loggedUser);

      toast.success(
        response?.message || response?.data?.message || "Admin login successful!",
        { id: toastId }
      );

      const target = redirectTo || "/dashboard";
      router.push(target);
      setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          (window.location.pathname === "/" ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/influencer/login")
        ) {
          window.location.href = target;
        }
      }, 300);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleInfluencerLogin = async () => {
    if (!influencerLoginValidation(identifier, password, setErrors)) {
      if (!identifier.trim()) identifierInputRef.current?.focus();
      else if (!password) influencerPasswordInputRef.current?.focus();
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Logging in as Influencer...");
    try {
      let cleanIdentifier = identifier.trim();
      if (cleanIdentifier.startsWith("@")) {
        cleanIdentifier = cleanIdentifier.substring(1).trim();
      }

      const payload = {
        email: cleanIdentifier.toLowerCase(),
        username: cleanIdentifier,
        identifier: cleanIdentifier,
        password,
      };

      const response: any = await influencerAPI.login(payload);
      const token = response?.data?.token || response?.data?.data?.token || response?.token;
      const loggedUser = response?.data?.user || response?.data?.data?.user || response?.user;

      if (!token || !loggedUser) {
        const errorMsg =
          response?.message ||
          response?.data?.message ||
          "Invalid credentials or response from server";
        toast.error(errorMsg, { id: toastId });
        return;
      }

      setAuth(token, loggedUser);
      storageUtils.setInfluencerToken(token);
      storageUtils.setInfluencerUser(loggedUser);

      toast.success(
        response?.message ||
          response?.data?.message ||
          "Welcome back to your dashboard!",
        { id: toastId }
      );

      const target = redirectTo || "/influencer/dashboard";
      router.push(target);
      setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          (window.location.pathname === "/" ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/influencer/login")
        ) {
          window.location.href = target;
        }
      }, 300);
    } catch (error) {
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
          html: `<div style="text-align: left; font-size: 14px; color: #475569; line-height: 1.6;">
            <p style="margin-bottom: 12px; font-weight: 600; color: #dc2626;">${errorMessage}</p>
            <p style="margin-bottom: 0;">Your influencer account is currently deactivated. Please contact support using the contact details above to restore access.</p>
          </div>`,
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Close",
        });
      } else {
        toast.error(errorMessage, { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm">
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Image
              src="/punroyal-logo.png"
              alt="Punroyal Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
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
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-normal transition cursor-pointer ${
              selectedRole === "admin"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Shield
              size={14}
              className={
                selectedRole === "admin" ? "text-blue-600" : "text-slate-400"
              }
            />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("influencer")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-normal transition cursor-pointer ${
              selectedRole === "influencer"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles
              size={14}
              className={
                selectedRole === "influencer"
                  ? "text-purple-600"
                  : "text-slate-400"
              }
            />
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
                Admin Username or Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  ref={emailInputRef}
                  type="text"
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
                  placeholder={ADMIN_EMAIL_PLACEHOLDER}
                  autoComplete="username"
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
                  ref={passwordInputRef}
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
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
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
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-normal text-xs flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-60 mt-1 cursor-pointer"
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
                Influencer Username or Email
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  ref={identifierInputRef}
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
                  placeholder="fashionpro or influencer@punroyal.com"
                  autoComplete="username"
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
                  ref={influencerPasswordInputRef}
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
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
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
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-normal text-xs flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-60 mt-1 cursor-pointer"
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

export default function LoginCard({ initialRole = "admin" }: LoginCardProps) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-white flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      }
    >
      <LoginCardContent initialRole={initialRole} />
    </Suspense>
  );
}
