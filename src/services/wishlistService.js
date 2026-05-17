import { request } from "./authService";

export const wishlistService = {
  // ================= ADD =================
  add: async (productId, variantId) => {
    const res = await request(
      `/products/${productId}/add_variant_to_wishlist/`,
      {
        method: "POST",
        body: { variant_id: variantId },
      }
    );

    return res;
  },

  // ================= REMOVE =================
  remove: async (productId, variantId) => {
    const res = await request(
      `/products/${productId}/remove_variant_from_wishlist/`,
      {
        method: "POST",
        body: { variant_id: variantId },
      }
    );

    return res;
  },

  // ================= GET =================
  get: async () => {
    const res = await request("/wishlists/my_wishlist/", {
      method: "GET",
    });

    return res;
  },
};
