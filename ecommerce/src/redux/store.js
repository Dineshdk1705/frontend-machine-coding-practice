import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import authSlice from "./slices/authSlice";
import checkoutSlice from "./slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    productItems: productSlice,
    cartItems: cartSlice,
    wishlistItems: wishlistSlice,
    checkout: checkoutSlice,
  },
});
