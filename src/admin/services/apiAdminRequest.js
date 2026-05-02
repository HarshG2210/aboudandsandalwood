import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ================= TOKEN =================
const getAdminAccess = () => localStorage.getItem("admin_access");

// ================= CORE REQUEST =================
export async function adminRequest(endpoint, options = {}) {
  try {
    const isFormData = options.body instanceof FormData;

    const headers = {
      // ❌ DO NOT set Content-Type for FormData
      ...(isFormData ? {} : { "Content-Type": "application/json" }),

      ...(getAdminAccess() && {
        Authorization: `Bearer ${getAdminAccess()}`,
      }),

      ...options.headers,
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,

      // ✅ FIX: handle FormData properly
      body: isFormData
        ? options.body
        : options.body
        ? JSON.stringify(options.body)
        : undefined,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { detail: "Invalid server response" };
    }

    // ================= ERROR =================
    if (!res.ok) {
      let message = data?.detail || "Something went wrong ❌";

      if (typeof data === "object" && data !== null) {
        const key = Object.keys(data)[0];
        message = Array.isArray(data[key])
          ? data[key][0]
          : data[key] || message;
      }

      toast.error(message);
      return Promise.reject(data);
    }

    // ================= SUCCESS =================
    if (
      options.method === "POST" ||
      options.method === "PATCH" ||
      options.method === "DELETE"
    ) {
      toast.success(data?.message || "Action successful ✅");
    }

    return data;
  } catch (err) {
    toast.error(err?.message || "Network error ❌");
    return Promise.reject(err);
  }
}