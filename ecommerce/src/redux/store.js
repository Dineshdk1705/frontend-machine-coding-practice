import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    productItems: productSlice,
    cartItems: cartSlice,
    wishlistItems: wishlistSlice,
  },
});
