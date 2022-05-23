import { createSlice } from "@reduxjs/toolkit";

export const changePriceSlice = createSlice({
  name: "changePrice",
  initialState: {
    price: 0,
  },
  reducers: {
    sumPrice: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.price += action.payload;
    },
    substractPrice: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.price -= action.payload;
    },
    resetPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { sumPrice, substractPrice, resetPrice } =
  changePriceSlice.actions;
export default changePriceSlice.reducer;
