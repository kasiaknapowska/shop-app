import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      // email: "",
      // id: "",
      // name: "",
      // surname: "",
      // phone: undefined,
      // street: "",
      // streetNumber: "",
      // zipCode: "",
      // city: "",
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
    resetData: (state) => {
      state.currentUser = {};
    },
  },
});

export const { setCurrentUserData, resetData } = userSlice.actions;
export default userSlice.reducer;
