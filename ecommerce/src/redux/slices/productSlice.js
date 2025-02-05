import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=0");
      const data = await res.json();
      return data.products;
    } catch (err) {
      console.log("Error while fetching products:", err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default productSlice.reducer;
