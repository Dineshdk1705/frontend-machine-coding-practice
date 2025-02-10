import { createSlice } from "@reduxjs/toolkit";

const findCartIndex = (state, id) =>
  state.cartList.findIndex((cart) => cart.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartList.unshift({
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
    clearAllCart: (state) => {
      state.cartList = [];
    },
    setTotalAmount(state, action) {
      state.cartTotalAmount = action.payload;
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

export const {
  addToCart,
  removeFromCart,
  setTotalAmount,
  increaseQuantity,
  decreaseQuantity,
  clearAllCart,
} = cartSlice.actions;
export default cartSlice.reducer;
