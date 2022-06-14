import { createSlice } from "@reduxjs/toolkit";

export const isRegistering = createSlice({
  name: "isRegistering",
  initialState: { isRegistering: false },
  reducers: {
    setIsRegistering: (state, action) => {
      state.isRegistering = action.payload;
    },
  },
});

export const isRegisteringActions = isRegistering.actions;

export default isRegistering.reducer;
