import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authService } from "../../services/authService";

// ================== HELPERS ==================

const normalizeError = (err) => {
  if (typeof err === "string") return err;
  if (err?.message) return err.message;
  if (err?.detail) return err.detail;
  try {
    return JSON.stringify(err);
  } catch {
    return "Network error";
  }
};

const saveTokens = (access, refresh) => {
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
};

const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getToken = () => localStorage.getItem("access_token");
const getRefresh = () => localStorage.getItem("refresh_token");

// ================== STATE ==================

const initialState = {
  isAuthenticated: !!getToken(),
  accessToken: getToken() || null,
  refreshToken: getRefresh() || null,

  profile: null,
  orders: [],

  region: "IN",
  currency: "INR",

  signupEmail: null,
  forgotEmail: null,

  error: null,
  successMsg: null,

  loadingLogin: false,
  loadingSignup: false,
  loadingVerify: false,
  loadingResendOtp: false,
  loadingCompleteProfile: false,
  loadingForgot: false,
  loadingReset: false,
  loadingProfile: false,
  loadingLogout: false,
  loadingResendForgotOtp: false,
  loadingDelete: false,
};

// ================== THUNKS ==================

export const signup = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      await authService.signup(payload);
      return payload.email;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const verifySignup = createAsyncThunk(
  "user/verifySignup",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.verifySignup(payload);
      if (data.access) saveTokens(data.access, data.refresh);
      return data;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const resendSignupOtp = createAsyncThunk(
  "user/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.resendSignupOtp(payload);
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.login(payload);
      saveTokens(data.access, data.refresh);

      return data;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const completeProfile = createAsyncThunk(
  "user/completeProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.completeProfile(payload);
      return data;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getProfile();
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      clearTokens();
      return true;
    } catch (err) {
      clearTokens();
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(payload);
      return payload.email;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(payload);
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const resendForgotOtp = createAsyncThunk(
  "user/resendForgotOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.resendForgotOtp(payload);
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      await authService.deleteAccount();

      // clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return true;
    } catch (err) {
      return rejectWithValue(normalizeError(err));
    }
  }
);

// ================== SLICE ==================

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload.region;
      state.currency = action.payload.currency;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (s) => {
        s.loadingSignup = true;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.loadingSignup = false;
        s.signupEmail = a.payload;
      })
      .addCase(signup.rejected, (s, a) => {
        s.loadingSignup = false;
        s.error = a.payload;
      })

      // verify
      .addCase(verifySignup.pending, (s) => {
        s.loadingVerify = true;
      })
      .addCase(verifySignup.fulfilled, (s, a) => {
        s.loadingVerify = false;
        s.isAuthenticated = true;
        s.accessToken = a.payload.access;
        s.refreshToken = a.payload.refresh;
        s.profile = a.payload.user;
      })
      .addCase(verifySignup.rejected, (s) => {
        s.loadingVerify = false;
      })

      // resend signup otp
      .addCase(resendSignupOtp.pending, (s) => {
        s.loadingResendOtp = true;
      })
      .addCase(resendSignupOtp.fulfilled, (s) => {
        s.loadingResendOtp = false;
      })
      .addCase(resendSignupOtp.rejected, (s, a) => {
        s.loadingResendOtp = false;
        s.error = a.payload;
      })

      // login
      .addCase(login.pending, (s) => {
        s.loadingLogin = true;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loadingLogin = false;
        s.isAuthenticated = true;
        s.accessToken = a.payload.access;
        s.refreshToken = a.payload.refresh;
        s.profile = a.payload.user;
      })
      .addCase(login.rejected, (s, a) => {
        s.loadingLogin = false;
        s.error = a.payload;
      })

      // complete profile
      .addCase(completeProfile.pending, (s) => {
        s.loadingCompleteProfile = true;
      })
      .addCase(completeProfile.fulfilled, (s, a) => {
        s.loadingCompleteProfile = false;
        s.profile = a.payload.user || a.payload;
      })
      .addCase(completeProfile.rejected, (s, a) => {
        s.loadingCompleteProfile = false;
        s.error = a.payload;
      })

      // logout
      .addCase(logout.pending, (s) => {
        s.loadingLogout = true;
      })
      .addCase(logout.fulfilled, (s) => {
        s.loadingLogout = false;
        s.isAuthenticated = false;
        s.profile = null;
        s.accessToken = null;
        s.refreshToken = null;
      })
      .addCase(logout.rejected, (s) => {
        s.loadingLogout = false;
        s.isAuthenticated = false;
        s.profile = null;
        s.accessToken = null;
        s.refreshToken = null;
      })

      // profile
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.profile = a.payload;
      })

      // forgot password
      .addCase(forgotPassword.pending, (s) => {
        s.loadingForgot = true;
      })
      .addCase(forgotPassword.fulfilled, (s, a) => {
        s.loadingForgot = false;
        s.forgotEmail = a.payload;
      })
      .addCase(forgotPassword.rejected, (s, a) => {
        s.loadingForgot = false;
        s.error = a.payload;
      })

      // reset password
      .addCase(resetPassword.pending, (s) => {
        s.loadingReset = true;
      })
      .addCase(resetPassword.fulfilled, (s) => {
        s.loadingReset = false;
      })
      .addCase(resetPassword.rejected, (s, a) => {
        s.loadingReset = false;
        s.error = a.payload;
      })

      // resend forgot otp
      .addCase(resendForgotOtp.pending, (s) => {
        s.loadingResendForgotOtp = true;
      })
      .addCase(resendForgotOtp.fulfilled, (s) => {
        s.loadingResendForgotOtp = false;
      })
      .addCase(resendForgotOtp.rejected, (s, a) => {
        s.loadingResendForgotOtp = false;
        s.error = a.payload;
      })

      // delete account
      .addCase(deleteAccount.pending, (s) => {
        s.loadingDelete = true;
      })
      .addCase(deleteAccount.fulfilled, (s) => {
        s.loadingDelete = false;

        s.isAuthenticated = false;
        s.profile = null;
        s.accessToken = null;
        s.refreshToken = null;
      })
      .addCase(deleteAccount.rejected, (s, a) => {
        s.loadingDelete = false;
        s.error = a.payload;
      });
  },
});

// ================== EXPORTS ==================

export const { setRegion, addOrder, clearMessages } = userSlice.actions;

export const selectCurrency = (state) => state.user.currency;
export const selectRegion = (state) => state.user.region;
export const selectIsAuth = (state) => state.user.isAuthenticated;
export const selectProfile = (state) => state.user.profile;

export default userSlice.reducer;
