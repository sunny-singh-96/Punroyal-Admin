const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:3000/v1`;
    }
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return `${protocol}//${hostname}:3000/v1`;
    }
    return `https://api.punroyal.com/v1`;
  }
  return "http://127.0.0.1:3000/v1";
};

export const baseURL = getBaseURL();

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
        LIST: '/order/admin/true',
        VIEW: '/order/admin',
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
    },
    ENQUIRY: {
        LIST: '/enquiry/admin/list',
        STATS: '/enquiry/admin/stats',
        GET: '/enquiry/admin',
        UPDATE: '/enquiry/admin',
        DELETE: '/enquiry/admin'
    },
    NEWSLETTER: {
        LIST: '/newsletter/admin/list',
        STATS: '/newsletter/admin/stats',
        TOGGLE_STATUS: '/newsletter/admin',
        DELETE: '/newsletter/admin'
    },
    TESTIMONIAL: {
        LIST: '/testimonial/admin/testimonial/list',
        GET: '/testimonial/admin/testimonial',
        ADD: '/testimonial/admin/testimonial/add',
        UPDATE: '/testimonial/admin/testimonial/update',
        DELETE: '/testimonial/admin/testimonial/delete'
    },
    FAQ: {
        LIST: '/faq/admin/faq/list',
        GET: '/faq/admin/faq',
        ADD: '/faq/admin/faq/add',
        UPDATE: '/faq/admin/faq/update',
        DELETE: '/faq/admin/faq/delete'
    },
    ABOUT_US: {
        GET: '/about-us/admin/about-us',
        UPDATE: '/about-us/admin/about-us/update',
        ADD_TEAM: '/about-us/admin/about-us/team/add',
        UPDATE_TEAM: (id: string) => `/about-us/admin/about-us/team/${id}`,
        DELETE_TEAM: (id: string) => `/about-us/admin/about-us/team/${id}`,
    },
    CONTACT_US: {
        GET: '/contact-us/admin/contact-us',
        UPDATE: '/contact-us/admin/contact-us/update',
    },
    TERMS: {
        GET: '/terms/admin/terms',
        UPDATE: '/terms/admin/terms/update',
        ADD_SECTION: '/terms/admin/terms/section/add',
        UPDATE_SECTION: (id: string) => `/terms/admin/terms/section/${id}`,
        DELETE_SECTION: (id: string) => `/terms/admin/terms/section/${id}`,
    },
    PRIVACY: {
        GET: '/privacy/admin/privacy',
        UPDATE: '/privacy/admin/privacy/update',
        ADD_SECTION: '/privacy/admin/privacy/section/add',
        UPDATE_SECTION: (id: string) => `/privacy/admin/privacy/section/${id}`,
        DELETE_SECTION: (id: string) => `/privacy/admin/privacy/section/${id}`,
    }
};