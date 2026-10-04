import { http } from "./http";
import { ENDPOINTS } from "@/constants/endpoint";

export const globalSettingsAPI = {
  get: async () => {
    return http.get(ENDPOINTS.GLOBAL_SETTINGS.GET);
  },
  adminGet: async () => {
    return http.get(ENDPOINTS.GLOBAL_SETTINGS.ADMIN_GET);
  },
  update: async (data: FormData | any) => {
    return http.put(ENDPOINTS.GLOBAL_SETTINGS.UPDATE, data);
  },
};
