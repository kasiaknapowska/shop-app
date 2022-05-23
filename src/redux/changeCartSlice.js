import { createSlice } from "@reduxjs/toolkit";

export const changeCartSlice = createSlice({
  name: "changeCart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      const isItemInCart = state.items.find(
        (prod) => prod.id === action.payload.id
      );
      if (isItemInCart) {
        state.items = state.items.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
    },
    editSize: (state, action) => {
      state.items = state.items.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, size: action.payload.size }
            : prod
        );
    },
    deleteFromCart: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    deleteSingleFromCart: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      if (action.payload.quantity > 1) {
        state.items = state.items.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, quantity: prod.quantity - 1 }
            : prod
        );
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    resetCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, editSize, deleteFromCart, deleteSingleFromCart, resetCart } =
  changeCartSlice.actions;
export default changeCartSlice.reducer;
