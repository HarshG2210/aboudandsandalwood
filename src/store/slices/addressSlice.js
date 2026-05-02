import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addressService } from "../../services/addressService";
import { toast } from "react-toastify";

// ================= THUNKS =================

// CREATE
export const createAddress = createAsyncThunk(
  "address/create",
  async (data, { rejectWithValue }) => {
    try {
      return await addressService.createAddress(data);
    } catch (err) {
      return rejectWithValue(err?.detail || "Create failed");
    }
  }
);

// FETCH
export const fetchAddresses = createAsyncThunk(
  "address/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await addressService.getAddresses();
    } catch (err) {
      return rejectWithValue(err?.detail || "Fetch failed");
    }
  }
);

// UPDATE
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await addressService.updateAddress(id, data);
    } catch (err) {
      return rejectWithValue(err?.detail || "Update failed");
    }
  }
);

// DELETE
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue }) => {
    try {
      await addressService.deleteAddress(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.detail || "Delete failed");
    }
  }
);

// ================= SLICE =================

const addressSlice = createSlice({
  name: "address",

  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchAddresses.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (s, a) => {
        s.loading = false;
        s.addresses = Array.isArray(a.payload)
          ? a.payload
          : a.payload?.results || [];
      })
      .addCase(fetchAddresses.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        toast.error(a.payload);
      })

      // CREATE
      .addCase(createAddress.fulfilled, (s, a) => {
        s.addresses.unshift(a.payload);
        toast.success("Address added ✅");
      })

      // UPDATE
      .addCase(updateAddress.fulfilled, (s, a) => {
        const i = s.addresses.findIndex((ad) => ad.id === a.payload.id);
        if (i !== -1) s.addresses[i] = a.payload;
        toast.success("Address updated ✏️");
      })

      // DELETE
      .addCase(deleteAddress.fulfilled, (s, a) => {
        s.addresses = s.addresses.filter((ad) => ad.id !== a.payload);
        toast.success("Address deleted 🗑️");
      });
  },
});

export default addressSlice.reducer;