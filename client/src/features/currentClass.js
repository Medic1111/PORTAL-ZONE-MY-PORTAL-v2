import { createSlice } from "@reduxjs/toolkit";

export const currentClass = createSlice({
  name: "currentClass",
  initialState: {
    class: {
      className: "Select a class",
      roster: [],
      secretKey: "",
      assignments: [],
    },
  },
  reducers: {
    setCurrentClass: (state, action) => {
      state.class = action.payload;
      console.log(state.class);
    },
  },
});

export const currentClassActions = currentClass.actions;

export default currentClass.reducer;
