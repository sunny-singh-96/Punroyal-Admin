// lib/middleware/index.ts - Export all middleware utilities
export {
  validateToken,
  getAuthToken,
  isAuthenticated,
  logoutUser,
  redirectIfNotAuth,
  useAuthProtection,
  verifyTokenWithServer,
  isPublicRoute,
  ensureTokenExists,
} from './auth';
