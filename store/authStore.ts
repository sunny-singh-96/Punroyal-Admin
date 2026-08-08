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

const IS_TEST_MODE = true;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,

      setAuth: (token, user) => {
        set({ token, user });

        storageUtils.setToken(token);
        storageUtils.setUser(user);

        // Set cookie for middleware
        if (typeof window !== 'undefined') {
          document.cookie = `auth-token=${token}; path=/; max-age=${60*60*24*7}`;
        }
      },

      logout: async () => {
        // try {
        //   await api.post('/auth/logout');
        // } catch (err) {
        //   console.error('Logout error:', err);
        // }

        set({ token: null, user: null });
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

        if (!validateToken()) {
          set({ isLoading: false });
          const path = typeof window !== 'undefined' ? window.location.pathname : '/';

          if (!publicRoutes.includes(path) && path !== '/') {
            await logoutUser();
          }
          return;
        }

        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          if (publicRoutes.includes(path) || path === '/') {
            set({ isLoading: false });
            return;
          }
        }

        set({ isLoading: true });

        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {

            set({
              user: res.data.user,
              token: get().token,
              isLoading: false
            });

            storageUtils.setUser(res.data.user);

          } else {
            set({ user: null, token: null, isLoading: false });
            await logoutUser();
          }

        } catch (err) {
          console.error("Failed to load user", err);
          set({ user: null, token: null, isLoading: false });
          await logoutUser();
        }
      },

      checkAuth: () => {
        if (IS_TEST_MODE) return !!get().user;
        return !!get().user && validateToken();
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
