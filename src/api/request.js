const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function request(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;
  const isGET = (options.method || "GET").toUpperCase() === "GET";

  const headers = {
    ...(isGET
      ? {} // ❌ NO HEADERS for GET
      : isFormData
      ? {} // ❌ NO Content-Type for FormData
      : { "Content-Type": "application/json" }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: isFormData
      ? options.body
      : options.body
      ? JSON.stringify(options.body)
      : undefined,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
}
