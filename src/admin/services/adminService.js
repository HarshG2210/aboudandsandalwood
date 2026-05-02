import { adminRequest } from "./apiAdminRequest";

const getAdminRefresh = () => localStorage.getItem("admin_refresh");

export const adminService = {
  // ================= LOGIN =================
  login: (data) =>
    adminRequest("/auth/admin/login/", {
      method: "POST",
      body: data,
    }),

  // ================= LOGOUT =================
  logout: () =>
    adminRequest("/auth/admin/logout/", {
      method: "POST",
      body: {
        refresh: getAdminRefresh(),
      },
    }),
};
