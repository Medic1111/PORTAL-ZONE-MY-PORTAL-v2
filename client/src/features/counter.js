import { createSlice } from "@reduxjs/toolkit";

export const counter = createSlice({
  name: "counter for useEffect when chat open",
  initialState: { count: 0 },
  reducers: {
    increase: (state) => {
      state.count++;
      console.log(state.count);
    },
  },
});

export const counterActions = counter.actions;

export default counter.reducer;
