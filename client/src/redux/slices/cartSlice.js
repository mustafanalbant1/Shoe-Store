import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Başlangıç durumu
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// fetchProducts async action creator
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/products`
      );
      return response.data; // API'den gelen ürünler
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ürünler alınırken bir hata oluştu"
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Sepetten ürün kaldırma action'ı
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    // Ürün miktarını güncelleme action'ı
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
    // Sepete ürün ekleme action'ı (ihtiyaç varsa)
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators'ları export ediyoruz
export const { removeFromCart, updateQuantity, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
