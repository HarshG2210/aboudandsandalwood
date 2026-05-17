import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createReview,
  getProductReviews,
  getUserReviews,
} from "../../services/reviewService";

// ================= CREATE REVIEW =================
export const submitReview = createAsyncThunk(
  "review/create",

  async ({ productId, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await createReview(productId, data);

      // REFRESH PRODUCT REVIEWS
      dispatch(fetchProductReviews(productId));

      // REFRESH USER REVIEWS
      dispatch(fetchUserReviews());

      return res;
    } catch (err) {
      console.error("❌ REVIEW ERROR:", err);

      return rejectWithValue(
        err?.detail || err?.message || "Failed to submit review"
      );
    }
  }
);

// ================= FETCH PRODUCT REVIEWS =================
export const fetchProductReviews = createAsyncThunk(
  "review/fetchProductReviews",

  async (productId, { rejectWithValue }) => {
    try {
      const res = await getProductReviews(productId);

      return res;
    } catch (err) {
      console.error("❌ PRODUCT REVIEW ERROR:", err);

      return rejectWithValue(
        err?.detail || err?.message || "Failed to fetch reviews"
      );
    }
  }
);

// ================= FETCH USER REVIEWS =================
export const fetchUserReviews = createAsyncThunk(
  "review/fetchUserReviews",

  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserReviews();

      return res;
    } catch (err) {
      console.error("❌ USER REVIEW ERROR:", err);

      return rejectWithValue(
        err?.detail || err?.message || "Failed to fetch user reviews"
      );
    }
  }
);

// ================= SLICE =================
const reviewSlice = createSlice({
  name: "review",

  initialState: {
    loading: false,

    success: false,

    error: null,

    // PRODUCT REVIEWS
    productReviews: [],

    averageRating: 0,

    totalReviews: 0,

    verifiedReviews: 0,

    // USER REVIEWS
    userReviews: [],
  },

  reducers: {
    resetReview: (state) => {
      state.success = false;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= CREATE =================

      .addCase(submitReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ================= PRODUCT REVIEWS =================

      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.productReviews = action.payload?.reviews || [];

        state.averageRating = action.payload?.average_rating || 0;

        state.totalReviews = action.payload?.total_reviews || 0;

        state.verifiedReviews = action.payload?.verified_reviews || 0;
      })

      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ================= USER REVIEWS =================

      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.userReviews = action.payload || [];
      });
  },
});

// ================= ACTIONS =================
export const { resetReview } = reviewSlice.actions;

// ================= SELECTORS =================
export const selectProductReviews = (s) => s.review.productReviews;

export const selectAverageRating = (s) => s.review.averageRating;

export const selectTotalReviews = (s) => s.review.totalReviews;

export const selectVerifiedReviews = (s) => s.review.verifiedReviews;

export const selectUserReviews = (s) => s.review.userReviews;

export const selectReviewLoading = (s) => s.review.loading;

export default reviewSlice.reducer;
