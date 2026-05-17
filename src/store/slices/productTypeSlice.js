import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductsByType } from "../../services/productTypeService";

export const fetchProductsByType = createAsyncThunk(
  "productType/fetch",
  async (type, { rejectWithValue }) => {
    try {
      const res = await getProductsByType(type);

      return {
        type,
        products: res,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productTypeSlice = createSlice({
  name: "productType",

  initialState: {
    loading: false,
    products: [],
    currentType: "",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByType.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProductsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.currentType = action.payload.type;
      })

      .addCase(fetchProductsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productTypeSlice.reducer;
