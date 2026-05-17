import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { wishlistService } from "../../services/wishlistService";

// ================= THUNKS =================

// FETCH
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await wishlistService.get();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// add
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      const res = await wishlistService.add(productId, variantId);

      return res;
    } catch (err) {
      console.error("❌ ADD ERROR", err);
      return rejectWithValue(err);
    }
  }
);

// remove
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      await wishlistService.remove(productId, variantId);

      return { productId, variantId };
    } catch (err) {
      console.error("❌ REMOVE ERROR", err);
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= FETCH =================
      .addCase(fetchWishlist.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (s, a) => {
        s.loading = false;

        s.items = a.payload?.wishlist || a.payload?.items || a.payload || [];
      })

      .addCase(fetchWishlist.rejected, (s) => {
        s.loading = false;
      })

      // ================= ADD =================
      .addCase(addToWishlist.fulfilled, (s, a) => {
        const item = a.payload?.wishlist_item || a.payload;

        // 🔥 prevent duplicate
        const exists = s.items.some(
          (i) =>
            i.product?.id === item.product?.id &&
            i.variant_detail?.id === item.variant_detail?.id
        );

        if (!exists) {
          s.items.push(item);
        }
      })

      // ================= REMOVE =================
      .addCase(removeFromWishlist.fulfilled, (s, a) => {
        s.items = s.items.filter(
          (i) =>
            !(
              i.product?.id === a.payload.productId &&
              i.variant_detail?.id === a.payload.variantId
            )
        );
      });
  },
});

export const selectWishlist = (s) => s.wishlist.items;

export default wishlistSlice.reducer;
