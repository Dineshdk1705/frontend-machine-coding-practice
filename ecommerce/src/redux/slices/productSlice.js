import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `https://dummyjson.com/products/search?q=${searchQuery}`
        : "https://dummyjson.com/products?limit=0";

      const res = await fetch(url);
      const data = await res.json();
      return data.products;
    } catch (err) {
      console.log("Error while fetching products:", err);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error while fetching categories:", err);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      return data.products;
    } catch (err) {
      console.log("Error while fetching categories:", err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    categories: [],
    selectedCategory: "",
    loading: false,
    error: "",
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products!";
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories!";
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch category products!";
      });
  },
});

export const { setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
