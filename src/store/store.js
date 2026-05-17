import addressReducer from "./slices/addressSlice";
import blogReducer from "./slices/blogSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slices/contactSlice";
import heroWebsiteReducer from "./slices/heroWebsiteSlice";
import productTypeReducer from "./slices/productTypeSlice";
import productsReducer from "./slices/productsSlice";
import reviewReducer from "./slices/reviewSlice";
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
    checkout: checkoutReducer,
    review: reviewReducer,
    blog: blogReducer,
    contact: contactReducer,
    heroWebsite: heroWebsiteReducer,
    productType: productTypeReducer,
  },
});
