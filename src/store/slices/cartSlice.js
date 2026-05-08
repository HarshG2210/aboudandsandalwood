import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { cartService } from "../../services/cartService";
import { createSelector } from "@reduxjs/toolkit";

// ================= THUNKS =================

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ADD
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartService.addToCart({
        productId,
        variantId,
        quantity,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// UPDATE
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartService.updateCartItem(id, quantity);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// DELETE
export const removeCartItem = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      await cartService.removeCartItem(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// CLEAR
export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return true;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
    isOpen: false,
  },

  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchCart.fulfilled, (s, a) => {
        s.loading = false;

        const cart = Array.isArray(a.payload) ? a.payload[0] : a.payload;

        s.items = cart?.items || [];
      })
      .addCase(fetchCart.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ADD
      .addCase(addToCart.pending, (s) => {
        s.loading = true;
      })
      .addCase(addToCart.fulfilled, (s, a) => {
        s.loading = false;

        const newItem = a.payload;

        const existing = s.items.find((i) => i.id === newItem.id);

        if (existing) {
          existing.quantity = newItem.quantity;
        } else {
          s.items.push(newItem);
        }
      })
      .addCase(addToCart.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // UPDATE
      .addCase(updateCartItem.fulfilled, (s, a) => {
        const updated = a.payload;

        const index = s.items.findIndex((i) => i.id === updated.id);
        if (index !== -1) s.items[index] = updated;
      })

      // DELETE
      .addCase(removeCartItem.fulfilled, (s, a) => {
        s.items = s.items.filter((i) => i.id !== a.payload);
      })

      // CLEAR
      .addCase(clearCart.fulfilled, (s) => {
        s.items = [];
      });
  },
});

export const { toggleCart, closeCart } = cartSlice.actions;

// BASE SELECTOR
export const selectCartItems = (state) => state.cart.items;

// ✅ ITEMS WITH itemTotal
export const selectCartItemsWithTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.map((item) => ({
      ...item,
      itemTotal: Number(item.variant_detail?.price || 0) * item.quantity,
    }))
);

// ✅ OVERALL CART TOTAL
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce(
    (acc, item) =>
      acc + Number(item.variant_detail?.price || 0) * item.quantity,
    0
  )
);

// ✅ COUNT
export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

// ✅ CART OPEN
export const selectCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
