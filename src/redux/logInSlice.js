import { createSlice } from '@reduxjs/toolkit'

const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        loggedIn: false
    },
    reducers: {
      logIn: (state) => {
        state.loggedIn = true;
      },
      logOut: (state) => {
        state.loggedIn = false;
      },
    }
  })
  
  export const { logIn, logOut } = logInSlice.actions;
  export default logInSlice.reducer;
