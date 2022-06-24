import { createSlice } from "@reduxjs/toolkit";

export const currentClass = createSlice({
  name: "CurrentClass",
  initialState: {
    class: {
      className: "",
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
        className: "",
        roster: [],
        secretKey: "",
        assignments: [],
        messages: [],
      };
    },
    removeAssigment: (state, action) => {
      let arr = state.class.assignments;
      let filter = arr.filter((item) => item !== action.payload);
      state.class.assignments = filter;
    },
  },
});

export const currentClassActions = currentClass.actions;

export default currentClass.reducer;
