module.exports = [
"[project]/lib/integration/products.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsAPI",
    ()=>productsAPI
]);
// lib/integration/products.ts - Product API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const productsAPI = {
    // Create product
    async create (formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.ADD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async update (productId, formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.UPDATE}/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async get (productId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.VIEW}/${productId}/false/true`);
    },
    async getAll (filters) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.LIST, filters);
    },
    async deleteColorGroup (type, productId, colorGroupId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.DELETE_COLOR_GROUP}/${type}/${productId}/${colorGroupId}/null`);
    },
    async bulkUpdateStatus (productIds, status) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_UPDATE_STATUS, {
            productIds,
            status
        });
    },
    async bulkDelete (productIds) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_DELETE, {
            productIds
        });
    }
};
}),
"[project]/lib/integration/freelancer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "freelancerAPI",
    ()=>freelancerAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const freelancerAPI = {
    // 1. Assign product to freelancer (Admin)
    async assign (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ASSIGN, payload);
    },
    // 2. List all assignments (Admin)
    async getAssignments (params) {
        const query = new URLSearchParams();
        if (params?.freelancer_id) query.append('freelancer_id', params.freelancer_id);
        if (params?.product_id) query.append('product_id', params.product_id);
        if (params?.page) query.append('page', String(params.page));
        if (params?.limit) query.append('limit', String(params.limit));
        const qs = query.toString();
        const endpoint = qs ? `${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ASSIGNMENTS}?${qs}` : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ASSIGNMENTS;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(endpoint);
    },
    // 3. Update assignment (Admin)
    async updateAssignment (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ASSIGNMENT_BY_ID}/${id}`, data);
    },
    // 4. Delete assignment (Admin)
    async deleteAssignment (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ASSIGNMENT_BY_ID}/${id}`);
    },
    // 5. List available freelancers (Admin)
    async getFreelancers () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.LIST);
    },
    // 6. Get assigned products (Freelancer / Admin)
    async getAssignedProducts (params) {
        const query = new URLSearchParams();
        if (params?.page) query.append('page', String(params.page));
        if (params?.limit) query.append('limit', String(params.limit));
        if (params?.search) query.append('search', params.search);
        if (params?.cat_id) query.append('cat_id', params.cat_id);
        if (params?.freelancerId) query.append('freelancerId', params.freelancerId);
        const qs = query.toString();
        const endpoint = qs ? `${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS}?${qs}` : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(endpoint);
    },
    // 7. Get single assigned product details (Freelancer)
    async getAssignedProduct (productId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS}/${productId}`);
    },
    // 8. Create assigned product (Freelancer)
    async createProduct (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS, data);
    },
    // 9. Update assigned product (Freelancer)
    async updateProduct (productId, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS}/${productId}`, data);
    },
    // 10. Delete assigned product (Freelancer)
    async deleteProduct (productId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PRODUCTS}/${productId}`);
    },
    // 11. Calculate commission dynamically
    async calculateCommission (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.CALCULATE_COMMISSION, data);
    },
    // 12. Get completed orders with commission info (Freelancer)
    async getOrders (params) {
        const query = new URLSearchParams();
        if (params?.startDate) query.append('startDate', params.startDate);
        if (params?.endDate) query.append('endDate', params.endDate);
        if (params?.page) query.append('page', String(params.page));
        if (params?.limit) query.append('limit', String(params.limit));
        if (params?.search) query.append('search', params.search);
        if (params?.freelancerId) query.append('freelancerId', params.freelancerId);
        const qs = query.toString();
        const endpoint = qs ? `${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ORDERS}?${qs}` : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.ORDERS;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(endpoint);
    },
    // 13. Get payments / payouts history (Freelancer)
    async getPayments (params) {
        const query = new URLSearchParams();
        if (params?.startDate) query.append('startDate', params.startDate);
        if (params?.endDate) query.append('endDate', params.endDate);
        if (params?.page) query.append('page', String(params.page));
        if (params?.limit) query.append('limit', String(params.limit));
        if (params?.freelancerId) query.append('freelancerId', params.freelancerId);
        const qs = query.toString();
        const endpoint = qs ? `${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PAYMENTS}?${qs}` : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.PAYMENTS;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(endpoint);
    },
    // 14. Get dashboard statistics (Freelancer)
    async getDashboard (params) {
        const query = new URLSearchParams();
        if (params?.startDate) query.append('startDate', params.startDate);
        if (params?.endDate) query.append('endDate', params.endDate);
        if (params?.freelancerId) query.append('freelancerId', params.freelancerId);
        const qs = query.toString();
        const endpoint = qs ? `${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.DASHBOARD}?${qs}` : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].FREELANCER.DASHBOARD;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(endpoint);
    }
};
}),
"[project]/lib/integration/common.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonAPI",
    ()=>commonAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const commonAPI = {
    // Get all common
    async getAll () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON, {
            types: [
                "models",
                "colors",
                "materials",
                "sizes"
            ]
        });
    }
};
}),
"[project]/components/admin/tables/dataTableWithGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
"use client";
;
;
;
function DataGrid({ headers, rows, totalRecords, page, pageSize, onPageChange, onSearch, loading, searchEnable, rightContent, setViewMode, viewMode }) {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("asc");
    // here
    // SORTING
    const sortedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!sortKey) return rows;
        return [
            ...rows
        ].sort((a, b)=>{
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [
        rows,
        sortKey,
        sortOrder
    ]);
    const totalPages = Math.ceil(totalRecords / pageSize);
    const handleSort = (key)=>{
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    // SEARCH (debounced)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const delay = setTimeout(()=>{
            if (onSearch) onSearch(search);
        }, 400);
        return ()=>clearTimeout(delay);
    }, [
        search,
        onSearch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center justify-between flex-wrap gap-3",
                children: [
                    searchEnable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 w-full md:w-1/4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                disabled: loading,
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                placeholder: "Search...",
                                className: "border px-3 py-2 rounded-xl w-full"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode("table"),
                                className: `px-3 py-2 rounded-xl border ${viewMode === "table" ? "bg-blue-500 text-white" : ""}`,
                                children: "Table"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode("grid"),
                                className: `px-3 py-2 rounded-xl border ${viewMode === "grid" ? "bg-blue-500 text-white" : ""}`,
                                children: "Grid"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            rightContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: rightContent.onClick,
                                className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl",
                                children: rightContent.text
                            }, void 0, false, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow border overflow-hidden relative",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-white/60 flex items-center justify-center z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: viewMode === "table" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-xs font-bold uppercase cursor-pointer",
                                                    onClick: ()=>h.sortable && handleSort(h.key),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            h.label,
                                                            sortKey === h.key && (sortOrder === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 31
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 31
                                                            }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 25
                                                    }, this)
                                                }, String(h.key), false, {
                                                    fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            sortedData.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t hover:bg-gray-50",
                                                    children: headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: h.render ? h.render(row) : row[h.key] ?? "—"
                                                        }, String(h.key), false, {
                                                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 25
                                                        }, this))
                                                }, i, false, {
                                                    fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 21
                                                }, this)),
                                            sortedData.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: headers.length,
                                                    className: "text-center py-6 text-gray-400",
                                                    children: "No Data Found"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                lineNumber: 181,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this) : /* GRID VIEW */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4",
                            children: [
                                sortedData.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white",
                                        children: headers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: h.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        children: h.render ? h.render(row) : row[h.key] ?? "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, String(h.key), true, {
                                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this))
                                    }, i, false, {
                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this)),
                                sortedData.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full text-center py-6 text-gray-400",
                                    children: "No Data Found"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center p-4 flex-wrap gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "Showing ",
                                    (page - 1) * pageSize + 1,
                                    " to",
                                    " ",
                                    Math.min(page * pageSize, totalRecords),
                                    " of ",
                                    totalRecords,
                                    " entries"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: page === 1 || loading,
                                        onClick: ()=>onPageChange(page - 1),
                                        className: "px-3 py-1 border rounded disabled:opacity-50",
                                        children: "Prev"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    Array.from({
                                        length: totalPages
                                    }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: loading,
                                            onClick: ()=>onPageChange(p),
                                            className: `px-3 py-1 border rounded ${p === page ? "bg-blue-500 text-white" : ""}`,
                                            children: p
                                        }, p, false, {
                                            fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: page === totalPages || loading,
                                        onClick: ()=>onPageChange(page + 1),
                                        className: "px-3 py-1 border rounded disabled:opacity-50",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/tables/dataTableWithGrid.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/integration/categories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categoriesAPI",
    ()=>categoriesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const categoriesAPI = {
    // Get all categories
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${lazyParams.search}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    // Get category by ID
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.GET}/${id}`);
    },
    // Create category
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.ADD}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category status only
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, {
            status
        });
    },
    // Delete category
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.DELETE}/${id}`);
    }
};
}),
"[project]/app/influencer/products/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductsPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-ssr] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.js [app-ssr] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$freelancer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/freelancer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$tables$2f$dataTableWithGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/tables/dataTableWithGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/authStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
const EMPTY_FILTERS = {
    search: "",
    cat_id: "",
    product_type: [],
    colors: [],
    sizes: [],
    materials: [],
    models: [],
    status: "",
    minPrice: "",
    maxPrice: ""
};
function getErrorMessage(e) {
    return e instanceof Error ? e.message : "An unknown error occurred";
}
// ─── Sidebar primitives ────────────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultOpen);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: "w-full flex items-center justify-between py-1 mb-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-black uppercase tracking-widest text-slate-400",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                        size: 13,
                        className: "text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 13,
                        className: "text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-0.5",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 203,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/influencer/products/page.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
function CheckItem({ label, checked, onChange, dot }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "flex items-center gap-2 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onChange,
                className: "shrink-0",
                children: checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                    size: 16,
                    className: "text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                    size: 16,
                    className: "text-slate-300 group-hover:text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 225,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-3 h-3 rounded-full shrink-0 border border-black/10",
                style: {
                    background: dot
                }
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[13px] text-slate-700 leading-tight",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/influencer/products/page.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
function ProductsPage() {
    // ── state ──
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalRecords, setTotalRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("table");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categoryPage, setCategoryPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [categoryTotal, setCategoryTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [categoryLoading, setCategoryLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const CATEGORY_PAGE_SIZE = 4;
    const [common, setCommon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        models: [],
        materials: [],
        sizes: [],
        colors: []
    });
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appliedFilters, setAppliedFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(EMPTY_FILTERS);
    const [pendingFilters, setPendingFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(EMPTY_FILTERS);
    const [selectedProducts, setSelectedProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const itemsPerPage = 12;
    // ── build API params ──────────────────────────────────────────────────────
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const buildParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((f, page)=>{
        const p = {
            page,
            limit: itemsPerPage
        };
        if (f.search) p.search = f.search;
        if (f.cat_id) p.cat_id = f.cat_id;
        if (f.product_type.length) p.product_type = f.product_type;
        if (f.colors.length) p.colors = f.colors;
        if (f.sizes.length) p.sizes = f.sizes;
        if (f.materials.length) p.materials = f.materials;
        if (f.minPrice || f.maxPrice) p.price = `${f.minPrice || ""},${f.maxPrice || ""}`;
        if (f.status !== "") p.status = f.status === "1" ? true : false;
        // Force filter by the influencer's model_id
        if (user?.model_id) {
            p.models = [
                user.model_id
            ];
        }
        p.isAdmin = "true";
        return p;
    }, [
        user
    ]);
    // ── fetch products ────────────────────────────────────────────────────────
    const fetchProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (f, page)=>{
        setLoading(true);
        try {
            console.log("Fetching assigned products with params:", f);
            let response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$freelancer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["freelancerAPI"].getAssignedProducts({
                page,
                limit: itemsPerPage,
                search: f.search,
                cat_id: f.cat_id
            });
            const responseData = response;
            const isSuccess = responseData?.code === "OK" || Array.isArray(responseData) || Array.isArray(responseData?.data) || Array.isArray(responseData?.products);
            if (isSuccess) {
                const rawProducts = (Array.isArray(responseData?.data) ? responseData.data : null) || (Array.isArray(responseData) ? responseData : null) || responseData?.products || responseData?.data?.products || [];
                const enriched = rawProducts.map((p)=>{
                    const primaryMedia = (p.media || []).find((m)=>m.isPrimary) || p.media?.[0] || null;
                    return {
                        ...p,
                        id: p._id,
                        name: p.title,
                        category: p.category?.title || p.cat_id?.title || "General",
                        base_price: p.price || 0,
                        sale_price: p.display_price || p.price || 0,
                        status: p.status === true || p.status === 1 ? 1 : 0,
                        thumbnail: p.thumbnail || primaryMedia?.url || null,
                        _colors: p.colors || [],
                        _materials: p.materials || [],
                        _variants: p.variants || [],
                        _model: p.model || null,
                        commission_type: p.assignment?.commission_type || p.commission_type || p.commission_Type || "percentage",
                        commission_rate: p.assignment?.commission_rate ?? p.commission ?? 0
                    };
                });
                setProducts(enriched);
                setTotalRecords(responseData?.totalRecords ?? responseData?.data?.totalRecords ?? responseData?.total ?? enriched.length);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(responseData?.message || "Failed to load products");
                setProducts([]);
                setTotalRecords(0);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(getErrorMessage(e));
        } finally{
            setLoading(false);
        }
    }, [
        buildParams
    ]);
    // ── fetch categories ──────────────────────────────────────────────────────
    const fetchCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (page)=>{
        setCategoryLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoriesAPI"].getAll({
                page,
                limit: CATEGORY_PAGE_SIZE
            });
            const inner = res?.data?.data || res?.data || res;
            console.log("fetchCategories response:", res);
            const items = inner?.categories || inner?.data?.categories || inner?.items || (Array.isArray(inner) ? inner : []);
            const total = inner?.total ?? inner?.totalRecords ?? res?.totalRecords ?? res?.data?.total ?? items.length;
            const flat = items.map((item)=>({
                    _id: String(item._id || item.id || ""),
                    name: item.title || item.name || ""
                }));
            setCategories((prev)=>page === 1 ? flat : [
                    ...prev,
                    ...flat
                ]);
            setCategoryTotal(total);
            setCategoryPage(page);
        } catch (e) {
            console.error("fetchCategories error:", e);
        } finally{
            setCategoryLoading(false);
        }
    }, []);
    const hasMoreCategories = categories.length < categoryTotal;
    const fetchCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commonAPI"].getAll();
            const raw = res?.data?.data;
            setCommon({
                models: raw?.models || [],
                materials: raw?.materials || [],
                sizes: raw?.sizes || [],
                colors: (raw?.colors || []).map((c)=>({
                        _id: String(c._id || ""),
                        name: c.name || "",
                        hex: c.hex || "",
                        color_code: c.hex || ""
                    }))
            });
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(getErrorMessage(e));
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchCategories(1);
        setTimeout(fetchCommon, 300);
    }, [
        fetchCommon,
        fetchCategories
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ms = appliedFilters.search ? 400 : 0;
        const t = setTimeout(()=>fetchProducts(appliedFilters, currentPage), ms);
        return ()=>clearTimeout(t);
    }, [
        appliedFilters,
        currentPage,
        fetchProducts
    ]);
    // ── filter helpers ────────────────────────────────────────────────────────
    const togglePendingArr = (key, id)=>{
        setPendingFilters((prev)=>{
            const arr = prev[key];
            return {
                ...prev,
                [key]: arr.includes(id) ? arr.filter((v)=>v !== id) : [
                    ...arr,
                    id
                ]
            };
        });
    };
    const setPendingField = (key, value)=>{
        setPendingFilters((prev)=>({
                ...prev,
                [key]: value
            }));
    };
    const applyFilters = ()=>{
        setCurrentPage(1);
        setSelectedProducts([]);
        setAppliedFilters({
            ...pendingFilters
        });
    };
    const clearAll = ()=>{
        setCurrentPage(1);
        setSelectedProducts([]);
        setPendingFilters(EMPTY_FILTERS);
        setAppliedFilters(EMPTY_FILTERS);
    };
    const handleSearchChange = (value)=>{
        setPendingFilters((prev)=>({
                ...prev,
                search: value
            }));
        setAppliedFilters((prev)=>({
                ...prev,
                search: value
            }));
        setCurrentPage(1);
    };
    const activeBadge = [
        appliedFilters.product_type.length,
        appliedFilters.colors.length,
        appliedFilters.sizes.length,
        appliedFilters.materials.length,
        appliedFilters.models.length,
        appliedFilters.cat_id ? 1 : 0,
        appliedFilters.status !== "" ? 1 : 0,
        appliedFilters.minPrice || appliedFilters.maxPrice ? 1 : 0
    ].reduce((a, b)=>a + b, 0);
    const pendingBadge = [
        pendingFilters.product_type.length,
        pendingFilters.colors.length,
        pendingFilters.sizes.length,
        pendingFilters.materials.length,
        pendingFilters.models.length,
        pendingFilters.cat_id ? 1 : 0,
        pendingFilters.status !== "" ? 1 : 0,
        pendingFilters.minPrice || pendingFilters.maxPrice ? 1 : 0
    ].reduce((a, b)=>a + b, 0);
    const hasActive = activeBadge > 0 || !!appliedFilters.search;
    const hasPending = JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);
    const headers = [
        {
            key: "select",
            label: "",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSelectedProducts((prev)=>prev.includes(row.id) ? prev.filter((id)=>id !== row.id) : [
                                ...prev,
                                row.id
                            ]),
                    children: selectedProducts.includes(row.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                        size: 16,
                        className: "text-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 519,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                        size: 16,
                        className: "text-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 521,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this)
        },
        {
            key: "thumbnail",
            label: "",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${viewMode === "table" ? "w-10 h-10" : "size-36"} rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200`,
                    children: row.thumbnail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: row.thumbnail,
                        alt: row.name,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 535,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                        size: 18,
                        className: "text-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 541,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this)
        },
        {
            key: "name",
            label: "Product",
            sortable: true,
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-slate-800 max-w-[200px] truncate",
                            title: row.name,
                            children: row.name
                        }, void 0, false, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 553,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 mt-1",
                            children: [
                                (row._colors || []).slice(0, 5).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        title: c.name,
                                        className: "w-2.5 h-2.5 rounded-full border border-black/10 shrink-0",
                                        style: {
                                            background: c.hex
                                        }
                                    }, c._id, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this)),
                                (row._colors || []).length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] text-slate-400",
                                    children: [
                                        "+",
                                        row._colors.length - 5
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 559,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 552,
                    columnNumber: 9
                }, this)
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full",
                    children: row.category
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 583,
                    columnNumber: 9
                }, this)
        },
        {
            key: "product_type",
            label: "Type",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600",
                    children: row.product_type === "sizes" ? "Readymade" : "Unstitched"
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 593,
                    columnNumber: 9
                }, this)
        },
        {
            key: "base_price",
            label: "Price",
            sortable: true,
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-slate-800",
                            children: [
                                "₹",
                                row.sale_price
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 605,
                            columnNumber: 11
                        }, this),
                        row.sale_price < row.base_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-slate-400 line-through ml-1",
                            children: [
                                "₹",
                                row.base_price
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 607,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 604,
                    columnNumber: 9
                }, this)
        },
        {
            key: "totalStock",
            label: "Stock",
            render: (row)=>{
                const stock = row.product_type === "sizes" && row.totalStock === 0 ? row.quantity : row.totalStock;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-[11px] font-bold px-2 py-0.5 rounded-full ${stock === 0 ? "bg-red-50 text-red-500" : stock < 10 ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-700"}`,
                    children: stock === 0 ? "Out" : stock
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 624,
                    columnNumber: 11
                }, this);
            }
        },
        {
            key: "status",
            label: "Status",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `h-1.5 w-1.5 rounded-full ${row.status === 1 ? "bg-green-500" : "bg-slate-300"}`
                        }, void 0, false, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 644,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-semibold text-slate-600",
                            children: row.status === 1 ? "Live" : "Draft"
                        }, void 0, false, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 647,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 643,
                    columnNumber: 9
                }, this)
        },
        {
            key: "commission",
            label: "Commission",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200",
                    children: row.commission_type === "flat" ? `₹${row.commission_rate || 0} Flat` : `${row.commission_rate || 0}%`
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 658,
                    columnNumber: 9
                }, this)
        },
        {
            key: "actions",
            label: "Actions",
            render: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/influencer/products/view/${row._id}`,
                        title: "View Product Details",
                        className: "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 676,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "View Details"
                            }, void 0, false, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 677,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 671,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 670,
                    columnNumber: 9
                }, this)
        }
    ];
    const handleDeleteProduct = async (productId, name)=>{
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
        try {
            setLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$freelancer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["freelancerAPI"].deleteProduct(productId);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Product deleted successfully");
            setProducts((prev)=>prev.filter((p)=>p._id !== productId));
            setTotalRecords((prev)=>Math.max(0, prev - 1));
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(getErrorMessage(err));
        } finally{
            setLoading(false);
        }
    };
    // ── Bulk Status Change ────────────────────────────────────────────────────────
    const bulkStatusChange = async (status)=>{
        if (selectedProducts.length === 0) return;
        try {
            setLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsAPI"].bulkUpdateStatus(selectedProducts, status === 1 ? true : false);
            const res = response?.data || response;
            if (res?.code === "OK") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Products marked as ${status === 1 ? "Live" : "Draft"}`);
                setProducts((prev)=>prev.map((product)=>selectedProducts.includes(product._id) ? {
                            ...product,
                            status
                        } : product));
                setSelectedProducts([]);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res?.message || "Failed to update products");
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(getErrorMessage(e));
        } finally{
            setLoading(false);
        }
    };
    // ── Bulk Delete ───────────────────────────────────────────────────────────────
    const bulkDelete = async ()=>{
        if (selectedProducts.length === 0) return;
        const confirmed = window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`);
        if (!confirmed) return;
        try {
            setLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsAPI"].bulkDelete(selectedProducts);
            const res = response?.data || response;
            if (res?.code === "OK") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Products deleted successfully");
                setProducts((prev)=>prev.filter((product)=>!selectedProducts.includes(product._id)));
                setTotalRecords((prev)=>prev - selectedProducts.length);
                setSelectedProducts([]);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res?.message || "Failed to delete products");
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(getErrorMessage(e));
        } finally{
            setLoading(false);
        }
    };
    // ─── Render ────────────────────────────────────────────────────────────────
    if (loading && products.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-[#F8FAFC]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin text-blue-600 w-10 h-10"
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 765,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/influencer/products/page.tsx",
            lineNumber: 764,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F8FAFC]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-8 pt-8 pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-black text-slate-900",
                                children: "Assigned Products"
                            }, void 0, false, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 776,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: [
                                    totalRecords,
                                    " assigned products",
                                    hasActive ? " · Filters active" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 777,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 775,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/influencer/products/page.tsx",
                    lineNumber: 774,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-8 pb-8 max-w-[1600px] mx-auto flex gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: `shrink-0 transition-all duration-300 overflow-hidden ${showFilters ? "w-64" : "w-0"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-6 w-64",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-black text-slate-800 text-sm",
                                            children: "Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/app/influencer/products/page.tsx",
                                            lineNumber: 792,
                                            columnNumber: 15
                                        }, this),
                                        hasActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearAll,
                                            className: "text-[11px] font-bold text-red-500 hover:text-red-600",
                                            children: "Clear All"
                                        }, void 0, false, {
                                            fileName: "[project]/app/influencer/products/page.tsx",
                                            lineNumber: 794,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Category",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: [
                                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckItem, {
                                                    label: c.name,
                                                    checked: pendingFilters.cat_id === c._id,
                                                    onChange: ()=>setPendingField("cat_id", pendingFilters.cat_id === c._id ? "" : c._id)
                                                }, c._id, false, {
                                                    fileName: "[project]/app/influencer/products/page.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 19
                                                }, this)),
                                            hasMoreCategories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>fetchCategories(categoryPage + 1),
                                                disabled: categoryLoading,
                                                className: "w-full mt-1.5 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50",
                                                children: categoryLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            size: 11,
                                                            className: "animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/influencer/products/page.tsx",
                                                            lineNumber: 828,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Loading..."
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            size: 11
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/influencer/products/page.tsx",
                                                            lineNumber: 833,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Show more (",
                                                        categoryTotal - categories.length,
                                                        " more)"
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 821,
                                                columnNumber: 19
                                            }, this),
                                            !hasMoreCategories && categoryTotal > CATEGORY_PAGE_SIZE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-[10px] text-slate-300 pt-1",
                                                children: "All categories loaded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 841,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 805,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 804,
                                    columnNumber: 13
                                }, this),
                                common.colors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Color",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-44 overflow-y-auto pr-1",
                                        children: common.colors.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckItem, {
                                                label: c.name,
                                                checked: pendingFilters.colors.includes(c._id),
                                                onChange: ()=>togglePendingArr("colors", c._id),
                                                dot: c.hex || c.color_code
                                            }, c._id, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 853,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 851,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 850,
                                    columnNumber: 15
                                }, this),
                                common.sizes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Size",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-44 overflow-y-auto pr-1",
                                        children: common.sizes.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckItem, {
                                                label: s.name,
                                                checked: pendingFilters.sizes.includes(s._id),
                                                onChange: ()=>togglePendingArr("sizes", s._id)
                                            }, s._id, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 870,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 868,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 867,
                                    columnNumber: 15
                                }, this),
                                common.materials.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Material",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-44 overflow-y-auto pr-1",
                                        children: common.materials.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckItem, {
                                                label: m.name,
                                                checked: pendingFilters.materials.includes(m._id),
                                                onChange: ()=>togglePendingArr("materials", m._id)
                                            }, m._id, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 886,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this),
                                common.models.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Models",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-44 overflow-y-auto pr-1",
                                        children: common.models.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckItem, {
                                                label: m.name,
                                                checked: pendingFilters.models.includes(m._id),
                                                onChange: ()=>togglePendingArr("models", m._id)
                                            }, m._id, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 902,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 900,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 899,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Status",
                                    children: [
                                        {
                                            val: "",
                                            label: "All"
                                        },
                                        {
                                            val: "1",
                                            label: "Live"
                                        },
                                        {
                                            val: "0",
                                            label: "Draft"
                                        }
                                    ].map(({ val, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPendingField("status", val),
                                                    className: "shrink-0",
                                                    children: pendingFilters.status === val ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                        size: 16,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/influencer/products/page.tsx",
                                                        lineNumber: 930,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                        size: 16,
                                                        className: "text-slate-300 group-hover:text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/influencer/products/page.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/influencer/products/page.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[13px] text-slate-700",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/influencer/products/page.tsx",
                                                    lineNumber: 938,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, val, true, {
                                            fileName: "[project]/app/influencer/products/page.tsx",
                                            lineNumber: 920,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 914,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSection, {
                                    title: "Price Range (₹)",
                                    defaultOpen: false,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                placeholder: "Min",
                                                value: pendingFilters.minPrice,
                                                onChange: (e)=>setPendingFilters((prev)=>({
                                                            ...prev,
                                                            minPrice: e.target.value
                                                        })),
                                                className: "w-1/2 p-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 946,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                placeholder: "Max",
                                                value: pendingFilters.maxPrice,
                                                onChange: (e)=>setPendingFilters((prev)=>({
                                                            ...prev,
                                                            maxPrice: e.target.value
                                                        })),
                                                className: "w-1/2 p-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 958,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 945,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 944,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-3 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: applyFilters,
                                            className: `w-full py-2.5 rounded-xl text-sm font-bold transition-all ${hasPending ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200" : "bg-blue-100 text-blue-400 cursor-default"}`,
                                            children: hasPending ? `Apply Filters${pendingBadge > 0 ? ` (${pendingBadge})` : ""}` : "Filters Applied"
                                        }, void 0, false, {
                                            fileName: "[project]/app/influencer/products/page.tsx",
                                            lineNumber: 975,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearAll,
                                            className: "w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200",
                                            children: "Clear All"
                                        }, void 0, false, {
                                            fileName: "[project]/app/influencer/products/page.tsx",
                                            lineNumber: 987,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/influencer/products/page.tsx",
                                    lineNumber: 974,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/influencer/products/page.tsx",
                            lineNumber: 790,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 787,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowFilters((f)=>!f),
                                        className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors shrink-0 ${showFilters ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 1009,
                                                columnNumber: 15
                                            }, this),
                                            "Filters",
                                            activeBadge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 bg-blue-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center",
                                                children: activeBadge
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 1012,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1001,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search by name, ID, SKU…",
                                                value: pendingFilters.search,
                                                onChange: (e)=>handleSearchChange(e.target.value),
                                                className: "w-full pl-10 pr-10 py-2.5 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 1022,
                                                columnNumber: 15
                                            }, this),
                                            pendingFilters.search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSearchChange(""),
                                                className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 14,
                                                    className: "text-slate-400 hover:text-slate-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/influencer/products/page.tsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/influencer/products/page.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1017,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 1000,
                                columnNumber: 11
                            }, this),
                            !loading && products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl border border-slate-100 py-16 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"], {
                                        size: 44,
                                        className: "mx-auto text-slate-300 mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-slate-700",
                                        children: "No products found"
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 text-sm mt-1",
                                        children: "Try adjusting your search or filters"
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: clearAll,
                                        className: "mt-5 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700",
                                        children: "Clear Filters"
                                    }, void 0, false, {
                                        fileName: "[project]/app/influencer/products/page.tsx",
                                        lineNumber: 1053,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 1045,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$tables$2f$dataTableWithGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                headers: headers,
                                rows: products,
                                totalRecords: totalRecords,
                                page: currentPage,
                                pageSize: itemsPerPage,
                                onPageChange: setCurrentPage,
                                loading: loading,
                                searchEnable: false,
                                setViewMode: setViewMode,
                                viewMode: viewMode
                            }, void 0, false, {
                                fileName: "[project]/app/influencer/products/page.tsx",
                                lineNumber: 1061,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/influencer/products/page.tsx",
                        lineNumber: 998,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/influencer/products/page.tsx",
                lineNumber: 785,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/influencer/products/page.tsx",
        lineNumber: 771,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_3521c734._.js.map