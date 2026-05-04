import addressReducer from "./slices/addressSlice";
import cartReducer from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    ui: uiReducer,
    products: productsReducer,
    address: addressReducer,
  },
});
