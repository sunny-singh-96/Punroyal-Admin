// store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/utils/api";
import { storageUtils } from "@/lib/storage";
import { validateToken, logoutUser } from "@/lib/middleware/auth";

interface AuthState {
  user: any;
  token: string | null;
  isLoading: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  checkAuth: () => boolean;
}

const publicRoutes = ['/'];

const IS_TEST_MODE = false;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,

      setAuth: (token, user) => {
        set({ token, user, isLoading: false });

        storageUtils.setToken(token);
        storageUtils.setUser(user);

        // Set cookie for middleware
        if (typeof window !== 'undefined') {
          document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
      },

      logout: async () => {
        set({ token: null, user: null, isLoading: false });
        await logoutUser();
      },

      loadUser: async () => {
        if (IS_TEST_MODE) {
          const storedUser = storageUtils.getUser();
          const storedToken = storageUtils.getToken();

          console.log("🧪 TEST MODE loadUser:", storedUser);

          if (storedUser) {
            set({
              user: storedUser,
              token: storedToken || "fake-token",
              isLoading: false,
            });
          } else {
            set({
              user: null,
              token: null,
              isLoading: false,
            });
          }

          return;
        }

        // 1. Retrieve stored token & user synchronously
        const storedToken = storageUtils.getToken() || get().token;
        const storedUser = storageUtils.getUser() || get().user;

        // 2. Keep the Next.js middleware cookie fresh
        if (storedToken && typeof window !== 'undefined') {
          document.cookie = `auth-token=${storedToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }

        // 3. If no token exists at all, handle public/protected redirect
        if (!storedToken) {
          set({ user: null, token: null, isLoading: false });
          const path = typeof window !== 'undefined' ? window.location.pathname : '/';

          if (!publicRoutes.includes(path) && path !== '/') {
            await logoutUser();
          }
          return;
        }

        // 4. Immediately initialize store with cached user & token
        // so ProtectedRoute / LayoutWrapper doesn't flash or falsely redirect on refresh!
        if (storedUser) {
          set({
            user: storedUser,
            token: storedToken,
            isLoading: false,
          });
        }

        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          if (publicRoutes.includes(path) || path === '/') {
            set({ isLoading: false });
            return;
          }
        }

        // 5. In background, refresh user profile from server
        try {
          const res = await api.get('/auth/get-profile');
          const isSuccess = res?.data?.code === 'OK' || res?.data?.success === true || (res?.status === 200 && res?.data?.data);
          const userData = res?.data?.data;

          if (isSuccess && userData) {
            const mergedUser = {
              ...(storedUser || {}),
              ...userData,
              role: userData.role || (storedUser && storedUser.role) || 'superadmin',
            };

            set({
              user: mergedUser,
              token: storedToken,
              isLoading: false,
            });

            storageUtils.setUser(mergedUser);
          } else {
            if (!storedUser) {
              set({ user: null, token: null, isLoading: false });
              await logoutUser();
            } else {
              set({ isLoading: false });
            }
          }

        } catch (err: any) {
          console.error("Failed to load user profile in background:", err);
          // Only log out if server returned 401 Unauthorized
          if (err?.response?.status === 401) {
            set({ user: null, token: null, isLoading: false });
            await logoutUser();
          } else {
            // Keep existing session active on temporary server/network glitches
            set({ isLoading: false });
          }
        }
      },

      checkAuth: () => {
        if (IS_TEST_MODE) return !!get().user;
        return (!!get().user || !!storageUtils.getUser()) && (!!get().token || storageUtils.hasToken());
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loadUser();
        }
      },
    }
  )
);
