import { createSlice } from "@reduxjs/toolkit";

export const getClassCount = createSlice({
  name: "getClassCount",
  initialState: { count: 0 },
  reducers: {
    increase: (state) => {
      state.count++;
    },
  },
});

export const getClassCountActions = getClassCount.actions;

export default getClassCount.reducer;
