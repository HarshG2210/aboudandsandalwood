import { request } from "./authService";

export const cartService = {
  // ================= ADD =================
  addToCart: async ({ productId, variantId, quantity }) => {
    const payload = {
      product: productId,
      variant: variantId,
      quantity,
    };

    return await request("/cart-items/", {
      method: "POST",
      body: payload,
    });
  },

  // ================= GET CART =================
  getCart: async () => {
    return await request("/cart/", {
      method: "GET",
    });
  },

  // ================= UPDATE =================
  updateCartItem: async (id, quantity) => {
    return await request(`/cart-items/${id}/`, {
      method: "PATCH",
      body: { quantity },
    });
  },

  // ================= DELETE =================
  removeCartItem: async (id) => {
    return await request(`/cart-items/${id}/`, {
      method: "DELETE",
    });
  },

  // ================= CLEAR =================
  clearCart: async () => {
    return await request(`/cart-items/clear/`, {
      method: "DELETE",
    });
  },
};
