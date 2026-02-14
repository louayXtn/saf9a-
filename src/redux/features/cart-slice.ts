// import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// type InitialState = {
//   items: CartItem[];
// };

// type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   discountedPrice: number;
//   quantity: number;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };

// const initialState: InitialState = {
//   items: [],
// };

// export const cart = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       const { id, title, price, quantity, discountedPrice, imgs } =
//         action.payload;
//       const existingItem = state.items.find((item) => item.id === id);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({
//           id,
//           title,
//           price,
//           quantity,
//           discountedPrice,
//           imgs,
//         });
//       }
//     },
//     removeItemFromCart: (state, action: PayloadAction<number>) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);
//     },
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ id: number; quantity: number }>
//     ) => {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);

//       if (existingItem) {
//         existingItem.quantity = quantity;
//       }
//     },

//     removeAllItemsFromCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const selectCartItems = (state: RootState) => state.cartReducer.items;

// export const selectTotalPrice = createSelector([selectCartItems], (items) => {
//   return items.reduce((total, item) => {
//     return total + item.discountedPrice * item.quantity;
//   }, 0);
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateCartItemQuantity,
//   removeAllItemsFromCart,
// } = cart.actions;
// export default cart.reducer;


import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  items: CartItem[];
};

type CartItem = {
  id: number;                 // للمنتجات المحلية أو mock
  productId?: string;         // من MongoDB (مطلوب للـ backend)
  sellerId?: string;          // من المنتج أو المستخدم (مطلوب للـ backend)
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        id,
        productId,
        sellerId,
        title,
        price,
        quantity,
        discountedPrice,
        imgs,
      } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          productId,
          sellerId,
          title,
          price,
          quantity,
          discountedPrice,
          imgs,
        });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;

// export const selectTotalPrice = createSelector([selectCartItems], (items) => {
//   return items.reduce((total, item) => {
//     return total + item.discountedPrice * item.quantity;
//   }, 0);
// });
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    const effectivePrice =
      item.discountedPrice && item.discountedPrice < item.price
        ? item.discountedPrice
        : item.price;

    return total + effectivePrice * item.quantity;
  }, 0);
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;