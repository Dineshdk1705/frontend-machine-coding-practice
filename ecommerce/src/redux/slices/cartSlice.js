import { createSlice } from "@reduxjs/toolkit";

const findCartIndex = (state, id) =>
  state.cartList.findIndex((cart) => cart.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push({
        ...action.payload,
        quantity: action.payload.quantity,
      });
    },
    removeFromCart: (state, action) => {
      const existCartIndex = findCartIndex(state, action.payload);
      if (existCartIndex !== -1) {
        state.cartList.splice(existCartIndex, 1);
      }
    },
    increaseQuantity(state, action) {
      const existCartIndex = findCartIndex(state, action.payload);
      state.cartList[existCartIndex].quantity += 1;
    },
    decreaseQuantity(state, action) {
      const existCartIndex = findCartIndex(state, action.payload);
      state.cartList[existCartIndex].quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
