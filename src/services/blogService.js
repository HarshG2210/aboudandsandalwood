import { request } from "./authService";

export const blogService = {
  // GET ALL BLOGS
  getBlogs: () =>
    request("/blogs/", {
      method: "GET",
    }),

  // GET SINGLE BLOG
  getSingleBlog: (blogId) =>
    request(`/blogs/${blogId}/`, {
      method: "GET",
    }),

  // ADD COMMENT
  addComment: (blogId, body) =>
    request(`/blogs/${blogId}/comments/`, {
      method: "POST",
      body,
    }),

  // LIKE BLOG
  likeBlog: (blogId) =>
    request(`/blogs/${blogId}/like/`, {
      method: "POST",
    }),
};
