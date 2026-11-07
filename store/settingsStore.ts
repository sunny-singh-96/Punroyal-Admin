"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { globalSettingsAPI } from "@/lib/integration/globalSettings";

interface SettingsState {
  headerLogo: string;
  footerLogo: string;
  favicon: string;
  brandName: string;
  appName: string;
  isLoaded: boolean;
  fetchSettings: () => Promise<void>;
  updateSettingsCache: (data: Partial<SettingsState>) => void;
}

export function updateDocumentFavicon(url?: string) {
  if (!url || typeof document === "undefined") return;
  const rels = ["icon", "shortcut icon", "apple-touch-icon"];
  rels.forEach((rel) => {
    let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = url;
  });
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      headerLogo: "",
      footerLogo: "",
      favicon: "",
      brandName: "Punroyal",
      appName: "Punroyal Enterprise",
      isLoaded: false,

      fetchSettings: async () => {
        try {
          const res: any = await globalSettingsAPI.get();
          const data = res?.data?.globalSettings || res?.data || {};
          const headerLogo = data.header_logo || "";
          const footerLogo = data.footer_logo || "";
          const favicon = data.favicon || "";
          const brandName = data.brand_name || data.app_name || "Punroyal";
          const appName = data.app_name || "Punroyal Enterprise";

          set({
            headerLogo,
            footerLogo,
            favicon,
            brandName,
            appName,
            isLoaded: true,
          });

          if (favicon) {
            updateDocumentFavicon(favicon);
          }
        } catch (err) {
          console.warn("Failed to fetch global settings:", err);
        }
      },

      updateSettingsCache: (data) => {
        set((state) => ({ ...state, ...data }));
        if (data.favicon) {
          updateDocumentFavicon(data.favicon);
        }
      },
    }),
    {
      name: "punroyal_global_settings_cache",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
    }
  )
);
