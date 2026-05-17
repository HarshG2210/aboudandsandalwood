import { request } from "./authService";

export const contactService = {
  sendMessage: (body) =>
    request("/contact-us/", {
      method: "POST",
      body,
    }),
};
