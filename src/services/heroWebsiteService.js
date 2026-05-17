import { request } from "../api/request";

export const getHeroSections = async () => {
  return request("/hero-sections/");
};