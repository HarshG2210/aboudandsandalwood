import { request } from "./authService";

export const checkoutService = {
  // =========================
  // PLACE ORDER
  // =========================
  checkout: (addressId) =>
    request("/orders/checkout/", {
      method: "POST",
      body: {
        address_id: addressId,
      },
    }),

  // =========================
  // GET ALL ORDERS
  // =========================
  getOrders: () =>
    request("/orders/", {
      method: "GET",
    }),
};
