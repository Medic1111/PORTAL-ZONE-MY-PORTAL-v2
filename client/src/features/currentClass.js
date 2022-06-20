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
      // state.class.messages = [action.payload];
      // let toBePushed = action.payload;
      // ALL MESSAGES IS THE LAST SNAP
      // OF MESSAGES STATE.
      // MUST STORE IN VAR
      // let allMsgs = state.class.messages;
      // state.class.messages = [...allMsgs, toBePushed];

      //
      //
      // WILL ATTEMPT WITH STATE AND DUMMY ARR
    },
  },
});

export const currentClassActions = currentClass.actions;

export default currentClass.reducer;
