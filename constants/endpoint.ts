export const baseURL = "http://localhost:3000/v1";

export const ENDPOINTS = {
    LOGIN: "/auth/admin-login",
    LOGOUT: "/auth/logout",
    DASHBOARD: '/index/admin/dashboard/stats',
    COMMON: '/index/common',
    COMMON_HANDLER: '/index/common-handler',
    PRODUCT: {
        ADD: '/product/admin/product/add',
        UPDATE: '/product/admin/product/edit',
        VIEW: '/product/admin',
        LIST: '/product/admin/products',
        DELETE_COLOR_GROUP: '/product/admin/products',
        BULK_DELETE: '/product/admin/products/bulk-delete',
        BULK_UPDATE_STATUS: '/product/admin/products/bulk-update-status'
    },
    CATEGORY: {
        LIST: '/category/admin/category/list',
        GET: '/category/admin/category',
        ADD: '/category/admin/category/add',
        UPDATE: '/category/admin/category/update',
        DELETE: '/category/admin/category/delete'
    },
    BANNER: {
        LIST: '/banner/admin/banner/list',
        GET: '/banner/admin/banner',
        ADD: '/banner/admin/banner/add',
        UPDATE: '/banner/admin/banner/update',
        DELETE: '/banner/admin/banner/delete'
    },
    OCCASION: {
        LIST: '/occations/admin/list',
        ADD: '/occations/admin/occation/add',
        DELETE: '/occations/admin/occation/delete'
    },
    ORDERS: {
        LIST: '/order/admin/true/',
        VIEW: '/order/admin/',
        STATS: '/index/admin/dashboard/orders',
    },
    INVENTORY: {
        LIST: '/product/admin/inventory-products',
        STATS: '/index/admin/dashboard/inventory',
    },
    SALES: {
        MONTHLY_STATS: '/order/admin/stats/monthly-sales',
    },
    INFLUENCER: {
        LOGIN: '/auth/influencer-login',
        REGISTER: '/auth/influencer-register',
        DASHBOARD: '/influencer/dashboard',
        SALES: '/influencer/sales',
        UPLOAD_VIDEO: '/influencer/admin/upload-video'
    },
    FREELANCER: {
        ASSIGN: '/freelancer/assign',
        ASSIGNMENTS: '/freelancer/assignments',
        ASSIGNMENT_BY_ID: '/freelancer/assignment',
        LIST: '/freelancer/freelancers',
        PRODUCTS: '/freelancer/products',
        CALCULATE_COMMISSION: '/freelancer/calculate-commission',
        ORDERS: '/freelancer/orders',
        PAYMENTS: '/freelancer/payments',
        DASHBOARD: '/freelancer/dashboard'
    }
};