"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  AtSign,
  UserCheck,
} from "lucide-react";
import PageHeader from "@/components/admin/head/head";
import { profileAPI } from "@/lib/integration/profile";
import { useAuthStore } from "@/store/authStore";
import { getErrorMessage } from "@/lib/helpers/handlers";

export default function ProfilePage() {
  const { user, setAuth, token } = useAuthStore();

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState<{
    name?: string;
    email?: string;
    username?: string;
  }>({});

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Fetch current admin profile
  const fetchProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const res: any = await profileAPI.getProfile();
      const profileData = res?.data?.profile || res?.data?.data || res?.data || res?.profile;
      if (profileData) {
        setName(profileData.name || "");
        setEmail(profileData.email || "");
        setUsername(profileData.username || "");
        setPhone(profileData.phone && profileData.phone !== "0000000000" ? profileData.phone : "");
        setRole(profileData.role || "admin");
      } else if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setUsername(user.username || "");
        setPhone(user.phone && user.phone !== "0000000000" ? user.phone : "");
        setRole(user.role || "admin");
      }
    } catch {
      // Fallback to local user state
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setUsername(user.username || "");
        setPhone(user.phone && user.phone !== "0000000000" ? user.phone : "");
        setRole(user.role || "admin");
      }
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; username?: string } = {};

    if (!name.trim()) {
      errors.name = "Full name is required";
    }
    if (!email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Invalid email format";
    }
    if (username.trim() && username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    setProfileErrors({});

    const toastId = toast.loading("Saving profile changes...");
    setSavingProfile(true);
    try {
      const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '');
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();
      const cleanPhone = phone.trim();

      const response: any = await profileAPI.updateProfile({
        name: cleanName,
        email: cleanEmail,
        username: cleanUsername,
        phone: cleanPhone,
      });

      const updatedUser = response?.data?.profile || response?.data?.user || response?.profile || {
        ...user,
        name: cleanName,
        email: cleanEmail,
        username: cleanUsername,
        phone: cleanPhone,
      };

      if (token && updatedUser) {
        setAuth(token, updatedUser);
      }

      toast.success("Profile updated successfully! You can log in using this Username or Email.", { id: toastId });
    } catch (err: any) {
      const msg = getErrorMessage(err) || "Failed to update profile";
      toast.error(msg, { id: toastId });
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};

    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      errors.newPassword = "New password must be at least 6 characters";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    setPasswordErrors({});

    const toastId = toast.loading("Verifying and updating password...");
    setSavingPassword(true);
    try {
      await profileAPI.changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully! Keep it secure.", { id: toastId });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err: any) {
      const msg = getErrorMessage(err) || "Failed to change password";
      toast.error(msg, { id: toastId });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your administrator personal information, login credentials, and security password"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Top Profile Card Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 text-3xl font-black shrink-0">
              {name ? name.charAt(0).toUpperCase() : "A"}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {name || "Administrator"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                  <Shield size={12} /> {role === "superadmin" ? "Super Admin" : "Administrator"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                {username && <span className="font-mono text-slate-700 font-semibold">@{username}</span>}
                {email && <span className="font-mono text-slate-600">{email}</span>}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                You can log in to the portal using either your <strong>Username</strong> or <strong>Email address</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Profile Information (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="border-b border-slate-100 pb-4 mb-6 flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <UserCheck size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-400">Update your name, email, and login username</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (profileErrors.name) setProfileErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition ${
                      profileErrors.name
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10"
                    }`}
                  />
                </div>
                {profileErrors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {profileErrors.name}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Username <span className="text-xs font-normal text-slate-400 lowercase">(used for login)</span>
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''));
                      if (profileErrors.username) setProfileErrors((p) => ({ ...p, username: undefined }));
                    }}
                    placeholder="e.g. admin or punroyal_super"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border font-mono text-sm text-slate-800 outline-none transition ${
                      profileErrors.username
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10"
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Lowercase letters, numbers, and underscores only.</p>
                {profileErrors.username && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {profileErrors.username}
                  </p>
                )}
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (profileErrors.email) setProfileErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="admin@punroyal.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border font-mono text-sm text-slate-800 outline-none transition ${
                      profileErrors.email
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10"
                    }`}
                  />
                </div>
                {profileErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {profileErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-sm disabled:opacity-60"
                >
                  <Save size={16} />
                  {savingProfile ? "Saving Profile..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Security & Password (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="border-b border-slate-100 pb-4 mb-6 flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Lock size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Change Password</h3>
                <p className="text-xs text-slate-400">Keep your account secure with a strong password</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (passwordErrors.currentPassword) setPasswordErrors((p) => ({ ...p, currentPassword: undefined }));
                    }}
                    placeholder="Enter current password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border font-mono text-sm text-slate-800 outline-none transition ${
                      passwordErrors.currentPassword
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    title={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passwordErrors.newPassword) setPasswordErrors((p) => ({ ...p, newPassword: undefined }));
                    }}
                    placeholder="Min. 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border font-mono text-sm text-slate-800 outline-none transition ${
                      passwordErrors.newPassword
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordErrors.confirmPassword) setPasswordErrors((p) => ({ ...p, confirmPassword: undefined }));
                    }}
                    placeholder="Re-type new password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border font-mono text-sm text-slate-800 outline-none transition ${
                      passwordErrors.confirmPassword
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  <KeyRound size={16} />
                  {savingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

