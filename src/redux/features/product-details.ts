// import { createSlice } from "@reduxjs/toolkit";
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
//     images: [],
//     id: 0,
//     imgs: { thumbnails: [], previews: [] },
//     activePreview: "",

//   },
// } as InitialState;

// export const productDetails = createSlice({
//   name: "productDetails",
//   initialState,
//   reducers: {
//     updateproductDetails: (_, action) => {
//       return {
//         value: {
//           ...action.payload,
//         },
//       };
//     },
//   },
// });

// export const { updateproductDetails } = productDetails.actions;
// export default productDetails.reducer;






import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

// const initialState = {
  // value: {
  //   title: "",
  //   reviews: 0,
  //   price: 0,
  //   discountedPrice: 0,
  //   img: "",
  //   images: [],
  //   id: 0,
  //   imgs: { thumbnails: [], previews: [] },
  //   activePreview: "", // هنا نخزن الصورة الحالية
  // },
  const initialState: InitialState = {
  value: {
    _id: "",
    id: 0,
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    description: "",
    contactInfo: "",
    imgs: { thumbnails: [], previews: [] },
    rejectionReason: null,
    category: "",
    imageFileIds: [],
    status: "",
    quantity: 0,
    createdAt: "",
    updatedAt: "",
    activePreview: "",
    createdBy: {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  },
  
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    // لتحديث بيانات المنتج بالكامل
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    // لتحديث الصورة الحالية فقط
    updateActivePreview: (state, action) => {
      state.value.activePreview = action.payload;
    },
  },
});


export const { updateproductDetails, updateActivePreview } = productDetails.actions;
export default productDetails.reducer;