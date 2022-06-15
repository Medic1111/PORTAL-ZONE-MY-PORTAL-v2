import { createSlice } from "@reduxjs/toolkit";

export const isLoggedIn = createSlice({
  name: "isLoggedIn",
  initialState: { isUserLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
  },
});

export const isLoggedInActions = isLoggedIn.actions;

export default isLoggedIn.reducer;
