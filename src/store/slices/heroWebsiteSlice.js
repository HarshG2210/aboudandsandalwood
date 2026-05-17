import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getHeroSections } from "../../services/heroWebsiteService";

export const fetchHeroSectionsWebsite = createAsyncThunk(
  "heroWebsite/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getHeroSections();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const heroWebsiteSlice = createSlice({
  name: "heroWebsite",

  initialState: {
    loading: false,
    banners: [],
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroSectionsWebsite.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchHeroSectionsWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.active_banners || [];
      })

      .addCase(fetchHeroSectionsWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default heroWebsiteSlice.reducer;