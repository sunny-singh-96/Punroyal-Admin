import axios from "axios";

const API = axios.create({
  baseURL: 'https://api.toddleandcare.com/api/',
  withCredentials: true,
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Clear stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      const currentPath = window.location.pathname;
      
      // Redirect to appropriate login page
      if (currentPath.startsWith('/admin')) {
        window.location.href = "/admin/login";
      } else {
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }
    return Promise.reject(err);
  }
);

export default API;