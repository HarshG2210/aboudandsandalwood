import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { blogService } from "../../services/blogService";

// =========================================
// FETCH ALL BLOGS
// =========================================

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await blogService.getBlogs();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// =========================================
// FETCH SINGLE BLOG
// =========================================

export const fetchSingleBlog = createAsyncThunk(
  "blog/fetchSingle",
  async (blogId, { rejectWithValue }) => {
    try {
      return await blogService.getSingleBlog(blogId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// =========================================
// ADD COMMENT
// =========================================

export const addComment = createAsyncThunk(
  "blog/comment",
  async ({ blogId, content }, { rejectWithValue }) => {
    try {
      return await blogService.addComment(blogId, { content });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// =========================================
// LIKE BLOG
// =========================================

export const likeBlog = createAsyncThunk(
  "blog/like",
  async (blogId, { rejectWithValue }) => {
    try {
      return await blogService.likeBlog(blogId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// =========================================
// SLICE
// =========================================

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    blogs: [],
    singleBlog: null,

    loading: false,
    singleLoading: false,
    commentLoading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================================
      // FETCH BLOGS
      // =========================================

      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })

      .addCase(fetchBlogs.rejected, (state) => {
        state.loading = false;
      })

      // =========================================
      // FETCH SINGLE BLOG
      // =========================================

      .addCase(fetchSingleBlog.pending, (state) => {
        state.singleLoading = true;
      })

      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.singleBlog = action.payload;
      })

      .addCase(fetchSingleBlog.rejected, (state) => {
        state.singleLoading = false;
      })

      // =========================================
      // ADD COMMENT
      // =========================================

      .addCase(addComment.pending, (state) => {
        state.commentLoading = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.commentLoading = false;

        const updatedBlog = action.payload;

        // update single blog
        state.singleBlog = updatedBlog;

        // update list blog
        const index = state.blogs.findIndex((b) => b.id === updatedBlog.id);

        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      })

      .addCase(addComment.rejected, (state) => {
        state.commentLoading = false;
      })

      // =========================================
      // LIKE BLOG
      // =========================================

      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;

        // update detail
        state.singleBlog = updatedBlog;

        // update list
        const index = state.blogs.findIndex((b) => b.id === updatedBlog.id);

        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      });
  },
});

export default blogSlice.reducer;
