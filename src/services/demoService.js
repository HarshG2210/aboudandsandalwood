// import { toast } from "react-toastify";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // ================== CORE REQUEST ==================

// async function request(endpoint, options = {}) {
//   let res;

//   try {
//     res = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//     });
//   } catch (networkError) {
//     console.error("❌ NETWORK ERROR:", networkError);

//     toast.error("Network error. Please check connection ❌");
//     throw { detail: "Network error" };
//   }

//   let data;
//   try {
//     data = await res.json();
//   } catch {
//     data = { detail: "Invalid server response" };
//   }

//   // ================== ERROR ==================
//   if (!res.ok) {
//     let message = "Something went wrong ❌";

//     if (data?.detail) {
//       message = data.detail;
//     } else if (typeof data === "object") {
//       const key = Object.keys(data)[0];
//       message = Array.isArray(data[key]) ? data[key][0] : data[key];
//     }

//     toast.error(message);
//     throw data;
//   }

//   // ================== SUCCESS TOAST ==================
//   if (endpoint.includes("signup")) {
//     toast.success(data?.message || "OTP sent ✨");
//   }

//   if (endpoint.includes("verify-signup")) {
//     toast.success(data?.message || "Verified successfully ✅");
//   }

//   if (endpoint.includes("resend-signup-otp")) {
//     toast.success(data?.message || "OTP resent successfully ✨");
//   }

//   if (endpoint.includes("login")) {
//     toast.success(data?.message || "Login successful 🎉");
//   }

//   if (endpoint.includes("complete-profile")) {
//     toast.success(data?.message || "Profile completed ✅");
//   }

//   if (endpoint.includes("logout")) {
//     toast.success(data?.message || "Logged out successfully 👋");
//   }

//   if (endpoint.includes("forgot-password")) {
//     toast.success(data?.message || "OTP sent to your email 📩");
//   }

//   if (endpoint.includes("reset-password")) {
//     toast.success(data?.message || "Password reset successful 🔐");
//   }

//   if (endpoint.includes("resend-forgot-password-otp")) {
//     toast.success(data?.message || "OTP resent 📩");
//   }

//   if (endpoint.includes("delete")) {
//     toast.success(data?.message || "Account deleted successfully 🗑️");
//   }

//   return data;
// }

// // ================== TOKEN HELPER ==================

// const getToken = () => localStorage.getItem("access_token");

// // ================== API METHODS ==================

// export const authService = {
//   // 🔐 SIGNUP
//   signup: (body) =>
//     request("/auth/signup/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🔐 VERIFY OTP
//   verifySignup: (body) =>
//     request("/auth/verify-signup/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🔐 RESEND VERIFY OTP
//   resendSignupOtp: (body) =>
//     request("/auth/resend-signup-otp/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🔐 LOGIN
//   login: (body) =>
//     request("/auth/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 👤 GET PROFILE
//   getProfile: () =>
//     request("/user/profile/", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//     }),

//   // 🧾 COMPLETE PROFILE (FORM-DATA)
//   completeProfile: (formData) =>
//     request("/user/complete-profile/", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: formData,
//     }),

//   // LOG Out
//   logout: () =>
//     request("/auth/logout/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//       body: JSON.stringify({
//         refresh: localStorage.getItem("refresh_token"),
//       }),
//     }),

//   // FORGOT PASSWORD
//   forgotPassword: (body) =>
//     request("/auth/forgot-password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🔐 RESET PASSWORD
//   resetPassword: (body) =>
//     request("/auth/reset-password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🔁 RESEND OTP (FORGOT FLOW)
//   resendForgotOtp: (body) =>
//     request("/auth/resend-forgot-password-otp/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }),

//   // 🗑️ DELETE ACCOUNT
//   deleteAccount: () => {
//     const token = localStorage.getItem("access_token");

//     return request("/user/delete/", {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
// };