import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    profile: null,
    orders: [],
    region: "IN",
    currency: "INR",
    loading: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    },
    setRegion: (state, action) => {
      state.region = action.payload.region;
      state.currency = action.payload.currency;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { loginUser, logoutUser, setRegion, updateProfile, addOrder } =
  userSlice.actions;
export const selectUser = (state) => state.user;
export const selectIsAuth = (state) => state.user.isAuthenticated;
export const selectCurrency = (state) => state.user.currency;
export const selectRegion = (state) => state.user.region;
export default userSlice.reducer;
