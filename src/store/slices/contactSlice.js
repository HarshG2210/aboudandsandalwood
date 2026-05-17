import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactService } from "../../services/contactService";

// ================= SEND CONTACT =================

export const sendContactMessage = createAsyncThunk(
  "contact/send",
  async (body, { rejectWithValue }) => {
    try {
      return await contactService.sendMessage(body);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",

  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetContactState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= PENDING =================
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ================= SUCCESS =================
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // ================= ERROR =================
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;

export default contactSlice.reducer;
