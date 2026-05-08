import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { checkoutService } from "../../services/checkoutService";

// ==========================================
// PLACE ORDER
// ==========================================

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async ({ addressId }, { rejectWithValue }) => {
    try {
      const response = await checkoutService.checkout(addressId);

      return response;
    } catch (err) {
      console.error("❌ CHECKOUT ERROR:", err);

      return rejectWithValue(
        err?.response?.data || err?.message || "Checkout failed"
      );
    }
  }
);

// ==========================================
// FETCH ORDERS
// ==========================================

export const fetchOrders = createAsyncThunk(
  "checkout/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkoutService.getOrders();


      return response;
    } catch (err) {
      console.error("❌ GET ORDERS ERROR:", err);

      return rejectWithValue(
        err?.response?.data || err?.message || "Failed to fetch orders"
      );
    }
  }
);

// ==========================================
// SLICE
// ==========================================

const checkoutSlice = createSlice({
  name: "checkout",

  initialState: {
    loading: false,
    success: false,

    // current placed order
    order: null,

    // all orders
    orders: [],

    error: null,
  },

  reducers: {
    resetCheckout: (state) => {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================
      // PLACE ORDER
      // ==================================

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // save latest order
        state.order = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================================
      // FETCH ORDERS
      // ==================================

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.results || [];
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================================
// ACTIONS
// ==========================================

export const { resetCheckout } = checkoutSlice.actions;

// ==========================================
// SELECTORS
// ==========================================

export const selectCheckoutOrder = (state) => state.checkout?.order || null;

export const selectOrders = (state) => state.checkout?.orders || [];

export const selectCheckoutLoading = (state) =>
  state.checkout?.loading || false;

export const selectCheckoutSuccess = (state) =>
  state.checkout?.success || false;

export const selectCheckoutError = (state) => state.checkout?.error || null;

// ==========================================
// EXPORT
// ==========================================

export default checkoutSlice.reducer;
