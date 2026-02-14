// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type InitialState = {
//   items: WishListItem[];
// };

// type WishListItem = {
//   id: number;
//   title: string;
//   price: number;
//   discountedPrice: number;
//   quantity: number;
//   status?: string;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };

// const initialState: InitialState = {
//   items: [],
// };

// export const wishlist = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     addItemToWishlist: (state, action: PayloadAction<WishListItem>) => {
//       const { id, title, price, quantity, imgs, discountedPrice, status } =
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
//           imgs,
//           discountedPrice,
//           status,
//         });
//       }
//     },
//     removeItemFromWishlist: (state, action: PayloadAction<number>) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);
//     },

//     removeAllItemsFromWishlist: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const {
//   addItemToWishlist,
//   removeItemFromWishlist,
//   removeAllItemsFromWishlist,
// } = wishlist.actions;
// export default wishlist.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  items: WishListItem[];
};

// خلي WishListItem يورث من Product ويضيف الحقول اللي محتاجها
export type WishListItem = Product & {
  quantity: number;
  status?: string;
};

const initialState: InitialState = {
  items: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishListItem>) => {
      const {
        _id,
        id,
        title,
        price,
        discountedPrice,
        quantity,
        imgs,
        status,
      } = action.payload;

      // نستخدم _id أو id كمفتاح أساسي
      const existingItem = state.items.find(
        (item) => item._id === _id || item.id === id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...action.payload,
          status,
          quantity,
        });
      }
    },

    removeItemFromWishlist: (state, action: PayloadAction<string | number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(
        (item) => item._id !== itemId && item.id !== itemId
      );
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;

export default wishlist.reducer;