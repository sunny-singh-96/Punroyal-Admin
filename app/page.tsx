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
    AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { adminLogin } from '../validations/adminLogin';
import { ENDPOINTS } from "@/constants/endpoint";
import { http } from "@/lib/integration/http";
import { LoginErrors } from "@/types/types";

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, setAuth } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const redirectTo = searchParams.get("redirect") || "/dashboard";

    // ✅ Redirect after login
    useEffect(() => {
        console.log('Checking user for redirect:', user);
        if (user && user?._id && user?.role == "superadmin") {
            router.push(redirectTo);
        }
    }, [user, redirectTo, router]);

    // ✅ Handle login
    const handleLogin = async () => {
        if (!adminLogin(email, password, setErrors)) return;
        setLoading(true);
        const toastId = toast.loading("Logging in...");
        try {
            const response = await http.post(ENDPOINTS.LOGIN, { email, password }, {}, false);
            if (response?.message) {
                toast.error(response.message, { id: toastId });
                return;
            }
            if (response?.data?.data?.token && response?.data?.data?.user) {
                setAuth(response?.data?.data?.token, response?.data?.data?.user);
            }
            toast.success(response?.data?.message, { id: toastId });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto bg-indigo-600 rounded-xl flex items-center justify-center mb-3">
                        <Shield className="text-white" size={26} />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-gray-500 text-sm">Secure access</p>
                </div>

                {/* FORM */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm font-semibold">Email</label>

                        <div className="relative mt-1">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: undefined }));
                                }}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition ${errors.email
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 focus:border-indigo-500"
                                    }`}
                                placeholder="admin@example.com"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.email}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm font-semibold">Password</label>

                        <div className="relative mt-1">
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((prev) => ({ ...prev, password: undefined }));
                                }}
                                className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 outline-none transition ${errors.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 focus:border-indigo-500"
                                    }`}
                                placeholder="••••••••"
                            />

                            {/* SHOW/HIDE PASSWORD */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.password}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="button"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                        onClick={handleLogin}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Logging in...
                            </>
                        ) : (
                            <>
                                <Shield size={18} />
                                Login
                            </>
                        )}
                    </button>
                </form>

                {/* FOOTER */}
                <div className="mt-6 flex justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <Shield size={12} /> Secure
                    </span>
                    <span className="flex items-center gap-1">
                        <Lock size={12} /> Encrypted
                    </span>
                </div>
            </div>
        </div>
    );
}