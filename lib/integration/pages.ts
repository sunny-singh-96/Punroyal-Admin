import { http } from "./http";
import { ENDPOINTS } from "@/constants/endpoint";

export const aboutUsAPI = {
  get: async () => {
    return http.get(ENDPOINTS.ABOUT_US.GET);
  },
  update: async (data: FormData | any) => {
    return http.put(ENDPOINTS.ABOUT_US.UPDATE, data);
  },
  addTeamMember: async (data: FormData) => {
    return http.post(ENDPOINTS.ABOUT_US.ADD_TEAM, data);
  },
  updateTeamMember: async (id: string, data: FormData) => {
    return http.put(ENDPOINTS.ABOUT_US.UPDATE_TEAM(id), data);
  },
  deleteTeamMember: async (id: string) => {
    return http.delete(ENDPOINTS.ABOUT_US.DELETE_TEAM(id));
  },
};

export const contactUsAPI = {
  get: async () => {
    return http.get(ENDPOINTS.CONTACT_US.GET);
  },
  update: async (data: any) => {
    return http.put(ENDPOINTS.CONTACT_US.UPDATE, data);
  },
};

export const termsAPI = {
  get: async () => {
    return http.get(ENDPOINTS.TERMS.GET);
  },
  update: async (data: any) => {
    return http.put(ENDPOINTS.TERMS.UPDATE, data);
  },
  addSection: async (data: { title: string; content: string }) => {
    return http.post(ENDPOINTS.TERMS.ADD_SECTION, data);
  },
  updateSection: async (id: string, data: { title: string; content: string }) => {
    return http.put(ENDPOINTS.TERMS.UPDATE_SECTION(id), data);
  },
  deleteSection: async (id: string) => {
    return http.delete(ENDPOINTS.TERMS.DELETE_SECTION(id));
  },
};

export const privacyAPI = {
  get: async () => {
    return http.get(ENDPOINTS.PRIVACY.GET);
  },
  update: async (data: any) => {
    return http.put(ENDPOINTS.PRIVACY.UPDATE, data);
  },
  addSection: async (data: { title: string; content: string }) => {
    return http.post(ENDPOINTS.PRIVACY.ADD_SECTION, data);
  },
  updateSection: async (id: string, data: { title: string; content: string }) => {
    return http.put(ENDPOINTS.PRIVACY.UPDATE_SECTION(id), data);
  },
  deleteSection: async (id: string) => {
    return http.delete(ENDPOINTS.PRIVACY.DELETE_SECTION(id));
  },
};
