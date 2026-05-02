import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adminService } from "../services/adminService";

// ================= THUNK =================
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminService.login(payload);

      // ✅ FIXED
      localStorage.setItem("admin_access", res.access);
      localStorage.setItem("admin_refresh", res.refresh);

      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Admin login failed"
      );
    }
  }
);

export const adminLogoutAsync = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminService.logout();

      // ✅ ONLY SUCCESS → CLEAR TOKENS
      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");

      return res;
    } catch (err) {
      // ❌ DO NOT CLEAR TOKENS HERE
      return rejectWithValue(err?.detail || "Logout failed");
    }
  }
);

// ================= SLICE =================
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdminAuth: !!localStorage.getItem("admin_access"),
    admin: null,

    loading: false,
    error: null,
  },

  reducers: {
    adminLogout: (state) => {
      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");

      state.isAdminAuth = false;
      state.admin = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(adminLogin.pending, (s) => {
        s.loading = true;
      })
      .addCase(adminLogin.fulfilled, (s, a) => {
        s.loading = false;
        s.isAdminAuth = true;
        s.admin = a.payload.user || null;
      })
      .addCase(adminLogin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // 🔥 LOGOUT
      .addCase(adminLogoutAsync.pending, (s) => {
        s.loading = true;
      })
      .addCase(adminLogoutAsync.fulfilled, (s) => {
        s.loading = false;
        s.isAdminAuth = false;
        s.admin = null;
      })
      .addCase(adminLogoutAsync.rejected, (s) => {
        s.loading = false;
        s.isAdminAuth = false;
        s.admin = null;
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export const selectAdminAuth = (s) => s.admin.isAdminAuth;

export default adminSlice.reducer;
