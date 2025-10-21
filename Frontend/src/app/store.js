import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // safe for async API calls
    }),
});

// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(cartMiddleware),
// });
