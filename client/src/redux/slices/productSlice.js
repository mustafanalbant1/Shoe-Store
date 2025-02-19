import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the products
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Thunk to get all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log(
        "API URL:",
        `${import.meta.env.VITE_APP_API_URL}/api/products`
      );
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/products`
      );
      console.log("API Response:", response.data);

      if (!response.data) {
        throw new Error("Veri alınamadı");
      }

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Ürünleri getirirken bir hata oluştu"
      );
    }
  }
);

// Thunk to get a product by its ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ürün bilgileri alınırken bir hata oluştu"
      );
    }
  }
);

// Slice to manage the state
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getting all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Loading products...");
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
        console.log("Products loaded:", action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Products loading failed:", action.payload);
      })
      // Handle getting a product by ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the action to clear product data (if needed)
export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
