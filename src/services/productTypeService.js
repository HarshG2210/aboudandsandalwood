import { request } from "../api/request";

export const getProductsByType = async (type) => {
  return request(`/api/products/by-type/?type=${type}`);
};
