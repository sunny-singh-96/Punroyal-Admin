(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/integration/banners.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bannersAPI",
    ()=>bannersAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const bannersAPI = {
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${encodeURIComponent(lazyParams.search)}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.GET}/${id}`);
    },
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.ADD}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, {
            status
        });
    },
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.DELETE}/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/validations/banners.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bannerValidate",
    ()=>bannerValidate
]);
const bannerValidate = (title, image, imageFile, setErrors)=>{
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Banner title is required';
    if (!image && !imageFile) {
        newErrors.banner = 'Banner image is required';
        newErrors.image = 'Banner image is required';
    }
    if (image && !image.startsWith('http')) {
        newErrors.banner = 'Image must be a valid URL';
        newErrors.image = 'Image must be a valid URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/head/head.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PageHeader({ title, subtitle, rightContent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full px-4 sm:px-6 lg:px-8 py-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/admin/head/head.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-400 uppercase tracking-wider mt-1",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/admin/head/head.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/head/head.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    rightContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: rightContent
                    }, void 0, false, {
                        fileName: "[project]/components/admin/head/head.tsx",
                        lineNumber: 35,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/head/head.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/admin/head/head.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/head/head.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/helpers/handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getErrorMessage",
    ()=>getErrorMessage
]);
const getErrorMessage = (error)=>{
    const err = error;
    return err.response?.data?.error || err.message || "An error occurred";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/banners/create/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateBannerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/banners.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/validations/banners.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$head$2f$head$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/head/head.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/helpers/handlers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function CreateBannerPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [redirectTo, setRedirectTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        banner: '',
        status: true
    });
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateBannerPage.useEffect": ()=>{
            if (imageFile) {
                const url = URL.createObjectURL(imageFile);
                setPreviewUrl(url);
                return ({
                    "CreateBannerPage.useEffect": ()=>URL.revokeObjectURL(url)
                })["CreateBannerPage.useEffect"];
            }
            setPreviewUrl(formData.banner || '');
        }
    }["CreateBannerPage.useEffect"], [
        imageFile,
        formData.banner
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateBannerPage.useEffect": ()=>{
            if (redirectTo) router.push(redirectTo);
        }
    }["CreateBannerPage.useEffect"], [
        redirectTo,
        router
    ]);
    const handleFileChange = (event)=>{
        const file = event.target.files?.[0] || null;
        if (!file) return;
        setImageFile(file);
        setFormData({
            ...formData,
            banner: ''
        });
        setErrors({
            ...errors,
            banner: undefined
        });
    };
    const clearImage = ()=>{
        setImageFile(null);
        setFormData({
            ...formData,
            banner: ''
        });
        setPreviewUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    const handleSave = async ()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bannerValidate"])(formData.title, formData.banner, imageFile, setErrors)) return;
        setLoading(true);
        const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading('Loading...');
        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('status', String(formData.status));
            if (imageFile) {
                payload.append('banner', imageFile);
            } else {
                payload.append('banner', formData.banner);
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bannersAPI"].create(payload);
            if (response?.data?.code === 'OK') {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Banner created successfully', {
                    id: toastId
                });
            }
            setRedirectTo('/banners');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorMessage"])(error), {
                id: toastId
            });
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$head$2f$head$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Banner",
                subtitle: "Create a new banner"
            }, void 0, false, {
                fileName: "[project]/app/banners/create/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-800",
                                children: "Create Banner"
                            }, void 0, false, {
                                fileName: "[project]/app/banners/create/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/banners/create/page.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-12 gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-slate-500 uppercase tracking-wider",
                                                children: "Banner Image"
                                            }, void 0, false, {
                                                fileName: "[project]/app/banners/create/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition",
                                                children: [
                                                    previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: previewUrl,
                                                                alt: "Banner preview",
                                                                className: "w-full h-48 object-cover rounded-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/banners/create/page.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: clearImage,
                                                                className: "absolute top-2 right-2 bg-white p-1 rounded-full shadow",
                                                                children: "✕"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/banners/create/page.tsx",
                                                                lineNumber: 93,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/banners/create/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-500",
                                                                children: "Upload an image file or paste an image URL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/banners/create/page.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200",
                                                                children: [
                                                                    "Upload file",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        ref: fileInputRef,
                                                                        type: "file",
                                                                        accept: "image/*",
                                                                        onChange: handleFileChange,
                                                                        className: "hidden"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/banners/create/page.tsx",
                                                                        lineNumber: 100,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/banners/create/page.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/banners/create/page.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors.banner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-500 mt-2",
                                                        children: errors.banner
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/banners/create/page.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/banners/create/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/banners/create/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-8 space-y-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-slate-500 uppercase tracking-wider",
                                                    children: [
                                                        "Banner Title ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/banners/create/page.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 109
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/banners/create/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: formData.title,
                                                    onChange: (e)=>{
                                                        setFormData({
                                                            ...formData,
                                                            title: e.target.value
                                                        });
                                                        if (errors.title) setErrors({
                                                            ...errors,
                                                            title: undefined
                                                        });
                                                    },
                                                    placeholder: "e.g. Spring Collection",
                                                    className: `mt-2 w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white outline-none transition ${errors.title ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/banners/create/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this),
                                                errors.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-500 mt-1",
                                                    children: errors.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/banners/create/page.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/banners/create/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/banners/create/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-12 flex justify-end gap-3 pt-6 border-t border-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleSave,
                                            disabled: loading,
                                            className: "px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50",
                                            children: loading ? 'Creating...' : 'Create Banner'
                                        }, void 0, false, {
                                            fileName: "[project]/app/banners/create/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/banners/create/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/banners/create/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/banners/create/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/banners/create/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/banners/create/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/banners/create/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(CreateBannerPage, "qwor2plSz3f2ZpExwE9ZAdrkX+0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CreateBannerPage;
var _c;
__turbopack_context__.k.register(_c, "CreateBannerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6aeaa67a._.js.map