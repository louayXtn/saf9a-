// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "@/types/product";

// type InitialState = {
//   value: Product;
// };

// const initialState = {
//   value: {
//     title: "",
//     reviews: 0,
//     price: 0,
//     discountedPrice: 0,
//     img: "",
//     id: 0,
//     images: [],
//     imgs: { thumbnails: [], previews: [] },
//   } as Product,
// } as InitialState;

// export const quickView = createSlice({
//   name: "quickView",
//   initialState,
//   reducers: {
//     updateQuickView: (_, action) => {
//       return {
//         value: {
//           ...action.payload,
//         },
//       };
//     },

//     resetQuickView: () => {
//       return {
//         value: initialState.value,
//       };
//     },
//   },
// });

// export const { updateQuickView, resetQuickView } = quickView.actions;
// export default quickView.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

// تعريف المنتج الافتراضي بشكل منفصل
const initialProduct: Product = {
  title: "",
  reviews: 0,
  price: 0,
  discountedPrice: 0,
  id: 0,
  imgs: { thumbnails: [], previews: [] },
};

const initialState: InitialState = {
  value: initialProduct,
};

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    // تحديث المنتج مع دمج القيم بدل استبدالها بالكامل
    // updateQuickView: (state, action: PayloadAction<Product>) => {
    //   state.value = {
    //     ...state.value,
    //     ...action.payload,
    //   };
    // },
   updateQuickView: (state, action: PayloadAction<Product>) => {
  state.value = { ...action.payload };
},
    // إعادة المنتج إلى الحالة الافتراضية
    resetQuickView: (state) => {
      state.value = { ...initialProduct };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;