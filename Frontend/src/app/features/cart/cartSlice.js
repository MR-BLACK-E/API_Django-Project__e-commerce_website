import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/cart/";

// =======================
// 🔹 Fetch user cart
// =======================
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("User not authenticated.");

    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart.");
    }
  }
);

// =======================
// 🔹 Add product to backend cart
// =======================
export const addToBackendCart = createAsyncThunk(
  "cart/addToBackendCart",
  async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("User not authenticated.");

    try {
      const response = await axios.post(
        API_URL,
        { product_id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // After adding, fetch updated cart to stay in sync
      const updatedCart = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return updatedCart.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart.");
    }
  }
);

// =======================
// 🔹 Delete product from backend cart
// =======================
export const deleteFromBackendCart = createAsyncThunk(
  "cart/deleteFromBackendCart",
  async (product_id, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("User not authenticated.");

    try {
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id },
      });

      // After deleting, fetch updated cart
      const updatedCart = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return updatedCart.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete item.");
    }
  }
);

// =======================
// 🔹 Redux Slice
// =======================
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartList = [];
      localStorage.removeItem("cartList");
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload || [];
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to Cart
    builder
      .addCase(addToBackendCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToBackendCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload || [];
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      })
      .addCase(addToBackendCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Cart Item
    builder
      .addCase(deleteFromBackendCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFromBackendCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload || [];
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      })
      .addCase(deleteFromBackendCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
