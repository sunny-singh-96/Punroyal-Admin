"use client";
import { categoriesAPI } from '@/lib/integration/categories';
import toast from 'react-hot-toast';
import { categoryValidate } from '@/validations/categories';
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CategoryError } from "@/types/types";
import PageHeader from "@/components/admin/head/head";
import { getErrorMessage } from "@/lib/helpers/handlers";

export default function CategoryPage() {
    const router = useRouter();
    const [redirectTo, setRedirectTo] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        status: true
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // ✅ Redirect after category
    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        }
        setPreviewUrl(formData.image || "");
    }, [imageFile, formData.image]);

    useEffect(() => {
        if (redirectTo) router.push(redirectTo);
    }, [redirectTo, router]);

    const [errors, setErrors] = useState<CategoryError>({});
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) return;
        setImageFile(file);
        setFormData({ ...formData, image: "" });
        setErrors({ ...errors, image: undefined });
    };

    const clearImage = () => {
        setImageFile(null);
        setFormData({ ...formData, image: "" });
        setPreviewUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle Save
    const handleSave = async () => {
        if (!categoryValidate(formData.title, formData.image, imageFile, setErrors)) return;
        setLoading(true);
        const toastId = toast.loading("Loading...");
        try {
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("status", String(formData.status));
            if (imageFile) {
                payload.append("image", imageFile);
            } else {
                payload.append("image", formData.image);
            }
            const response = await categoriesAPI.create(payload);
            if (response?.data?.code === "OK") {
                toast.success(`${formData.title} Category created`, { id: toastId });
            }
            setRedirectTo('/categories');
        } catch (error) {
            toast.error(getErrorMessage(error), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Header - Sticky */}
                <PageHeader
                    title="Category"
                    subtitle="Manage E-Commerce Categories"
                />

                {/* Form Card */}
                <div className="max-w-7xl mx-auto py-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                            <h2 className="text-lg font-bold text-slate-800">
                                Create Category
                            </h2>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                                {/* LEFT SIDE - IMAGE UPLOAD */}
                                <div className="md:col-span-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Category Image <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition">
                                        {previewUrl ? (
                                            <div className="relative">
                                            <img src={previewUrl} alt="Banner preview" className="w-full h-48 object-cover rounded-lg" />
                                            <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">✕</button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                            <p className="text-sm text-slate-500">Upload an image file or paste an image URL</p>
                                            <label className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200">
                                                Upload file
                                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                            </label>
                                            </div>
                                        )}
                                        {errors.image && <p className="text-xs text-red-500 mt-2">{errors.image}</p>}
                                    </div>
                                </div>

                                {/* RIGHT SIDE - FORM */}
                                <div className="md:col-span-8 space-y-6">

                                    {/* TITLE */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Category Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={formData.title}
                                            onChange={(e) => {
                                                setFormData({ ...formData, title: e.target.value });
                                                if (errors.title) setErrors({ ...errors, title: undefined });
                                            }}
                                            placeholder="e.g. Designer Party Wear Suits"
                                            className={`mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white outline-none transition ${errors.title
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-transparent focus:border-blue-500'
                                                }`}
                                        />
                                        {errors.title && (
                                            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                                        )}
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50" >
                                        {loading ? "Creating..." : "Create Category"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}