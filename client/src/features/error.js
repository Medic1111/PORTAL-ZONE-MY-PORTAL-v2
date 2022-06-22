import { createSlice } from "@reduxjs/toolkit";

export const error = createSlice({
  name: "server error",
  initialState: { isError: false, msg: "" },
  reducers: {
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const errorActions = error.actions;

export default error.reducer;
