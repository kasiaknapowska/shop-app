import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: {
      email: "",
      id: "",
      name: "",
      surname: "",
      phone: undefined,
      street: "",
      streetNumber: "",
      zipCode: "",
      city: "",
      orders: [],
    },
  },
  reducers: {
    loggedInUserData: (state, action) => {
      state.loggedInUser =
        {
          ...state.loggedInUser,
          email: action.payload.email,
          id: action.payload.id,
          name: action.payload.name,
          surname: action.payload.surname,
          phone: action.payload.phone,
          street: action.payload.street,
          streetNumber: action.payload.streetNumber,
          zipCode: action.payload.zipCode,
          city: action.payload.city,
          orders: action.payload.orders,
        };
    },
    loggedOutUserData: (state) => {
      state.loggedInUser = {
        email: "",
        id: "",
        name: "",
        surname: "",
        phone: undefined,
        street: "",
        streetNumber: "",
        zipCode: "",
        city: "",
        orders: [],
      }
    }
  },
});

export const { loggedInUserData, loggedOutUserData } = userSlice.actions;
export default userSlice.reducer;
