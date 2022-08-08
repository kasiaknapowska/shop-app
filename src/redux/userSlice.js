import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      email: "",
      id: "",
      name: "",
      surname: "",
      phone: undefined,
      street: "",
      streetNumber: "",
      zipCode: "",
      city: "",
      // orders: [],
    },
  },
  reducers: {
    setCurrentUserData: (state, action) => {
      state.currentUser =
        {
          ...state.currentUser, ...action.payload
          // email: action.payload.email || state.email,
          // id: action.payload.id,
          // name: action.payload.name,
          // surname: action.payload.surname,
          // phone: action.payload.phone,
          // street: action.payload.street,
          // streetNumber: action.payload.streetNumber,
          // zipCode: action.payload.zipCode,
          // city: action.payload.city,
          // orders: action.payload.orders || state.orders,
        };
    },
    resetData: (state) => {
      state.currentUser = {
        email: "",
        id: "",
        name: "",
        surname: "",
        phone: undefined,
        street: "",
        streetNumber: "",
        zipCode: "",
        city: "",
        // orders: [],
      }
    }
  },
});

export const { setCurrentUserData, resetData } = userSlice.actions;
export default userSlice.reducer;
