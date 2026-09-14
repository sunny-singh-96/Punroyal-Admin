(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/integration/products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsAPI",
    ()=>productsAPI
]);
// lib/integration/products.ts - Product API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const productsAPI = {
    // Create product
    async create (formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.ADD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async update (productId, formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.UPDATE}/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async get (productId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.VIEW}/${productId}/false/true`);
    },
    async getAll (filters) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.LIST, filters);
    },
    async deleteColorGroup (type, productId, colorGroupId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.DELETE_COLOR_GROUP}/${type}/${productId}/${colorGroupId}/null`);
    },
    async bulkUpdateStatus (productIds, status) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_UPDATE_STATUS, {
            productIds,
            status
        });
    },
    async bulkDelete (productIds) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_DELETE, {
            productIds
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/common.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonAPI",
    ()=>commonAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const commonAPI = {
    // Get all common
    async getAll () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON, {
            types: [
                "models",
                "colors",
                "materials",
                "sizes"
            ]
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categoriesAPI",
    ()=>categoriesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const categoriesAPI = {
    // Get all categories
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${lazyParams.search}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    // Get category by ID
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.GET}/${id}`);
    },
    // Create category
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.ADD}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category status only
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, {
            status
        });
    },
    // Delete category
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.DELETE}/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/lib/integration/inventory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inventoryAPI",
    ()=>inventoryAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
;
;
const inventoryAPI = {
    // Get inventory list
    async getAll (params) {
        const url = `/${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.LIST}?page=${params?.page || 1}&limit=${params?.limit || 10}&inventory_stock=${params?.inventory_stock || ''}&search=${params?.search || ''}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Get inventory status
    async getInventoryStats () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.STATS);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/reviews.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reviewsAPI",
    ()=>reviewsAPI
]);
// lib/integration/reviews.ts - Reviews API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
;
const reviewsAPI = {
    // Get all reviews
    async getAll (params) {
        const url = `/admin/reviews?${new URLSearchParams(params || {}).toString()}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Update review status
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].patch(`/admin/reviews/${id}/status`, {
            status
        });
    },
    // Update review
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`/admin/reviews/${id}`, data);
    },
    // Delete review
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`/admin/reviews/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorsAPI",
    ()=>colorsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const colorsAPI = {
    // Get all colors
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'colors',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single color
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'colors',
            id
        });
    },
    // Create color
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'colors',
            data: {
                name: data.name,
                hex: data.hex
            }
        });
    },
    // Delete color
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'colors',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/models.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modelsAPI",
    ()=>modelsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const modelsAPI = {
    // Get all models
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'models',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single model
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'models',
            id
        });
    },
    // Create model
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'models',
            data: {
                name: data.name,
                username: data.username,
                password: data.password
            }
        });
    },
    // Update model
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'update',
            module: 'models',
            id,
            data
        });
    },
    // Create auth for model
    async createAuth (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INFLUENCER.REGISTER, {
            name: data.name,
            email: `${data.username}@punroyal.com`,
            username: data.username,
            password: data.password || 'password123',
            role: 'influencer'
        });
    },
    // Delete model
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'models',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/sizes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sizesAPI",
    ()=>sizesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const sizesAPI = {
    // Get all sizes
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'sizes',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single size
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'sizes',
            id
        });
    },
    // Create size
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'sizes',
            data: {
                name: data.name
            }
        });
    },
    // Delete size
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'sizes',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/materials.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "materialsAPI",
    ()=>materialsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const materialsAPI = {
    // Get all materials
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'materials',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single material
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'materials',
            id
        });
    },
    // Create material
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'materials',
            data: {
                name: data.name
            }
        });
    },
    // Delete material
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'materials',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// lib/integration/index.ts - Export all API integrations
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/banners.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$inventory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/inventory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/reviews.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/colors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/models.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$sizes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/sizes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/materials.ts [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/imageHelper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getImageUrl",
    ()=>getImageUrl,
    "handleImageError",
    ()=>handleImageError
]);
const PLACEHOLDER_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Ctext x='50' y='50' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='12'%3ENo image%3C/text%3E%3C/svg%3E";
const getImageUrl = (path)=>{
    if (!path) return PLACEHOLDER_SVG;
    if (path.startsWith('http')) return path;
    return `/uploads/${path}`;
};
const handleImageError = (e)=>{
    e.currentTarget.src = 'https://placehold.co/600x600/F3F4F6/1F2937?text=No+Image';
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/products/view/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductViewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$weight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Weight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/weight.js [app-client] (ecmascript) <export default as Weight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/integration/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$imageHelper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/imageHelper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
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
;
function ProductViewPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const productId = params?.id;
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const togglePlay = ()=>{
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [productImages, setProductImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedColor, setSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedImageIndex, setSelectedImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const filteredImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductViewPage.useMemo[filteredImages]": ()=>{
            if (!selectedColor) return [];
            return productImages.filter({
                "ProductViewPage.useMemo[filteredImages]": (item)=>item.color_id === selectedColor
            }["ProductViewPage.useMemo[filteredImages]"]);
        }
    }["ProductViewPage.useMemo[filteredImages]"], [
        productImages,
        selectedColor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductViewPage.useEffect": ()=>{
            if (!productId) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Product ID not found");
                return;
            }
            const fetchProduct = {
                "ProductViewPage.useEffect.fetchProduct": async ()=>{
                    try {
                        setLoading(true);
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productsAPI"].get(productId);
                        const apiData = response.data;
                        if (response.code === "OK") {
                            const productData = apiData.product;
                            const images = apiData.productImages;
                            setProduct(productData);
                            setProductImages(images);
                            const initialColor = productData.primaryColorId || productData.colors[0]?._id;
                            setSelectedColor(initialColor || null);
                            setSelectedImageIndex(0);
                        }
                    } catch (error) {
                        console.error("Error fetching product:", error);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to load product details");
                    } finally{
                        setLoading(false);
                    }
                }
            }["ProductViewPage.useEffect.fetchProduct"];
            fetchProduct();
        }
    }["ProductViewPage.useEffect"], [
        productId
    ]);
    const handleColorChange = (colorId)=>{
        setSelectedColor(colorId);
        setSelectedImageIndex(0);
    };
    const handlePrevImage = ()=>{
        setSelectedImageIndex((prev)=>prev === 0 ? filteredImages.length - 1 : prev - 1);
    };
    const handleNextImage = ()=>{
        setSelectedImageIndex((prev)=>prev === filteredImages.length - 1 ? 0 : prev + 1);
    };
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storageUtils"].getUser();
    const isInfluencer = currentUser?.role === "influencer";
    const handleEdit = ()=>{
        if (isInfluencer) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Access restricted: Influencers can only view product details.");
            return;
        }
        router.push(`/products/edit/${productId}`);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-600 font-medium",
                        children: "Loading product details..."
                    }, void 0, false, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/view/[id]/page.tsx",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/products/view/[id]/page.tsx",
            lineNumber: 206,
            columnNumber: 7
        }, this);
    }
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-12 h-12 text-red-500 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-600 font-medium",
                        children: "Product not found"
                    }, void 0, false, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/view/[id]/page.tsx",
                lineNumber: 220,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/products/view/[id]/page.tsx",
            lineNumber: 219,
            columnNumber: 7
        }, this);
    }
    const selectedColorData = product.colors.find((color)=>color._id === selectedColor);
    const currentImage = filteredImages.length > 0 ? filteredImages[selectedImageIndex]?.url : null;
    const priceDiscount = Math.round((product.price - product.display_price) / product.price * 100);
    const lowStock = product.quantity < 10;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-3 h-3 rounded-full ${product.status ? "bg-emerald-500" : "bg-amber-500"}`
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-slate-700",
                                    children: product.status ? "Active Product" : "Inactive Product"
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/view/[id]/page.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-slate-500",
                            children: [
                                "ID: ",
                                productId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/view/[id]/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this),
                        !isInfluencer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleEdit,
                            className: "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition-all hover:shadow-md font-medium text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this),
                                "Edit"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/view/[id]/page.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/view/[id]/page.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/products/view/[id]/page.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm text-slate-500 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-700 font-medium",
                                    children: product.title
                                }, void 0, false, {
                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/view/[id]/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full bg-black aspect-video overflow-hidden flex items-center justify-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                        ref: videoRef,
                                                        src: product.video,
                                                        className: "w-full h-full object-cover",
                                                        onError: (e)=>console.error("Video error:", e),
                                                        onClick: togglePlay,
                                                        children: "Your browser does not support the video tag."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: togglePlay,
                                                        className: `absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-5 transition-all duration-200 hover:scale-110 shadow-2xl",
                                                            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                                className: "w-10 h-10 text-white",
                                                                fill: "white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                className: "w-10 h-10 text-white translate-x-0.5",
                                                                fill: "white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: product.video,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        className: "absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 hover:scale-105 z-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                className: "w-3.5 h-3.5 -rotate-45"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 19
                                                            }, this),
                                                            "Open"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this),
                                            product.video_link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 flex items-center justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 bg-white rounded-lg shadow-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                                className: "w-5 h-5 text-pink-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: product.video_link,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-sm font-medium text-indigo-600 hover:text-indigo-800 truncate hover:underline transition-colors",
                                                            children: product.video_link
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-b border-slate-200 pb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-3xl font-bold text-slate-900 mb-2",
                                                        children: product.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-sm",
                                                        children: [
                                                            "SKU ID: ",
                                                            productId.slice(-8).toUpperCase()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                        className: "w-4 h-4 text-blue-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-blue-600 uppercase tracking-wide",
                                                                        children: "Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 355,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-bold text-slate-900",
                                                                children: product.product_type === "sizes" ? "Standard" : "Free Size"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                                        className: "w-4 h-4 text-purple-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 368,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-purple-600 uppercase tracking-wide",
                                                                        children: "Category"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 369,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-bold text-slate-900",
                                                                children: product.category?.title || "N/A"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 17
                                                    }, this),
                                                    product.model && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                                        className: "w-4 h-4 text-emerald-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 381,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-emerald-600 uppercase tracking-wide",
                                                                        children: "Model"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-bold text-slate-900",
                                                                children: product.model.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this),
                                                    product.materials && product.materials.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$weight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Weight$3e$__["Weight"], {
                                                                        className: "w-4 h-4 text-amber-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 395,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-amber-600 uppercase tracking-wide",
                                                                        children: "Material"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 396,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-bold text-slate-900",
                                                                children: product.materials.map((m)=>m.name).join(", ")
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 351,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg border border-indigo-500 p-8 text-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-indigo-100 text-sm font-semibold uppercase tracking-wide mb-4",
                                                        children: "Pricing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm text-indigo-100 mb-1",
                                                                                children: "Display Price"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                                lineNumber: 416,
                                                                                columnNumber: 23
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-4xl font-bold",
                                                                                children: [
                                                                                    "₹",
                                                                                    product.display_price
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                                lineNumber: 419,
                                                                                columnNumber: 23
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 415,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    priceDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "inline-block bg-white/20 backdrop-blur text-white px-3 py-1 rounded-lg font-semibold",
                                                                            children: [
                                                                                priceDiscount,
                                                                                "% OFF"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                            lineNumber: 425,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 424,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-4 border-t border-indigo-400",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-100 text-sm mb-1",
                                                                        children: "Original Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 432,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-2xl font-semibold line-through text-indigo-200",
                                                                        children: [
                                                                            "₹",
                                                                            product.price
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 435,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 431,
                                                                columnNumber: 19
                                                            }, this),
                                                            product.product_type === "no_sizes" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-4 border-t border-indigo-400 flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-indigo-100 text-sm mb-1",
                                                                                children: "Available Stock"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                                lineNumber: 442,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-2xl font-bold",
                                                                                children: [
                                                                                    product.quantity,
                                                                                    " units"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                                lineNumber: 445,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    lowStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "inline-block bg-yellow-400/20 backdrop-blur text-yellow-100 px-3 py-1 rounded-lg text-sm font-semibold",
                                                                            children: "Low Stock"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                            lineNumber: 451,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-12 grid grid-cols-1 gap-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-2xl shadow-lg border border-slate-200 p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-slate-900 mb-6",
                                                    children: "Description"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 17
                                                }, this),
                                                product.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    dangerouslySetInnerHTML: {
                                                        __html: product.description
                                                    },
                                                    className: "prose prose-sm max-w-none text-slate-700 leading-relaxed"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 italic",
                                                    children: "No description provided"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    product.product_type === "sizes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-semibold text-slate-900",
                                                            children: "Available Sizes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 491,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-500",
                                                            children: selectedColorData ? `Showing sizes for ${selectedColorData.color_name}` : "Select a color to see sizes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-3",
                                                children: product.variants.filter((variant)=>variant.color?._id === selectedColor).map((variant)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200 p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-slate-500 uppercase tracking-wider",
                                                                        children: "Size"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `px-2 py-1 rounded-full text-[11px] font-semibold ${variant.stock <= 2 ? "bg-red-100 text-red-700" : variant.stock <= 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`,
                                                                        children: [
                                                                            variant.stock,
                                                                            " pcs"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 text-2xl font-bold text-slate-900",
                                                                children: variant.size?.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, variant._id, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-2xl shadow-lg border border-slate-200 p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-bold text-slate-900 mb-1",
                                                        children: "Select Color"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-slate-500",
                                                        children: [
                                                            filteredImages.length,
                                                            " image",
                                                            filteredImages.length !== 1 ? "s" : "",
                                                            " available"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 536,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 sm:grid-cols-4 gap-3",
                                                children: product.colors.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleColorChange(color._id),
                                                        className: `relative group transition-all duration-200 ${selectedColor === color._id ? "scale-105" : ""}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `absolute inset-0 rounded-2xl transition-all duration-200 ${selectedColor === color._id ? "ring-2 ring-offset-2 ring-indigo-600 shadow-lg" : "ring-1 ring-slate-200"}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-16 h-16 rounded-xl shadow-md transition-all duration-200 border-4 border-white hover:shadow-lg",
                                                                        style: {
                                                                            backgroundColor: color.color_hex
                                                                        },
                                                                        title: color.color_name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    selectedColor === color._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        className: "absolute top-1 right-1 w-5 h-5 text-indigo-600 bg-white rounded-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 569,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `text-xs font-semibold text-center mt-2 transition-colors ${selectedColor === color._id ? "text-indigo-600" : "text-slate-600"}`,
                                                                children: color.color_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, color._id, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 546,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 535,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-2xl shadow-lg border border-slate-200 p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-bold text-slate-900 mb-1",
                                                        children: "Product Images"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-500",
                                                            children: selectedColorData ? `${selectedColorData.color_name} - Image ${selectedImageIndex + 1} of ${filteredImages.length}` : "Select a color to view images"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 15
                                            }, this),
                                            filteredImages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-full bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden aspect-square border-2 border-slate-200 group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: currentImage || "",
                                                                alt: `${selectedColorData?.color_name} product view`,
                                                                fill: true,
                                                                className: "object-cover group-hover:scale-110 transition-transform duration-500",
                                                                onError: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$imageHelper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleImageError"],
                                                                priority: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 21
                                                            }, this),
                                                            filteredImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handlePrevImage,
                                                                className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95",
                                                                "aria-label": "Previous image",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                                    className: "w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 614,
                                                                columnNumber: 23
                                                            }, this),
                                                            filteredImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleNextImage,
                                                                className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95",
                                                                "aria-label": "Next image",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                    className: "w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                    lineNumber: 629,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 23
                                                            }, this),
                                                            filteredImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium",
                                                                children: [
                                                                    selectedImageIndex + 1,
                                                                    "/",
                                                                    filteredImages.length
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 19
                                                    }, this),
                                                    filteredImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium text-slate-600 uppercase tracking-wide",
                                                                children: "All Views"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 642,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-4 gap-3",
                                                                children: filteredImages.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setSelectedImageIndex(index),
                                                                        className: `relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-200 flex-shrink-0 ${selectedImageIndex === index ? "border-indigo-600 ring-2 ring-indigo-300 shadow-md" : "border-slate-200 hover:border-slate-300"}`,
                                                                        title: `View ${index + 1}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: image.url,
                                                                            alt: `Thumbnail ${index + 1}`,
                                                                            fill: true,
                                                                            className: "object-cover hover:scale-105 transition-transform duration-300",
                                                                            onError: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$imageHelper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleImageError"]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                            lineNumber: 657,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, index, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 647,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 602,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center h-64 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border-2 border-dashed border-slate-300",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                            className: "w-8 h-8 text-slate-400 mx-auto mb-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500 font-medium",
                                                            children: "No images available"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 674,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-400 text-sm",
                                                            children: "for this color"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/view/[id]/page.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/products/view/[id]/page.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 671,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-2xl shadow-lg border border-slate-200 p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-slate-900 mb-6",
                                                children: "Specifications"
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                                        className: "w-4 h-4 text-slate-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 692,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-600 uppercase tracking-wide",
                                                                        children: "Length"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-slate-900",
                                                                children: product.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: "cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                                        className: "w-4 h-4 text-slate-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 705,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-600 uppercase tracking-wide",
                                                                        children: "Breadth"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 706,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 704,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-slate-900",
                                                                children: product.breadth
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 710,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: "cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                                        className: "w-4 h-4 text-slate-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-600 uppercase tracking-wide",
                                                                        children: "Height"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 719,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-slate-900",
                                                                children: product.height
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: "cm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 726,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$weight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Weight$3e$__["Weight"], {
                                                                        className: "w-4 h-4 text-slate-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 731,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-slate-600 uppercase tracking-wide",
                                                                        children: "Weight"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                        lineNumber: 732,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 730,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-bold text-slate-900",
                                                                children: product.weight
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 736,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: "kg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                                lineNumber: 739,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 689,
                                                columnNumber: 15
                                            }, this),
                                            product.specifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-slate-200 pt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-slate-900 mb-4",
                                                        children: "Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 745,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        dangerouslySetInnerHTML: {
                                                            __html: product.specifications
                                                        },
                                                        className: "text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                                        lineNumber: 748,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                                lineNumber: 744,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/products/view/[id]/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/products/view/[id]/page.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/products/view/[id]/page.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/view/[id]/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/products/view/[id]/page.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_s(ProductViewPage, "yLEHD5cCAqaUUVgh8f71O/Q0xR0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = ProductViewPage;
var _c;
__turbopack_context__.k.register(_c, "ProductViewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_05e2653a._.js.map