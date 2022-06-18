import { createSlice } from "@reduxjs/toolkit";

export const currentClass = createSlice({
  name: "currentClass",
  initialState: { class: {} },
  reducers: {
    setCurrentClass: (state, action) => {
      state.class = action.payload;
      console.log(state.class);
    },
  },
});

export const currentClassActions = currentClass.actions;

export default currentClass.reducer;