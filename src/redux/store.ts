// import { configureStore } from "@reduxjs/toolkit";

// import quickViewReducer from "./features/quickView-slice";
// import cartReducer from "./features/cart-slice";
// import wishlistReducer from "./features/wishlist-slice";
// import productDetailsReducer from "./features/product-details";

// import { TypedUseSelectorHook, useSelector } from "react-redux";

// export const store = configureStore({
//   reducer: {
//     quickViewReducer,
//     cartReducer,
//     wishlistReducer,
//     productDetailsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import quickViewReducer from "./features/quickView-slice";
import productDetailsReducer from "./features/product-details";
import authReducer from "./features/auth-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    wishlistReducer,
    quickViewReducer,
    productDetailsReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;