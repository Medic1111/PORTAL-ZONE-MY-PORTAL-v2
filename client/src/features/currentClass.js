import { createSlice } from "@reduxjs/toolkit";

export const currentClass = createSlice({
  name: "CurrentClass",
  initialState: {
    class: {
      className: "Select a class",
      roster: [],
      secretKey: "",
      assignments: [],
      messages: [],
    },
  },
  reducers: {
    setCurrentClass: (state, action) => {
      state.class = action.payload;
    },
    updateMessages: (state, action) => {
      state.class.messages = [...state.class.messages, action.payload];
    },
    clearClass: (state) => {
      state.class = {
        className: "Select a class",
        roster: [],
        secretKey: "",
        assignments: [],
        messages: [],
      };
    },
  },
});

export const currentClassActions = currentClass.actions;

export default currentClass.reducer;
