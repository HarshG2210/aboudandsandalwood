import { request } from "./authService";

export const addressService = {
  // CREATE
  createAddress: (data) =>
    request("/addresses/", {
      method: "POST",
      body: data,
    }),

  // GET ALL
  getAddresses: () =>
    request("/addresses/", {
      method: "GET",
    }),

  // UPDATE
  updateAddress: (id, data) =>
    request(`/addresses/${id}/`, {
      method: "PATCH",
      body: data,
    }),

  // DELETE
  deleteAddress: (id) =>
    request(`/addresses/${id}/`, {
      method: "DELETE",
    }),
};



