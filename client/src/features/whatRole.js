import { createSlice } from "@reduxjs/toolkit";

export const whatRole = createSlice({
  name: "whatRole",
  initialState: { role: "" },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const whatRoleActions = whatRole.actions;

export default whatRole.reducer;
