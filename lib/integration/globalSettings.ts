import { http } from "./http";
import { ENDPOINTS } from "@/constants/endpoint";

export const globalSettingsAPI = {
  get: async () => {
    return http.get(ENDPOINTS.GLOBAL_SETTINGS.GET, undefined, false);
  },
  adminGet: async () => {
    return http.get(ENDPOINTS.GLOBAL_SETTINGS.ADMIN_GET);
  },
  update: async (data: FormData | Record<string, unknown>) => {
    return http.put(
      ENDPOINTS.GLOBAL_SETTINGS.UPDATE,
      data,
      data instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined
    );
  },
  testSmtp: async (data: Record<string, unknown>) => {
    return http.post(ENDPOINTS.GLOBAL_SETTINGS.TEST_SMTP, data);
  },
};
