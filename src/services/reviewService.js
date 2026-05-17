import { request } from "./authService";

// ================= CREATE REVIEW =================
export const createReview = (productId, formData) => {
  return request(`/products/${productId}/reviews/create/`, {
    method: "POST",
    body: formData,
  });
};

// ================= GET PRODUCT REVIEWS =================
export const getProductReviews = (productId) => {
  return request(`/products/${productId}/reviews/`, {
    method: "GET",
  });
};

// ================= GET USER REVIEWS =================
export const getUserReviews = () => {
  return request(`/user/reviews/`, {
    method: "GET",
  });
};
