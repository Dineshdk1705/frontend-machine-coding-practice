import { createSlice } from "@reduxjs/toolkit";

const findWishlistIndex = (state, id) =>
  state.wishlistList.findIndex((wishlist) => wishlist.id === id);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistList: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistList.push({
        ...action.payload,
        quantity: action.payload.quantity,
      });
    },
    removeFromWishlist: (state, action) => {
      const existCartIndex = findWishlistIndex(state, action.payload);
      if (existCartIndex !== -1) {
        state.wishlistList.splice(existCartIndex, 1);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
