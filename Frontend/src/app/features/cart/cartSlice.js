// import { createSlice } from "@reduxjs/toolkit";

// const storedCartList =
//   localStorage.getItem("cartList") !== null
//     ? JSON.parse(localStorage.getItem("cartList"))
//     : [];

// const initialState = {
//   cartList: storedCartList,
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const productToAdd = action.payload.product;
//       const quantity = action.payload.num;
//       const productExit = state.cartList.find(
//         (item) => item.id === productToAdd.id
//       );
//       if (productExit) {
//         state.cartList = state.cartList.map((item) =>
//           item.id === action.payload.product.id
//             ? { ...productExit, qty: productExit.qty + action.payload.num }
//             : item
//         );
//       } else {
//         state.cartList.push({ ...productToAdd, qty: quantity });
//       }
//     },
//     decreaseQty: (state, action) => {
//       const productTodecreaseQnty = action.payload;
//       const productExit = state.cartList.find(
//         (item) => item.id === productTodecreaseQnty.id
//       );
//       if (productExit.qty === 1) {
//         state.cartList = state.cartList.filter(
//           (item) => item.id !== productExit.id
//         );
//       } else {
//         state.cartList = state.cartList.map((item) =>
//           item.id === productExit.id
//             ? { ...productExit, qty: productExit.qty - 1 }
//             : item
//         );
//       }
//     },
//     deleteProduct: (state, action) => {
//       const productToDelete = action.payload;
//       state.cartList = state.cartList.filter(
//         (item) => item.id !== productToDelete.id
//       );
//     },
//   },
// });

// export const cartMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   if (action.type?.startsWith("cart/")) {
//     const cartList = store.getState().cart.cartList;
//     localStorage.setItem("cartList", JSON.stringify(cartList));
//   }
//   return result;
// };

// export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Load saved cart and orders from localStorage
const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const storedOrders =
  localStorage.getItem("orders") !== null
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

const initialState = {
  cartList: storedCartList,
  orders: storedOrders, // 🆕 store orders separately
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.cartList.find(
        (item) => item.id === productToAdd.id
      );
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.id === productToAdd.id
            ? { ...productExit, qty: productExit.qty + quantity }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const product = action.payload;
      const productExit = state.cartList.find((item) => item.id === product.id);
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter((item) => item.id !== product.id);
      } else {
        state.cartList = state.cartList.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    deleteProduct: (state, action) => {
      const product = action.payload;
      state.cartList = state.cartList.filter((item) => item.id !== product.id);
    },

    // 🆕 Place order (move cart items into orders)
    placeOrder: (state) => {
      if (state.cartList.length > 0) {
        const newOrder = {
          id: Date.now(), // unique order id
          items: state.cartList,
          date: new Date().toISOString(),
          total: state.cartList.reduce(
            (price, item) => price + item.qty * item.price,
            0
          ),
        };
        state.orders.push(newOrder);
        state.cartList = []; // clear cart after order
      }
    },
  },
});

// Middleware: persist cart + orders in localStorage
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const { cartList, orders } = store.getState().cart;
    localStorage.setItem("cartList", JSON.stringify(cartList));
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct, placeOrder } =
  cartSlice.actions;

export default cartSlice.reducer;
