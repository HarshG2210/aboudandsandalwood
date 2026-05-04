import { request } from "../api/request";

export const productService = {
  getProducts: async () => {
    return await request("/products/", {
      method: "GET",
    });
  },
};
