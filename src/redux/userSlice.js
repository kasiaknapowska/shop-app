import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      // orders: [],
    },
  },
  reducers: {
    setCurrentUserData: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    setCurrentUserOrders: (state, action) => {
      if (state.currentUser.orders) {
        state.currentUser.orders = [
          ...state.currentUser.orders,
          action.payload,
        ];
      } else {
        state.currentUser.orders = [action.payload];
      }
    },
    resetData: (state) => {
      state.currentUser = {};
    },
  },
});

export const { setCurrentUserData, setCurrentUserOrders, resetData } =
  userSlice.actions;
export default userSlice.reducer;
