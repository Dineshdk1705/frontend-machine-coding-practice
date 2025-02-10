import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    isCheckoutAllowed: false,
    isPaymentCompleted: false,
  },
  reducers: {
    setCheckoutAllowed: (state, action) => {
      state.isCheckoutAllowed = action.payload;
    },
    setPaymentCompleted: (state, action) => {
      state.isPaymentCompleted = action.payload;
    },
  },
});

export const { setCheckoutAllowed, setPaymentCompleted } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
