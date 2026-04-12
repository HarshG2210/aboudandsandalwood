import { createSlice } from "@reduxjs/toolkit";
const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart(), isOpen: false },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.isOpen = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) =>
          !(i.id === action.payload.id && i.variant === action.payload.variant)
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (item) item.quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectCartOpen = (state) => state.cart.isOpen;
export default cartSlice.reducer;
