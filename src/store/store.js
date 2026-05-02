import addressReducer from "./slices/addressSlice";
import adminReducer from "../admin/store/adminSlice";
import cartReducer from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../admin/store/productSlice";
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
    admin: adminReducer,
    product: productReducer,
    address: addressReducer,
  },
});
