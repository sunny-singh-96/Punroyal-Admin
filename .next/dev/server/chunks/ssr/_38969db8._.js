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
"[project]/lib/integration/banners.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bannersAPI",
    ()=>bannersAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const bannersAPI = {
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${encodeURIComponent(lazyParams.search)}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.GET}/${id}`);
    },
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.ADD}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, {
            status
        });
    },
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.DELETE}/${id}`);
    }
};
}),
"[project]/lib/integration/inventory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inventoryAPI",
    ()=>inventoryAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
;
;
const inventoryAPI = {
    // Get inventory list
    async getAll (params) {
        const url = `/${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.LIST}?page=${params?.page || 1}&limit=${params?.limit || 10}&inventory_stock=${params?.inventory_stock || ''}&search=${params?.search || ''}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Get inventory status
    async getInventoryStats () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.STATS);
    }
};
}),
"[project]/lib/integration/reviews.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reviewsAPI",
    ()=>reviewsAPI
]);
// lib/integration/reviews.ts - Reviews API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
;
const reviewsAPI = {
    // Get all reviews
    async getAll (params) {
        const url = `/admin/reviews?${new URLSearchParams(params || {}).toString()}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Update review status
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].patch(`/admin/reviews/${id}/status`, {
            status
        });
    },
    // Update review
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].put(`/admin/reviews/${id}`, data);
    },
    // Delete review
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].delete(`/admin/reviews/${id}`);
    }
};
}),
"[project]/lib/integration/colors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorsAPI",
    ()=>colorsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const colorsAPI = {
    // Get all colors
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'colors',
            id
        });
    },
    // Create color
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'colors',
            id
        });
    }
};
}),
"[project]/lib/integration/models.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modelsAPI",
    ()=>modelsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const modelsAPI = {
    // Get all models
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'models',
            id
        });
    },
    // Create model
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'update',
            module: 'models',
            id,
            data
        });
    },
    // Create auth for model
    async createAuth (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].INFLUENCER.REGISTER, {
            name: data.name,
            email: `${data.username}@punroyal.com`,
            username: data.username,
            password: data.password || 'password123',
            role: 'influencer'
        });
    },
    // Delete model
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'models',
            id
        });
    }
};
}),
"[project]/lib/integration/sizes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sizesAPI",
    ()=>sizesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const sizesAPI = {
    // Get all sizes
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'sizes',
            id
        });
    },
    // Create size
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'sizes',
            data: {
                name: data.name
            }
        });
    },
    // Delete size
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'sizes',
            id
        });
    }
};
}),
"[project]/lib/integration/materials.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "materialsAPI",
    ()=>materialsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-ssr] (ecmascript)");
;
;
const materialsAPI = {
    // Get all materials
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'materials',
            id
        });
    },
    // Create material
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'materials',
            data: {
                name: data.name
            }
        });
    },
    // Delete material
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'materials',
            id
        });
    }
};
}),
"[project]/lib/integration/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// lib/integration/index.ts - Export all API integrations
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$banners$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/banners.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$inventory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/inventory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$reviews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/reviews.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$colors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/colors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/models.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$sizes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/sizes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$materials$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/materials.ts [app-ssr] (ecmascript)");
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
}),
"[project]/components/admin/select/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AsyncSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-select/dist/react-select.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
// ✅ debounce
function debounce(fn, delay) {
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>fn(...args), delay);
    };
}
function AsyncSelect({ className, value, onChange, placeholder = "Select", fetchOptions, mapOption, limit = 10 }) {
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🔍 Load options
    const loadOptions = async (inputValue = "", pageNo = 1)=>{
        try {
            setLoading(true);
            const res = await fetchOptions({
                page: pageNo,
                limit,
                search: inputValue
            });
            const newOptions = res?.data?.map((item)=>mapOption(item)) || [];
            if (pageNo === 1) {
                setOptions(newOptions);
            } else {
                setOptions((prev)=>[
                        ...prev,
                        ...newOptions
                    ]);
            }
            setHasMore(newOptions.length === limit);
        } catch (err) {
            console.error("Dropdown fetch error", err);
        } finally{
            setLoading(false);
        }
    };
    // 🔍 debounce search
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>debounce((value)=>{
            setSearch(value);
            setPage(1);
            loadOptions(value, 1);
        }, 400), []);
    // 📜 infinite scroll
    const handleScroll = ()=>{
        if (!hasMore || loading) return;
        setPage((prev)=>{
            const nextPage = prev + 1;
            loadOptions(search, nextPage);
            return nextPage;
        });
    };
    // ✅ initial load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadOptions("", 1);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
        className: className,
        options: options,
        placeholder: placeholder,
        value: options.find((opt)=>opt.value === value) || null,
        isLoading: loading,
        onInputChange: (val)=>{
            handleInputChange(val);
            return val;
        },
        onMenuScrollToBottom: handleScroll,
        onChange: (selected)=>onChange(selected?.value),
        menuPortalTarget: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
        styles: {
            menuPortal: (base)=>({
                    ...base,
                    zIndex: 9999
                })
        },
        noOptionsMessage: ()=>loading ? "Loading..." : "No results found"
    }, void 0, false, {
        fileName: "[project]/components/admin/select/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/admin/product/ColorVariantsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColorVariantsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-ssr] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-ssr] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ColorVariantsSection({ loading, colors, sizes, onChange, product_type, onValidationChange }) {
    const [colorGroups, setColorGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [primaryColorId, setPrimaryColorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // const [groupErrors, setGroupErrors] = useState<
    //   Record<number, ColorGroupError>
    // >({});
    const getImagesPayload = ()=>{
        return colorGroups.map((group)=>({
                color_id: group.color_id,
                files: group.media_gallery.map((m)=>({
                        file: m.file,
                        role: m.role,
                        is_primary: m.is_primary,
                        sort_order: m.sort_order
                    }))
            }));
    };
    const getVariantsPayload = ()=>{
        const variants = [];
        colorGroups.forEach((group)=>{
            group.sizes.forEach((size)=>{
                if (size.size_id) {
                    variants.push({
                        color_id: group.color_id,
                        size_id: size.size_id,
                        quantity: size.stock
                    });
                }
            });
        });
        return variants;
    };
    // Add this function before useEffect
    const validateGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const newErrors = {};
        let isValid = true;
        colorGroups.forEach((group, gIdx)=>{
            const err = {};
            if (!group.color_id) {
                err.color_id = "Please select a color";
                isValid = false;
            }
            if (group.media_gallery.length < 1) {
                err.images = "At least 1 image is required";
                isValid = false;
            }
            if (product_type === "sizes") {
                const hasInvalidSize = group.sizes.some((s)=>!s.size_id || s.stock < 0);
                if (hasInvalidSize) {
                    err.sizes = "Each size must be selected with valid stock quantity (0 or more)";
                    isValid = false;
                }
            }
            if (Object.keys(err).length > 0) newErrors[gIdx] = err;
        });
        return {
            isValid,
            errors: newErrors
        };
    }, [
        colorGroups,
        product_type
    ]);
    // Effect 1: only call onChange/onValidationChange (no setState)
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>validateGroups(), [
        validateGroups
    ]);
    const groupErrors = validation.errors;
    const isValid = validation.isValid;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onValidationChange?.(isValid);
        onChange({
            primaryColorId: primaryColorId ? String(primaryColorId) : null,
            images: getImagesPayload(),
            variants: getVariantsPayload()
        });
    }, [
        colorGroups,
        primaryColorId,
        isValid
    ]);
    // Effect 2: update groupErrors separately
    // useEffect(() => {
    //   const { errors } = validateGroups();
    //   setGroupErrors(errors);
    // }, [colorGroups]);
    // ---------------- ADD COLOR ----------------
    const addColorVariant = ()=>{
        if (colorGroups.length >= colors.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("No more colors available to add");
            return;
        }
        const id = Date.now();
        setColorGroups((prev)=>[
                ...prev,
                {
                    id,
                    color_id: "",
                    media_gallery: [],
                    sizes: [
                        {
                            id: id + 1,
                            size_id: "",
                            stock: 0,
                            sku: ""
                        }
                    ]
                }
            ]);
    };
    const removeColorVariant = (id)=>{
        const updated = colorGroups.filter((g)=>g.id !== id);
        setColorGroups(updated);
        if (primaryColorId == colorGroups.find((g)=>g.id === id)?.color_id) {
            setPrimaryColorId(updated.length ? updated[0].color_id : null);
        }
    };
    // ---------------- SIZE ----------------
    const addSizeToGroup = (gIdx)=>{
        const currentSizes = colorGroups[gIdx].sizes;
        console.log("Current sizes for group", gIdx, currentSizes);
        if (currentSizes.length >= sizes.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("No more sizes available to add for this color");
            return;
        }
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes.push({
            id: Date.now(),
            size_id: "",
            stock: 0,
            sku: ""
        });
        setColorGroups(updated);
    };
    const updateSizeField = (gIdx, sIdx, field, value)=>{
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes[sIdx][field] = value;
        setColorGroups(updated);
    };
    // Update handleStockChange to allow any positive stock
    const handleStockChange = (gIdx, sIdx, value)=>{
        if (/^\d*$/.test(value)) {
            const num = Number(value);
            const clamped = value === "" ? 0 : Math.max(num, 0);
            updateSizeField(gIdx, sIdx, "stock", clamped);
        }
    };
    const removeSize = (gIdx, sIdx)=>{
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes.splice(sIdx, 1);
        setColorGroups(updated);
    };
    // ---------- Helper Functions (typed) ----------
    const compressImage = (file, maxSizeMB = 10)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event)=>{
                const img = new window.Image();
                img.src = event.target?.result;
                img.onload = ()=>{
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;
                    const maxDimension = 1600;
                    if (width > maxDimension || height > maxDimension) {
                        if (width > height) {
                            height = Math.round(height * maxDimension / width);
                            width = maxDimension;
                        } else {
                            width = Math.round(width * maxDimension / height);
                            height = maxDimension;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return resolve(file);
                    ctx.drawImage(img, 0, 0, width, height);
                    // Fast & efficient JPEG output for e-commerce products
                    const baseName = file.name.replace(/\.[^/.]+$/, "");
                    const newFileName = `${baseName}.jpg`;
                    canvas.toBlob((blob)=>{
                        if (!blob) return resolve(file);
                        resolve(new File([
                            blob
                        ], newFileName, {
                            type: "image/jpeg",
                            lastModified: Date.now()
                        }));
                    }, "image/jpeg", 0.82);
                };
                img.onerror = ()=>resolve(file);
                reader.onerror = ()=>resolve(file);
            };
        });
    };
    // ---------------- IMAGE ----------------
    const handleImageUpload = async (gIdx, role, files)=>{
        if (!files?.length) return;
        const file = files[0];
        if (file.size > 25 * 1024 * 1024) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("File size should not exceed 25MB");
            return;
        }
        let finalFile = file;
        // Fast client-side compression to make upload blazing fast
        if (file.type.startsWith("image/") && file.size > 150 * 1024) {
            try {
                finalFile = await compressImage(file);
            } catch  {
                finalFile = file;
            }
        }
        const preview = URL.createObjectURL(finalFile);
        setColorGroups((prev)=>{
            const updated = [
                ...prev
            ];
            const index = updated[gIdx].media_gallery.findIndex((m)=>m.role === role);
            const newMedia = {
                file: finalFile,
                preview,
                role,
                is_primary: updated[gIdx].media_gallery.length === 0 || role === "Front" ? 1 : 0,
                sort_order: updated[gIdx].media_gallery.length
            };
            if (index !== -1) {
                updated[gIdx].media_gallery[index] = newMedia;
            } else {
                updated[gIdx].media_gallery.push(newMedia);
            }
            return updated;
        });
    };
    const setAsPrimaryImage = (gIdx, idx)=>{
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].media_gallery.forEach((m, i)=>{
            m.is_primary = i === idx ? 1 : 0;
        });
        setColorGroups(updated);
    };
    const removeImage = (gIdx, idx)=>{
        setColorGroups((prev)=>{
            const updated = [
                ...prev
            ];
            const media = updated[gIdx].media_gallery[idx];
            if (media?.preview) {
                URL.revokeObjectURL(media.preview); // ✅ prevent memory leak
            }
            updated[gIdx].media_gallery.splice(idx, 1);
            return updated;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-indigo-600 p-3 rounded-2xl text-white shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl md:text-3xl font-black text-slate-800",
                                        children: "Create Product"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm",
                                        children: "Add a new product to your catalog"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: loading,
                        onClick: addColorVariant,
                        className: "w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            " Add Color Variant"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            colorGroups.map((group, gIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `bg-white rounded-3xl shadow-sm border-2 transition-all overflow-hidden ${primaryColorId === group.color_id ? "border-indigo-600 shadow-xl scale-[1.01]" : "border-slate-200"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-900 p-4 md:p-6 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            disabled: loading,
                                            value: group.color_id,
                                            onChange: (e)=>{
                                                const updated = [
                                                    ...colorGroups
                                                ];
                                                updated[gIdx].color_id = e.target.value;
                                                setColorGroups(updated);
                                            },
                                            className: "bg-slate-800 text-white px-5 py-2.5 rounded-xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Color"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 17
                                                }, this),
                                                colors.filter((c)=>!colorGroups.some((g, i)=>i !== gIdx && g.color_id === c.id)).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: c.id,
                                                        children: c.name
                                                    }, c.id, false, {
                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 422,
                                            columnNumber: 15
                                        }, this),
                                        groupErrors[gIdx]?.color_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs ml-2",
                                            children: groupErrors[gIdx].color_id
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 447,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: !group.color_id,
                                            onClick: ()=>setPrimaryColorId(group.color_id),
                                            className: `px-4 py-2 rounded-xl text-xs font-bold ${primaryColorId === group.color_id ? "bg-green-600 text-white" : "bg-indigo-600 text-white"}`,
                                            children: "Default"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, this),
                                !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeColorVariant(group.id),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                        lineNumber: 466,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-black uppercase text-slate-400 mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this),
                                                " Product Images"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3",
                                            children: [
                                                "Front",
                                                "Back",
                                                "Side",
                                                "Detail"
                                            ].map((role)=>{
                                                const mediaIndex = group.media_gallery.findIndex((m)=>m.role === role);
                                                const media = mediaIndex !== -1 ? group.media_gallery[mediaIndex] : null;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center",
                                                            children: media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: media.preview || "/no-image.png",
                                                                        alt: "Product Image",
                                                                        width: 80,
                                                                        height: 80,
                                                                        className: "w-full h-full object-cover rounded-xl"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute top-1 left-1 bg-slate-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center",
                                                                        children: media.sort_order
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setAsPrimaryImage(gIdx, mediaIndex),
                                                                        className: "absolute bottom-1 left-1 bg-yellow-400 p-1 rounded-full",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                            lineNumber: 509,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 503,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeImage(gIdx, mediaIndex),
                                                                        className: "absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                            lineNumber: 516,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {}, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 523,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        disabled: loading,
                                                                        className: "absolute inset-0 opacity-0",
                                                                        onChange: (e)=>e.target.files && handleImageUpload(gIdx, role, e.target.files),
                                                                        accept: "image/png, image/jpeg, image/jpg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 524,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] text-center mt-1 uppercase",
                                                            children: role
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, role, true, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        groupErrors[gIdx]?.images && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-2 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                groupErrors[gIdx].images
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 545,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                    lineNumber: 474,
                                    columnNumber: 13
                                }, this),
                                product_type && product_type == "sizes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-xs font-black text-slate-600 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                            lineNumber: 558,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Sizes & Stock"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 557,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addSizeToGroup(gIdx),
                                                    className: "text-[10px] bg-white px-3 py-1.5 rounded-xl border font-bold text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm",
                                                    children: "+ Add Size"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 556,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-slate-400 mb-3",
                                            children: "SKU auto-generates when Brand, Category Code, Product Code, Color, and Size are selected"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 570,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 max-h-96 overflow-y-auto pr-1",
                                            children: [
                                                group.sizes.map((size, sIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col sm:flex-row gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        disabled: loading,
                                                                        value: size.size_id,
                                                                        onChange: (e)=>updateSizeField(gIdx, sIdx, "size_id", e.target.value),
                                                                        className: "flex-1 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                children: "Select Size"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                                lineNumber: 597,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            sizes.filter((sz)=>!group.sizes.some((s, i)=>i !== sIdx && s.size_id === sz.id)).map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: sz.id,
                                                                                    children: sz.name
                                                                                }, sz.id, false, {
                                                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                                    lineNumber: 606,
                                                                                    columnNumber: 31
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 584,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        placeholder: "Stock",
                                                                        value: size.stock || "",
                                                                        readOnly: loading,
                                                                        onChange: (e)=>handleStockChange(gIdx, sIdx, e.target.value),
                                                                        className: "w-full sm:w-24 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 613,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeSize(gIdx, sIdx),
                                                                        className: "text-slate-400 hover:text-red-500 p-2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                            lineNumber: 632,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 23
                                                            }, this),
                                                            size.sku && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 p-2 bg-indigo-50 rounded-lg border border-indigo-100",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-mono text-indigo-700 font-bold break-all",
                                                                    children: [
                                                                        "🔑 SKU: ",
                                                                        size.sku
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                    lineNumber: 640,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                                lineNumber: 639,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, size.id, true, {
                                                        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 21
                                                    }, this)),
                                                groupErrors[gIdx]?.sizes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-500 text-xs mt-2 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                            lineNumber: 649,
                                                            columnNumber: 23
                                                        }, this),
                                                        " ",
                                                        groupErrors[gIdx].sizes
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                            lineNumber: 576,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                                    lineNumber: 554,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this)
                    ]
                }, group.id, true, {
                    fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/product/ColorVariantsSection.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/helpers/handlers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getErrorMessage",
    ()=>getErrorMessage
]);
const getErrorMessage = (error)=>{
    const err = error;
    return err.response?.data?.error || err.message || "An error occurred";
};
}),
"[project]/validations/product.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productValidate",
    ()=>productValidate
]);
const productValidate = (form, setErrors)=>{
    const newErrors = {};
    // -------- BASIC --------
    if (!form.title.trim()) {
        newErrors.title = "Product title is required";
    }
    if (!form.product_type) {
        newErrors.product_type = "Product type is required";
    }
    if (!form.price || form.price <= 0) {
        newErrors.price = "Price must be greater than 0";
    }
    if (!form.display_price || form.display_price <= 0) {
        newErrors.display_price = "Display price must be greater than 0";
    }
    if (!form.cat_id) {
        newErrors.cat_id = "Category is required";
    }
    if (!form.description.trim()) {
        newErrors.description = "Description is required";
    }
    if (!form.specifications.trim()) {
        newErrors.specifications = "Specifications are required";
    }
    if (form.video_link && !form.video_link.startsWith("http")) {
        newErrors.video_link = "Video link must be a valid URL";
    }
    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
};
}),
"[project]/app/products/create/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/integration/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/select/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$product$2f$ColorVariantsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/product/ColorVariantsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/helpers/handlers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$product$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/validations/product.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-ssr] (ecmascript)");
;
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
;
// Lazy-load heavy components for faster page load
const RichTextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/RichTextEditor.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-slate-200 rounded-xl bg-slate-50 p-4 min-h-[150px] animate-pulse"
        }, void 0, false, {
            fileName: "[project]/app/products/create/page.tsx",
            lineNumber: 17,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0))
});
function CreateProductPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [colorVariantsValid, setColorVariantsValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [redirectTo, setRedirectTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [common, setCommon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        models: [],
        materials: [],
        sizes: [],
        colors: []
    });
    const [variantData, setVariantData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        primaryColorId: null,
        images: [],
        variants: []
    });
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        display_price: 0,
        price: 0,
        quantity: 0,
        product_type: "no_sizes",
        description: "",
        specifications: "",
        cat_id: "",
        status: true,
        video: [],
        video_link: "",
        primaryColorId: null,
        isPrimary: false,
        model_id: "",
        weight: 0,
        height: 0,
        breadth: 0,
        length: 0,
        commission: 0,
        commission_type: "percentage",
        type: 1,
        metarial: [],
        variants: [],
        media: []
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const fetchCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commonAPI"].getAll();
            if (response?.data?.code === "OK") {
                setCommon(response?.data?.data || []);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessage"])(error));
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageUtils"].getUser();
        if (user?.role === "influencer") {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Access restricted: Influencers can only view product details.");
            router.replace("/influencer/products");
            return;
        }
        fetchCommon();
    }, [
        fetchCommon,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (redirectTo) {
            if (redirectTo) router.push(redirectTo);
        }
    }, [
        redirectTo,
        router
    ]);
    const toFormData = (data)=>{
        const formData = new FormData();
        const scalarFields = [
            "title",
            "display_price",
            "price",
            "quantity",
            "product_type",
            "description",
            "specifications",
            "cat_id",
            "status",
            "video_link",
            "primaryColorId",
            "isPrimary",
            "model_id",
            "influencer_id",
            "weight",
            "height",
            "breadth",
            "length",
            "commission",
            "commission_type",
            "type"
        ];
        scalarFields.forEach((key)=>{
            const value = data[key];
            if (value === null || value === undefined) return;
            formData.append(key, String(value));
        });
        const finalInfluencer = data.influencer_id || data.model_id || "";
        if (finalInfluencer) {
            formData.set("influencer_id", finalInfluencer);
            formData.set("model_id", finalInfluencer);
        }
        formData.set("commission", String(data.commission !== undefined && data.commission !== null ? data.commission : 0));
        const commType = data.commission_type || "percentage";
        formData.set("commission_type", commType);
        formData.set("commission_Type", commType);
        if (data.video && data.video.length > 0) {
            formData.append("video", data.video[0]); // multer field: { name: 'video', maxCount: 1 }
        }
        data.variants.forEach((variant, index)=>{
            formData.append(`variants[${index}]`, JSON.stringify(variant));
        });
        data.metarial.forEach((mat, index)=>{
            formData.append(`metarial[${index}]`, JSON.stringify(mat));
        });
        let globalFileIndex = 0;
        data.media.forEach((mediaItem, mediaIndex)=>{
            formData.append(`media[${mediaIndex}][color_id]`, mediaItem.color_id);
            mediaItem.files?.forEach((fileItem, fileIndex)=>{
                const fileKey = `file_${mediaIndex}_${fileIndex}`;
                const ext = fileItem.file.name.split(".").pop();
                const name = fileItem.file.name.split(".").slice(0, -1).join(".");
                const newFileName = `${fileKey}_${name}.${ext}`;
                formData.append("files", fileItem.file, newFileName);
                formData.append(`media[${mediaIndex}][files][${fileIndex}][file_ref]`, fileKey);
                formData.append(`media[${mediaIndex}][files][${fileIndex}][is_primary]`, String(fileItem.is_primary));
                formData.append(`media[${mediaIndex}][files][${fileIndex}][role]`, fileItem.role);
                formData.append(`media[${mediaIndex}][files][${fileIndex}][sort_order]`, String(fileItem.sort_order ?? fileIndex + 1));
                globalFileIndex++;
            });
        });
        return formData;
    };
    // Handle Submit
    const handleSubmit = async ()=>{
        setLoading(true);
        const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].loading("Creating...");
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$product$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productValidate"])(form, setErrors)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Please fix the errors in the form", {
                    id: toastId
                });
                return;
            }
            if (!colorVariantsValid) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Please fix color variant errors (color, at least 1 image, valid sizes & stock)", {
                    id: toastId
                });
                return;
            }
            form.media = variantData.images.map((img)=>({
                    color_id: img.color_id,
                    files: img.files.filter((f)=>!!f.file).map((f)=>({
                            file: f.file,
                            is_primary: f.is_primary,
                            role: f.role,
                            sort_order: f.sort_order
                        }))
                }));
            form.primaryColorId = variantData.primaryColorId;
            form.isPrimary = true;
            if (form.product_type === "sizes") {
                form.variants = variantData.variants;
            }
            const formData = toFormData(form);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsAPI"].create(formData);
            if (response?.data?.code === "OK") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success(`Product created successfully!`, {
                    id: toastId
                });
                setRedirectTo("/products");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessage"])(error), {
                id: toastId
            });
        } finally{
            setLoading(false);
        }
    };
    // ---------- Handlers (typed) ----------
    const handleDescriptionChange = (value)=>{
        setForm((prev)=>({
                ...prev,
                description: value
            }));
        if (errors.description) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs.description;
                return newErrs;
            });
        }
    };
    const handleSpecificationsChange = (value)=>{
        setForm((prev)=>({
                ...prev,
                specifications: value
            }));
        if (errors.specifications) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs.specifications;
                return newErrs;
            });
        }
    };
    const handleFieldChange = (field, value)=>{
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        const errorKey = field;
        if (errors[errorKey]) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs[errorKey];
                return newErrs;
            });
        }
    };
    const handleNumberChange = (field, value)=>{
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            handleFieldChange(field, Number(value));
        }
    };
    const hasError = (field)=>!!errors[field];
    const handleError = (field)=>{
        return errors[field] || "";
    };
    const mappedColors = common.colors.map((c)=>({
            id: c._id,
            name: c.name,
            hex: c.hex
        }));
    const mappedSizes = common.sizes.map((s)=>({
            id: s._id,
            name: s.name
        }));
    // ---------- Render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F1F5F9] p-4 md:p-6 pb-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$product$2f$ColorVariantsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    loading: loading,
                    product_type: form.product_type,
                    colors: mappedColors,
                    sizes: mappedSizes,
                    onChange: setVariantData,
                    onValidationChange: setColorVariantsValid
                }, void 0, false, {
                    fileName: "[project]/app/products/create/page.tsx",
                    lineNumber: 395,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Basic Information"
                        }, void 0, false, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 406,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Product Name ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 411,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.title,
                                            onChange: (e)=>handleFieldChange("title", e.target.value),
                                            placeholder: "e.g. Product Name",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("title") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this),
                                        hasError("title") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                handleError("title")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 422,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Product Type",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.product_type,
                                            onChange: (e)=>handleFieldChange("product_type", e.target.value),
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "sizes",
                                                    children: "Readymade"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "no_sizes",
                                                    children: "Unstitched"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        hasError("product_type") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("product_type")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                form.product_type && form.product_type == "no_sizes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Quantity ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            min: 10,
                                            max: 50,
                                            value: form.quantity,
                                            onChange: (e)=>handleFieldChange("quantity", Number(e.target.value)),
                                            placeholder: "e.g. Product Quantity",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("quantity") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17
                                        }, this),
                                        hasError("quantity") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                handleError("quantity")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 469,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 452,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Category",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$select$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            className: `w-full px-1 py-1 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                            value: form.cat_id,
                                            onChange: (val)=>setForm({
                                                    ...form,
                                                    cat_id: val
                                                }),
                                            placeholder: "Select Category",
                                            limit: 10,
                                            fetchOptions: ({ page, limit, search })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoriesAPI"].getAll({
                                                    page,
                                                    limit,
                                                    search
                                                }),
                                            mapOption: (item)=>({
                                                    label: item.title,
                                                    value: item._id
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        hasError("cat_id") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("cat_id")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 494,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block mb-2 text-sm font-semibold text-slate-700",
                                                    children: "Upload files (Videos)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "video/mp4",
                                                    onChange: (e)=>{
                                                        const selected = Array.from(e.target.files || []);
                                                        //❗check each file size
                                                        const oversized = selected.find((file)=>file.size > 5 * 1024 * 1024);
                                                        if (oversized) {
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Video must be under 5MB");
                                                            e.target.value = "";
                                                            return;
                                                        }
                                                        handleFieldChange("video", selected);
                                                    },
                                                    className: "block w-full text-sm text-slate-600 file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 cursor-pointer border border-slate-300 rounded-lg p-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 15
                                        }, this),
                                        hasError("video") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("video")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 497,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Video (Redirect Link)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 529,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.video_link,
                                            onChange: (e)=>handleFieldChange("video_link", e.target.value),
                                            placeholder: "e.g., Organic Cotton Bodysuit",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("video_link") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this),
                                        hasError("video_link") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("video_link")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 542,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 528,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Influencer"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 548,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.model_id || form.influencer_id || "",
                                            onChange: (e)=>{
                                                const val = e.target.value;
                                                setForm((prev)=>({
                                                        ...prev,
                                                        model_id: val,
                                                        influencer_id: val
                                                    }));
                                            },
                                            className: "w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-indigo-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Influencer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 17
                                                }, this),
                                                common?.models?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: item._id,
                                                        children: item.name
                                                    }, item._id, false, {
                                                        fileName: "[project]/app/products/create/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 551,
                                            columnNumber: 15
                                        }, this),
                                        hasError("model_id") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("model_id")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 571,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 547,
                                    columnNumber: 13
                                }, this),
                                (form.model_id || form.influencer_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/60 rounded-2xl border border-purple-100 col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1",
                                                    children: "Commission Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 0,
                                                    step: "any",
                                                    value: form.commission !== undefined && form.commission !== null ? form.commission === 0 ? "" : form.commission : "",
                                                    onChange: (e)=>handleFieldChange("commission", e.target.value === "" ? 0 : Number(e.target.value)),
                                                    placeholder: form.commission_type === 'flat' ? 'e.g. 150 (Flat ₹)' : 'e.g. 10 (10%)',
                                                    className: "w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-purple-600 mt-1",
                                                    children: form.commission_type === 'flat' ? 'Flat commission amount in ₹ per item' : 'Commission percentage (%) of product price'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 580,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1",
                                                    children: "Commission Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: form.commission_type || "percentage",
                                                    onChange: (e)=>handleFieldChange("commission_type", e.target.value),
                                                    className: "w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "percentage",
                                                            children: "Percentage (%)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/create/page.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "flat",
                                                            children: "Flat Amount (₹)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/create/page.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 602,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 579,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Fabric"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 623,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: form.metarial[0]?.id || "",
                                                onChange: (e)=>handleFieldChange("metarial", [
                                                        {
                                                            id: e.target.value
                                                        }
                                                    ]),
                                                className: `flex-1 px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("metarial") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/create/page.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this),
                                                    common?.materials?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: item._id,
                                                            children: item.name
                                                        }, item._id, false, {
                                                            fileName: "[project]/app/products/create/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/create/page.tsx",
                                                lineNumber: 627,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this),
                                        hasError("metarial") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("metarial")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 650,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 656,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                                            value: form.description,
                                            onChange: handleDescriptionChange,
                                            placeholder: "Product description (supports bold, lists, headings...)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 15
                                        }, this),
                                        hasError("description") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-1",
                                            children: handleError("description")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 665,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 655,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "specifications"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                                            value: form.specifications,
                                            onChange: handleSpecificationsChange,
                                            placeholder: "Product description (supports bold, lists, headings...)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this),
                                        hasError("specifications") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-1",
                                            children: handleError("specifications")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/create/page.tsx",
                    lineNumber: 405,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Dimensions"
                        }, void 0, false, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 690,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Weight (kg) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 695,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.weight,
                                            onChange: (e)=>handleNumberChange("weight", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("weight") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 698,
                                            columnNumber: 15
                                        }, this),
                                        hasError("weight") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("weight")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Height (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 715,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.height,
                                            onChange: (e)=>handleNumberChange("height", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("height") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 718,
                                            columnNumber: 15
                                        }, this),
                                        hasError("height") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("height")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 714,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Breadth (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 731,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.breadth,
                                            onChange: (e)=>handleNumberChange("breadth", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("breadth") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 734,
                                            columnNumber: 15
                                        }, this),
                                        hasError("breadth") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("breadth")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 743,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 730,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Length (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 747,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.length,
                                            onChange: (e)=>handleNumberChange("length", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("length") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 750,
                                            columnNumber: 15
                                        }, this),
                                        hasError("length") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("length")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 759,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 746,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 693,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/create/page.tsx",
                    lineNumber: 689,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Pricing"
                        }, void 0, false, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 767,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Base Price ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 772,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.display_price,
                                            onChange: (e)=>handleNumberChange("display_price", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("display_price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, this),
                                        hasError("display_price") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("display_price")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 786,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 771,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "MRP (₹) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/create/page.tsx",
                                                    lineNumber: 793,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 792,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.price,
                                            onChange: (e)=>handleNumberChange("price", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 795,
                                            columnNumber: 15
                                        }, this),
                                        hasError("price") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("price")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/create/page.tsx",
                                            lineNumber: 804,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/create/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/create/page.tsx",
                            lineNumber: 770,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/create/page.tsx",
                    lineNumber: 766,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center pt-8 pb-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: loading,
                        onClick: handleSubmit,
                        className: "w-full max-w-md bg-indigo-600 text-white py-5 rounded-full font-black uppercase text-sm tracking-wider shadow-xl hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3",
                        children: [
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "animate-spin",
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/products/create/page.tsx",
                                lineNumber: 818,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/products/create/page.tsx",
                                lineNumber: 820,
                                columnNumber: 15
                            }, this),
                            loading ? "Creating..." : "Create Product"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/products/create/page.tsx",
                        lineNumber: 812,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/products/create/page.tsx",
                    lineNumber: 811,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/products/create/page.tsx",
            lineNumber: 393,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/products/create/page.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_38969db8._.js.map