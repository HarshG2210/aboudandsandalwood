import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ================= TOKEN HELPERS =================

const getAccess = () => localStorage.getItem("access_token");

const getRefresh = () => localStorage.getItem("refresh_token");

const setAccess = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
  }
};

const setRefresh = (token) => {
  if (token) {
    localStorage.setItem("refresh_token", token);
  }
};

const setTokens = (access, refresh) => {
  setAccess(access);

  if (refresh) {
    setRefresh(refresh);
  }
};

const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// ================= REFRESH CONTROL =================

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ================= CORE REQUEST FUNCTION =================

export async function request(endpoint, options = {}) {
  const makeRequest = async (tokenOverride = null) => {
    const headers = {
      // Don't set content type for FormData
      ...(options.body instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),

      // Authorization
      ...(tokenOverride || getAccess()
        ? {
            Authorization: `Bearer ${
              tokenOverride || getAccess()
            }`,
          }
        : {}),

      ...options.headers,
    };

    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,

      body:
        options.body instanceof FormData
          ? options.body
          : options.body
          ? JSON.stringify(options.body)
          : undefined,
    });
  };

  try {
    let res = await makeRequest();

    let data;

    try {
      data = await res.json();
    } catch {
      data = {
        detail: "Invalid response from server",
      };
    }

    // ================= 401 - TOKEN EXPIRED =================

    if (res.status === 401) {
      // No refresh token
      // Just clear tokens
      // DON'T redirect

      if (!getRefresh()) {
        clearTokens();

        return Promise.reject(data);
      }

      // If already refreshing
      // Queue requests

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: async (newToken) => {
              try {
                const retryRes = await makeRequest(newToken);

                const retryData = await retryRes
                  .json()
                  .catch(() => ({}));

                resolve(retryData);
              } catch (err) {
                reject(err);
              }
            },

            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await fetch(
          `${BASE_URL}/auth/refresh/`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              refresh: getRefresh(),
            }),
          }
        );

        const refreshData = await refreshRes.json();

        if (!refreshRes.ok) {
          throw refreshData;
        }

        setTokens(
          refreshData.access,
          refreshData.refresh || getRefresh()
        );

        processQueue(null, refreshData.access);

        isRefreshing = false;

        // Retry original request

        const retryRes = await makeRequest(
          refreshData.access
        );

        const retryData = await retryRes
          .json()
          .catch(() => ({}));

        return retryData;
      } catch (refreshError) {
        processQueue(refreshError);

        isRefreshing = false;

        clearTokens();

        // DON'T redirect
        // Just reject

        return Promise.reject(refreshError);
      }
    }

    // ================= HANDLE ERRORS =================

    if (!res.ok) {
      let message =
        data?.detail || "Something went wrong ❌";

      if (
        typeof data === "object" &&
        data !== null
      ) {
        const key = Object.keys(data)[0];

        message = Array.isArray(data[key])
          ? data[key][0]
          : data[key] || message;
      }

      toast.error(message);

      return Promise.reject(data);
    }

    // ================= SUCCESS TOASTS =================

    const successMap = {
      signup: "OTP sent ✨",

      "verify-signup": "Verified ✅",

      "resend-signup-otp": "OTP resent ✨",

      login: "Login successful 🎉",

      "complete-profile": "Profile updated ✅",

      logout: "Logged out 👋",

      "forgot-password": "OTP sent 📩",

      "reset-password": "Password reset 🔐",

      "resend-forgot-password-otp":
        "OTP resent 📩",

      delete: "Account deleted 🗑️",
    };

    Object.keys(successMap).forEach((key) => {
      if (endpoint.includes(key)) {
        toast.success(
          data?.message || successMap[key]
        );
      }
    });

    return data;
  } catch (err) {
    const normalizedError =
      typeof err === "string"
        ? { message: err }
        : err instanceof Error
        ? { message: err.message }
        : err || {
            message: "Network error ❌",
          };

    toast.error(
      normalizedError.message ||
        "Network error ❌"
    );

    return Promise.reject(normalizedError);
  }
}

// ================= AUTH & USER SERVICES =================

export const authService = {
  // AUTH

  signup: (body) =>
    request("/auth/signup/", {
      method: "POST",
      body,
    }),

  verifySignup: (body) =>
    request("/auth/verify-signup/", {
      method: "POST",
      body,
    }),

  resendSignupOtp: (body) =>
    request("/auth/resend-signup-otp/", {
      method: "POST",
      body,
    }),

  login: (body) =>
    request("/auth/login/", {
      method: "POST",
      body,
    }),

  logout: () =>
    request("/auth/logout/", {
      method: "POST",

      body: {
        refresh: getRefresh(),
      },
    }),

  // PASSWORD

  forgotPassword: (body) =>
    request("/auth/forgot-password/", {
      method: "POST",
      body,
    }),

  verifyForgotOtp: (body) =>
    request(
      "/auth/verify-forgot-password-otp/",
      {
        method: "POST",
        body,
      }
    ),

  resendForgotOtp: (body) =>
    request(
      "/auth/resend-forgot-password-otp/",
      {
        method: "POST",
        body,
      }
    ),

  resetPassword: (body) =>
    request("/auth/reset-password/", {
      method: "POST",
      body,
    }),

  // USER

  getProfile: () =>
    request("/user/profile/", {
      method: "GET",
    }),

  completeProfile: (formData) =>
    request("/user/complete-profile/", {
      method: "POST",
      body: formData,
    }),

  deleteAccount: () =>
    request("/user/delete/", {
      method: "DELETE",
    }),
};

export default authService;