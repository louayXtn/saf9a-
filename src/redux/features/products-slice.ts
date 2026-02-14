import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: any[];
  originalProducts: any[];
}

const initialState: ProductState = {
  products: [],
  originalProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
    setOriginalProducts: (state, action: PayloadAction<any[]>) => {
      state.originalProducts = action.payload;
      state.products = action.payload;
    },
  },
});

export const { setProducts, setOriginalProducts } = productsSlice.actions;
export default productsSlice.reducer;