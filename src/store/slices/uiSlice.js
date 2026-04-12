import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    searchQuery: "",
    searchOpen: false,
    activeFilter: "all",
    sortBy: "featured",
    toasts: [],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    addToast: (state, action) => {
      state.toasts.push({ id: Date.now(), ...action.payload });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setSearchQuery,
  toggleSearch,
  setFilter,
  setSortBy,
  addToast,
  removeToast,
} = uiSlice.actions;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectActiveFilter = (state) => state.ui.activeFilter;
export const selectSortBy = (state) => state.ui.sortBy;
export default uiSlice.reducer;
