import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { productService } from "../../services/productService";

// ================= FETCH =================
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts();

      const transformed = data.map((p) => ({
        id: p.id,

        // TEXT
        name: p.name,
        subtitle: p.short_description,
        description: p.short_description,
        longDescription: p.short_description,

        // CATEGORY FIX
        category: p.category?.toLowerCase(),
        type: p.product_type?.toLowerCase(),

        // DETAILS
        origin: p.origin,
        grade: p.grade,
        scent: p.scent,
        purpose: p.purpose ? [p.purpose] : [],
        sustainabilityNote: p.sustainability,

        // ✅ IMAGE FIX
        images: p.images?.map((img) => img.image) || [],

        // ✅ VARIANT FIX
        variants: p.variants || [],

        rating: p.rating || 0,
        reviews: 0,

        // TAG → BADGE
        badge: p.tags || null,

        beadSize: p.bead_size,
        beads: p.bead_count,

        relatedIds: [],
      }));

      return transformed;
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    featured: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        state.featured = action.payload.slice(0, 4).map((p) => p.id);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("💥 Products fetch failed:", action.payload);
      });
  },
});

// ================= SELECTORS =================
export const selectAllProducts = (state) => state.products.items;

export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => String(p.id) === String(id));

export const selectFeaturedIds = (state) => state.products.featured;

export default productsSlice.reducer;
