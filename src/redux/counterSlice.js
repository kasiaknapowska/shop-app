import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    addCount: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.count += action.payload;
    },
    substractCount: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.count -= action.payload;
    },
    resetCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { addCount, substractCount, resetCount } = counterSlice.actions;
export default counterSlice.reducer;
