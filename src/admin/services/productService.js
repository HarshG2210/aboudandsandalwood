import { adminRequest } from "./apiAdminRequest";

export const productService = {
  // CREATE
  createProduct: (data) =>
    adminRequest("/products/", {
      method: "POST",
      body: data,
    }),

  // GET ALL
  getProducts: () =>
    adminRequest("/products/", {
      method: "GET",
    }),

  // GET SINGLE
  getProductById: (id) =>
    adminRequest(`/products/${id}/`, {
      method: "GET",
    }),

  // UPDATE
  updateProduct: (id, data) =>
    adminRequest(`/products/${id}/`, {
      method: "PATCH",
      body: data,
    }),

  // DELETE
  deleteProduct: (id) =>
    adminRequest(`/products/${id}/`, {
      method: "DELETE",
    }),

  // Bulk upload
  bulkUploadProducts: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return adminRequest("/products/bulk_upload/", {
      method: "POST",
      body: formData,
    });
  },

  // upload image
  uploadProductImage: (formData) =>
    adminRequest("/product-images/", {
      method: "POST",
      body: formData,
    }),

  // update image
  updateProductImage: (id, formData) =>
    adminRequest(`/product-images/${id}/`, {
      method: "PATCH",
      body: formData,
    }),

  // delete image
  deleteProductImage: (id) =>
    adminRequest(`/product-images/${id}/`, {
      method: "DELETE",
    }),
};
