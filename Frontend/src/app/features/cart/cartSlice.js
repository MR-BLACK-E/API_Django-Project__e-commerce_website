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

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // =======================
// // 🔹 API Base URL
// // =======================
// const API_URL = "http://127.0.0.1:8000/api/cart/";

// // =======================
// // 🔹 Async Thunks (Backend Operations)
// // =======================

// // 🛒 Fetch user cart
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) return rejectWithValue("User not authenticated.");

//   try {
//     const response = await axios.get(API_URL, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data; // Should return cart items list
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to fetch cart.");
//   }
// });

// // ➕ Add product to backend cart
// export const addToBackendCart = createAsyncThunk(
//   "cart/addToBackendCart",
//   async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return rejectWithValue("User not authenticated.");

//     try {
//       const response = await axios.post(
//         API_URL,
//         { product_id, quantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data; // return updated cart item
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to add to cart.");
//     }
//   }
// );

// // 🗑️ Delete product from backend cart
// export const deleteFromBackendCart = createAsyncThunk(
//   "cart/deleteFromBackendCart",
//   async (productId, { rejectWithValue }) => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return rejectWithValue("User not authenticated.");

//     try {
//       await axios.delete(`${API_URL}${productId}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return productId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to delete item.");
//     }
//   }
// );

// // =======================
// // 🔹 Local Redux Slice
// // =======================
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartList: [],
//     orders: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cartList = [];
//       localStorage.removeItem("cartList");
//     },
//   },
//   extraReducers: (builder) => {
//     // FETCH CART
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartList = action.payload || [];
//         localStorage.setItem("cartList", JSON.stringify(state.cartList));
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // ADD TO CART
//     builder
//       .addCase(addToBackendCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToBackendCart.fulfilled, (state, action) => {
//         state.loading = false;
//         const existingItem = state.cartList.find(
//           (item) => item.id === action.payload.id
//         );
//         if (existingItem) {
//           existingItem.quantity = action.payload.quantity;
//         } else {
//           state.cartList.push(action.payload);
//         }
//         localStorage.setItem("cartList", JSON.stringify(state.cartList));
//       })
//       .addCase(addToBackendCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // DELETE CART ITEM
//     builder
//       .addCase(deleteFromBackendCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteFromBackendCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartList = state.cartList.filter(
//           (item) => item.id !== action.payload
//         );
//         localStorage.setItem("cartList", JSON.stringify(state.cartList));
//       })
//       .addCase(deleteFromBackendCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Load saved cart and orders from localStorage
// const storedCartList = JSON.parse(localStorage.getItem("cartList") || "[]");
// const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

// const initialState = {
//   cartList: storedCartList,
//   orders: storedOrders,
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { product, num } = action.payload;
//       const existingItem = state.cartList.find(
//         (item) => String(item.id) === String(product.id)
//       );
//       // const existingItem = state.cartList.find((item) => item.id === product.id);

//       if (existingItem) {
//         existingItem.qty += num;
//       } else {
//         state.cartList.push({ ...product, qty: num });
//       }
//     },

//     decreaseQty: (state, action) => {
//       const product = action.payload;
//       const existingItem = state.cartList.find((item) => item.id === product.id);

//       if (existingItem) {
//         if (existingItem.qty > 1) {
//           existingItem.qty -= 1;
//         } else {
//           state.cartList = state.cartList.filter((item) => item.id !== product.id);
//         }
//       }
//     },

//     deleteProduct: (state, action) => {
//       const product = action.payload;
//       state.cartList = state.cartList.filter((item) => item.id !== product.id);
//     },

//     placeOrder: (state) => {
//       if (state.cartList.length > 0) {
//         const newOrder = {
//           id: Date.now(),
//           items: state.cartList,
//           date: new Date().toISOString(),
//           total: state.cartList.reduce(
//             (price, item) => price + item.qty * item.price,
//             0
//           ),
//         };
//         state.orders.push(newOrder);
//         state.cartList = [];
//       }
//     },
//   },
// });

// // Middleware: persist cart + orders in localStorage
// export const cartMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   if (action.type?.startsWith("cart/")) {
//     const { cartList, orders } = store.getState().cart;
//     localStorage.setItem("cartList", JSON.stringify(cartList));
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }
//   return result;
// };

// export const { addToCart, decreaseQty, deleteProduct, placeOrder } =
//   cartSlice.actions;

// export default cartSlice.reducer;

